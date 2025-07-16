---
title: React useEffect 완전 정복 - 동기화 관점으로 레벨업하기
pubDatetime: 2025-07-13T09:48:08+09:00
postSlug: 2025-07-13-mastering-react-useeffect-the-synchronization-mindset
featured: false
draft: false
tags:
  - React
  - useEffect
  - React 훅
  - 부수 효과
  - 동기화
  - 상태 관리
  - 성능 최적화
description: useEffect는 단순한 생명주기 훅이 아닙니다. React의 상태를 외부 세계와 동기화하는 관점에서 useEffect의 실행 주기, 의존성 배열의 함정, 클린업 함수의 정확한 타이밍, 그리고 흔한 오용 사례까지 깊이 있게 탐구합니다.
---

우리는 React의 내부 메커니즘, 모범 사례, 디자인 패턴, 그리고 고급 개념들을 탐구합니다.<br /><br />
이 글들은 기본을 넘어 React가 내부적으로 어떻게 작동하는지 진정으로 이해하고자 하는 React 개발자들을 위해 작성되었습니다.<br /><br />

## 서론: `useEffect`의 본질을 꿰뚫기<br />

`useEffect` 훅은 현대 React의 근본적인 기둥입니다.<br /><br />
단순한 함수 그 이상으로, 컴포넌트가 변화에 반응하고 비동기 작업을 수행하면서도 UI의 일관성을 유지할 수 있게 해줍니다.<br /><br />
하지만 그 명백한 단순함 뒤에는 미묘한 에러를 유발하고 애플리케이션의 성능과 유지보수성에 영향을 미칠 수 있는 복잡성이 숨어 있습니다.<br /><br />
이번 'Level Up React' 시리즈 글에서는 `useEffect`의 내부 메커니즘, 종종 오해받는 미묘함, 그리고 숙련된 개발자조차도 기다리는 흔한 함정들을 깊이 있게 탐구해 보겠습니다.<br /><br />
올바른 사용법이 어떻게 여러분의 코드를 더 예측 가능하고 성능 좋게 변화시킬 수 있는지 확인해 보겠습니다.<br /><br />

## `useEffect`의 기본<br />

### `useEffect`는 왜 존재할까?<br />

