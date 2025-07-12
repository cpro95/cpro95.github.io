---
title: React Element 완전 정복 - 컴포넌트와 인스턴스는 무엇이 다른가?
pubDatetime: 2025-07-12T11:51:11.746Z
postSlug: 2025-07-11-react-element-deep-dive
featured: false
draft: false
tags:
  - React Element
  - JSX
  - React 컴포넌트
  - 재조정
  - Reconciliation
  - 가상 DOM
description: React의 가장 작은 벽돌, React Element의 모든 것을 알아봅니다. JSX가 어떻게 평범한 자바스크립트 객체로 변환되는지, 그리고 재조정(Reconciliation) 과정에서 엘리먼트와 key가 어떻게 동작하는지 깊이 있게 탐구합니다.
---

'Level Up React'는 React 개발자들이 자신의 기술을 한 단계 끌어올릴 수 있도록 설계된 심층 아티클 시리즈입니다.<br /><br />
우리는 React의 내부 메커니즘, 모범 사례, 디자인 패턴, 그리고 고급 개념들을 탐구합니다.<br /><br />
이 글들은 기본을 넘어 React가 내부적으로 어떻게 작동하는지 진정으로 이해하고자 하는 React 개발자들을 위해 작성되었습니다.<br /><br />

## 들어가기 전에: 엘리먼트, 컴포넌트, 인스턴스<br />

React를 배울 때 많은 개발자들이 이 세 가지 용어를 혼용하곤 합니다.<br /><br />
하지만 이들을 명확히 구분하는 것이 오늘 이야기의 핵심입니다.<br /><br />

- '컴포넌트(Component)': 컴포넌트는 '설계도' 또는 '레시피'입니다.<br /><br />
  함수나 클래스 형태로 존재하며, UI를 어떻게 만들어야 하는지에 대한 로직을 담고 있습니다.<br /><br />
  그 자체로는 화면에 아무것도 그리지 않습니다.<br /><br />
- '엘리먼트(Element)': 엘리먼트는 '주문서' 또는 '계획'입니다.<br /><br />
  `{ type: 'div', props: { ... } }` 와 같은 형태의, 화면에 그려질 내용을 설명하는 평범한 자바스크립트 '객체(Object)'입니다.<br /><br />
  매우 가볍고, 상태를 가지지 않으며, 불변(immutable)합니다.<br /><br />
- '인스턴스(Instance)': 인스턴스는 컴포넌트라는 설계도를 바탕으로 만들어진 '실체'입니다.<br /><br />
  클래스 컴포넌트에서 `this`가 가리키는 대상이며, 자신만의 상태(state)와 생명주기(lifecycle)를 갖는, 살아있는 존재입니다.<br /><br />

우리가 JSX로 코드를 작성할 때, React는 이 코드를 바탕으로 '엘리먼트'라는 객체를 만들고, 이 엘리먼트 정보를 이용해 화면을 그리고 컴포넌트의 '인스턴스'를 관리합니다.<br /><br />
오늘의 주인공은 바로 이 '엘리먼트'입니다.<br /><br />

## React 엘리먼트란 무엇일까?<br />

'React 엘리먼트'는 사용자 인터페이스의 한 노드를 설명하는 단순한 자바스크립트 객체입니다.<br /><br />
React를 구성하는 가장 작은 벽돌이죠.<br /><br />
그 구조를 살펴보겠습니다.<br /><br />

```javascript
// React 엘리먼트의 기본 구조
{
  $$typeof: Symbol.for('react.element'),
  type: 'div',
  key: null,
  ref: null,
  props: {
    children: 'Hello World'
  }
}
```

<br /><br />

각 속성을 하나씩 분석해 보겠습니다.<br /><br />

### `$$typeof` 속성<br />

`$$typeof: Symbol.for("react.element");`
이 속성은 React가 다른 자바스크립트 객체와 React 엘리먼트를 구분하기 위해 사용하는 내부 서명입니다.<br /><br />
이것은 단순한 식별자를 넘어 중요한 '보안' 장치 역할을 합니다.<br /><br />
만약 서버에서 악의적인 JSON 데이터를 받아 그대로 렌더링하려고 할 때, React는 이 `$$typeof` 속성이 있는지 확인합니다.<br /><br />
이 특별한 심볼이 없다면, React는 그것을 엘리먼트로 취급하지 않아 XSS(Cross-Site Scripting) 공격을 방지할 수 있습니다.<br /><br />
우리가 코드에서 직접 다룰 일은 거의 없는 내부 메커니즘입니다.<br /><br />

### `type` 속성<br />

`type`은 해당 엘리먼트의 본질을 결정합니다.<br /><br />

```javascript
// 1. 네이티브 HTML 엘리먼트의 경우 (문자열)
{
  type: "div";
} // 또는 'span', 'p' 등

// 2. React 컴포넌트의 경우 (함수 또는 클래스에 대한 참조)
{
  type: MyComponent;
}

// 3. Fragment의 경우 (심볼)
{
  type: Symbol.for("react.fragment");
}
```

<br /><br />

### `props` 속성<br />

`props`는 엘리먼트의 모든 데이터와 콘텐츠를 담고 있습니다.<br /><br />

```javascript
{
  type: 'button',
  props: {
    className: 'btn',
    onClick: () => console.log('click'),
    children: 'Click me'
  }
}
```

<br /><br />

특별한 `children` prop은 여러 형태를 가질 수 있습니다.<br /><br />

