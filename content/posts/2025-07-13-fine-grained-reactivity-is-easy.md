---
title: React의 진짜 반응성 - 35줄 코드로 Context API의 함정 넘어서기
date: 2025-07-13T07:48:08+09:00
pin: false
draft: false
tags:
  - React
  - 반응성
  - 상태 관리
  - Context API
  - 성능 최적화
  - Zustand
  - useSyncExternalStore
summary: React의 반응성은 정말 어려운 걸까요? Context API가 왜 불필요한 리렌더링을 유발하는지, 그리고 단 35줄의 코드로 Zustand와 같은 선택자 기반의 진정한 반응성을 구현하는 방법을 알아봅니다.
---
# React의 진짜 반응성 - 35줄 코드로 Context API의 함정 넘어서기

![](https://blogger.googleusercontent.com/img/a/AVvXsEgr_P_vbKgrljls-Gm7_Q94A5hP7OGGDjiZ4NqZq0cUJXCAeOxSriFZ63Fo7ho_lEsmt12FiMbXbcDJham42JrUyfgIZh1Wjqm5xJzzk3myWV9Lzbqupz9NkwIb9NtsomHN7FiIGPDnwgrqDWOtBu86bPddi0h14xq8FI5lK3012XK6vxkGx3yQWs2xW7w=s16000)

우리는 React의 내부 메커니즘, 모범 사례, 디자인 패턴, 그리고 고급 개념들을 탐구합니다.

이 글들은 기본을 넘어 React가 내부적으로 어떻게 작동하는지 진정으로 이해하고자 하는 React 개발자들을 위해 작성되었습니다.

## 서론: 반응성은 정말 어려운 걸까?

'반응성(Reactivity)'이라는 개념은 React 생태계에서 여전히 오해받고 있는 것 같습니다.

저는 MUI X Data Grid에서 이 문제를 어떻게 해결했는지에 대한 글을 제공하고 싶었습니다.

제 생각에, 세밀한 '선택자 기반 반응성'은 React에서 35줄 미만의 코드로도 가능하며, 이 글의 끝에서는 바로 복사-붙여넣기 할 수 있는 예제를 제공할 것입니다.

문제를 가장 미니멀한 해결책으로 축소할 수 있는 것은 중요하다고 생각합니다.

왜냐하면 그것이 문제의 본질을 더 명확하게 보여주기 때문입니다.

단순함은 또한 우리 코드가 가져야 할 가장 높은 목표 중 하나입니다.

단순한 코드에서 쉬운 유지보수성과 쉬운 성능 최적화가 나오기 때문이죠.

문제에 대한 가장 미니멀한 해결책을 이해하는 것은, 여러분이 이해하지 못하는 미리 만들어진 해결책을 물려받는 대신, 그것을 기반으로 구축해 나갈 수 있게 해줍니다.

## 당면한 문제: Context API의 '과잉 방송'

Data Grid에서 겪었던 문제를 재현하기 위해, 간단한 실행 가능한 예제가 있습니다.

'Cell' 컴포넌트들이 내부에 있는 'Grid'입니다.

그리드의 루트에 있는 상태에 현재 포커스된 셀을 저장하고, 각 셀은 포커스를 받으면 그 상태를 업데이트할 수 있습니다.

```jsx
const Context = createContext();

function Grid() {
  const [focus, setFocus] = useState(0);
  // 매번 새로운 value 객체가 생성되는 것을 막기 위해 useMemo 사용
  const contextValue = useMemo(() => ({ focus, setFocus }), [focus]);

  return (
    <Context.Provider value={contextValue}>
      {Array.from({ length: 50 }).map((_, i) => (
        <Cell key={i} index={i} />
      ))}
    </Context.Provider>
  );
}

function Cell({ index }) {
  const context = useContext(Context);
  const isFocused = context.focus === index;

  console.log(`Cell ${index} is rendering`);

  return (
    <button
      onClick={() => context.setFocus(index)}
      className={isFocused ? "focus" : ""}
    >
      {index}
    </button>
  );
}
```



이 그리드에서 셀 하나를 클릭하면 어떻게 될까요?

아마 여러분의 콘솔은 "Cell 0 is rendering", "Cell 1 is rendering", ... "Cell 49 is rendering"으로 도배될 것입니다.

셀 하나를 클릭했을 뿐인데, 50개의 모든 셀이 리렌더링되는 재앙이 발생합니다.

이것이 바로 Context API의 근본적인 한계입니다.

마치 마을 방송 시스템과 같습니다.

'1번 집에 우편물이 도착했다'는 소식을 알리기 위해, 마을 전체에 스피커로 방송하는 셈이죠.

`Context.Provider`의 `value`가 변경되면, `useContext`를 통해 이 컨텍스트를 '구독'하는 모든 컴포넌트는 그 값의 일부만 사용하더라도 무조건 리렌더링됩니다.

셀의 개수가 많아지고 각 셀의 렌더링 비용이 비싸진다면, 이는 만족스럽지 못한 상황입니다.

## 해결책: 35줄 미만의 '선택적 구독' 시스템

제가 35줄 미만의 코드로 해결책을 약속했죠.

여기 있습니다.

'스토어(Store)'는 본질적으로 변경될 때 콜백을 트리거하는 `ref` 객체일 뿐입니다.

그리고 그 콜백들은 각 컴포넌트에서 `setState` 훅 함수를 호출함으로써 목표로 한 리렌더링을 트리거하기만 하면 됩니다.

```typescript
import { useState, useEffect } from "react";

type Listener<S> = (state: S) => void;

class Store<State> {
  private state: State;
  private listeners: Set<Listener<State>>;

  constructor(initialState: State) {
    this.state = initialState;
    this.listeners = new Set();
  }

  public subscribe = (listener: Listener<State>): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  public update = (newState: State) => {
    if (newState !== this.state) {
      this.state = newState;
      this.listeners.forEach(listener => listener(this.state));
    }
  };

  // 컴포넌트가 스냅샷을 가져가기 위한 메서드
  public getSnapshot = () => {
    return this.state;
  };
}

// 이 훅이 바로 마법의 핵심입니다.
function useSelector<State, Slice>(
  store: Store<State>,
  selector: (state: State) => Slice
) {
  const [slice, setSlice] = useState(() => selector(store.getSnapshot()));

  useEffect(() => {
    return store.subscribe(state => {
      const newSlice = selector(state);
      if (newSlice !== slice) {
        setSlice(newSlice);
      }
    });
  }, [store, selector, slice]);

  return slice;
}
```



이것을 사용하기 위해 우리가 해야 할 일은 `Store` 인스턴스를 컨텍스트에 넣고, 모든 컴포넌트가 `useSelector`를 통해 스토어 업데이트를 구독하게 하는 것뿐입니다.

'선택자(selector)'는 컴포넌트가 관심 있는 정확한 상태 조각을 선택하기 때문에, 그 조각이 변경되지 않는 한 리렌더링되지 않을 것입니다.

```jsx
const StoreContext = createContext();

export function Grid() {
  // 스토어 인스턴스는 한 번만 생성됩니다.
  const [store] = useState(() => new Store({ focus: 0 }));

  return (
    <StoreContext.Provider value={store}>
      {Array.from({ length: 50 }).map((_, i) => (
        <Cell key={i} index={i} />
      ))}
    </StoreContext.Provider>
  );
}

// 선택자 함수들
const selectors = {
  isFocused: (state, index) => state.focus === index,
};

function Cell({ index }) {
  const store = useContext(StoreContext);
  // 이제 전체 context가 아닌, 'isFocused'라는 boolean 값만 구독합니다.
  const isFocused = useSelector(store, state =>
    selectors.isFocused(state, index)
  );

  console.log(`Cell ${index} is rendering`);

  return (
    <button
      onClick={() => store.update({ ...store.getSnapshot(), focus: index })}
      className={isFocused ? "focus" : ""}
    >
      {index}
    </button>
  );
}
```



이제 업데이트된 예제를 실행해 보세요.

셀을 클릭하면, 포커스 상태가 변경된 두 개의 셀('이전 포커스 셀'과 '새로운 포커스 셀')만 리렌더링되는 것을 확인할 수 있습니다.

다른 모든 셀은 전혀 업데이트되지 않습니다.

마치 각 셀에 필요한 정보만 콕 집어 문자 메시지로 보내주는 것과 같습니다.

## 더 나아가기: 프로덕션을 위한 개선

이제 가장 미니멀한 해결책을 확립했으니, 고려해야 할 몇 가지 사항이 더 있습니다.

### 1. React의 엣지 케이스: `useSyncExternalStore`

제가 위에서 제공한 `useSelector` 구현은 개념을 이해하는 데는 좋지만, 실제로는 '상태 찢어짐(state tearing)'과 같은 엣지 케이스에 부딪힐 수 있습니다.

React 18에 도입된 비동기 렌더링 모델 때문에 발생하는 이 문제를 해결하기 위해, React는 외부 스토어를 구독하는 공식적인 방법인 `useSyncExternalStore`를 제공합니다.

우리의 `useSelector`를 이 공식 훅을 사용하도록 업그레이드할 수 있습니다.

```javascript
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";

function useSelector(store, selector, ...args) {
  return useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot, // 서버 스냅샷 (여기서는 동일하게 사용)
    state => selector(state, ...args)
  );
}
```



### 2. 더 인체공학적인 스토어

`store.update({ ...store.getSnapshot(), focus: 42 })`라고 쓰는 것은 장황합니다.

스토어에 유틸리티 메서드를 추가하여 `store.set('focus', 42)`처럼 더 간단하게 쓸 수 있습니다.

```typescript
class Store<State> {
  // ...
  public set<K extends keyof State>(key: K, value: State[K]) {
    this.update({ ...this.state, [key]: value });
  }
  // ...
}
```



### 3. 파생된 상태와 계산된 값

상태로부터 파생된 값을 계산하는 것은 필수적입니다.

이 문제를 해결하기 위해, 우리는 '메모이제이션된 선택자'를 도입했습니다.

바퀴를 재발명하는 대신, Redux의 `reselect` 라이브러리 구현을 사용할 수 있습니다.

```javascript
import { createSelector } from "reselect";

const rowsSelector = state => state.rows;
const sortBySelector = state => state.sortBy;

const sortedRowsSelector = createSelector(
  [rowsSelector, sortBySelector], // 입력 선택자들
  (rows, sortBy) => {
    // 입력 선택자의 결과가 변경될 때만 이 함수가 다시 실행됩니다.
    return [...rows].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }
);
```



## 결론: Zustand, Redux도 여기서 시작했다

우리가 직접 만든 이 작은 스토어와 `useSelector` 훅을 자세히 들여다보면, 이것이 바로 Zustand나 Redux 같은 유명 상태 관리 라이브러리의 핵심 원리라는 것을 깨닫게 됩니다.

- 중앙 집중식 스토어
- 상태 변경을 알리는 구독(subscribe) 메커니즘
- 컴포넌트가 필요한 데이터 조각만 가져오게 하는 선택자(selector)

이처럼 세밀한 반응성은 결코 마법이 아닙니다.

오히려 간단하고, 정밀하며, 즐거운 개념입니다.

이 기본 원리를 이해하면, 더 이상 외부 라이브러리를 블랙박스로 여기지 않고, 그 내부 동작을 이해하며 더 나은 아키텍처 결정을 내릴 수 있게 될 것입니다.

이 글의 코드를 기반으로 한 `store-x-selector`라는 패키지도 있으니, 직접 스토어를 구축하는 것이 귀찮다면 사용해 보시는 것도 좋습니다.
