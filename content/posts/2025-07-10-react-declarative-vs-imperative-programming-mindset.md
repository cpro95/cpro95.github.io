---
title: React 개발자 레벨업 - 명령형 vs 선언형, 당신은 어떻게 코딩하고 있나요?
date: 2025-07-10T11:48:28.564Z
draft: false
tags:
  - React
  - 선언형 프로그래밍
  - 명령형 프로그래밍
  - 리액트 사고방식
  - useState
  - useEffect
description: 더 나은 React 개발자가 되기 위한 필수 개념, 명령형과 선언형 프로그래밍을 알아봅니다. React가 왜 선언형 패러다임을 선택했는지, 그리고 언제 명령형 접근이 필요한지 useRef 예제와 함께 깊이 있게 탐구합니다.
---

![](https://blogger.googleusercontent.com/img/a/AVvXsEgr_P_vbKgrljls-Gm7_Q94A5hP7OGGDjiZ4NqZq0cUJXCAeOxSriFZ63Fo7ho_lEsmt12FiMbXbcDJham42JrUyfgIZh1Wjqm5xJzzk3myWV9Lzbqupz9NkwIb9NtsomHN7FiIGPDnwgrqDWOtBu86bPddi0h14xq8FI5lK3012XK6vxkGx3yQWs2xW7w=s16000)

더 나은 React 개발자가 되기 위해서는, 코드를 작성하는 두 가지 다른 방식을 대표하는 이 두 프로그래밍 패러다임을 이해하는 것이 필수적입니다.

React를 잘 다루는 것은 단순히 문법을 아는 것을 넘어, '생각하는 방식'을 바꾸는 것이기 때문입니다.

오늘은 이 두 패러다임이 무엇이며, React가 왜 그중 하나를 핵심 철학으로 삼았는지 알아보겠습니다.

## 1. 명령형 프로그래밍: '어떻게'에 집중하는 방식

'명령형(Imperative) 프로그래밍'은 **원하는 결과를 얻기 위해 필요한 행동들을 단계별로 상세하게 서술하는 방식**에 초점을 맞춥니다.

마치 요리를 처음 하는 사람에게 "1. 감자를 씻으세요. 2. 껍질을 벗기세요. 3. 2cm 크기로 자르세요..." 라고 하나하나 지시하는 것과 같습니다.

코드로 구체적인 예시를 살펴보겠습니다.

### 예시 1: 배열 필터링하고 변환하기

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const result = [];

// 우리는 각 단계를 직접 서술합니다.
for (let i = 0; i < numbers.length; i++) {
  // 1단계: 짝수인지 확인한다.
  if (numbers[i] % 2 === 0) {
    // 2단계: 2를 곱해서 결과 배열에 넣는다.
    result.push(numbers[i] * 2);
  }
}
// result = [4, 8, 12]
```



`for` 루프를 돌고, `if` 조건문으로 확인하고, `push`로 직접 배열을 조작하는 모든 과정, 즉 '어떻게' 할지에 대한 모든 세부 사항을 직접 지시하고 있습니다.

### 예시 2: 순수 JavaScript로 DOM 조작하기

이 패러다임은 jQuery나 순수 JavaScript로 UI를 만들 때 더욱 명확하게 드러납니다.

```javascript
// 1. 'ul' 요소를 만든다.
const list = document.createElement("ul");
const items = ["Apple", "Banana", "Orange"];

items.forEach(item => {
  // 2. 각 아이템에 대해 'li' 요소를 만든다.
  const li = document.createElement("li");
  // 3. 텍스트를 설정한다.
  li.textContent = item;
  // 4. 클래스 이름을 붙인다.
  li.className = "fruit-item";
  // 5. 'ul'에 'li'를 자식으로 추가한다.
  list.appendChild(li);
});

// 6. 마지막으로 body에 'ul'을 추가한다.
document.body.appendChild(list);
```

상태가 복잡해지면 이 모든 단계를 추적하고 관리하는 것은 금세 악몽이 됩니다.

특정 아이템을 삭제하거나 수정하려면, DOM에서 해당 요소를 직접 찾아내고, 제거하고, 다시 추가하는 복잡한 명령을 내려야 합니다.

## 2. 선언형 프로그래밍: '무엇'에 집중하는 방식

'선언형(Declarative) 프로그래밍'은 **'어떻게'가 아닌 '무엇'에 초점을 맞춥니다.**

우리는 원하는 결과가 무엇인지만 서술하고, 시스템이 그 구현 세부 사항을 처리하도록 맡깁니다.

마치 레스토랑에서 "페퍼로니 피자 한 판 주세요"라고 주문하는 것과 같습니다.

주방에서 도우를 어떻게 펴고, 소스를 어떻게 바르고, 몇 도에서 굽는지는 신경 쓸 필요가 없습니다.

그저 '페퍼로니 피자'라는 결과물만 받으면 됩니다.

같은 예시를 선언형 방식으로 보겠습니다.

### 예시 1: 배열 필터링하고 변환하기

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// "숫자들 중에서 짝수인 것만 골라서, 각각 2를 곱한 결과를 원해"
const result = numbers.filter(num => num % 2 === 0).map(num => num * 2);

// result = [4, 8, 12]
```


`for` 루프도, 임시 배열도 없습니다.

우리는 단지 '무엇을' 원하는지만 `filter`와 `map` 같은 고차 함수를 통해 선언했습니다.

그 '어떻게'는 JavaScript 엔진이 알아서 처리합니다.

### 예시 2: JSX (React)

이 패러다임의 정수가 바로 React의 JSX입니다.

```jsx
function FruitList() {
  const items = ["Apple", "Banana", "Orange"];

  // "나는 이런 모양의 리스트를 원해"
  return (
    <ul>
      {items.map(item => (
        <li className="fruit-item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

`createElement`, `appendChild` 같은 명령형 코드는 어디에도 없습니다.

우리는 그저 최종적으로 화면에 그려지길 원하는 UI의 '모습'을 선언했을 뿐입니다.

나머지 복잡한 DOM 조작은 React가 알아서 처리해 줍니다.

## React와 선언형 프로그래밍 심층 탐구

React는 철저하게 선언형 프로그래밍 패러다임을 따릅니다.

React의 여러 측면을 통해 이 패러다임이 어떻게 적용되는지 살펴보겠습니다.

### 상태 관리 (`useState`)

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // "버튼을 클릭하면, count 상태가 현재 count + 1이 되어야 해" 라고 선언합니다.
  return <button onClick={() => setCount(count + 1)}>Counter: {count}</button>;
}
```



우리는 `useState`로 상태를 '선언'하고, 그것이 어떻게 변경되어야 하는지만 서술합니다.

`setCount`가 호출된 이후에 React가 어떤 과정을 거쳐 DOM을 업데이트하고, 이벤트를 처리하고, 변수의 생명주기를 관리하는지에 대해서는 전혀 걱정할 필요가 없습니다.

### 조건부 렌더링

```jsx
function Message({ isLoggedIn }) {
  return (
    <div>
      {/* "isLoggedIn이 참이면 이 메시지를, 거짓이면 저 메시지를 보여줘" */}
      {isLoggedIn ? <h1>Welcome to your account</h1> : <h1>Please log in</h1>}
    </div>
  );
}
```



React의 조건부 렌더링은 선언적입니다.

우리는 가능한 상태들을 서술하기만 하면, React가 올바른 콘텐츠를 보여주는 것을 처리합니다.

DOM을 수동으로 처리할 필요가 없습니다.

### 이펙트 관리 (`useEffect`)

`useEffect` 훅은 React의 선언적 접근 방식을 완벽하게 보여줍니다.

```jsx
function ResizeMessage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 1. "무엇을 해야 하는지" 선언: 창 크기 조절을 감지해야 해.
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 2. "어떻게 정리해야 하는지" 선언: 컴포넌트가 사라지면 이벤트 리스너를 제거해야 해.
    return () => window.removeEventListener("resize", handleResize);
  }, []); // 이 효과는 한 번만 실행되도록 선언합니다.

  return <p>Window width: {windowWidth}px</p>;
}
```



우리는 '이벤트 리스너를 추가해야 한다'는 것과 '정리해야 한다'는 사실만 선언합니다.

React는 이 이펙트의 생명주기를 자동으로 관리하여, 컴포넌트가 마운트될 때 실행하고 언마운트될 때 정리합니다.

## 선언형 세계의 예외: 명령형이 필요할 때 (`useRef`)

그렇다면 React에서는 명령형 코드를 절대 사용할 수 없을까요?
아닙니다.

때로는 특정 DOM 노드에 직접 접근하여 명령을 내려야 할 때가 있습니다.
(예: 특정 input에 포커스 주기, 스크롤 위치 제어하기, 애니메이션 직접 실행하기 등)

이럴 때를 위해 React는 `useRef`라는 '탈출구(escape hatch)'를 제공합니다.

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // 'inputEl.current'는 실제 input DOM 노드를 가리킵니다.
    // DOM 노드에 직접 'focus()'라는 명령을 내립니다.
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```



`useRef`는 선언형으로 관리되는 React의 상태 흐름에 영향을 주지 않으면서, 필요할 때만 DOM에 직접적인 명령을 내릴 수 있게 해주는 다리 역할을 합니다.

## 결론

선언형 프로그래밍은 우리가 애플리케이션을 작성하는 방식을 바꾸는 React의 핵심 개념입니다.

이 접근 방식은 우리가 거기에 도달하기 위한 단계 대신 최종 결과에 집중할 수 있게 해줍니다.

우리의 예제를 통해, 우리는 React가 모든 수준에서 이 패러다임을 어떻게 적용하는지 보았습니다.

- 상태 관리는 간단한 데이터 선언이 됩니다.
- 조건부 렌더링은 각 가능한 경우를 서술하는 것뿐입니다.
- 리스트 처리는 데이터 변환으로 자연스럽게 이루어집니다.
- 부수 효과는 예측 가능하고 통제된 방식으로 관리됩니다.

이 선언적 접근 방식은 우리 코드를 더 예측 가능하고, 유지보수 및 테스트하기 쉽게 만듭니다.

React를 배운다는 것은 결국 명령형 사고에서 선언형 사고로 전환하는 과정이며, 이 전환을 완전히 이해했을 때 비로소 우리는 복잡한 인터페이스를 만들면서도 코드를 명확하고 구조적으로 유지할 수 있게 될 것입니다.
