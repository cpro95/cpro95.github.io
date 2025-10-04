---
title: React와 React-DOM의 아키텍처 - 뇌와 손은 어떻게 분리되었나?
date: 2025-07-12T11:54:50.950Z
pin: false
draft: false
tags:
  - React
  - React-DOM
  - React 아키텍처
  - 렌더러
  - 재조정
  - 가상 DOM
summary: React가 왜 react와 react-dom 두 개의 패키지로 나뉘어 있는지, 그 심오한 설계 철학을 알아봅니다. 뇌 역할을 하는 React와 손 역할을 하는 React-DOM의 관계를 통해, 플랫폼에 구애받지 않는 React의 이식성과 미래를 탐구합니다.
---
# React와 React-DOM의 아키텍처 - 뇌와 손은 어떻게 분리되었나?

![](https://blogger.googleusercontent.com/img/a/AVvXsEgr_P_vbKgrljls-Gm7_Q94A5hP7OGGDjiZ4NqZq0cUJXCAeOxSriFZ63Fo7ho_lEsmt12FiMbXbcDJham42JrUyfgIZh1Wjqm5xJzzk3myWV9Lzbqupz9NkwIb9NtsomHN7FiIGPDnwgrqDWOtBu86bPddi0h14xq8FI5lK3012XK6vxkGx3yQWs2xW7w=s16000)

우리는 React의 내부 메커니즘, 모범 사례, 디자인 패턴, 그리고 고급 개념들을 탐구합니다.

이 글들은 기본을 넘어 React가 내부적으로 어떻게 작동하는지 진정으로 이해하고자 하는 React 개발자들을 위해 작성되었습니다.

## 서론: 두 개의 패키지, 하나의 철학

React는 'react'와 'react-dom'이라는 두 개의 개별 패키지로 나뉘어 있습니다.

이 분리는 단순히 기술적인 선택이 아니라, React의 핵심적인 아키텍처 비전을 반영합니다.

마치 인간의 신체처럼, React는 '생각하는 뇌'와 '실행하는 손'으로 역할을 명확히 나누고 있습니다.

오늘은 이 두 패키지의 역할과 그 분리 뒤에 숨겨진 깊은 의미를 자세히 살펴보겠습니다.

## React 패키지: 애플리케이션의 '뇌'

'react' 패키지는 React 애플리케이션이 무엇인지를 정의하는 핵심 로직을 담고 있습니다.

마치 모든 것을 계획하고 결정하는 '뇌'와 같습니다.

컴포넌트, 엘리먼트, 상태를 생성하고 관리하는 모든 추상적인 작업이 바로 이곳에서 이루어집니다.

구체적으로 이 패키지는 다음을 관리합니다.

- 'React 엘리먼트 생성': 우리가 JSX로 작성한 코드를 바탕으로, 화면에 그려질 내용에 대한 '설계도'인 가상 DOM(React 엘리먼트 객체)을 만듭니다.
- '컴포넌트 시스템 관리': 함수형 컴포넌트와 클래스 컴포넌트의 정의, props 전달 등 컴포넌트의 기본 구조를 관장합니다.
- '훅(Hooks)과 내부 로직': `useState`, `useEffect` 등 훅의 모든 로직은 여기에 있습니다.
  훅은 컴포넌트의 상태와 생명주기를 관리하는 '규칙'이므로, 특정 플랫폼에 종속되지 않습니다.
- '상태 관리와 컨텍스트': 컴포넌트의 상태 변경을 추적하고, Context API를 통해 상태를 전파하는 모든 메커니즘을 포함합니다.

가장 중요한 점은 'react' 패키지가 '플랫폼에 구애받지 않는다(platform-agnostic)'는 것입니다.

이 안에는 웹 브라우저의 DOM이나 모바일의 네이티브 UI에 대한 코드가 단 한 줄도 없습니다.

오직 순수한 '무엇을(what)' 렌더링할지에 대한 계획과 로직만 존재합니다.

이 덕분에 React는 웹, 모바일, 데스크톱, 심지어 VR 애플리케이션까지 넘나들 수 있는 것입니다.

## React-DOM 패키지: 브라우저를 위한 '손'

'react-dom' 패키지는 '웹 브라우저'라는 특정 플랫폼을 위해 만들어졌습니다.

이 패키지의 역할은 React라는 '뇌'가 만든 추상적인 세계(가상 DOM)와 실제 브라우저 DOM을 연결하는 '다리'이자, 그 계획을 실행하는 '손'입니다.

React의 지시를 실제 DOM 변경으로 바꾸는 모든 구체적인 작업이 이곳에서 이루어집니다.

주요 책임은 다음과 같습니다.

- '초기 DOM 렌더링 관리': `createRoot(document.getElementById('root'))`와 같이, React 애플리케이션을 실제 HTML 문서의 특정 지점에 처음으로 '장착(mount)'시키는 역할을 합니다.
- '효율적인 DOM 업데이트': 상태가 변경되었을 때, '뇌(react)'로부터 변경 사항에 대한 지시를 받아, `appendChild`, `setAttribute`, `removeChild` 등 브라우저가 알아듣는 명령어로 실제 DOM을 최소한으로 조작합니다.
- '브라우저 이벤트 처리': 우리가 JSX에 작성하는 `onClick`, `onChange` 같은 이벤트들을 처리합니다.
  흥미롭게도, `react-dom`은 각 버튼마다 이벤트 리스너를 다는 대신, 애플리케이션 루트에 단 하나의 이벤트 리스너를 두고 '이벤트 위임(event delegation)'을 통해 모든 이벤트를 효율적으로 관리합니다.

## 왜 두 개의 패키지로 분리했을까?

이 아키텍처 분리는 여러 가지 중요한 이점을 제공합니다.

### 1. 이식성 (Portability)

이것이 가장 큰 이유입니다.

React의 '뇌'는 그대로 둔 채, '손'의 역할만 하는 '렌더러(Renderer)'를 교체하면 다른 환경에서도 React를 사용할 수 있습니다.

```javascript
// 웹에서는 React-DOM 렌더러를 사용합니다.
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);

// 모바일에서는 React-Native 렌더러를 사용합니다.
import { AppRegistry } from "react-native";
AppRegistry.registerComponent("App", () => App);

// 테스트 환경에서는 React-Test-Renderer를 사용합니다.
import renderer from "react-test-renderer";
const tree = renderer.create(<App />).toJSON();
```



이 모든 환경에서 `App` 컴포넌트 자체는 동일하게 재사용될 수 있습니다.

이것이 바로 React의 '한 번 배워서, 어디서든 작성한다(Learn Once, Write Anywhere)'는 철학의 핵심입니다.

### 2. 독립적인 유지보수 및 발전

각 패키지는 독립적으로 발전할 수 있습니다.

예를 들어, React 팀은 브라우저 DOM의 변화와는 상관없이 새로운 훅(`useOptimistic` 등)을 'react' 패키지에 추가할 수 있습니다.

반대로, 브라우저에 새로운 API가 등장하면, 'react-dom' 팀은 React의 핵심 로직을 건드리지 않고도 렌더링 성능을 최적화할 수 있습니다.

### 3. 최적화 및 번들 크기

이 분리는 번들 크기를 최적화하는 데 도움이 됩니다.

예를 들어, 모바일 앱을 빌드할 때는 웹 브라우저의 DOM 조작과 관련된 `react-dom`의 방대한 코드를 포함할 필요가 전혀 없습니다.

## JSX 없이 React 사용해보기

이 분리 구조를 실제로 체감할 수 있는 재미있는 방법이 있습니다.

바로 JSX 없이 React를 사용하는 것입니다.

사실 JSX는 `React.createElement()` 함수를 더 편하게 쓰기 위한 '문법적 설탕(Syntactic Sugar)'일 뿐입니다.

```javascript
// createElement와 useState는 'react' 패키지에서 옵니다.
const { createElement, useState } = React;

function Counter() {
  const [count, setCount] = useState(0);

  // 이 모든 것은 UI의 '설계도'를 만드는 과정입니다.
  return createElement("div", null, [
    createElement("p", null, `Counter: ${count}`),
    createElement(
      "button",
      { onClick: () => setCount(count + 1) },
      "Increment"
    ),
    createElement(
      "button",
      { onClick: () => setCount(count - 1) },
      "Decrement"
    ),
  ]);
}

// createRoot와 render는 'react-dom' 패키지에서 옵니다.
const root = ReactDOM.createRoot(document.getElementById("root"));
// '뇌'가 만든 설계도(엘리먼트)를 '손'에게 전달하여 화면에 그리도록 명령합니다.
root.render(createElement(Counter));
```



솔직히 말해, 보기에 아주 장황한 코드죠! 😅 이것이 바로 우리가 JSX의 편리함에 감사해야 하는 이유입니다.

## 결론

`react`와 `react-dom`의 분리 아키텍처는 훌륭한 설계가 어떻게 코드에 유연성과 유지보수성을 부여하는지 보여주는 완벽한 예시입니다.

이 구조는 React가 다양한 환경에서 작동하게 하면서도, 코드베이스를 일관되고 최적화된 상태로 유지할 수 있게 해줍니다.
핵심을 다시 정리해 보겠습니다.

- 'React'는 '무엇을' 할지 결정하는 '뇌'입니다.
- 'React-DOM'은 브라우저에서 그 결정을 실행하는 '손'입니다.
- 이 분리 덕분에 React는 다른 플랫폼(모바일 등)에서도 작동할 수 있습니다.
- 각 플랫폼에 맞는 최적화를 가능하게 합니다.
- 서버 컴포넌트나 스트리밍 같은 현대적인 고급 기능을 지원하는 기반이 됩니다.

이 아키텍처는 React 19와 그 이후에도 계속해서 발전하며, React가 성공할 수 있었던 이유인 단순함과 유연성을 유지하면서 개발자들에게 더 많은 가능성을 열어줄 것입니다.
