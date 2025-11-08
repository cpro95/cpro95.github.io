---
title: 웹 개발 배우기 9편 - 자바스크립트 객체의 모든 것, 플래시 카드 앱으로 정복하기
date: 2025-11-03T14:49:00+09:00
description: 자바스크립트 객체의 기본 개념부터 프로퍼티 사용법, 그리고 플래시 카드 앱 실습까지 알아봅니다. 모델과 뷰 개념을 통해 데이터와 UI를 분리하는 방법도 함께 배웁니다.
series: ["웹 개발 배우기"]
weight: 9
tags:
    - 자바스크립트 객체
    - 객체 리터럴
    - 플래시 카드
    - 모델 뷰
    - classList
    - 웹 개발 기초
    - 자바스크립트 프로젝트
---
![웹 개발 배우기 9편 - 자바스크립트 객체의 모든 것, 플래시 카드 앱으로 정복하기](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.


이번 시간에는 프로퍼티를 가진 '순수 객체(plain object)'를 만드는 방법에 대해 알아볼 건데요.

그리고 이 객체를 활용해서 간단한 플래시 카드 앱도 함께 만들어 볼 겁니다.


## 순수 객체 만들고 사용하기
아래 코드는 '객체 리터럴(object literal)'을 사용해서 순수 객체를 만들고 `purchase`라는 변수에 할당하는 모습인데요.

```javascript
const purchase = {
  product: 'toothbrush',
  quantity: 1,
};
```
맨 마지막에 있는 쉼표, 즉 '트레일링 콤마(trailing comma)'는 넣어도 되고 안 넣어도 되는 선택 사항입니다.


어떤 면에서 순수 객체는 변수들의 묶음이라고 할 수 있는데요.

숫자 인덱스를 사용하는 배열과 달리, 이름을 통해 관련된 데이터에 접근할 수 있게 해주는 아주 유용한 구조입니다.


`purchase` 객체로 할 수 있는 작업은 다음과 같습니다.

`.quantity`처럼 프로퍼티를 '읽을' 수 있고요.

```javascript
> purchase.quantity
1
```
프로퍼티에 새로운 값을 '쓸' 수도 있습니다.

```javascript
> purchase.quantity += 1;
> purchase
{ product: 'toothbrush', quantity: 2 }
```

### 새로운 프로퍼티 추가하기
프로퍼티에 값을 쓰는 방식을 이용하면 객체에 새로운 프로퍼티를 추가할 수도 있거든요.

```javascript
> const obj = {};
> obj.prop = 'yes';
> obj
{ prop: 'yes' }
```

### 없는 프로퍼티 읽기
만약 존재하지 않는 프로퍼티를 읽으려고 하면, 결과로 `undefined`를 얻게 됩니다.

```javascript
> const obj = {};
> obj.doesNotExist
undefined
```

### 프로퍼티 값 단축 구문
가끔 프로퍼티의 '키(key)'와 그 값으로 사용할 '변수'의 이름이 똑같을 때가 있거든요.

예를 들면 아래와 같습니다.

```javascript
createPoint = (x, y) => ({x: x, y: y});
```
여기서 객체 리터럴을 괄호로 감싸야 한다는 점을 꼭 기억해주세요.

그렇지 않으면 자바스크립트는 이걸 코드 블록으로 착각할 수 있습니다.


이렇게 키와 값의 이름이 같을 때는 코드를 아주 간단하게 줄여 쓸 수 있는데요.

이걸 '프로퍼티 값 단축(property value shorthand)' 구문이라고 부릅니다.

```javascript
createPoint = (x, y) => ({x, y});
```

## 프로젝트 `toggle-content.html`
`toggle-content.html` 프로젝트는 다음 프로젝트를 위한 준비 운동인데요.

콘텐츠를 어떻게 보여주고 숨기는지 배워보는 간단한 실습입니다.

이 프로젝트는 `file:` URL을 통해 사용할 수 있습니다.


HTML 구조는 다음과 같습니다.

```html
<p>
  <a href="">Toggle the content</a>
</p>
<p id="content" class="hidden">
  [...]
</p>
```
그리고 아래 CSS는 `#content` 요소에 `hidden` 클래스가 있을 경우, 화면에서 보이지 않게 숨겨주는 역할을 하는데요.

```css
#content.hidden {
  display: none;
}
```
그래서 처음에는 `<p>` 태그 안의 내용이 보이지 않다가, 링크를 클릭할 때마다 보이고 숨겨지는 것을 반복하게 됩니다.


이 기능을 구현한 자바스크립트 코드는 다음과 같습니다.

```javascript
const content = document.querySelector('#content');
document.querySelector('a')
  .addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      content.classList.toggle('hidden'); // (A)
    }
  );
```
그렇다면 (A) 지점에서는 무슨 일이 일어나고 있는 걸까요?

`.classList`는 `content` 요소의 클래스 목록을 배열과 비슷한 형태로 제공하는데요.

이 목록의 `.toggle()` 메서드는 필요에 따라 'hidden' 클래스를 추가하거나 제거해주는 역할을 합니다.


(A) 지점의 코드는 아래 코드와 완전히 똑같은 일을 하거든요.

```javascript
if (content.classList.contains('hidden')) {
  content.classList.remove('hidden');
} else {
  content.classList.add('hidden');
}
```
이렇게 `hidden` 클래스가 추가되거나 제거되면, CSS가 그 변화를 즉시 감지해서 `#content` 요소를 보여주거나 숨겨주는 겁니다.


## 프로젝트 `flash-cards/`
`flash-cards` 프로젝트는 무작위로 플래시 카드를 보여주는 앱인데요.

플래시 카드 앞면에는 스페인어 단어가, 뒷면에는 영어 번역이 나타납니다.

뒷면은 처음에는 숨겨져 있지만, 드러낼 수 있습니다.


### 프로젝트 실행하기
이 프로젝트는 자바스크립트 모듈을 사용하기 때문에 웹 서버를 실행해야만 하는데요.

```bash
cd learning-web-dev-code/projects/
npx http-server
```
서버를 실행한 후, 아래 주소로 접속하면 프로젝트를 확인할 수 있습니다.

`http://127.0.0.1:8080/flash-cards/flash-cards.html`

앞으로는 웹 앱 실행 시 `http-server` 사용법에 대한 설명은 생략할 테니, 혹시 헷갈리신다면 이 부분을 다시 참고해 주세요.


### `data.js` 플래시 카드 데이터
플래시 카드 데이터는 `data.js`라는 별도의 모듈 파일에 정의되어 있습니다.

```javascript
export const data = [
  { front: 'perro', back: 'dog' },
  // ...
];
```

### `flash-cards.html` HTML 구조
사용자 인터페이스는 HTML로 아래와 같이 구성되는데요.

```html
<p>
  <button id="nextCard">Next Flashcard</button>
</p>
<p>
  <a href="" id="toggleBack">Toggle Back</a>
</p>
<div id="flashCard">
  <p id="front"></p>
  <hr>
  <p id="back"></p>
</div>
<p>
  <span id="cardNumber"></span> of <span id="cardTotal"></span>
</p>
```
마지막 `<p>` 태그는 "2 of 10"과 같은 텍스트를 표시합니다.


### `flash-cards.html` CSS 스타일
플래시 카드 뒷면을 쉽게 보여주고 감추기 위해 CSS가 필요한데요.

```css
#back {
  display: none;
}
#back.revealed {
  display: initial;
}
```
기본적으로 뒷면은 보이지 않다가, `revealed` 클래스가 추가되면 보이도록 설정했습니다.


그리고 아래 CSS는 전체 UI를 화면 중앙에 배치하고 최대 너비를 지정하는 역할을 합니다.

```css
html {
  margin: 2rem auto;
  max-width: 35rem;
}
```
`border-radius`를 사용해서 플래시 카드에 둥근 모서리 효과도 주었습니다.

```css
#flashCard {
  border: solid thin gray;
  border-radius: 0.5rem;
  padding: 0 1rem 1rem;
}
```

### `flash-cards.html` 자바스크립트 로직
먼저 필요한 도구와 데이터를 가져오는 코드부터 시작하는데요.

```javascript
import { shuffleArray } from './utils.js';
import { data } from './data.js';
```
`shuffleArray()`는 이름 그대로 배열의 요소들을 무작위로 섞어주는 함수입니다.

카드를 섞어주면 매번 다른 순서로 카드를 볼 수 있어서 학습 효과가 더 좋겠죠?


`currentIndex` 변수는 현재 보고 있는 카드가 몇 번째 카드인지 기록하는 역할을 합니다.

```javascript
let currentIndex = 0;
```
`showCard()` 함수는 배열의 특정 카드를 화면에 표시해주는 일을 하거든요.

```javascript
const showCard = (index) => {
  const front = document.querySelector('#front');
  const back = document.querySelector('#back');
  const cardNumber = document.querySelector('#cardNumber');
  
  back.classList.remove('revealed');

  const card = data[index];
  front.innerText = card.front;
  back.innerText = card.back;
  cardNumber.innerText = index + 1;
};
```
다음으로, `startNewRound()` 함수는 새로운 라운드를 시작하는, 일종의 게임 재시작 기능인데요.

모든 것을 초기 상태로 설정해주기 때문에 웹 앱이 시작될 때 가장 먼저 호출됩니다.

```javascript
const startNewRound = () => {
  const cardTotal = document.querySelector('#cardTotal');

  shuffleArray(data);
  cardTotal.innerText = data.length;

  currentIndex = 0;
  showCard(currentIndex);
};
```
이 함수는 다음 카드로 넘어가는 기능을 담당합니다.

```javascript
const goToNextCard = () => {
  currentIndex = currentIndex + 1;
  if (currentIndex >= data.length) {
    startNewRound();
  } else {
    showCard(currentIndex);
  }
}
```
마지막으로, `toggleBack()` 함수는 카드의 뒷면을 보여주거나 숨기는 역할을 합니다.

```javascript
const toggleBack = () => {
  const back = document.querySelector('#back');
  back.classList.toggle('revealed');
};
```
### `utils.js`
아래 유틸리티 함수는 '피셔-예이츠(Fisher–Yates) 알고리즘'을 사용해서 배열을 섞는데요.

```javascript
export const shuffleArray = (arr) => {
  for (let current = arr.length - 1; current >= 1; current--) {
    const randomPick = Math.floor(Math.random() * (current + 1));
    const tmp = arr[current];
    arr[current] = arr[randomPick];
    arr[randomPick] = tmp;
  }
  return arr;
};
```
알고리즘은 생각보다 아주 간단합니다.

배열의 맨 끝 요소부터 시작해서, 그 앞쪽 요소들 중에서 무작위로 하나를 골라 맨 끝 요소와 자리를 바꾸는데요.

이 과정을 배열의 맨 앞까지 반복하는 겁니다.


마치 트럼프 카드를 섞는 것과 비슷하거든요.

손에 든 카드 덱에서 무작위로 한 장을 뽑아 테이블에 내려놓고, 남은 카드 중에서 또 한 장을 뽑아 그 위에 쌓는 과정을 반복하는 것과 같습니다.


## 용어 정리 모델 vs. 뷰
플래시 카드 프로젝트에는 한 가지 흥미로운 현상이 있었는데요.

한쪽에는 플래시 카드를 설명하는 `data` 배열과 같은 '데이터'가 있었고, 다른 한쪽에는 그 데이터가 화면에 '표시'되는 사용자 인터페이스가 있었습니다.


전자를 '모델(model)', 후자를 모델을 위한 '뷰(view)'라고 부르는데요.

이 둘을 연결하고 이벤트를 처리하며 모델과 뷰를 업데이트하는 역할을 '컨트롤러(controller)'라고 부르기도 하지만, 앞의 두 용어만큼 흔하게 쓰이지는 않습니다.


우리 프로젝트에서는 `showCard()`와 `startNewRound()` 두 함수가 모델의 데이터를 뷰로 '전송'하는, 즉 모델의 변경 사항을 뷰에 반영하는 역할을 수행한 겁니다.
