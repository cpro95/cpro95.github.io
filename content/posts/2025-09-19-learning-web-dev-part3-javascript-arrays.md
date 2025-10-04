---
title: 웹 개발 배우기 3편 - 자바스크립트 배열 완전 정복, 여러 데이터를 한 번에 관리하기
date: 2025-09-19T10:07:51+09:00
pin: false
draft: false
tags:
  - 웹 개발 배우기
  - 자바스크립트 기초
  - 자바스크립트 배열
  - 배열 사용법
  - 매직 8볼
  - 데이터 구조
  - 코딩 시리즈
summary: 웹 개발 배우기 시리즈 3편입니다. 여러 데이터를 한 번에 관리하는 자바스크립트 배열의 개념과 사용법을 배우고, 매직 8볼 예제를 통해 실전 활용법을 익힙니다.
---
# 웹 개발 배우기 3편 - 자바스크립트 배열 완전 정복, 여러 데이터를 한 번에 관리하기

![](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

'웹 개발 배우기' 시리즈의 세 번째 시간이 돌아왔는데요.

이번 챕터에서는 하나의 변수에 여러 개의 값을 저장하는 방법, 바로 '배열(Array)'에 대해 자세히 알아볼 예정입니다.<br />

## 배열 여러 값을 하나의 변수에 담기

<br />
지금까지 우리가 다룬 숫자나 문자열 같은 값들이 종이 한 장이라면, 배열은 이 종이들을 차곡차곡 쌓아놓은 '묶음'이라고 생각할 수 있거든요.


이제부터 배열이 어떻게 작동하는지 함께 살펴보겠습니다.



먼저 배열을 하나 만들어 `arr`이라는 변수에 할당해 볼 텐데요.


코드는 이렇게 작성합니다.<br />

```javascript
> const arr = ['a', 'b', 'c'];
```

이렇게 하면 세 개의 문자열을 담고 있는 배열 하나가 만들어집니다.


배열을 만드는 문법은 대괄호 `[]`로 시작해서 쉼표로 구분된 요소들을 나열하고, 다시 대괄호로 닫는 방식이거든요.


이런 문법을 '배열 리터럴'이라고 부르는데, 우리는 이미 숫자 리터럴(`5`, `-2`)이나 문자열 리터럴(`'abc'`) 같은 것들을 본 적이 있습니다.



배열에 몇 개의 요소가 들어있는지는 `.length`로 확인할 수 있거든요.<br />

```javascript
> arr.length
3
```

결과는 `3`이 나옵니다.


배열의 각 요소에는 0부터 시작하는 '인덱스(index)'라는 번호를 통해 접근할 수 있는데요.


요소를 읽어올 수도 있고,<br />

```javascript
> arr[0]
'a'
```

새로운 값으로 바꿀 수도 있습니다.<br />

```javascript
> arr[0] = 'x';
> arr
[ 'x', 'b', 'c' ]
```

배열의 마지막 요소 인덱스는 항상 `.length - 1`이거든요.


이 점은 꼭 기억해두시는 것이 좋습니다.<br />

```javascript
> arr[arr.length - 1]
'c'
```

이렇게 여러 값을 담고 쉽게 접근할 수 있게 해주는 구조를 '데이터 구조'라고 부르는데요.


배열은 바로 이 데이터 구조의 한 종류입니다.<br />

## const로 선언해도 배열은 바꿀 수 있어요

<br />
그런데 `arr`은 `const` 변수인데 어떻게 배열의 내용을 바꿀 수 있었을까요? 궁금하실 텐데요.


`const`는 변수라는 상자 자체를 다른 것으로 교체하지 못하게 막을 뿐, 상자 안에 들어있는 내용물이 '변경 가능한(mutable)' 값이라면 그 내용물을 바꾸는 것까지 막지는 못합니다.


참고로 숫자나 문자열은 '변경 불가능한(immutable)' 값이라서, 값을 바꾸는 것처럼 보여도 실제로는 새로운 값으로 교체되는 것이거든요.


아래 코드에서 `num` 변수에 담긴 숫자 `0`이 바뀌는 게 아니라, `num + 1`의 결과인 새로운 숫자 `1`이 `num`이라는 상자에 새로 담기는 원리입니다.<br />

```javascript
let num = 0;
num = num + 1;
```

## 한 줄 주석과 여러 줄 주석

<br />
`//`로 시작하는 주석은 '한 줄 주석'이라고 불렀는데요.


자바스크립트에는 여러 줄에 걸쳐 주석을 작성할 수 있는 '여러 줄 주석'도 있습니다.


`/*`로 시작해서 `*/`로 끝나거든요.<br />

```javascript
/* 이렇게 한 줄에 다 쓸 수도 있고, */

/*
이렇게
여러 줄에 걸쳐
작성할 수도 있습니다.
*/
```

이런 주석들은 자바스크립트가 코드를 실행할 때 완전히 무시합니다.<br />

## 프로젝트 매직 8볼 만들기

<br />
이제 배열을 활용해서 '매직 8볼(Magic 8 Ball)' 앱을 만들어 볼 건데요.


사용자가 마음속으로 예/아니오 질문을 생각하고 버튼을 누르면, 앱이 랜덤으로 답변을 보여주는 간단한 프로그램입니다.


먼저 HTML로 사용자 인터페이스를 만듭니다.<br />

```html
<ol>
  <li>예/아니오로 답할 수 있는 질문을 생각하세요!</li>
  <li><button id="answerButton">결과 확인하기</button></li>
</ol>
<p id="answerPlaceholder"></p>
```

마지막 줄의 `<p>` 태그는 나중에 자바스크립트로 답변을 채워 넣을 빈 공간입니다.


자바스크립트 코드의 핵심 부분은 다음과 같은데요.<br />

```javascript
const answers = [
  // (A)
  "당연하죠",
  "분명히 그렇게 될 겁니다",
  "전적으로 동의합니다",
  // 등등...
];

const answerButton = document.querySelector("#answerButton");
const answerPlaceholder = document.querySelector("#answerPlaceholder");

answerButton.addEventListener("click", () => {
  // (B)
  const answerIndex = getRandomInteger(answers.length);
  const answer = answers[answerIndex];
  answerPlaceholder.innerText = "답변: " + answer;
});
```

A라인에서 시작하는 배열 리터럴은 여러 줄에 걸쳐 작성되었는데요.


이렇게 코드를 여러 줄로 나누면 가독성이 좋아집니다.


B라인에서는 버튼의 'click' 이벤트에 반응하는 이벤트 리스너를 추가했는데요.


이벤트 리스너는 먼저 `answers` 배열의 인덱스로 사용할 무작위 숫자를 하나 구합니다.


그런 다음, 그 인덱스를 사용해 `answers` 배열에서 답변 하나를 꺼내오거든요.


마지막으로, 꺼내온 답변을 `answerPlaceholder` 요소의 `innerText`로 설정해서 화면에 보여주게 됩니다.



## getRandomInteger 함수는 어떻게 작동할까요

<br />
그렇다면 답변을 무작위로 고르기 위해 사용한 `getRandomInteger()` 함수는 어떻게 작동하는 걸까요?


코드와 함께 원리를 차근차근 살펴보겠습니다.<br />

```javascript
/* 0 <= i < max 범위의 무작위 정수 i를 반환합니다 */
const getRandomInteger = max => {
  return Math.floor(Math.random() * max);
};
```

먼저 `Math.random()`은 0 이상 1 미만의 무작위 숫자를 만들어내거든요.


즉, 0은 나올 수 있지만 1은 절대 나오지 않습니다.


그다음 이 무작위 숫자에 `max` 값을 곱하는데요.


무작위 숫자가 항상 1보다 작기 때문에, 곱한 결과 역시 항상 `max`보다 작을 수밖에 없습니다.


마지막으로 `Math.floor()`를 사용해서 이 결과를 정수로 만드는데요.


`Math.floor()`는 소수점 아래를 버리고 가장 가까운 정수로 '내림'하는 역할을 합니다.


예를 들어 `max`가 `5`라고 가정하면, `Math.random()`이 `0.999`가 나오더라도 `0.999 * 5`는 `4.995`가 되고, `Math.floor(4.995)`의 최종 결과는 `4`가 되는 것이죠.


결과적으로 이 함수는 0부터 `max-1`까지의 무작위 정수 중 하나를 안전하게 반환해 줍니다.