```javascript
// 1. 단순한 문자열
{ props: { children: 'Simple text' } }

// 2. 또 다른 React 엘리먼트
{ props: { children: { type: 'span', props: { children: 'Text in span' } } } }

// 3. 엘리먼트 배열
{
  props: {
    children: [
      { type: 'li', props: { children: '1' } },
      { type: 'li', props: { children: '2' } }
    ]
  }
}
```

<br /><br />

### `key`와 `ref` 속성<br />

```javascript
{
  key: 'unique-id', // 리스트 재조정(reconciliation)에 사용됩니다.
  ref: null        // DOM 엘리먼트나 컴포넌트에 대한 참조를 담을 수 있습니다.
}
```

<br /><br />

## React는 어떻게 이 엘리먼트들을 만들까?<br />

우리가 JSX를 작성할 때:<br /><br />

```jsx
const element = <div className="container">Hello</div>;
```

<br /><br />

Babel과 같은 트랜스파일러는 이 코드를 `React.createElement` 함수 호출로 변환합니다.<br /><br />

```javascript
const element = React.createElement("div", { className: "container" }, "Hello");
```

<br /><br />

그러면 `React.createElement` 함수가 앞서 본 완전한 'React 엘리먼트' 객체를 만들어냅니다.<br /><br />
`React.createElement` 함수의 의사 코드는 다음과 같습니다.<br /><br />

```javascript
// React.createElement의 단순화된 의사 코드
function createElement(type, config, children) {
  // 특별한 props 추출
  let key = config?.key || null;
  let ref = config?.ref || null;

  // props 빌드
  const props = {};
  for (let propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      propName !== "key" &&
      propName !== "ref"
    ) {
      props[propName] = config[propName];
    }
  }

  // 자식들(children) 처리
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    props.children = Array.prototype.slice.call(arguments, 2);
  }

  // 엘리먼트 객체 빌드
  return {
    $$typeof: Symbol.for("react.element"),
    type,
    key,
    ref,
    props,
  };
}
```

<br /><br />

## 엘리먼트 재조정(Reconciliation)<br />

'재조정'은 React가 두 개의 React 엘리먼트 트리를 비교하여 DOM에 어떤 변경 사항을 적용할지 결정하는 과정입니다.<br /><br />
이것이 바로 React의 '가상 DOM(Virtual DOM)'이 동작하는 핵심 원리입니다.<br /><br />
React는 마치 '틀린 그림 찾기'를 하듯, 이전 엘리먼트 트리와 새로운 엘리먼트 트리를 비교합니다.<br /><br />

### 비교 과정<br />

React는 엘리먼트를 재귀적으로 비교합니다.<br /><br />

- **타입이 다른 경우**: 이전 트리를 완전히 파괴하고 새로운 트리를 만듭니다.<br /><br />
  (예: `<div>`가 `<span>`으로 변경된 경우)
- **타입이 같은 경우**: 속성만 비교하여 변경된 부분(예: `className`)만 업데이트합니다.<br /><br />
- **리스트의 경우**: `key` prop을 사용하여 어떤 엘리먼트가 이동했는지, 추가되었는지, 또는 삭제되었는지 식별합니다.<br /><br />

### `key`의 중요성<br />

`key`는 React가 리스트의 각 엘리먼트를 고유하게 식별하도록 돕는 가장 중요한 단서입니다.<br /><br />

- 'key가 없다면': React는 엘리먼트들이 재정렬되었는지, 아니면 완전히 교체되었는지 알 수 없습니다.<br /><br />
  예를 들어 리스트의 맨 앞에 아이템을 추가하면, React는 모든 리스트 아이템이 변경되었다고 착각하여 모든 DOM 노드를 파괴하고 새로 만들 수 있습니다.<br /><br />
  이는 성능 저하뿐만 아니라, 각 아이템이 가지고 있던 내부 상태(예: `<input>`의 입력값)가 사라지는 문제를 유발합니다.<br /><br />
- 'key가 있다면': React는 `key`를 통해 "아, 'b' 아이템이 'a' 아이템 앞으로 이동했구나"라고 정확히 파악하고, DOM 노드를 파괴하는 대신 순서만 변경합니다.<br /><br />

이처럼 영리한 재조정 과정 덕분에 React는 DOM 조작을 최소화하고, 복잡한 인터페이스에서도 뛰어난 성능을 제공할 수 있습니다.<br /><br />

## 결론<br />

React 엘리먼트를 이해하는 것은 모든 React 개발자에게 매우 중요합니다.<br /><br />
이 단순한 자바스크립트 객체는 React 세계의 모든 것을 이루는 기초입니다.<br /><br />
그것이 어떻게 작동하고 React가 어떻게 사용하는지 알게 됨으로써, 여러분은 다음을 더 잘 이해할 수 있습니다.<br /><br />

- JSX가 어떻게 이 객체들로 변환되는가<br />
- React가 리스트에 고유한 `key`를 필요로 하는 이유<br />
- React가 재조정을 통해 어떻게 효율적으로 DOM을 업데이트하는가<br /><br />
  복잡한 React 애플리케이션조차도 이 기본적인 빌딩 블록들로 만들어진다는 것을 기억하세요.<br /><br />
  대부분의 경우 React 엘리먼트를 직접 다룰 필요는 없지만, 그 구조를 이해하는 것은 여러분이 더 나은 React 코드를 작성하는 데 큰 도움이 될 것입니다.<br /><br />
