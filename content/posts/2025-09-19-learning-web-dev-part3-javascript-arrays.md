---
title: 웹 개발 배우기 3편 - 자바스크립트 배열 완전 정복, 여러 데이터를 한 번에 관리하기
date: 2025-09-19T10:07:51+09:00
tags:
  - 웹 개발 배우기
  - 자바스크립트 기초
  - 자바스크립트 배열
  - 배열 사용법
  - 매직 8볼
  - 데이터 구조
  - 코딩 시리즈
description: 웹 개발 배우기 시리즈 3편입니다. 여러 데이터를 한 번에 관리하는 자바스크립트 배열의 개념과 사용법을 배우고, 매직 8볼 예제를 통해 실전 활용법을 익힙니다.
---
![웹 개발 배우기 3편 - 자바스크립트 배열 완전 정복, 여러 데이터를 한 번에 관리하기](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

이번 시간에는 변수에 하나 이상의 값을 저장하는 한 가지 방법, 바로 '배열'에 대해 살펴볼 겁니다.

## 배열 변수에 하나 이상의 값 저장하기
지금까지 우리가 만나본 값들(숫자와 문자열)이 종이 한 장이라면, 배열은 종이 한 묶음과 같은데요.
배열이 어떻게 작동하는지 한번 탐색해 보겠습니다.

배열을 만들어 `arr` 변수에 할당해 볼까요?
```javascript
> const arr = ['a', 'b', 'c'];
```
우리는 세 개의 문자열을 포함하는 배열을 만들었습니다.
문법은 다음과 같이 작동하거든요.
*   여는 대괄호로 시작해서,
*   쉼표로 구분된 배열의 '요소(element)'들이 이어지고,
*   닫는 대괄호로 끝납니다.

배열을 만드는 이 문법을 '배열 리터럴'이라고 부르는데요.
우리는 이미 다른 종류의 리터럴들을 본 적이 있습니다.
숫자 리터럴, 문자열 리터럴 같은 것들이죠.

`arr`에 있는 배열은 몇 개의 요소를 가지고 있을까요?
```javascript
> arr.length
3
```
배열 요소는 0부터 시작하는 숫자 위치인 '인덱스'를 통해 접근하는데요.
요소를 읽을 수도 있고요.
```javascript
> arr[0]
'a'
```
요소를 쓸 수도 있습니다.
```javascript
> arr[0] = 'x';
> arr
[ 'x', 'b', 'c' ]
```
마지막 배열 요소의 인덱스는 항상 `.length` 빼기 1입니다.
```javascript
> arr[arr.length - 1]
'c'
```
다른 값들을 쉽게 접근할 수 있는 방식으로 포함하는 값을 '자료 구조'라고 하는데요.
배열은 바로 그런 자료 구조입니다.

## `const`와 함께 사용해도 배열은 변경 가능합니다
왜 `arr`이 `const` 변수인데도 배열을 변경할 수 있을까요?
`const`는 변수라는 상자 안에 '다른 값'을 넣는 것만 막거든요.
만약 상자 안에 '변경 가능한(mutable)' 값이 들어 있다면, `const`는 그 값을 변경하는 것을 막지 않습니다.

참고로 숫자, 문자열, `undefined`는 모두 '변경 불가능(immutable)'한데요.
변경될 수 없고, 오직 교체될 수만 있습니다.

## 한 줄 주석 vs. 여러 줄 주석
`//` 주석은 한 줄에만 존재하기 때문에 '한 줄 주석'이라고 불리는데요.
'여러 줄 주석'도 있습니다.
여러 줄 주석은 끝이 명시적으로 표시되며 여러 줄에 걸쳐 작성될 수 있습니다.
```javascript
/* 여러 줄 주석
   세 줄에 걸쳐
   작성됨 */
```

## 프로젝트 `magic-8-ball.html`
'매직 8볼' 앱을 구현해 보겠습니다.
사용자가 마음속으로 '예/아니오' 질문을 생각한 후 버튼을 누르면, 앱이 대답을 표시하는 건데요.
사용자 인터페이스는 HTML에서 다음과 같이 보입니다.
```html
<ol>
  <li>Ask a yes-no question!</li>
  <li><button id="answerButton">Click to show answer</button></li>
</ol>
<p id="answerPlaceholder"></p>
```
마지막 줄의 `<p>`는 우리가 자바스크립트를 통해 최종적으로 답변을 채워 넣을 빈 공간입니다.

다음은 자바스크립트 코드의 축약 버전인데요.
```javascript
const answers = [ // (A)
  'It is certain',
  'It is decidedly so',
  // Etc.
];

const answerButton = document.querySelector('#answerButton');
const answerPlaceholder = document.querySelector('#answerPlaceholder');

answerButton.addEventListener(
  'click',
  () => { // (B)
    const answerIndex = getRandomInteger(answers.length);
    const answer = answers[answerIndex];
    answerPlaceholder.innerText = 'Answer: ' + answer;
  }
);
```
(A)에서 시작하는 배열 리터럴은 우리가 지금까지 본 것과는 약간 다르게 작성되었는데요.
리터럴이 여러 줄에 걸쳐 있고, 맨 끝에 '트레일링 콤마'라는 쉼표가 있습니다.
자바스크립트는 트레일링 콤마를 무시합니다.

(B)에서 우리는 클릭 이벤트에 반응하는데요.
`<a>` 태그와 달리 `<button>`은 기본 동작이 없기 때문에 `event.preventDefault()`를 호출할 필요가 없습니다.

이벤트 리스너는 무엇을 할까요?
*   먼저 `getRandomInteger` 함수를 사용해 `0` 이상 `answers.length` 미만의 정수 값을 계산합니다.
*   둘째, `answers` 배열에서 답변 하나를 읽어옵니다.
*   셋째, `answerPlaceholder` HTML 요소의 특수 속성인 `.innerText`에 문자열을 할당하여 해당 답변을 HTML 페이지에 표시합니다.

### `getRandomInteger()`는 어떻게 작동할까요?
`getRandomInteger()` 함수의 코드는 다음과 같은데요.
```javascript
/* 0 <= i < max 인 임의의 정수 i를 반환합니다 */
const getRandomInteger = (max) => {
  return Math.floor(Math.random() * max);
};
```
이 함수가 의도대로 작동한다고 믿으셔도 되지만, 여기서 무슨 일이 일어나는지 알아내는 것도 재미있을 겁니다.
*   먼저 `Math.random()`을 사용해 `0` 이상 `1` 미만의 임의의 숫자를 계산합니다.
*   다음으로, 그 임의의 숫자에 `max` 매개변수를 곱합니다.
*   결과는 아직 정수가 아닌데요.
    `Math.floor()`를 사용해 정수로 반올림(내림)합니다.

예를 들어, `max`가 `5`라고 가정해 봅시다.
`Math.random()`의 결과가 `1`에 가까우면 `4`가 되고, `0`에 가까우면 `0`이 됩니다.

## 연습 문제 (해결책 없음)
`magic-8-ball.html`을 수정하여 무작위로 다른 것을 표시하도록 변경해보세요.
예를 들면 농담, 명언, 색상 같은 것들 말이죠.