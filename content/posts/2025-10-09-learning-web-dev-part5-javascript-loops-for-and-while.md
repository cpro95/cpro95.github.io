---
title: 웹 개발 배우기 5편 - 자바스크립트 반복문, for와 while로 지루한 작업 자동화하기
summary: 코딩의 기본기, 자바스크립트 반복문의 모든 것을 알아봅니다. for...of 부터 클래식 for, while 루프까지, 이제 반복 작업은 두렵지 않을 겁니다.
date: 2025-10-09 10:00:00 +0900
draft: false
tags:
  - JavaScript
  - Tutorial
  - Loop
  - Beginner
  - WebDev
---

# 웹 개발 배우기 5편 - 자바스크립트 반복문, for와 while로 지루한 작업 자동화하기

![](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

코드를 짜다 보면 똑같은 작업을 수없이 반복해야 할 때가 있거든요.

이럴 때 우리를 구원해 줄 마법 같은 도구가 바로 '반복문'입니다.

오늘은 자바스크립트에서 반복 작업을 아주 우아하게 처리하는 법을 제대로 파헤쳐 볼 건데요.

기본부터 실전 프로젝트까지, 차근차근 따라오시면 어느새 반복문의 달인이 되어 있을 겁니다.

## 반복의 기본 전제 '순회 가능한 데이터'

자바스크립트에는 반복문이 순서대로 값을 꺼내올 수 있는, 소위 '순회 가능한(iterable)' 데이터 타입들이 존재하는데요.

이런 데이터가 있어야 반복문이 제 역할을 할 수 있습니다.

대표적으로는 배열(Array)과 문자열(String)이 있는데요.

이들은 `for...of` 같은 반복문과 함께 쓰이거나, `Array.from()` 메서드를 통해 배열로 변환될 수 있습니다.

예를 들어, 문자열을 `Array.from()`에 넣으면 각 글자가 분리된 배열이 만들어지거든요.

```javascript
Array.from('abc'); // 결과: [ 'a', 'b', 'c' ]
```

정말 간단하죠?

이제 이 순회 가능한 데이터를 가지고 본격적으로 반복문을 돌려보겠습니다.

## 가장 직관적인 반복문 for...of

요즘 자바스크립트에서 가장 사랑받는 반복문은 단연 `for...of`인데요.

코드 블록을 0번 혹은 그 이상, 특정 횟수만큼 실행시키는 역할을 합니다.

```javascript
const arr = ['준비', '시작', '출발'];

for (const elem of arr) {
  console.log(elem);
}
```

위 코드를 보면 `arr`이라는 배열의 요소를 하나씩 순서대로 꺼내 `elem`이라는 변수에 담고, 중괄호 `{}` 안의 코드, 즉 '루프의 몸통(body)'을 실행하는데요.

이 루프는 배열 `arr`의 모든 요소를 순회하게 됩니다.

먼저 `arr[0]`인 '준비'를 `elem`에 할당하고 몸통을 실행하고, 다음엔 `arr[1]`인 '시작'을 할당해서 실행하는 식이죠.

몸통이 한 번 실행되는 것을 '루프 이터레이션(loop iteration)'이라고 부릅니다.

콘솔에는 아래와 같이 찍히게 될 거고요.

```
준비
시작
출발
```

`for...of`는 순회 가능한 모든 데이터에 쓸 수 있기 때문에 문자열에도 당연히 적용되는데요.

결과는 예상하시는 그대로입니다.

```javascript
for (const ch of 'abc') {
  console.log(ch);
}
// 결과:
// a
// b
// c
```

### 인덱스와 값을 동시에 얻는 법

그런데 가끔은 배열의 값뿐만 아니라 그 값이 몇 번째에 있는지, 즉 '인덱스' 정보도 함께 필요할 때가 있거든요.

그럴 땐 배열의 `.entries()` 메서드와 '구조 분해 할당(Destructuring)'을 활용하면 됩니다.

```javascript
const arr = ['준비', '시작', '출발'];

for (const [index, value] of arr.entries()) {
  console.log(index + '. ' + value);
}
// 결과:
// 0. 준비
// 1. 시작
// 2. 출발
```

조금 복잡해 보이지만, 하나씩 뜯어보면 정말 별거 아닌데요.

우선 `.entries()`는 배열의 각 요소를 `[인덱스, 값]` 형태의 쌍으로 묶어서 새로운 순회 가능한 데이터로 만들어주는 메서드입니다.

```javascript
Array.from(['a', 'b'].entries());
// 결과: [ [ 0, 'a' ], [ 1, 'b' ] ]
```

그 다음 `const [index, value]` 부분이 바로 '배열 구조 분해 할당'인데요.

마치 상자를 열어서 내용물을 각각 다른 변수에 담는 것처럼, `[0, 'a']`와 같은 배열의 요소를 `index`와 `value` 변수에 순서대로 쏙쏙 할당해주는 문법입니다.

덕분에 우리는 코드를 훨씬 깔끔하게 작성할 수 있거든요.

```javascript
// 구조 분해 할당 사용
for (const [index, value] of ['네', '아니오', '아마도'].entries()) {
  console.log(index + '. ' + value);
}

// 구조 분해 할당 미사용
for (const pair of ['네', '아니오', '아마도'].entries()) {
  console.log(pair[0] + '. ' + pair[1]);
}
```

두 코드는 똑같이 동작하지만, 구조 분해 할당을 쓴 쪽이 훨씬 더 읽기 편하다는 걸 바로 알 수 있습니다.

## 개발자의 오랜 친구 클래식 for 루프

`for...of`가 편리하긴 하지만, 때로는 더 정밀한 제어가 필요한 순간이 있는데요.

이럴 때 바로 클래식 `for` 루프가 등장합니다.

C나 Java 같은 다른 언어에 익숙하시다면 아주 반가운 얼굴일 텐데요.

세미콜론으로 구분된 세 부분으로 구성됩니다.

`for (초기화; 조건; 증감)` 형태입니다.

```javascript
for (let i = 0; i < 5; i++) {
  console.log('현재 숫자는 ' + i + '입니다.');
}
```

1.  `let i = 0`: 루프가 시작되기 전, 딱 한 번 실행되는 '초기화' 부분입니다.

 보통 카운터 변수를 만들죠.

2.  `i < 5`: 루프의 몸통이 실행되기 전에 매번 확인하는 '조건' 부분인데요.

 이 조건이 `true`여야만 루프가 계속됩니다.

3.  `i++`: 루프의 몸통이 한 번 실행된 후에 실행되는 '증감' 부분입니다.

 주로 카운터 변수를 1씩 증가시키죠.

이 루프는 `i`가 0부터 4까지 변하는 동안 총 5번 실행됩니다.

`for...of`와 달리 인덱스를 직접 제어할 수 있어서 배열을 거꾸로 순회하는 등의 작업도 가능합니다.

## 조건이 핵심인 while 루프

이번엔 `while` 루프를 만나볼 차례인데요.

이 친구는 반복 횟수가 정해져 있지 않고, 오직 '특정 조건이 참인 동안' 계속해서 코드를 실행합니다.

```javascript
let count = 0;

while (count < 3) {
  console.log('아직 괜찮아!');
  count++;
}

console.log('이제 그만!');
```

`while` 뒤의 괄호 안 조건 `(count < 3)`이 `true`인 동안 몸통 안의 코드가 반복적으로 실행되거든요.

여기서 아주 중요한 점은, 루프 몸통 안에서 언젠가는 조건을 `false`로 만드는 코드가 반드시 있어야 한다는 것입니다.

위 예제에서는 `count++`가 그 역할을 하죠.

만약 이 코드가 없다면 `count`는 영원히 0에 머물고, `count < 3` 조건은 항상 참이 되어 '무한 루프'에 빠지게 됩니다.

브라우저가 멈춰버리는 끔찍한 경험을 할 수 있으니 `while`문을 쓸 땐 항상 조심해야 합니다.

## 실전처럼 데이터 가공하기

반복문은 주로 데이터를 가공하는 데 쓰이는데요.

가장 흔한 패턴은 빈 배열을 하나 만들어두고, 반복문을 돌면서 조건에 맞는 값들만 골라 이 배열에 추가하는 방식입니다.

배열의 끝에 요소를 추가할 때는 `.push()` 메서드를 사용하는데요.

```javascript
const arr = [];

arr.push('a');

// arr은 이제 ['a']
arr.push('b');

// arr은 이제 ['a', 'b']
```

이걸 활용해서 비어있지 않은 문자열만 골라내는 함수를 만들어 보겠습니다.

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

extractNonEmptyStrings(['네', '', '아니오', '', '아마도']);
// 결과: [ '네', '아니오', '아마도' ]
```

아주 간단하지만 강력한 데이터 처리 로직이 완성되었습니다.

## 동적 HTML 생성을 위한 도구들

이제 배운 반복문을 활용해서 웹 페이지의 내용을 동적으로 만들어보는 프로젝트를 진행해 볼 건데요.

그 전에 몇 가지 유용한 도구를 먼저 익혀야 합니다.

### 1. 문자열과 숫자를 누적하는 `+=` 연산자

`+=` 연산자는 기존 변수의 값에 새로운 값을 더해서 다시 할당하는 축약 표현인데요.

`myVar = myVar + value;`를 `myVar += value;`로 줄여 쓸 수 있습니다.

숫자 덧셈은 물론, 문자열을 이어 붙이는 데도 아주 유용하게 쓰입니다.

```javascript
let str = '';

str += '아이스 ';
 // str은 '아이스 '

str += '크림';
   // str은 '아이스 크림'
```

### 2. 변수를 품는 문자열 '템플릿 리터럴'

따옴표(`'` 또는 `"`) 대신 백틱(`` ` ``)으로 감싸 만드는 문자열을 '템플릿 리터럴'이라고 하는데요.

이 친구의 가장 큰 특징은 문자열 안에 변수나 표현식을 아주 쉽게 집어넣을 수 있다는 점입니다.

`${...}` 구문을 사용하면 되거든요.

```javascript
const num = 99;

const message = `${num}개의 주스 병이 벽에`;

// message는 '99개의 주스 병이 벽에'
```

또한, 템플릿 리터럴은 여러 줄에 걸쳐 문자열을 작성할 수도 있어서 HTML 코드를 만들 때 정말 편리합니다.

## 프로젝트 좋아하는 과일 목록 만들기

이제 본격적으로 프로젝트를 진행해 보겠습니다.

먼저, 과일 목록이 HTML에 고정되어 있고, 사용자가 체크박스를 선택하면 선택된 과일 목록을 보여주는 간단한 웹 앱을 만들어 볼 건데요.

사용자가 체크박스를 클릭할 때마다 `updateFeedback` 함수가 호출됩니다.

```javascript
const updateFeedback = () => {
  const selectedFruits = [];

  for (const i of document.querySelectorAll('input')) { // 모든 input 태그 선택
    if (i.checked) { // 체크된 상태인지 확인
      selectedFruits.push(i.value);
      // 체크된 과일의 값을 배열에 추가
    }
  }
  // 배열의 요소들을 ', '로 연결하여 화면에 표시
  document.querySelector('#feedbackSpan').innerText =
    selectedFruits.join(', ');
};

// <ul> 태그에서 'change' 이벤트가 발생할 때마다 updateFeedback 함수 실행
document.querySelector('ul').addEventListener('change', (event) => {
    updateFeedback();
});
```

`document.querySelectorAll('input')`은 페이지의 모든 `<input>` 요소를 가져오고, `for...of` 루프는 이 요소들을 하나씩 순회하는데요.

각 input 요소의 `.checked` 속성을 통해 선택 여부를 확인하고, 선택된 과일의 `value`만 `selectedFruits` 배열에 `push`합니다.

마지막으로, 배열 메서드인 `.join(', ')`을 사용해서 배열의 모든 요소를 쉼표와 공백으로 연결한 뒤 화면에 보여주는 거죠.

### 프로젝트 업그레이드 동적으로 목록 생성하기

이번에는 한 단계 더 나아가 볼 건데요.
HTML에는 텅 빈 `<ul>` 태그만 두고, 자바스크립트 배열에 담긴 과일 목록을 사용해서 동적으로 체크박스를 생성해 보겠습니다.

```javascript
const fruits = [
  '사과',
  '바나나',
  '오렌지',
  '딸기',
  '수박',
];

const ul = document.querySelector('ul');

for (const f of fruits) {
  const html = `
    <li>
      <label>
        <input type="checkbox" value="${f}"> ${f}
      </label>
    </li>
  `;
  ul.insertAdjacentHTML('beforeend', html);
}
```

`fruits` 배열을 `for...of` 루프로 순회하면서 각 과일에 대한 HTML 코드를 템플릿 리터럴로 생성하는데요.

그리고 `.insertAdjacentHTML('beforeend', html)` 메서드를 사용해서 생성된 HTML 코드를 `<ul>` 태그의 맨 끝 자식 요소로 계속해서 추가해줍니다.

이렇게 자바스크립트로 생성된 HTML을 '동적 HTML'이라고 부르는데요.

데이터만 바꾸면 화면이 알아서 바뀌기 때문에 훨씬 유연하고 강력한 웹 페이지를 만들 수 있습니다.

## 루프를 제어하는 특별한 키워드

때로는 루프가 끝까지 다 돌기 전에 멈추거나, 특정 조건에서 현재 순서를 건너뛰고 싶을 때가 있는데요.

이럴 때 `break`와 `continue` 키워드를 사용합니다.

`break`: 루프를 즉시 중단하고 루프 다음 코드로 실행 흐름을 옮깁니다.

 원하는 것을 찾았을 때 더 이상 불필요한 반복을 하지 않기 위해 사용되죠.

```javascript
const firstStrStartingWithA = (strs) => {
  let result = undefined;

  for (const str of strs) {
    if (str.startsWith('A')) {
      result = str;
      break; // 'A'로 시작하는 첫 단어를 찾았으니 루프 종료!
    }
  }
  return result;
};
```

`continue`: 현재 이터레이션을 중단하고 즉시 다음 이터레이션으로 넘어갑니다.

 특정 조건만 제외하고 로직을 실행하고 싶을 때 유용합니다.

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // i가 2일 때는 console.log를 건너뛴다
  }
  console.log(i);
}
// 결과: 0, 1, 3, 4
```

## 그래서 어떤 반복문을 써야 할까

이제 다양한 반복문을 배웠으니, 상황에 맞게 최적의 무기를 선택할 수 있어야 하는데요.

간단한 가이드를 드리겠습니다.

`for...of`: 배열이나 문자열 등 순회 가능한 데이터의 '값'을 순서대로 사용하는 가장 일반적이고 추천되는 방법입니다.

클래식 `for`: 인덱스를 직접 제어해야 할 때(예: 배열 거꾸로 순회하기)나, 반복 횟수에 대한 정밀한 조건이 필요할 때 사용합니다.

`while`: 반복 횟수가 명확하지 않고, 특정 조건이 만족되는 동안 계속 실행해야 할 때 적합합니다.

 단, 무한 루프의 위험을 항상 염두에 두어야 합니다.

`for...in`: 객체(Object)의 속성(key)들을 순회하기 위해 사용되는데요.

 배열에 사용하는 것은 권장되지 않으며, 순서가 보장되지 않는 특징이 있습니다.

## 마무리하며

오늘은 자바스크립트의 핵심 근육이라고 할 수 있는 반복문에 대해 깊이 있게 알아봤는데요.

단순히 코드를 반복 실행하는 것에서 시작해, 데이터를 가공하고 동적으로 웹 페이지를 그리는 실전 예제까지 함께했습니다.

`for...of`, `for`, `while` 각각의 특징과 쓰임새를 잘 이해하고, `break`와 `continue`로 흐름을 제어할 수 있다면 이제 여러분의 코드는 훨씬 더 효율적이고 유연해질 겁니다.

코딩은 결국 반복과의 싸움이거든요.
