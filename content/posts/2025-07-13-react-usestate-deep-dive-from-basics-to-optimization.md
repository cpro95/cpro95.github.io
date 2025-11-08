---
title: React useState 완전 정복 - 비동기 동작부터 최적화까지 (초보자가 겪는 모든 함정)
date: 2025-07-13T11:48:08+09:00
draft: false
tags:
  - React
  - useState
  - React 훅
  - 상태 관리
  - 비동기
  - 불변성
  - 성능 최적화
description: React의 가장 기본 훅, useState의 모든 것을 알아봅니다. 비동기 업데이트의 함정, 게으른 초기화, 불변성, 클로저 문제부터 useReducer와의 비교, 그리고 React.memo, useCallback, useMemo를 사용한 성능 최적화까지 깊이 있게 탐구합니다.
---
![](https://blogger.googleusercontent.com/img/a/AVvXsEgr_P_vbKgrljls-Gm7_Q94A5hP7OGGDjiZ4NqZq0cUJXCAeOxSriFZ63Fo7ho_lEsmt12FiMbXbcDJham42JrUyfgIZh1Wjqm5xJzzk3myWV9Lzbqupz9NkwIb9NtsomHN7FiIGPDnwgrqDWOtBu86bPddi0h14xq8FI5lK3012XK6vxkGx3yQWs2xW7w=s16000)

우리는 React의 내부 메커니즘, 모범 사례, 디자인 패턴, 그리고 고급 개념들을 탐구합니다.

이 글들은 기본을 넘어 React가 내부적으로 어떻게 작동하는지 진정으로 이해하고자 하는 React 개발자들을 위해 작성되었습니다.

## 상태(State)란 무엇인가?

'상태(State)'는 React의 가장 핵심적인 개념 중 하나입니다.

이는 **컴포넌트 내에서 시간이 지남에 따라 변할 수 있는 데이터**를 나타냅니다.

부모 컴포넌트로부터 전달받아 자식 컴포넌트 입장에서는 변경할 수 없는 'props'와는 달리, 상태는 컴포넌트 내부에 존재하며 수정될 수 있습니다.

`useState` 훅은 현대 React의 함수형 컴포넌트에서 이러한 지역 상태를 관리하는 주요 해결책이며, React 애플리케이션의 모든 상호작용의 기초를 형성합니다.

## `useState` 훅의 기본

`useState` 훅은 함수형 컴포넌트에 지역 상태를 추가할 수 있게 해주는 함수입니다.

간단한 예시를 통해 어떻게 작동하는지 살펴보겠습니다.

```jsx
import React, { useState } from "react";

function Counter() {
  // "count"라는 상태 변수를 선언하고 0으로 초기화합니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
```



이 예시에서:

- `useState(0)`는 상태 값을 `0`으로 초기화합니다.
- 이 함수는 두 개의 요소를 가진 배열을 반환하며, 우리는 이를 '배열 구조 분해 할당'으로 받습니다.
  - `count`: 현재 상태 값입니다.
  - `setCount`: 이 상태를 업데이트하는 함수입니다.

`setCount`가 호출될 때마다, React는 `count`의 새로운 값을 가지고 컴포넌트를 '리렌더링(re-render)'합니다.

## `useState`의 비동기적 본질

`useState`의 중요하면서도 종종 오해받는 측면은 바로 '비동기적' 행동입니다.

여러분이 상태 업데이트 함수(setter 함수)를 호출할 때, React는 즉시 상태 값을 변경하지 않습니다.

대신, 이 업데이트를 '스케줄링'합니다.

이는 마치 "나중에 이 값으로 상태를 업데이트해줘"라고 React에게 요청하는 것과 같습니다.

이러한 동작은 예상치 못한 버그를 유발할 수 있습니다.

```jsx
function AsynchronousExample() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // 이 라인은 'count'를 즉시 수정하지 않습니다. 업데이트를 예약할 뿐입니다.
    setCount(count + 1);

    // 따라서 이 시점의 'count'는 여전히 이전 값(렌더링 시점의 값)입니다.
    console.log(count); // 새로운 값이 아닌, 이전 'count' 값을 보여줍니다.
  };

  return <button onClick={handleClick}>Increment ({count})</button>;
}
```



이 문제를 해결하기 위해, `useState`는 '함수형 업데이트(functional update)'라는 대안을 제공합니다.

상태 업데이트 함수에 값을 직접 전달하는 대신, 함수를 전달하는 것입니다.

```jsx
function FunctionalUpdateExample() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // 이전 상태(previous state)를 인자로 받는 함수를 사용합니다.
    setCount(prevCount => prevCount + 1);

    // 만약 여러 업데이트를 수행해야 한다면
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    // 이 코드는 'count'를 3만큼 증가시킵니다.
  };

  return <button onClick={handleClick}>Multiple increment ({count})</button>;
}
```



이 함수형 업데이트는 React가 아직 컴포넌트를 리렌더링하지 않았더라도, 항상 가장 최신의 상태 값을 가지고 작업할 것을 보장해 줍니다.

여러 업데이트를 하나의 이벤트 핸들러에서 처리할 때, 항상 함수형 업데이트를 사용하는 것이 안전합니다.

## 게으른 초기화 (Lazy Initialization)

`useState`를 사용할 때, 매개변수로 전달된 초기값이 어떻게 처리되는지 이해하는 것이 중요합니다.

값을 직접 전달하는 것과 초기화 함수를 전달하는 것 사이에는 결정적인 차이가 있습니다.

### 문제점: 매 렌더링마다 재계산

`useState`에 값이나 표현식을 직접 전달하면, 이 표현식은 컴포넌트가 렌더링될 때마다 매번 평가됩니다.

```jsx
function ExpensiveInitExample() {
  // 문제점: complexCalculation()이 모든 렌더링마다 실행됩니다.
  const [value, setValue] = useState(complexCalculation());

  console.log("Component rendered");

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
}
```



이 예제에서, 우리는 오직 초기값에만 관심이 있음에도 불구하고, `complexCalculation()` 함수는 컴포넌트가 리렌더링될 때마다 불필요하게 호출됩니다.

만약 이 함수가 리소스를 많이 소모한다면 성능에 심각한 영향을 미칠 수 있습니다.

### 해결책: 초기화 함수

이 문제를 해결하기 위해, React는 `useState`에 초기화 함수를 전달하는 것을 허용합니다.

이 함수는 오직 **첫 번째 렌더링 동안 단 한 번만 호출됩니다.**

```jsx
function LazyInitExample() {
  // 올바른 방법: 이 함수는 오직 첫 렌더링 시에만 한 번 호출됩니다.
  const [value, setValue] = useState(() => {
    console.log("비싼 계산 수행 중...");
    return complexCalculation();
  });

  console.log("Component rendered");

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
}
```



이 버전에서는 `complexCalculation`이 오직 컴포넌트의 초기 마운트 시에만 한 번 실행됩니다.

React는 단순히 함수가 반환한 값을 초기화에 사용하고, 이후 렌더링에서는 이 함수를 무시합니다.

'게으른 초기화(Lazy initialization)'는 다음과 같은 상황에서 특히 유용합니다.

- 비싼 계산 (대용량 데이터 처리)
- `localStorage`나 Web Storage API에서 데이터 읽기
- 복잡한 props 분석 또는 변환

## 복잡한 객체 관리: 불변성의 원칙

상태가 객체나 배열일 때, '불변성(immutability)' 원칙을 존중하는 것이 매우 중요합니다.

React는 객체의 참조를 비교하여 상태가 변경되었는지 판단합니다.

만약 상태 객체를 직접 수정하면, React는 변경을 감지하지 못하고 컴포넌트를 리렌더링하지 않을 것입니다.

```jsx
function ObjectStateExample() {
  const [user, setUser] = useState({
    name: "Alice",
    age: 25,
    preferences: { theme: "dark" },
  });

  const updateTheme = newTheme => {
    // 잘못된 방법 - 상태를 직접 수정
    // user.preferences.theme = newTheme;
    // setUser(user); // 객체 참조가 동일하므로 리렌더링을 유발하지 않음

    // 올바른 방법 - 새로운 객체 생성
    setUser({
      ...user, // 기존 user 객체의 속성을 복사
      preferences: {
        ...user.preferences, // 중첩된 객체도 복사
        theme: newTheme, // 원하는 속성만 변경
      },
    });
  };

  // ...
}
```



## `useState` vs `useReducer`

상태 업데이트 로직이 복잡해진다면, `useState` 대신 `useReducer`를 고려하는 것이 좋습니다.

`useReducer`는 상태 업데이트 로직을 컴포넌트 외부로 분리하고, 여러 다른 종류의 액션을 중앙에서 관리할 수 있게 해줍니다.

일반적으로 다음과 같은 경우에 `useReducer`가 더 선호됩니다.

- 상태들이 서로 의존적일 때
- 업데이트 로직이 복잡할 때 (예: 여러 필드를 가진 폼)
- 상태를 수정하는 액션의 종류가 많을 때

## 성능 최적화: 리렌더링 제어하기

상태 업데이트는 리렌더링을 유발하며, 이는 성능에 영향을 줄 수 있습니다.

React는 선별적으로 사용할 수 있는 몇 가지 최적화 기법을 제공합니다.

- `React.memo`: props가 변경되지 않았다면 컴포넌트의 리렌더링을 방지하는 고차 컴포넌트입니다.
- `useCallback`: 렌더링 사이에 함수를 기억(메모이제이션)합니다.
  `React.memo`로 감싸진 자식 컴포넌트에 함수를 prop으로 전달할 때 특히 유용합니다.
- `useMemo`: 렌더링 사이에 계산 결과를 기억합니다.
  매 렌더링마다 비싼 값을 재계산하는 것을 피하기 위해 사용됩니다.

### React 19와 컴파일러에 대한 참고 사항

React 19에서 도입될 'React 컴파일러'를 사용하면, 이러한 수동 최적화 중 일부는 이전보다 덜 필요하게 됩니다.

컴파일러는 `React.memo`, `useMemo`, `useCallback`이 필요했을 많은 경우를 자동으로 감지하고 최적화할 수 있습니다.

하지만 이러한 API들은 여전히 컴파일러가 자동으로 최적화할 수 없는 복잡한 경우에 유용하게 남을 것입니다.

일반적인 규칙은, 이러한 최적화 없이 시작하고, 특정한 성능 문제를 식별했을 때만 추가하는 것입니다.

## 결론

`useState` 훅은 함수형 컴포넌트가 자신만의 상태를 유지하고 관리할 수 있게 해주는, React의 가장 기본적인 도구 중 하나입니다.

그 명백한 단순함 뒤에는 비동기적 행동과 컴포넌트의 렌더링 주기에 대한 영향과 같은 중요한 미묘함이 숨어 있습니다.

`useState`를 마스터하려면 다음을 이해해야 합니다.

- 비동기적 행동과 함수형 업데이트의 중요성
- 복잡한 객체를 다룰 때의 불변성
- 클로저 및 업데이트 배치와 관련된 함정
- 상태를 여러 변수로 분리할 때와 단일 객체를 사용할 때의 장단점
- 메모이제이션을 통한 성능 최적화 방법

`useState`에 대한 깊은 이해는 `useReducer`, `useContext`와 같은 더 고급 훅으로 나아가거나 자신만의 커스텀 훅을 만드는 데 필요한 단단한 기반을 제공할 것입니다.
