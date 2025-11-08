---
title: 웹 개발 배우기 2편 - 자바스크립트 문자열과 메소드, 드디어 첫 앱 만들기
date: 2025-09-19T09:58:27+09:00
tags:
  - 웹 개발 배우기
  - 자바스크립트 기초
  - 자바스크립트 문자열
  - 자바스크립트 메소드
  - 웹 앱 만들기
  - 이벤트 리스너
  - DOM 조작
description: 웹 개발 배우기 시리즈 2편입니다. 자바스크립트의 문자열과 메소드 개념을 배우고, 클릭 카운터와 온도 변환기 같은 간단한 웹 앱을 직접 만들어보며 이벤트 처리 방법을 익힙니다.
---
![웹 개발 배우기 2편 - 자바스크립트 문자열과 메소드, 드디어 첫 앱 만들기](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

지난 챕터에서는 숫자와 함께 작업했는데요.

이번 챕터에서는 텍스트와 함께 작업하고 우리의 첫 번째 애플리케이션을 작성해 볼 겁니다.


## 문자열 텍스트를 위한 데이터 타입
'데이터 타입'은 "유사한"(같은 종류의) 모든 값들의 집합인데요.

지금까지 우리는 두 가지 데이터 타입을 만났습니다.

숫자와 함수가 그것이죠.


'문자열(string)'은 또 다른 데이터 타입인데요.

문자열은 텍스트, 즉 0개 이상의 문자(텍스트 기호) 시퀀스입니다.

이 문자들은 따옴표 안에 언급되는데, 작은따옴표나 큰따옴표 둘 다 사용할 수 있습니다.

```javascript
'A string'
"Also a string"
```
문자열은 비어 있을 수도 있습니다 (0개의 문자를 포함).


### 문자열은 길이를 가집니다
`.length` 속성을 사용해 문자열에 몇 개의 문자가 있는지 확인할 수 있는데요.

```javascript
> ''.length
0
> 'abc'.length
3
```

### 문자열 연결 더하기 연산자 `+`로 문자열 합치기
문자열을 변수에 저장하고 더하기 연산자 `+`를 통해 함께 합칠 수 있는데요.

```javascript
> let str = '';
> str = str + 'How are';
> str = str + ' you?';
> str
'How are you?'
```

### 문자열을 반환하는 함수
함수는 문자열을 반환할 수도 있습니다.

```javascript
const sayHello = (name) => {
  return 'Hello ' + name + '!';
};
```
이전의 여러 줄 코드를 콘솔에 복사해서 함수가 어떻게 작동하는지 시험해 볼 수 있습니다.

```javascript
> sayHello('Terry')
'Hello Terry!'
```

## 중첩된 변수 객체와 속성
자바스크립트에서 변수는 중첩될 수 있는데요.

변수 자체가 변수를 포함할 수 있다는 의미입니다.

자바스크립트에는 이미 많은 미리 정의된 중첩 변수들이 있거든요.

예를 들어, `Math` 변수는 그 값이 숫자인 `PI`라는 변수를 포함합니다.

```javascript
> Math.PI
3.141592653589793
```
점(`.`)은 중첩된 변수에 접근할 때 구분자로 사용되는데요.

자바스크립트는 다음과 같은 용어를 사용합니다.

*   `Math`는 변수들을 담는 컨테이너입니다.

    이러한 컨테이너를 '객체(object)'라고 합니다.

*   `PI`는 `Math`의 '속성(property)'이라고 불립니다.


### 메서드 속성에 저장된 함수
속성은 함수를 포함할 수도 있고, 우리는 그 함수들을 호출할 수 있는데요.

```javascript
> Math.sqrt(9)
3
```
`Math.sqrt` 속성은 숫자의 제곱근을 계산하는 함수를 포함합니다.

그 값이 함수인 속성을 '메서드(method)'라고도 부릅니다.


일부 메서드는 자신의 컨테이너를 인식하고 그 내용물로부터 결과를 도출하는데요.

```javascript
> 'hello'.toUpperCase()
'HELLO'
```

## 프로젝트 `log-hello.html`
이제 브라우저 콘솔에서 실제 웹 앱으로 넘어가 보겠습니다.

대략적으로, 웹 앱은 내장된 프로그램을 가진 웹 페이지인데요.

다음 HTML 코드는 자바스크립트 코드를 포함합니다.

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Log hello</title>
</head>
<body>
  <script type="module">
    ···
  </script>
</body>
</html>
```
`<script>` 안에는 다음 자바스크립트 코드가 포함되어 있습니다.

```javascript
const sayHello = (name) => {
  return 'Hello ' + name + '!';
};
const message = sayHello('Terry');
// Log value of `message` to console:
console.log(message);
```
마지막 두 줄만이 우리가 전에 보지 못했던 작업을 수행합니다.


### 주석
마지막에서 두 번째 줄은 '주석(comment)'인데요.

이중 슬래시(`//`)가 코드에 나타날 때마다, 자바스크립트는 그것과 그 뒤에 오는 모든 것을 줄 끝까지 무시합니다.

이를 통해 사람이 코드를 더 잘 이해할 수 있도록 설명을 추가할 수 있습니다.


### `console.log()`
마지막 줄에서, 우리는 `message` 변수의 값을 콘솔에 기록합니다.

전역 객체 `console`에는 콘솔에 값을 보여주는 `.log()` 메서드가 있습니다.


## 프로젝트 `log-clicks.html`
다음 `<body>`가 있는 HTML 페이지가 있다고 가정해 봅시다.

```html
<a id="link" href="">Click here</a>
```
사용자가 이 링크를 클릭할 때마다 자바스크립트 코드를 실행하고 싶은데요.

다음과 같이 달성할 수 있습니다.

```javascript
let count = 1;
const link = document.querySelector('#link');
link.addEventListener(
  'click',
  (event) => {
    event.preventDefault(); // (A)
    console.log('Click ' + count); // (B)
    count = count + 1;
  }
);
```
두 번째 줄에서, 우리는 HTML ID가 `link`인 HTML 요소에 대한 자바스크립트 객체를 가져옵니다.

세 번째 줄에서, 우리는 `link`에 '이벤트 리스너'를 추가하는데요.

이 경우, 우리는 마우스 클릭(그리고 손가락 탭)에 관심이 있으므로 `addEventListener()`의 첫 번째 인자는 `'click'`입니다.

두 번째 인자는 사용자가 `link`를 클릭할 때마다 호출되는 함수입니다.


`<a>` 요소에 `href` 속성이 있으면, 그것을 클릭하면 `href`로 지정된 주소로 이동하는데요.

우리는 그것이 일어나길 원치 않으므로, (A)에서 `event.preventDefault()`를 통해 그것을 막습니다.


`count` 변수는 이벤트 리스너 외부인 첫 번째 줄에서 생성된다는 점에 유의하세요.

이것이 그 값이 함수 호출 사이에 보존되는 이유입니다.


## `123`과 `'123'`의 차이점은 무엇일까요?
이제 숫자와 문자열을 모두 알게 되었으니, 다음 두 값의 차이점은 무엇일까요?

*   `123`은 숫자입니다.

    우리는 그것으로 산술 연산을 수행할 수 있습니다.

*   `'123'`은 문자열입니다.

    우리는 그것을 다른 문자열과 연결할 수 있습니다.


## 숫자와 문자열 사이의 변환
자바스크립트에는 숫자를 문자열로 변환하는 `String()` 함수가 있고요.

문자열을 숫자로 변환하는 `Number()` 함수도 있습니다.

또한, `+` 연산자는 다른 피연산자가 문자열인 경우 숫자를 문자열로 변환합니다.


## 프로젝트 `display-clicks.html`
지금까지 우리는 상태 정보를 표시하기 위해 콘솔을 사용했는데요.

이제 그 상태 정보를 웹 페이지에 바로 표시해 봅시다.

```html
<div>
  <a id="link" href="">Click here</a>
</div>
<div>
  Number of clicks: <span id="clickCount">0</span>
</div>
```
다시 한번 이벤트 리스너를 통해 클릭에 반응하는데요.

```javascript
const link = document.querySelector('#link');
const clickCount = document.querySelector('#clickCount'); // (A)
let count = 1;
link.addEventListener(
  'click',
  (event) => {
    event.preventDefault();
    clickCount.innerText = String(count); // (B)
    count = count + 1;
  }
);
```
(A)에서 ID가 'clickCount'인 HTML 요소를 가져왔고요.

(B)에서 우리는 `count`를 콘솔에 기록하는 대신, 문자열로 변환하여 `clickCount` HTML 요소의 `.innerText` 속성에 저장합니다.

이 특별한 속성은 HTML 요소의 내용을 변경합니다.


## 프로젝트 `temperature-converter.html`
`temperature-converter.html`은 섭씨 온도를 화씨 온도로 변환하는 앱인데요.

두 개의 텍스트 필드가 있습니다.

하나에 숫자를 입력하면, 다른 하나에 올바른 값이 표시됩니다.


자바스크립트 코드는 다음과 같은데요.

```javascript
const celsius = document.querySelector('#celsius');
const fahrenheit = document.querySelector('#fahrenheit');

const celsiusToFahrenheit = (c) => (c * (9/5)) + 32;

celsius.addEventListener(
  'change',
  () => {
    const c = Number(celsius.value); // (B)
    fahrenheit.value = String(celsiusToFahrenheit(c)); // (C)
  }
);
```
이번에는 'change' 이벤트를 수신하는데요.

변경이 있을 때마다(B), 우리는 `celsius.value` 특수 속성을 사용해 텍스트 필드의 내용을 문자열로 가져옵니다.

그 문자열을 `Number()` 함수를 통해 숫자로 변환하고요.

(C)에서 그 결과를 화씨로 변환하고, 다시 문자열로 변환하여 `fahrenheit` 텍스트 필드에 저장하여 사용자 인터페이스에 표시합니다.


텍스트 필드 HTML 요소의 `.value` 특수 속성은 두 가지 방식으로 사용될 수 있는 겁니다.

*   필드의 현재 내용을 가져오기 위해 읽을 수 있습니다.

*   필드 안의 내용을 변경하기 위해 쓸 수 있습니다 (할당).
