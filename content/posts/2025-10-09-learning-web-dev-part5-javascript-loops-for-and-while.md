---
title: 웹 개발 배우기 5편 - 자바스크립트 반복문, for와 while로 지루한 작업 자동화하기
description: 코딩의 기본기, 자바스크립트 반복문의 모든 것을 알아봅니다. for...of 부터 클래식 for, while 루프까지, 이제 반복 작업은 두렵지 않을 겁니다.
date: 2025-10-09 10:00:00 +0900
series: ["웹 개발 배우기"]
weight: 5
tags:
  - JavaScript
  - Tutorial
  - Loop
  - Beginner
  - WebDev
---
![웹 개발 배우기 5편 - 자바스크립트 반복문, for와 while로 지루한 작업 자동화하기](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

이번 시간에는 자바스크립트에서 어떤 작업을 반복적으로 수행하는 방법에 대해 알아볼 겁니다.

## 순회 가능한 데이터 (Iterable data)
자바스크립트의 다양한 값들은 '순회 가능(iterable)'한데요.
이들로부터 값의 시퀀스를 추출할 수 있다는 의미입니다.
순회 가능한 값을 받는 연산에는 다음과 같은 것들이 있습니다.

*   `for-of` (다음 섹션에서 설명)는 순회 가능한 값들을 반복합니다.
*   `Array.from()`은 순회 가능한 값을 배열로 변환합니다.
*   구조 분해 할당 (다음 섹션에서 설명)

순회 가능한 값에는 배열과 문자열이 포함됩니다.
즉, `Array.from()`을 사용해 문자열을 배열로 변환할 수 있다는 의미죠.
```javascript
> Array.from('abc')
[ 'a', 'b', 'c' ]
```

## `for-of` 반복문
'반복문(loop)'은 동일한 코드 조각을 0번 이상 실행하는 자바스크립트 구문인데요.
가장 인기 있는 반복문은 `for-of`입니다.
```javascript
const arr = ['ready', 'set', 'go'];
for (const elem of arr) { // (A)
  console.log(elem);
}
```
(A) 줄 끝에서 시작하는 중괄호 안의 코드 블록을 '반복문의 본문(body)'이라고 부릅니다.
이 반복문은 `arr` 배열을 순회하는데요.
본문을 한 번 실행하는 것을 '반복(iteration)'이라고 부릅니다.

콘솔에는 다음과 같이 기록됩니다.
```
ready
set
go
```
`for-of`는 어떤 순회 가능한 값이든 반복할 수 있기 때문에, 문자열과 함께 사용할 수도 있습니다.

### `[인덱스, 값]` 쌍에 대한 `for-of` 반복문
때로는 배열의 요소뿐만 아니라 그 요소들의 인덱스에도 접근하고 싶을 때가 있는데요.
다음과 같이 할 수 있습니다.
```javascript
const arr = ['ready', 'set', 'go'];
for (const [index, value] of arr.entries()) {
  console.log(index + '. ' + value);
}
```
출력 결과는 다음과 같습니다.
```
0. ready
1. set
2. go
```
이 다른 반복 구문이 어떻게 작동하는지 알아볼까요?

#### `array.entries()`
배열 메서드 `.entries()`는 순회 가능한 데이터 구조를 반환하는데요.
그 요소들은 `[인덱스, 값]` 쌍입니다.
각 쌍은 두 개의 요소를 가진 배열로 표현됩니다.

#### 배열 구조 분해 할당
`const [index, value]`는 변수에 값을 할당하는 다른 방법, 이른바 '배열 구조 분해 할당'을 제공하는데요.
변수 `index`와 `value`는 배열을 포함한 어떤 순회 가능한 값으로부터 데이터를 얻습니다.
```javascript
> const [english, german] = ['yes', 'ja'];
> english
'yes'
```
다음 코드는 구조 분해 할당을 사용한 반복문과 그렇지 않은 반복문을 보여주는데요.
구조 분해 할당의 편리함을 잘 보여줍니다.
```javascript
for (const [index, value] of ['yes', 'no', 'maybe'].entries()) {
  console.log(index + '. ' + value);
}
for (const pair of ['yes', 'no', 'maybe'].entries()) {
  console.log(pair[0] + '. ' + pair[1]);
}
```

## 메서드를 위한 표기법 `type.methodName()`
"배열의 `.push()` 메서드"를 표현하기 위해, `array.push()`와 `Array.prototype.push()` 두 가지 표기법이 일반적인데요.
우리는 첫 번째 표기법을 사용할 겁니다.

## `array.push()`
배열 메서드 `.push()`는 배열의 끝에 값을 추가하여 길이를 1만큼 늘립니다.
```javascript
> const arr = [];
> arr.push('a')
> arr
[ 'a' ]
```
### `array.push()`와 반복문으로 배열 처리하기
배열을 처리하는 한 가지 일반적인 기법은 다음과 같은데요.
*   출력 배열은 처음에 비어 있습니다.
*   입력 배열을 반복합니다.
    반복마다 출력 배열에 0개 이상의 요소를 푸시합니다.

다음 함수가 그 예시입니다.
```javascript
const extractNonEmptyStrings = (strs) => {
  const result = [];
  for (const str of strs) {
    if (str.length > 0) {
      result.push(str);
    }
  }
  return result;
};
```

## `array.join()`
다음 프로젝트에서는 배열 메서드 `.join()`이 필요한데요.
이 메서드는 배열 안의 모든 문자열을 하나의 문자열로 연결하여 문자열을 만듭니다.
인자로 제공된 문자열을 요소들 사이에 넣거든요.
```javascript
> ['a', 'b', 'c'].join(', ')
'a, b, c'
```

## 프로젝트 `fruits-you-like-fixed.html`
이 프로젝트의 사용자 인터페이스는 다음과 같이 작동하는데요.
입력은 과일에 대한 체크박스가 있는 순서 없는 목록에서 오고, 출력은 선택된 과일을 나열하는 텍스트인 단락으로 갑니다.
체크박스가 선택되거나 선택 해제될 때마다 다음 함수가 호출됩니다.
```javascript
const updateFeedback = () => {
  const selectedFruits = [];
  for (const i of document.querySelectorAll('input')) { // (A)
    if (i.checked) { // (B)
      selectedFruits.push(i.value);
    }
  }
  document.querySelector('#feedbackSpan').innerText =
    selectedFruits.join(', ');
};
```
먼저 선택된("체크된") 모든 과일의 이름을 수집한 다음, 쉼표로 구분하여 `#feedbackSpan`에 보여줍니다.

### 변경사항 수신하기
사용자가 체크박스를 변경하는 것을 어떻게 수신할까요?
한 가지 옵션은 각 체크박스에 'change' 리스너를 추가하는 것입니다.
하지만 대안이 있는데요.
각 이벤트는 먼저 소스의 리스너로 보내진 다음, 소스의 부모, 부모의 부모 등으로 전달됩니다.
이를 '이벤트 버블링'이라고 합니다.

이 프로젝트에서는 `<ul>` 요소에서 체크박스 'change' 이벤트를 수신합니다.
```javascript
document.querySelector('ul')
  .addEventListener('change', (event) => {
    updateFeedback();
  });
```

## 텍스트 조각 조립하기
다음 프로젝트를 위해, 우리는 자바스크립트를 통해 HTML을 생성하고 싶은데요.
이를 편안하게 하기 위해 `+=` 연산자와 템플릿 리터럴이라는 두 가지 새로운 도구를 배워야 합니다.

### 숫자와 문자열을 위한 `+=` 연산자
`+=`는 축약형인데요.
`myVar += value;`와 `myVar = myVar + value;` 두 표현식은 동일합니다.
이 연산자는 숫자에 사용할 수도 있고, 문자열을 연결하는 데 사용할 수도 있습니다.

### `+=`로 문자열 결합하기
우리는 `.join()` 배열 메서드를 이미 사용해 보았는데요.
`+=`를 사용해 이 메서드를 직접 구현할 수 있습니다.
```javascript
const joinStrings = (strs, separator) => {
  let result = '';
  for (const [index, str] of strs.entries()) {
    if (index > 0) {
      result += separator;
    }
    result += str;
  }
  return result;
};
```

### 템플릿 리터럴
'템플릿 리터럴'은 문자열 리터럴과 유사하게 문자열을 만드는 또 다른 방법을 제공하는데요.
템플릿 리터럴의 내용은 백틱으로 구분됩니다.
`const str = \`This is a template literal!\`;`

템플릿 리터럴에는 문자열 리터럴에는 없는 한 가지 기능이 있는데요.
값을 '보간(interpolate)', 즉 삽입할 수 있습니다.
```javascript
> const num = 99;
> `${num} bottles of juice on the wall`
'99 bottles of juice on the wall'
```
템플릿 리터럴은 여러 줄에 걸쳐 작성할 수도 있습니다.

## 프로젝트 `fruits-you-like-generated.html`
`fruits-you-like-generated.html`은 체크박스가 고정된 HTML을 통해 생성되지 않는다는 점을 제외하고는 `fruits-you-like-fixed.html`과 거의 같은데요.
`<li>` 요소들은 다음 자바스크립트 코드를 통해 생성됩니다.
```javascript
const fruits = ['apples', 'bananas', /* ... */];

const ul = document.querySelector('ul');
for (const f of fruits) {
  const html = `
    <li>
      <label>
        <input type="checkbox" value="${f}"> ${f}
      </label>
    </li>
  `;
  ul.insertAdjacentHTML('beforeend', html); // (A)
}
```
(A)에서 우리는 HTML 요소의 `.insertAdjacentHTML()` 메서드를 사용해 마치 손으로 작성한 것처럼 웹 페이지에 HTML 코드를 삽입했습니다.

### 용어 정리 정적 HTML vs. 동적 HTML
*   **정적 HTML**은 우리가 "고정된 HTML"이라고 부르던 것인데요.
    손으로 직접 작성하는 HTML입니다.
*   **동적 HTML**은 자바스크립트 코드를 통해 생성되는 HTML입니다.

## `break`를 통해 일찍 반복문 나가기
`break`를 사용하면 반복문을 나가고 반복문 뒤에서 실행을 계속할 수 있는데요.
다음 `firstStrStartingWithA()`의 동등한 구현은 `break`를 사용합니다.
```javascript
const firstStrStartingWithA = (strs) => {
  let result = undefined;
  for (const str of strs) {
    if (str.startsWith('A')) {
      result = str;
      break;
    }
  }
  return result;
};
```