React는 함수형 컴포넌트에서 '부수 효과(side effects)'를 효율적으로 관리하기 위해 `useEffect`를 만들었습니다.<br /><br />
이것이 도입되기 전에는, 이러한 작업들은 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`와 같은 클래스 컴포넌트의 생명주기 메서드에 예약되어 있었습니다.<br /><br />
'부수 효과'란 React 컴포넌트 외부의 무언가를 수정하는 모든 작업을 의미합니다.<br /><br />
예를 들면 다음과 같습니다.<br /><br />

- API 요청 보내기<br />
- DOM을 직접 조작하기 (예: 문서 제목 변경)<br />
- 이벤트 리스너 추가 또는 제거하기<br />
- 타이머 설정하기 (`setTimeout`, `setInterval`)<br />

가장 중요한 개념은 `useEffect`를 '무언가를 하기 위한' 도구가 아니라, **'React의 상태를 외부 시스템과 동기화(synchronize)하기 위한' 도구**로 바라보는 것입니다.<br /><br />

```jsx
// 부수 효과의 예: 페이지 제목 수정하기
useEffect(() => {
  // 'username'이라는 React 상태를 브라우저의 'document.title'이라는 외부 시스템과 동기화합니다.
  document.title = `Profile of ${username}`;
}, [username]);
```

<br /><br />

이 예제에서 문서 제목을 수정하는 것은 React 컴포넌트 외부의 환경에 영향을 미치기 때문에 부수 효과입니다.<br /><br />
`useEffect` 훅은 우리가 이 작업을 언제 발생해야 하는지 명시적으로 선언할 수 있게 해줍니다.<br /><br />

### `useEffect`의 해부학<br />

`useEffect` 훅은 두 개의 인자를 받습니다.<br /><br />

```javascript
useEffect(
  () => {
    // 이펙트 본문 (실행할 코드)
    return () => {
      // 클린업(정리) 함수 (선택 사항)
    };
  },
  [
    /* 의존성 배열 */
  ]
);
```

<br /><br />

- '첫 번째 인자 (이펙트 함수)': 실행할 코드를 담고 있는 함수입니다.<br /><br />
  이 함수는 '클린업 함수'를 반환할 수 있는데, 이 클린업 함수는 다음 이펙트가 실행되기 전이나 컴포넌트가 언마운트될 때 호출됩니다.<br /><br />
- '두 번째 인자 (의존성 배열)': 이펙트가 언제 실행되어야 하는지를 결정합니다.<br /><br />
  React는 렌더링 사이에 이 배열의 값들을 비교하여 이펙트를 다시 실행할지 여부를 결정합니다.<br /><br />

### `useEffect`의 실행 주기<br />

`useEffect`는 언제 실행될까요?<br /><br />
일반적인 믿음과는 달리, `useEffect`는 컴포넌트의 렌더링 도중에 실행되지 않고, **React가 DOM을 업데이트한 후에 실행됩니다.**<br /><br />
정확한 작업 순서는 다음과 같습니다.<br /><br />

1.  React가 컴포넌트 본문을 실행하고 표시할 JSX를 계산합니다.<br /><br />
2.  React가 이 JSX를 반영하도록 DOM을 업데이트합니다.<br /><br />
3.  React가 `useEffect`로 정의된 이펙트들을 실행합니다.<br /><br />

이 순서는 이펙트 동작을 이해하는 데 매우 중요합니다.<br /><br />

## 의존성 배열로 실행 제어하기<br />

의존성 배열은 이펙트가 언제 실행되어야 하는지를 제어하는 핵심 메커니즘입니다.<br /><br />
React는 `Object.is()` 비교 알고리즘을 사용하여 의존성이 변경되었는지 판단합니다.<br /><br />

- '의존성 배열 없음': 이펙트가 '모든 렌더링 후에' 실행됩니다.<br /><br />
  이는 불필요한 실행과 성능 문제를 유발할 수 있으므로 거의 사용되지 않는 구성입니다.<br /><br />
- '빈 의존성 배열 `[]`': 이펙트가 '첫 렌더링 후에만' 한 번 실행됩니다.<br /><br />
  WebSocket 연결 설정과 같은 일회성 초기화에 유용합니다.<br /><br />
- '의존성이 있는 배열 `[count]`': 이펙트가 첫 렌더링 후, 그리고 의존성(`count`)이 변경될 때마다 실행됩니다.<br /><br />

### 클린업 메커니즘<br />

클린업 함수는 `useEffect`의 종종 간과되는 중요한 측면입니다.<br /><br />
이펙트가 다시 실행되거나 컴포넌트가 언마운트되기 전에 리소스를 정리하거나 구독을 취소할 수 있게 해줍니다.<br /><br />

```jsx
useEffect(() => {
  // 인터벌 생성
  const intervalId = setInterval(() => {
    console.log("Tick");
  }, 1000);

  // 클린업 함수
  return () => {
    console.log("인터벌 정리 중");
    clearInterval(intervalId);
  };
}, []);
```

<br /><br />

이 예제에서 클린업 함수는 컴포넌트가 언마운트될 때 인터벌이 제대로 제거되도록 보장하여, 메모리 누수를 방지합니다.<br /><br />

## 흔한 함정과 피하는 방법<br />

### 무한 루프<br />

가장 빈번한 문제 중 하나는 의도치 않은 무한 루프 생성입니다.<br /><br />
이 문제는 이펙트의 의존성인 상태를 업데이트하는 데이터 페칭 시나리오에서 자주 발생합니다.<br /><br />

```jsx
// ❌ 실제 사례에서 무한 루프 생성
function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications().then(newNotifications => {
      // 이 업데이트는 새로운 렌더링을 유발합니다.
      setNotifications([...notifications, ...newNotifications]);
    });
  }, [notifications]); // notifications가 의존성입니다.
}
```

<br /><br />

이 예제에서는 `fetchNotifications()`가 데이터를 반환할 때마다 `notifications` 상태를 업데이트합니다.<br /><br />
`notifications`가 우리 이펙트의 의존성이므로, 이는 이펙트의 새로운 실행을 유발하여 API 요청의 무한 루프를 만듭니다.<br /><br />

```jsx
// ✅ 해결책: 함수형 업데이터 사용
function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications().then(newNotifications => {
      // 이 형태의 setState는 현재 상태에 의존할 필요가 없습니다.
      setNotifications(prevNotifications => [
        ...prevNotifications,
        ...newNotifications,
      ]);
    });
  }, []); // 마운트 시 한 번만 실행
}
```

<br /><br />

### 누락되거나 불필요한 의존성<br />

또 다른 흔한 함정은 필요한 의존성을 생략하거나 불필요한 의존성을 포함하는 것입니다.<br /><br />

```jsx
// ❌ 누락된 의존성
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(data => setUser(data));
  }, []); // userId가 의존성에서 빠져 있습니다.
}
```

<br /><br />

이 예제에서, `userId`가 변경되더라도 이펙트는 다시 실행되지 않습니다.<br /><br />
`eslint-plugin-react-hooks` 플러그인이 포함된 ESLint 도구는 이러한 문제를 자동으로 감지하는 데 매우 유용합니다.<br /><br />

### 객체와 함수를 의존성으로 사용하기<br />

렌더링 중에 생성된 객체와 함수는 각 렌더링마다 재생성되므로 새로운 값으로 간주되어 특별한 문제를 야기합니다.<br /><br />

```jsx
// ❌ 매 렌더링마다 재생성되는 객체
function SearchComponent({ term }) {
  // 이 객체는 매 렌더링마다 재생성됩니다.
  const options = { caseSensitive: false };

  useEffect(() => {
    performSearch(term, options);
  }, [term, options]); // options는 매 렌더링마다 변경됩니다.
}
```

<br /><br />

`term`이 변경되지 않았더라도 `options`가 재생성되어 이펙트가 매번 실행됩니다.<br /><br />
해결책은 `useMemo`나 `useCallback`을 사용하거나, 객체나 함수를 이펙트 내부로 옮기는 것입니다.<br /><br />

## `useEffect`를 사용하지 말아야 할 때<br />

React 공식 문서는 '아마 이펙트가 필요 없을지도 모릅니다(You Might Not Need an Effect)'라는 매우 유용한 가이드를 제공합니다.<br /><br />

- '파생된 값 계산하기': 기존 상태에서 파생된 값을 계산하기 위해 `useEffect`를 사용하는 것은 흔한 실수입니다.<br /><br />
  렌더링 중에 직접 계산하거나, 계산 비용이 비싸다면 `useMemo`를 사용하세요.<br /><br />
- '사용자 이벤트에 반응하기': 사용자 이벤트에 반응하기 위해 `useEffect`를 사용하는 것은 종종 복잡하고 유지보수하기 어려운 아키텍처로 이어집니다.<br /><br />
  이벤트 핸들러에서 직접 로직을 호출하는 것이 더 간단하고 직접적입니다.<br /><br />
- '상태 변수 초기화하기': `useEffect`를 사용하여 상태 변수를 초기화하는 것은 종종 불필요합니다.<br /><br />
  `useState`의 '게으른 초기화'를 사용하는 것이 더 간단하고 효율적입니다.<br /><br />

## `useEffect`의 올바른 사용 사례<br />

`useEffect`는 컴포넌트를 외부 시스템과 '동기화'할 때 이상적입니다.<br /><br />

- 외부 시스템과 동기화 (DOM, 서드파티 API 등)<br />
- 이벤트 구독 (키보드 단축키, `BroadcastChannel` 등)<br />
- 데이터 페칭<br /><br />

## 결론<br />

`useEffect` 훅은 올바르게 사용하기 위해 깊은 이해가 필요한 강력하지만 미묘한 도구입니다.<br /><br />
우리가 보았듯이, 이 훅은 React 컴포넌트를 외부 시스템과 동기화할 수 있게 해주지만, 과도하거나 잘못된 사용은 성능 및 유지보수 문제를 유발할 수 있습니다.<br /><br />
기억해야 할 핵심 사항은 다음과 같습니다.<br /><br />

- `useEffect`는 렌더링과 DOM 업데이트 후에 실행됩니다.<br /><br />
- 의존성 배열은 이펙트 실행 시점을 제어하며 엄격하게 유지되어야 합니다.<br /><br />
- 클린업 함수는 메모리 누수와 원치 않는 동작을 피하기 위해 필수적입니다.<br /><br />
- 많은 흔한 `useEffect` 사용 사례는 더 간단하고 직접적인 접근 방식으로 대체될 수 있습니다.<br /><br />

`useEffect`를 사용하는 데 있어 사려 깊은 접근 방식을 채택하고 그 대안을 앎으로써, 여러분은 더 예측 가능하고, 성능이 좋으며, 유지보수하기 쉬운 React 코드를 작성할 수 있습니다.<br /><br />

---
