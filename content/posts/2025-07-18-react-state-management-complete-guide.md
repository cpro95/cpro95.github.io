---
title: React 상태 관리 완벽 가이드 useState부터 TanStack Query까지
date: 2025-07-19T11:51:54+09:00
draft: false
tags:
  - React
  - 상태 관리
  - useState
  - useReducer
  - Context API
  - Zustand
description: React의 상태 관리 기법을 useState, useReducer, Context API부터 Zustand, TanStack Query와 같은 최신 라이브러리까지 종합적으로 다룹니다. 클라이언트 상태와 서버 상태를 구분하여 올바른 도구를 선택하는 방법을 배워보세요.
---
![](https://blogger.googleusercontent.com/img/a/AVvXsEjHpxcMaGK3Udm-7LoJA8WPJwR2HIBauIJq1tirJK-dIgP6jaOuIqZu9laHAM31nl-yB6mBvyNesCjRFZixK90nGWpEbmD4YHV_WyM8r_yRKUTWakaxJbhvfsmvUHLRx3Kyfgv23yiy4jV_ajjiWlmeRgUu3yYb7CfFIfbc3RCNSRYHNFbQwu3rmK3pLG4=s16000)

React 애플리케이션을 개발하고 있다면, 거의 확실하게 어디에선가 '상태'를 관리하고 있을 겁니다.

상태(state)는 의외로 정의하기는 어렵지만, 예시를 통해 이해하기는 훨씬 쉽습니다.

가령 입력창은 현재 입력된 값을 상태로 가지고, 폼(form)은 그 안에 있는 모든 입력 값들을 상태로 가집니다.

더 나아가 하나의 애플리케이션은 그 앱을 렌더링하고 운영하는 데 필요한 모든 데이터를 상태라고 할 수 있습니다.

이것들은 상태에 대한 개념적인 예시인데요.React 컴포넌트 자체도 고유한 상태를 가지며, 종종 props를 통해 자식 컴포넌트에게 상태를 전달하기도 합니다.

이번 포스트에서는 프론트엔드에서 관리되는 상태, 즉 '클라이언트 상태'를 관리하는 일반적인 방법들을 살펴보겠습니다.

언제 어떤 패턴을 사용해야 하는지, 그리고 몇 가지 예시 코드와 함께 자세히 알아보겠습니다.

서버 상태나 비동기 상태 관리는 후속 포스트에서 다룰 예정이었지만, 이 글의 마지막 부분에서 중요한 개념을 짚고 넘어가겠습니다.

## 1부 기본기 다지기

가장 기본적인 상태 관리 도구는 역시 React에 내장된 훅(hook)입니다.

### 가장 기본적인 원시 값 관리 useState

상태 관리를 시작하기 위한 가장 간단한 도구는 바로 `useState`입니다.

`useState`는 단일 값을 관리하는 React 훅으로, 현재 값과 그 값을 업데이트하는 함수를 배열 형태로 반환합니다.

`useState`는 상태가 최대 몇 개의 컴포넌트 내에서만 사용되는 단순한 경우에 빛을 발합니다.

Mantine의 메뉴 예시를 살펴보겠습니다.

```javascript
const Demo = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <button onClick={() => setOpened(true)}>메뉴 열기</button>
      <Menu opened={opened} onChange={setOpened}>
        {/* 메뉴 콘텐츠 */}
      </Menu>
    </>
  );
};
```

버튼을 클릭하면 `opened`가 `true`로 설정되고 메뉴가 열립니다.

이보다 더 쉬울 수는 없지만, 상황이 조금 더 복잡해지기 시작하면 어떨지 살펴보겠습니다.

### 복잡한 상태 업데이트와 useReducer

물론 불리언(boolean) 값만으로 애플리케이션을 만들 수는 없습니다.

분명 더 복잡한 상호작용과 이를 위한 복잡한 데이터 구조가 필요해질 겁니다.

복잡성을 한 단계 높여서, 우리가 부동산 앱의 주택 검색 필터를 만들고 있다고 상상해 보겠습니다.

이 전체 폼은 궁극적으로 백엔드에 전송될 하나의 쿼리(query) 객체를 생성하기 위해 설계되었습니다.

단순화된 쿼리 객체의 모습은 다음과 같을 겁니다.

```typescript
type Query = {
  zipCode?: string;
  minPrice?: number;
  maxPrice?: number;
  homeTypes?: string[];
  requiredFeatures: {
    hasFireplace?: boolean;
    hasWasherDryler?: boolean;
    // ... 등등
  };
  // ... 등등
};
```

이제 이 필드들을 각각 관리하는 여러 컴포넌트를 만들어야 합니다.

가장 순진한 접근 방식은 `useState`를 사용하는 것입니다.

```javascript
const HomeBuyingFilters = () => {
  const [query, setQuery] = useState(getDefaultFilterQuery());

  // TODO: 쿼리에 대한 데이터 가져오기

  return (
    <div>
      <ZipCodeFilter query={query} setQuery={setQuery} />
      <PriceFilter query={query} setQuery={setQuery} />
      <HomeTypesFilter query={query} setQuery={setQuery} />
      <RequiredFeaturesFilter query={query} setQuery={setQuery} />
      <ResetAllFiltersButton setQuery={setQuery} />
    </div>
  );
};
```

각 필터 컴포넌트는 `query` 객체에서 자신에게 필요한 부분을 가져와 `setQuery`로 원하는 변경을 가할 수 있습니다.

이 방식이 끔찍한 것은 아니지만, 각 컴포넌트가 필요하지도 않은 전체 `query` 객체를 전달받는 것은 조금 어색하게 느껴집니다.

더 나쁜 것은 디버깅이 고통스러워질 수 있다는 점입니다.

만약 '우편번호가 가끔 무작위로 초기화돼요' 같은 버그를 추적해야 한다면, 어디서부터 확인해야 할지 막막할 겁니다.

`setQuery`를 호출하는 모든 곳이 잠재적인 용의자이기 때문입니다.

그래서 우리는 각 상태 변경에 대한 전용 함수를 만드는 멋진 아이디어를 떠올립니다.

```javascript
const HomeBuyingFilters = () => {
  const [query, setQuery] = useState(getDefaultFilterQuery());

  const setZipCode = zipCode => {
    setQuery(currentQuery => ({ ...currentQuery, zipCode }));
  };

  const setMinPrice = minPrice => {
    setQuery(currentQuery => ({ ...currentQuery, minPrice }));
  };

  return (
    <div>
      <ZipCodeFilter zipCode={query.zipCode} setZipCode={setZipCode} />
      <PriceFilter
        minPrice={query.minPrice}
        maxPrice={query.maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      {/* ... 등등 */}
    </div>
  );
};
```

이 방식은 `zipCode`에 대한 모든 변경이 `HomeBuyingFilters` 컴포넌트 내에 정의된 함수에 포함되어 있어 추적이 훨씬 쉬워진다는 장점이 있습니다.

`ZipCodeFilter` 컴포넌트도 이제 전체 `query` 객체 대신 `zipCode`와 `setZipCode`만 알면 됩니다.

하지만 해결하면 좋을 두 가지 단점이 여전히 남아있습니다.

하나는 상태 업데이트 로직을 특정 컴포넌트 안에 모두 몰아넣는 것이 어색하다는 점이고, 다른 하나는 새로운 업데이트 함수를 만들 때마다 필요한 컴포넌트에 prop을 계속 연결해줘야 한다는 점입니다.

바로 이 지점에서 `useReducer`가 유용하게 사용될 수 있습니다.

### useReducer 예제

`useReducer`는 크게 세 가지 요소로 생각할 수 있습니다.

첫째는 '상태(state)'입니다.

우리 예시에서는 `Query` 타입이 해당됩니다.

둘째는 '액션(action)'입니다.

우리 예시에서는 `setZipCode`나 `setMinPrice` 같은 '상태에 영향을 줄 수 있는 행위'를 의미합니다.

셋째는 '리듀서(reducer)'입니다.

이는 상태와 액션을 입력받아 업데이트된 새로운 상태를 반환하는 순수 함수입니다.

위 예시를 `useReducer`를 사용해 다시 작성해 보겠습니다.

```typescript
// queryState.ts

// 액션 타입을 enum으로 관리하면 편리합니다.
export enum QueryActionType {
  SET_ZIP_CODE = "SET_ZIP_CODE",
  SET_MIN_PRICE = "SET_MIN_PRICE",
  // 등등
}

// 액션은 상태 변경에 대한 '설명'입니다. 타입 외에 데이터도 필요합니다.
export type QueryAction =
  | {
      type: QueryActionType.SET_ZIP_CODE;
      payload: string;
    }
  | {
      type: QueryActionType.SET_MIN_PRICE;
      payload: number | undefined;
    };

// 리듀서는 액션을 적용한 후의 최신 상태를 반환합니다.
// 반드시 새로운 객체를 생성해야 하며, 기존 상태(query)를 직접 수정해서는 안 됩니다.
export function queryStateReducer(query: Query, action: QueryAction): Query {
  switch (action.type) {
    case QueryActionType.SET_ZIP_CODE:
      return { ...query, zipCode: action.payload };
    case QueryActionType.SET_MIN_PRICE:
      return { ...query, minPrice: action.payload };
    // 등등
    default:
      return query;
  }
}
```

이제 이 로직을 `useReducer`로 필터 컴포넌트에 연결할 수 있습니다.

```javascript
const HomeBuyingFilters = () => {
  const [query, dispatch] = useReducer(
    queryStateReducer,
    getDefaultFilterQuery()
  );

  return (
    <div>
      <ZipCodeFilter zipCode={query.zipCode} dispatch={dispatch} />
      <PriceFilter
        minPrice={query.minPrice}
        maxPrice={query.maxPrice}
        dispatch={dispatch}
      />
      {/* 등등 */}
    </div>
  );
};
```

마지막으로, 각 자식 컴포넌트에서 `dispatch` 함수를 호출합니다.

```javascript
const ZipCodeFilter = ({ zipCode, dispatch }) => {
  const setZipCode = newZipCode => {
    // dispatch는 우리가 정의한 '액션' 객체를 인자로 받습니다.
    // 이 액션은 리듀서에 정의된 로직에 따라 상태를 자동으로 업데이트합니다.
    dispatch({
      type: QueryActionType.SET_ZIP_CODE,
      payload: newZipCode,
    });
  };

  // 나머지 로직
};
```

이 구조의 멋진 점은 `ZipCodeFilter`가 '나는 SET_ZIP_CODE 액션을 발생시킨다'라고 명시적으로 선언한다는 것입니다.

만약 `CLEAR_ZIP_CODE`라는 새로운 액션을 추가하고 싶다면, 컴포넌트의 props를 변경할 필요가 없습니다.

그저 새로운 액션 타입을 추가하고, 리듀서에 해당 액션이 상태를 어떻게 변경하는지 정의하기만 하면 됩니다.

그러면 어떤 컴포넌트에서든 `CLEAR_ZIP_CODE` 액션을 발생시킬 수 있습니다.

`useReducer`는 액션 하나가 상태에 복잡한 연산을 수행해야 할 때 특히 빛을 발합니다.

컴포넌트는 상태 업데이트 로직 자체를 신경 쓸 필요 없이, 그저 액션을 발생시키고 업데이트된 상태를 전달받아 렌더링하기만 하면 됩니다.

이러한 '관심사의 분리'는 리듀서 함수를 UI 렌더링 없이 독립적으로 테스트할 수 있다는 부가적인 장점도 가져옵니다.

물론 `dispatch` 함수를 모든 컴포넌트에 계속 전달하는 것은 다소 번거로울 수 있습니다.

여러 계층에 걸쳐 상태에 접근해야 하는 경우를 어떻게 다룰지는 '2부 전역 상태' 섹션에서 살펴보겠습니다.

### 잠깐 폼 상태 관리에 대하여

`useState`는 상태가 단일 컴포넌트에 존재할 때 훌륭하기 때문에, 폼(form)에 사용하고 싶은 유혹을 느낄 수 있습니다.

```javascript
export default function Form() {
  const [name, setName] = useState("Taylor");

  const handleSubmit = async e => {
    e.preventDefault();
    await updateUserInformation({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}
```

작은 폼의 경우, 이는 전적으로 합리적인 방식입니다.

하지만 위 예제는 API 호출 중 로딩 상태나 에러 처리 같은 중요한 기능들이 빠져 있어 지나치게 단순화되었습니다.

실용적인 폼은 유효성 검사, 제출 상태 관리, 수정되었지만 저장되지 않은 변경사항 추적 등 훨씬 많은 것을 처리해야 합니다.

이 모든 것을 여러 개의 `useState`로 직접 관리하는 대신, 'React Hook Form'이나 'Formik' 같은 폼 전문 라이브러리를 사용하는 것이 좋습니다.

이러한 라이브러리들은 우리가 작성해야 할 상용구 코드(boilerplate)의 양을 크게 줄여줍니다.

## 2부 전역 상태 관리

폼이나 메뉴도 중요하지만, 애플리케이션 전반에 걸친 다크 모드 설정이나, 여러 계층으로 깊게 중첩된 컴포넌트 트리의 최상단 상태를 맨 아래 자식 컴포넌트가 수정해야 하는 경우는 어떻게 해야 할까요?

이런 상황에서 `state={state} dispatch={dispatch}` 같은 props를 계속해서 내려주는 'prop drilling'은 금방 한계에 부딪힙니다.

애플리케이션의 여러 컴포넌트에서 접근해야 하는 상태를 다루는 몇 가지 패턴을 살펴보겠습니다.

### React의 내장 솔루션 useContext

Stripe의 테스트 모드 토글과 유사한 전역 '테스트 모드' 토글을 예로 들어 보겠습니다.

이 토글은 어떤 API 엔드포인트를 호출할지, 대시보드에 경고를 표시할지 등 애플리케이션의 모든 것에 영향을 미칩니다.

이것을 prop drilling으로 구현한다면 다음과 같은 모습이 될 겁니다.

```javascript
const App = () => {
  const [testMode, setTestMode] = useState(getDefaultTestMode());

  return (
    <div>
      <TestModeToggle testMode={testMode} setTestMode={setTestMode} />
      <SomeComponent testMode={testMode} />
      <AnotherComponent testMode={testMode} />
    </div>
  );
};
```

테스트 모드 활성화 여부를 알아야 하는 모든 컴포넌트에 `testMode` prop을 전달해야 하므로 코드가 금방 지저분해지는 것을 볼 수 있습니다.

이상적인 세계에서는 컴포넌트가 그저 훅을 호출하기만 하면 됩니다.

```javascript
const SomeComponent = () => {
  const { testMode } = useTestMode();
  // ... 등등
};

const TestModeToggle = () => {
  const { testMode, setTestMode } = useTestMode();
  // ... 등등
};
```

다행히도, 이는 React Context를 사용하면 완벽하게 가능합니다.

### React Context, Provider, 그리고 커스텀 훅 만들기

React Context는 특정 상태를 그 아래의 모든 React 컴포넌트 트리에서 사용할 수 있게 해줍니다.

애플리케이션 최상단에 Context를 위치시키면, 앱의 모든 컴포넌트가 그 안의 상태에 접근할 수 있습니다.

테스트 모드 예제를 위해, `createContext`를 호출하여 Context를 생성하고 관리할 상태의 타입을 제공해야 합니다.

```typescript
// TestModeContext.tsx
import React, { createContext, useState, useContext } from 'react';

type TestModeState = {
    testMode: boolean;
    setTestMode: (testMode: boolean) => void;
}

const TestModeContext = createContext<TestModeState | undefined>(undefined);

export const TestModeProvider = ({ children }: { children: React.ReactNode }) => {
    // 이 Context는 사실 내부적으로 useState로 동작합니다.
    const [testMode, setTestMode] = useState(false);

    return (
        <TestModeContext.Provider value={{ testMode, setTestMode }}>
            {children}
        </TestModeContext.Provider>
    );
}

export const useTestMode = () => {
    const context = useContext(TestModeContext);
    // context가 undefined라면 Provider 외부에서 훅을 사용한 것입니다.
    if (!context) {
        throw new Error('useTestMode는 TestModeProvider 안에서 사용해야 합니다.');
    }
    return context;
}
```

이제 모든 준비가 끝났으니, 애플리케이션 최상단에 `TestModeProvider`를 위치시키기만 하면 됩니다.

```javascript
// _app.jsx
function MyApp({ Component, pageProps }) {
  return (
    <TestModeProvider>
      <Component {...pageProps} />
    </TestModeProvider>
  );
}
```

이제 어떤 컴포넌트에서든 `useTestMode` 훅을 사용하여 전역 상태에 접근하고 수정할 수 있습니다.

### Context와 다른 상태 관리 패턴의 결합

잠깐만 멈추고 생각해보면, 우리는 `useState`의 전역 버전을 만든 것에 불과합니다.

실제로 우리 `TestModeContext`는 `testMode`라는 불리언 값을 관리하기 위해 내부적으로 `useState`를 사용하고 있습니다.이것은 매우 중요한 포인트입니다.

Context는 상태를 '전역적'으로 만들어주는 통로일 뿐, 그 안에서 상태를 관리하는 방식은 우리가 이전에 사용했던 모든 패턴과 동일하게 적용할 수 있습니다.

앞서 살펴본 필터 예제를 다시 떠올려보십시오.

우리는 `dispatch`와 `state`를 모든 컴포넌트에 넘겨줘야 하는 번거로움이 있었습니다.

하지만 만약 이 값들을 저장하는 `FilterContext`를 만들고, 이들을 노출하는 커스텀 훅을 만든다면, prop drilling을 피하고 훨씬 나은 개발자 경험을 만들 수 있습니다.

```javascript
const ZipCodeFilter = () => {
  // 옵션 A:
  // 리듀서의 결과물을 전역으로 노출하는 훅을 사용합니다.
  const { state, dispatch } = useFilters();

  // 옵션 B:
  // 더 구체적인 목적을 가진 훅을 제공합니다.
  // 내부적으로는 여전히 dispatch를 호출하며,
  // 상태는 중앙 리듀서에서 관리됩니다.
  const { zipCode, setZipCode, clearZipCode } = useZipCodeFilters();

  // ...
};
```

이처럼 `useReducer`의 강력한 상태 관리 로직과 `useContext`의 전역 주입 능력을 결합하면, 복잡하면서도 규모가 큰 상태를 매우 체계적으로 관리할 수 있습니다.

### 더 나은 대안 Zustand

하지만 Context API에도 몇 가지 불편한 점이 있습니다.

Context의 `value`가 바뀔 때마다 해당 Context를 구독하는 모든 컴포넌트가 불필요하게 리렌더링될 수 있으며, Context를 여러 개 만들면 Provider 중첩이 깊어지는 단점이 있습니다.

`Zustand`는 전역 상태 관리를 더 쉽게 만들어주는 라이브러리입니다.

위의 테스트 모드 예제를 `Zustand`로 구현하면 다음과 같습니다.

```javascript
import { create } from "zustand";

const useTestModeStore = create(set => ({
  testMode: false,
  toggleTestMode: () => set(state => ({ testMode: !state.testMode })),
}));
```

이게 전부입니다.Provider로 앱을 감쌀 필요도 없습니다.

어떤 컴포넌트에서든 `useTestModeStore` 훅을 바로 가져와 사용할 수 있습니다.

`Zustand`는 상태 조각(slice)을 구독하여 해당 데이터가 변경될 때만 리렌더링을 트리거하므로 성능에도 이점이 있습니다.

## 3부 상태 영속화시키기

지금까지의 모든 예제에서 우리의 상태는 메모리에만 저장되었습니다.

페이지를 새로고침하면 메뉴는 닫힌 상태로 초기화될 겁니다.

메뉴는 괜찮지만, 여러 단계로 이루어진 입사 지원서 폼을 작성하다가 실수로 새로고침하여 모든 진행 상황을 잃는다면 정말 끔찍할 겁니다.

### 새로고침에도 상태 유지하기

결국 상태를 다른 곳에 저장해야 한다는 결론에 이릅니다.

일반적인 옵션 중 하나는 `localStorage`입니다.

```javascript
localStorage.setItem("name", "Andrew");
localStorage.getItem("name"); // "Andrew"를 반환
// 페이지 새로고침
localStorage.getItem("name"); // 여전히 "Andrew"를 반환
```

`localStorage`에 백업되는 커스텀 훅 `useLocalStorage`를 구현하면 상태 영속화를 간단하게 처리할 수 있습니다.

```javascript
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

이 훅을 사용하면 `useState`와 똑같이 사용하면서도 상태가 새로고침 후에도 유지됩니다.

다만, `localStorage`에는 민감한 정보를 저장하지 않도록 주의해야 합니다.

### URL 쿼리 파라미터로 상태 공유하기

페이지네이션이 있는 테이블을 예로 들어보겠습니다.

`useLocalStorage`를 사용하면 새로고침 시 상태는 유지되지만, 다른 탭에서 같은 페이지를 열면 동일한 페이지 번호와 검색어가 나타납니다.

또한, 동료에게 현재 내가 보고 있는 흥미로운 필터 결과를 공유할 방법이 없습니다.

이때 상태를 URL 쿼리 파라미터에 저장하는 방법을 사용할 수 있습니다.

`https://example.com/table?page=2&query=react`

이 방식은 새로고침에도 상태를 유지하고, 사용자가 필터링된 뷰에 대한 링크를 다른 사람과 공유할 수 있게 해줍니다.

Next.js와 같은 프레임워크는 `useRouter` 훅을 통해 쿼리 파라미터를 쉽게 읽고 쓸 수 있는 기능을 제공합니다.

## 4부 서버 상태는 이야기가 다릅니다

지금까지 우리는 클라이언트 상태, 즉 프론트엔드에 의해 '소유된' 상태에 대해 이야기했습니다.

하지만 현실 세계의 많은 상태는 사실 서버 데이터베이스에 그 원본이 존재합니다.

서버에서 가져온 데이터, 예를 들어 사용자 프로필이나 상품 목록 등은 엄밀히 말해 프론트엔드 상태가 아니라 '서버 상태의 캐시(cache)'입니다.

이러한 비동기 데이터를 `useState`와 `useEffect`로 관리하는 것은 로딩, 에러, 캐싱, 데이터 동기화 등 수많은 문제를 야기합니다.

이러한 문제를 해결하기 위해 'TanStack Query(구 React Query)'나 'SWR'과 같은 데이터 페칭(fetching) 라이브러리를 사용하는 것이 현대 React 개발의 표준입니다.

이 라이브러리들은 서버 상태를 가져오고, 캐싱하고, 백그라운드에서 자동으로 업데이트하는 복잡한 로직을 대신 처리해주어 개발자가 비즈니스 로직에만 집중할 수 있게 해줍니다.

클라이언트 상태와 서버 상태를 구분하고, 서버 상태 관리는 `TanStack Query`와 같은 전문 라이브러리에 맡기는 것이 매우 중요합니다.

## 어떤 도구를 선택해야 할까요

React 애플리케이션에서 상태 관리는 필수적이지만, 올바른 도구를 선택하는 것이 중요합니다.

다음은 우리가 논의한 기법들을 바탕으로 한 의사결정 가이드입니다.

먼저 `useState`로 시작하십시오.하나의 컴포넌트 내에서 관리되는 간단한 상태에 가장 적합합니다.

상태 업데이트 로직이 복잡해지거나 여러 하위 상태가 서로 의존하게 되면 `useReducer`로 리팩토링하는 것을 고려하십시오.

상태를 여러 깊이의 컴포넌트와 공유해야 하지만 prop drilling을 피하고 싶다면 `useContext`를 사용하십시오.

`useReducer`로 관리되는 복잡한 상태를 전역으로 다루고 싶다면 `useContext`와 `useReducer`를 조합하는 강력한 패턴을 활용하십시오.

`useContext`의 잦은 리렌더링이 성능 문제를 일으키거나 Provider 중첩을 피하고 싶다면 `Zustand`와 같은 더 가볍고 유연한 전역 상태 라이브러리가 훌륭한 대안입니다.

마지막으로, 관리하려는 상태가 서버에서 온 데이터라면 주저하지 말고 `TanStack Query`나 `SWR`을 사용하십시오.

이는 '선택'이 아니라 '필수'에 가깝습니다.

이러한 상태 관리 기법들을 이해하고 애플리케이션의 필요에 따라 적절한 것을 선택하면 확장 가능하고 유지보수하기 쉬운 React 애플리케이션을 구축하는 데 큰 도움이 될 것입니다.
