---
title: 웹 개발 배우기 15편 - 프론트엔드 프레임워크 첫걸음, Preact로 Todo 앱 만들기
date: 2025-11-09T15:18:00+09:00
summary: 프론트엔드 프레임워크의 개념과 동작 원리를 배우고, Preact를 사용해 직접 Todo 리스트 앱을 만들어봅니다. 파괴적/비파괴적 연산, 전개 구문, 시그널 등 현대적인 UI 개발에 필수적인 개념들을 마스터합니다.
tags:
    - 프론트엔드 프레임워크
    - Preact
    - 선언형 UI
    - 비파괴적 연산
    - 시그널
    - 컴포넌트
---

# 웹 개발 배우기 15편 - 프론트엔드 프레임워크 첫걸음, Preact로 Todo 앱 만들기

![웹 개발 배우기 15편 - 프론트엔드 프레임워크 첫걸음, Preact로 Todo 앱 만들기](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

이번 시간에는 프론트엔드 프레임워크에 대해 살펴볼 건데요.

웹 사용자 인터페이스 프로그래밍을 도와주는 아주 강력한 라이브러리입니다.

'프론트엔드'는 '브라우저'를 의미하고, '백엔드'는 '서버'를 의미하죠.


우리는 '프리액트(Preact)'라는 프론트엔드 프레임워크를 사용해서 Todo 리스트 앱의 프론트엔드 부분을 구현해 볼 건데요.

나중에 만들 백엔드 부분과 연결될 아주 중요한 파트입니다.


## 더 많은 자바스크립트 기능들
이 섹션에서는 다음 프로젝트에 필요한 몇 가지 새로운 자바스크립트 기능들을 배워볼 건데요.


### 파괴적 연산 vs. 비파괴적 연산
객체(예: 배열)를 변경할 때 우리에게는 두 가지 선택지가 있거든요.

객체 자체를 직접 수정하는 '파괴적(destructive)' 방식과, 변경된 새로운 복사본을 만드는 '비파괴적(non-destructive)' 방식이 그것입니다.

(원본은 변경되지 않고, 복사본이 변경 사항을 포함합니다).


예를 들어, 배열의 `.splice()` 메서드는 `start` 인덱스부터 `deleteCount` 개의 요소를 삭제하는 파괴적인 연산인데요.

```javascript
const arr = ['a', 'b', 'c', 'd'];
arr.splice(1, 2);

// 이 연산은 파괴적입니다
assert.deepEqual(arr, ['a', 'd']);
```
반면에 `.toSpliced()`는 `.splice()`의 비파괴적 버전입니다.

새로운 배열을 반환하고, 호출된 배열은 변경하지 않습니다.

```javascript
const arr1 = ['a', 'b', 'c', 'd'];
const arr2 = arr1.toSpliced(1, 2);

// 이 연산은 비파괴적입니다
assert.deepEqual(arr1, ['a', 'b', 'c', 'd']);
assert.deepEqual(arr2, ['a', 'd']);
```
다른 비파괴적 배열 메서드로는 새로운 배열을 만들고 원본은 변경하지 않는 `.map()`과 `.filter()`가 있습니다.


### 배열 안으로 펼쳐 넣기
'전개 구문(Spread syntax)'(...)은 배열과 같은 순회 가능한 값을 배열 리터럴 안에 삽입할 수 있게 해주는 문법인데요.

```javascript
> const arr = ['b', 'c'];
> ['a', ...arr, 'd']
[ 'a', 'b', 'c', 'd' ]
```
전개 구문을 사용해 배열을 복사할 수도 있습니다.


### 객체 안으로 펼쳐 넣기
객체 리터럴 안으로 펼쳐 넣을 수도 있는데요.

```javascript
> const obj = {b: 2, c: 3};
> {a: 1, ...obj, d: 4}
{ a: 1, b: 2, c: 3, d: 4 }
```
전개 구문을 사용해 순수 객체를 복사할 수 있습니다.


### 얕은 복사 vs. 깊은 복사
앞선 두 하위 섹션에서 배열과 객체를 복사하는 것에 대해 이야기했는데요.

이런 종류의 복사에 대해 알아야 할 한 가지 중요한 점은 그것이 '얕은 복사(shallow copy)'라는 사실입니다.

즉, 오직 한 단계 깊이까지만 동작하거든요.


`copy`는 새로운 배열이며 `purchases` 배열과 독립적이지만, 두 배열은 여전히 동일한 `purchase` 객체들을 가리키고 있습니다.

따라서 `copy`에서 객체를 변경하면, 그 변경은 `purchases`의 동일한 객체에도 영향을 미칩니다.

```javascript
copy[0].quantity = 999;
assert.deepEqual(purchases, [
  {product: 'apple', quantity: 999},
  //...
]);
```
이런 문제를 피하려면 '깊은 복사(deep copy)'를 해야 하는데요.

배열 안의 객체들까지 하나하나 복사해서 완전히 새로운 배열을 만드는 겁니다.

```javascript
const deeplyCopyPurchases = (purchases) => {
  return purchases.map(
    purchase => ({...purchase})
  );
};
```

### 객체 구조 분해 할당
반복문 챕터에서 우리는 이미 배열 구조 분해를 보았는데요.

하지만 객체도 구조 분해할 수 있습니다.

```javascript
const {key1: value1, key2: value2} = someObj;
// 위 코드는 아래와 같습니다
// const value1 = someObj.key1;
// const value2 = someObj.key2;
```
만약 새로 만들 변수의 이름과 객체의 프로퍼티 키 이름이 같다면, '프로퍼티 값 단축'이라는 약어를 사용해 코드를 더 줄여 쓸 수도 있습니다.

```javascript
const {key1, key2} = obj;
```

### 함수 선언문 (function)
이제 함수를 만드는 새로운 방법을 배우는데요.

다음 코드는 함수 선언문을 포함합니다.

```javascript
function add(x, y) {
  return x + y;
}
```
이것은 `const add = (x, y) => x + y;` 와 거의 동일하거든요.

두 구문 중 어느 것을 사용하든 보통은 크게 중요하지 않습니다.


함수 선언문의 장점은 선언하기 전에 호출할 수 있다는 점이고요.

화살표 함수의 장점은 단일 파라미터 주위의 괄호를 생략할 수 있고 표현식 본문을 사용할 수 있다는 점입니다.


### 파라미터에 객체 구조 분해 사용하기
함수의 파라미터 정의에서도 객체 구조 분해를 사용할 수 있는데요.

```javascript
function hello({name}) {
  return `Hello ${name}!`;
}
```
`hello({name: 'Robin'})` 처럼 함수를 호출하는데요.

이 방식은 각 인자가 어떤 역할을 하는지 설명하는 멋진 레이블을 갖는다는 장점이 있습니다.


## 프론트엔드 프레임워크
### 프론트엔드 프레임워크란 무엇일까요?
프론트엔드라는 용어는 기본적으로 '브라우저'를 의미하는데요.

'프론트엔드 프레임워크'는 웹 브라우저에서 사용자 인터페이스를 만드는 것을 도와주는 라이브러리입니다.


프론트엔드 프레임워크 사용의 장점은 웹 사용자 인터페이스, 특히 복잡한 것을 만드는 것을 더 쉽게 만든다는 것이고요.

단점은 복잡성을 추가한다는 것입니다.

배워야 할 것이 더 많고, 더 많은 의존성을 관리해야 하며, 코드가 많아질수록 버그의 가능성도 항상 증가합니다.


### 프론트엔드 프레임워크는 어떻게 동작할까요?
지금까지 우리는 항상 브라우저 기능을 직접 사용했는데요.

한 가지 핵심 과제는 모델과 뷰를 동기화 상태로 유지하는 것입니다.


프레임워크를 사용하면, 뷰는 함수가 되거든요.

*   **입력**: 모델

*   **출력**: 뷰 (HTML의 압축된 표현)


모델이 변경될 때마다 뷰는 전체 HTML을 다시 생성하는데요.

성능과 관련하여 한 가지 명심해야 할 중요한 점이 있습니다.


*   출력을 생성하는 것은 빠릅니다.

*   브라우저에서 페이지를 업데이트하는 것은 느립니다.


따라서 모델이 변경될 때마다 프레임워크는 뷰 함수를 호출하고요.

그런 다음 그 결과를 웹 페이지에 이미 있는 것과 비교하여 '다른 부분만' 변경합니다.


## 프로젝트 `display-clicks-preact.html` Preact 맛보기
프론트엔드 프레임워크를 탐색하기 위해, 우리는 프리액트(Preact)를 사용할 건데요.

대략적으로 말해, 인기 있는 프론트엔드 프레임워크인 리액트(React)의 더 단순한 버전입니다.


### 자바스크립트
#### 임포트 맵
빌드 과정 없이 프리액트를 사용하기 위해, 우리는 CDN esm.sh에서 직접 패키지를 가져오는데요.

이를 위해 임포트 맵을 설정해야 합니다.

```html
<script type="importmap">
  {
    "imports": {
      "preact": "https://esm.sh/preact",
      // ...
    }
  }
</script>
```
임포트 맵은 모듈 지정자를 위한 약어를 정의하는데요.

예를 들어, 우리는 'preact'에서 가져올 수 있고, 자바스크립트는 내부적으로 `https://esm.sh/preact`에서 가져옵니다.


#### 앱의 시작
이 준비를 통해, 우리는 npm으로 패키지를 설치한 것처럼 자바스크립트 코드를 작성할 수 있는데요.

다음과 같은 임포트가 필요합니다.

```javascript
import { render } from 'preact';
import { html } from 'htm/preact';
import { signal } from '@preact/signals';
```
앱은 이렇게 시작합니다.

```javascript
render(
  html`<${ClickCounter} linkText="Click me!" />`,
  document.querySelector('#app')
);
```
우리는 ID가 `app`인 `<div>` "안으로" 애플리케이션을 렌더링하는데요.

`render()`의 첫 번째 인자는 뷰의 시작입니다.

`html` 더하기 템플릿 리터럴은 '태그드 템플릿'이라는 새로운 종류의 리터럴이거든요.


`html` 태그드 템플릿 내부 문법에 대해 알아야 할 몇 가지 사항이 있습니다.

우리는 '컴포넌트'라고 불리는 우리만의 HTML 태그를 정의할 수 있는데요.

컴포넌트는 단순히 HTML(HTML 표현)을 반환하는 함수입니다.


`ClickCounter`는 컴포넌트이며, 우리는 그것을 HTML 속성 구문을 사용하여 인자를 전달함으로써 사용합니다.


#### `ClickCounter` 컴포넌트
우리 컴포넌트는 다음과 같은데요.

```javascript
const appModel = signal(0); // (A)

function ClickCounter({ linkText }) {
  function handleClick(event) {
    event.preventDefault();
    appModel.value++; // (B)
  }
  return html`
    <div>
      <a href="" onclick=${handleClick}>${linkText}</a>
    </div>
    <div>
      Number of clicks: ${appModel.value}
    </div>
  `;
}
```
(A) 줄에서, 우리는 모델을 만드는데요.

'시그널(signal)'을 사용해서 그렇게 합니다.

시그널은 데이터를 감싸고 우리에게 두 가지 연산을 제공하거든요.


*   `appModel.value`를 얻는 것은 현재 모델을 반환합니다.

*   `appModel.value`를 설정하는 것은 현재 모델을 변경하고, `appModel.value`가 접근된 모든 HTML이 다시 생성되도록 합니다.


따라서 (B) 줄에서 `appModel.value`를 변경하면, `ClickCounter()`가 반환하는 모든 HTML이 다시 생성됩니다.


#### `html` 템플릿 태그 vs. JSX
우리는 `html` 태그드 템플릿과 함께 프리액트를 사용하는데요.

하지만 HTML(표현)을 만들기 위한 내장 문법을 가진 자바스크립트의 확장 버전도 있습니다.

그 내장 문법을 'JSX'라고 합니다.


## 프로젝트 `todo-list-browser/`
이제 더 큰 프로젝트, Todo 리스트 앱의 브라우저 측으로 넘어가 보겠습니다.

이제 우리는 npm을 사용하고 웹 앱을 빌드할 건데요.


### `js/app-model.js`
`app-model.js` 모듈은 우리 앱의 모델을 관리하기 위한 기능들을 포함하는데요.

그 모델은 시그널 안에 감싸인 핵심 모델입니다.

핵심 모델은 다음과 같습니다.

```javascript
{
  todos: [
    { text: 'Buy groceries', checked: true },
    { text: 'What dishes', checked: false },
  ],
}
```
우리는 변경 사항을 추적하기 위해 시그널을 사용하는데요.

시그널의 `.value` 속성에 할당하는 것은 HTML의 재렌더링을 촉발합니다.


#### 시그널의 `.value`에 할당하기
시그널의 `.value`에 할당하는 것에 대해 알아야 할 한 가지 중요한 점이 있는데요.

이전 `.value`를 재사용할 수 없으며, 완전히 새로운 깊은 복사본을 만들어야 한다는 것입니다.


#### 빈 앱 모델 만들기
앱 모델에 대한 모든 지식이 `app-model.js` 모듈 내에 머무르도록, 빈 앱 모델을 만드는 함수를 제공하는데요.

이런 종류의 지식 지역화는 코드를 유지 관리하기 쉽게 만듭니다.

```javascript
const createCoreModel = () => ({ todos: [] });
export const createAppModel = () => signal(createCoreModel());
```

#### Todo 추가, 삭제, 업데이트하기
`addTodo()`, `deleteTodo()`, `updateChecked()`와 같은 함수들은 모두 `appModel`을 인자로 받아서, 이전 모델을 깊게 복사한 후 변경 사항을 적용한 '완전히 새로운' 모델 객체를 만들어 `appModel.value`에 할당합니다.

이것이 바로 시그널에게 "상태가 변경되었으니 화면을 다시 그려라"라고 알려주는 방식입니다.


### DOM 노드에 대한 참조 (refs)
프리액트를 사용하면 DOM 노드에 직접 접근할 필요가 거의 없는데요.

하지만 만약 그렇게 해야 한다면, `document.querySelector()`를 사용하는 것보다 프리액트의 내장 솔루션인 '참조(refs)'를 사용하는 것이 더 좋습니다.


```javascript
import { useRef } from 'preact/hooks';

function MyInput() {
  const inputRef = useRef(null); // (A)
  const onchange = () => {
    const inputElement = inputRef.current; // (B)
    console.log(inputElement.value);
  };
  return html`<input ref=${inputRef} onchange=${onchange} />`;
}
```
참조는 시그널과 유사하게 작동하는데요.

(A)에서 참조를 만들고 `ref` 속성을 통해 `<input>` 요소에 등록합니다.

이제부터 참조는 지속적으로 업데이트되며 (B)에서 사용할 수 있습니다.


### `main.js`
앱 모델 관리에 관한 많은 작업을 `app-model.js`가 대신해주기 때문에, 우리 앱의 뷰 부분은 비교적 간단한데요.

`App`이라는 최상위 컴포넌트가 있고, 그 안에 `Todos` 리스트 컴포넌트가, 또 그 안에 개별 `Todo` 아이템 컴포넌트가 있는 구조입니다.

```javascript
function App() {
  const inputRef = useRef(null);

  const add = () => {
    const todoInput = inputRef.current;
    // ...
    addTodo(appModel, todoText);
  };
  return html`
    <h1>Todo list</h1>
    <${Todos} todos=${appModel.value.todos} />
    <div>
      <button onclick=${add}>Add:</button>
      <input type="text" ref=${inputRef} />
    </div>
  `;
}

function Todos({ todos }) {
  return todos.map(
    (todo, index) => html`<${Todo} index=${index} todo=${todo} />`
  );
}

function Todo({ index, todo }) {
  function onchange(event) {
    updateChecked(appModel, index, event.target.checked);
  }
  function onclick() {
    deleteTodo(appModel, index);
  }
  return html`...`;
}
```
우리는 이벤트에 반응하고 `appModel`을 통해 사용자 인터페이스 변경을 촉발합니다.
