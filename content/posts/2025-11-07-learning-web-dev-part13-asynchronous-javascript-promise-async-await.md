---
title: 웹 개발 배우기 13편 - 기다림의 미학, 프로미스와 async/await로 비동기 정복하기
date: 2025-11-07T15:10:00+09:00
description: 자바스크립트의 핵심 개념인 비동기 처리를 배웁니다. 이벤트 루프와 큐의 동작 원리부터 시작해, 프로미스(Promise)와 async/await를 사용해 오래 걸리는 작업을 우아하게 처리하는 방법을 알아봅니다.
series: ["웹 개발 배우기"]
weight: 13
tags:
    - 비동기
    - 자바스크립트 프로미스
    - async/await
    - 이벤트 루프
    - fetch
    - setTimeout
---
![웹 개발 배우기 13편 - 기다림의 미학, 프로미스와 async/await로 비동기 정복하기](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

이번 시간에는 파일을 다운로드하는 것처럼 완료하는 데 오랜 시간이 걸리는 작업을 다루는 방법에 대해 알아볼 건데요.

이때 사용하는 '프로미스(Promise)'와 'async 함수'는 자바스크립트의 아주 중요한 기반 기술이자, 정말 흥미로운 여러 기능들을 가능하게 해주는 핵심 개념입니다.


## 이번 챕터는 조금 어려울 수 있어요
이번 챕터는 꽤나 도전적인 주제들을 다루고 있는데요.

한 번에 모든 것을 이해하지 못할 수도 있지만, 그건 지극히 정상적인 과정입니다.


스스로에게 충분한 시간을 주고, 잠시 쉬었다가 하루 이틀 뒤에 다시 읽어보는 것도 좋은 방법이거든요.

코드를 직접 공부해보고 이것저것 실험해보는 것이 중요합니다.


이 주제들을 다른 접근 방식으로 설명하는 웹상의 다른 자료(기사, 비디오 등)를 확인하는 것도 도움이 될 수 있는데요.

MDN은 언제나 믿고 찾아갈 수 있는 첫 번째 자료가 될 겁니다.


## 큐(Queue) 자료 구조
'큐(Queue)'는 값을 넣었다가 나중에 다시 꺼내는 자료 구조인데요.

마치 매표소 앞에 줄을 선 사람들처럼, 가장 먼저 들어온 값이 가장 먼저 나가는 방식으로 동작합니다.


그래서 큐를 '선입선출(FIFO, First In First Out)' 구조라고도 부르거든요.

자바스크립트 배열에서는 다음 두 가지 메서드를 이용해 큐로 사용할 수 있습니다.


`array.push(v)`는 배열의 끝에 값을 추가하고, `array.shift()`는 배열의 첫 번째 요소를 꺼내면서 제거합니다.

이것 역시 사람들이 줄의 맨 뒤에 서서, 맨 앞에서부터 빠져나가는 것과 비슷하죠.


다음 코드는 배열을 큐로 어떻게 사용할 수 있는지 보여주는데요.

```javascript
const queue = [];

queue.push('a');
queue.push('b');
assert.deepEqual(queue, ['a', 'b']);

assert.equal(queue.shift(), 'a');
assert.deepEqual(queue, ['b']);

queue.push('c');
assert.deepEqual(queue, ['b', 'c']);
```
우리는 'a', 'b', 'c' 순서로 값을 `.push()`하고, `.shift()`는 같은 순서로 값을 받습니다.

빈 배열에 `.shift()`를 호출하면 `undefined`를 반환합니다.


## 자바스크립트 코드는 싱글 스레드에서 실행돼요
현대의 운영체제는 여러 작업을 동시에 처리하는 '멀티태스킹'이 가능한데요.

하지만 대부분의 자바스크립트 코드는 한 번에 하나의 작업만 처리하는 '단일 작업(single-tasked)' 방식으로 동작합니다.


작업이 실행되는 환경을 '스레드'라고 부르는데요.

기본적으로 모든 자바스크립트 작업은 브라우저나 노드제이에스(Node.js)의 '메인 스레드'에서 실행됩니다.

즉, 순차적으로(하나씩 차례로) 실행되며 '이벤트 루프'에 의해 관리되거든요.

이벤트 루프는 다음과 같습니다.

```javascript
while (true) {
  const task = taskQueue.shift(); // (A)
  task();
}
```
작업 큐가 비어있다면, (A) 지점의 `.shift()`는 작업이 생길 때까지 기다립니다.

즉, 작업 큐가 끊임없이 메인 스레드에 실행할 코드를 공급해주는 구조인 셈이죠.


왜 '이벤트 루프'라는 이름에 '이벤트'가 들어갈까요?

브라우저는 자바스크립트를 단일 스레드에서 실행하지만, 다른 기능들은 다른 스레드에서 실행하거든요.

마우스 클릭과 같은 사용자 입력은 다른 스레드에서 수신됩니다.

각 사용자 입력은 작업 큐에 작업으로 추가되고, 그 작업이 적절한 이벤트 리스너를 호출하는 겁니다.


## `setTimeout()`으로 작업 한 번 추가하기
다음 함수는 지정된 시간(밀리초 단위)이 지난 후에 특정 작업을 이벤트 큐에 추가하는데요.

```javascript
setTimeout(task, delay);
```
작업 추가는 메인 스레드 외부에서 관리되며 비교적 정확하지만, 실제 실행은 작업이 추가될 때 큐가 얼마나 꽉 차 있는지에 따라 지연될 수 있습니다.


`setTimeout()`을 사용하는 모습은 다음과 같은데요.

```javascript
setTimeout(
  () => {
    console.log('One second later');
  },
  1000
);
```
오래 실행되는 작업은 말 그대로 브라우저를 '얼려버려서' 사용자의 어떤 입력도 받지 못하게 만들 수 있거든요.

`setTimeout()`은 현재 작업이 잠시 쉬어가게 하여, 메인 스레드가 사용자 입력을 처리하고 그 후에 계속할 수 있게 해줍니다.


## `setInterval()`으로 작업 반복하기
`setInterval()`은 `setTimeout()`과 유사하게 작동하는데요.

하지만 후자가 작업을 한 번만 추가하는 반면, 전자는 (멈출 때까지) 여러 번 작업을 추가합니다.

```javascript
const id = setInterval(task, delay);
clearInterval(id);
```
`setInterval()`은 아이디(id)를 반환하는데요.

이 아이디를 `clearInterval()`에 전달하여 작업이 다시 실행되는 것을 멈출 수 있습니다.


## `Date` 클래스
다음 두 프로젝트를 위해 날짜와 시간 기능이 필요한데요.

`Date`는 날짜 시간 값을 나타내는 객체를 위한 클래스입니다.

참고로 `Date` 클래스에는 많은 한계가 있어서, 이미 Temporal이라는 대체재가 있지만 아직 많은 자바스크립트 플랫폼에서 지원되지는 않습니다.


### 현재 순간의 날짜 시간 문자열 만들기
다음 상호작용을 고려해 보세요.

```javascript
> new Date().toISOString()
'2161-10-11T09:42:21.117Z'
```
우리는 현재 순간에 대한 `Date` 객체를 만들고, 그것을 ISO 표준 표기법을 따르는 문자열로 변환했습니다.


### 시작점으로부터 몇 밀리초가 지났을까요?
`Date.now()` 메서드는 1970년 1월 1일 0시(UTC)부터 경과한 밀리초 수를 반환하는데요.

따라서 몇 밀리초가 지났는지 결정하는 데 도움이 됩니다.

```javascript
const sleep = (milliseconds) => {
  let start = Date.now();
  while ((Date.now() - start) < milliseconds);
};
```
하지만 이것은 기다리는 좋은 방법이 아니라는 점을 유념해주세요.

곧 작업이 브라우저를 완전히 차단할 수 있음을 보여주기 위해 사용할 겁니다.


### `string.slice()`
문자열 메서드 `.slice()`는 배열 메서드 `.slice()`와 유사하게 작동하는데요.

`'2161-10-11T09:42:21.117Z'.slice(11, 19)`는 인덱스 11에서 시작하여 인덱스 19 전에 끝나는 문자열의 일부, 즉 `'09:42:21'`을 추출합니다.


## 프로젝트 `log-time.js`
`log-time.js`는 현재 시간을 터미널에 기록하는 셸 명령어인데요.

```javascript
setInterval(
  () => {
    const d = new Date();
    console.log(
      d.toISOString().slice(11, 19)
    );
  },
  1000 // 1초마다 함수 호출
);
```

## 프로젝트 `block-browser.html`
브라우저의 메인 스레드는 자바스크립트를 실행할 뿐만 아니라, 화면에 표시되는 콘텐츠를 업데이트하는 작업도 처리하는데요.

따라서 오래 실행되는 작업은 메인 스레드에서 다른 기능이 실행될 수 없기 때문에 브라우저를 완전히 차단할 수 있습니다.

이 프로젝트는 그것이 어떻게 보이는지 보여줍니다.


아이디어는 "Block"을 클릭하면 자바스크립트를 통해 오래 실행되는 루프가 실행되고, 그 루프 동안에는 메인 스레드가 차단되어 버튼을 클릭할 수 없다는 것입니다.

```javascript
setStatusMessage('Blocking...');
setTimeout(
  () => {
    sleep(5000); // 브라우저가 멈춤
    setStatusMessage('Done');
  },
  1
);
```

## 프로미스로 비동기 결과 다루기
오래 실행되는 작업이 얼마나 문제가 되는지 알았으니, 이제 무언가 오래 걸릴 때 우리는 무엇을 해야 할까요?

어떻게든 현재 작업을 일시 중지하고 나중에 다시 돌아와서 다른 작업이 실행될 기회를 줘야 합니다.


그런 경우, 다음과 같은 접근 방식이 사용되는데요.

```javascript
const promise = downloadText(someUrl);
promise.then(
  (str) => {
    // `str` 처리하기
  }
);
```
`downloadText()`는 결과를 전달하는 데 오랜 시간이 걸립니다.

따라서 즉시 결과를 반환할 수 없는데요.

대신 '프로미스(Promise)', 즉 아직 전달되지 않은 실제 결과에 대한 '자리 표시자'를 반환합니다.

그 프로미스를 가지고 우리는 `.then()` 메서드를 사용해 결과가 준비되면 호출될 이벤트 리스너를 등록하는 겁니다.


프로미스를 통해 결과를 전달하는 함수를 '비동기(asynchronous) 함수'라고 부릅니다.

일반 함수는 '동기(synchronous) 함수'라고 불리며, 즉시 결과를 얻습니다.


### 프로미스의 세 가지 상태
프로미스는 세 가지 상태를 가지는데요.

*   **대기(Pending)**: 이 프로세스로 표현되는 작업이 아직 진행 중입니다.

*   **이행(Fulfilled)**: 결과를 가져올 준비가 되었습니다.

*   **거부(Rejected)**: 오류가 발생했습니다.

    오류 값에 접근할 수 있습니다.


더 이상 대기 상태가 아닌 프로미스를 '처리됨(settled)'이라고 부르는데요.

이행되었거나 거부된 상태입니다.


### 프로미스 만들기
프로미스는 이렇게 만들 수 있는데요.

```javascript
new Promise(
  (resolve, reject) => {
    // resolve() 및/또는 reject() 호출
  }
);
```
`new Promise()`의 콜백은 프로미스와 관련된 코드를 포함하는데요.

새로운 프로미스를 이행하기 위해 매개변수 `resolve()`를 호출하거나, 거부하기 위해 `reject()`를 호출할 수 있습니다.


### 동기 함수 vs. 비동기 함수
동기 함수와 비동기 함수가 결과와 오류를 어떻게 전달하는지 비교하면 도움이 될 수 있는데요.

성공의 경우, 결과를 전달합니다.

```javascript
const successSync = () => 123;
const successAsync = () => new Promise(resolve => setTimeout(() => resolve(123)));
```
실패의 경우, 오류를 보고합니다.

```javascript
const failureSync = () => { throw new Error(); };
const failureAsync = () => new Promise((resolve, reject) => setTimeout(() => reject(new Error())));
```

## `async` 함수와 `await` 프로미스를 통해 전달된 결과 처리하기
프로미스와 직접 작업하고 콜백을 통해 이행 및 거부 값을 받을 수 있지만, 더 편리한 대안이 있는데요.

바로 'async 함수'입니다.

```javascript
const asyncFunc = async () => {
  console.log('Before');
  const result = await functionThatReturnsAPromise();
  console.log('After');
};
```
`asyncFunc()`를 호출하면, 'Before'를 기록한 다음 반환되는데요.

왜냐하면 함수의 실행이 `await`를 통해 일시 중지되었기 때문입니다.

우리가 `await`하는 프로미스가 처리되자마자 실행이 계속됩니다.


*   프로미스가 이행되면, 이행 값이 `result`에 저장되고 함수는 'After'를 기록합니다.

*   프로미스가 거부되면, 예외가 발생하고 함수는 조기에 종료됩니다.


### `Promise.resolve()`와 `Promise.reject()`로 프로미스 만들기
다음 두 메서드는 자주 사용되지는 않지만, 자바스크립트 콘솔에서 `await`를 실험해 볼 수 있게 해주는데요.

`Promise.resolve(v)`는 값 `v`로 이미 이행된 프로미스를 만들고, `Promise.reject(e)`는 값 `e`로 이미 거부된 프로미스를 만듭니다.

```javascript
> await Promise.resolve('Success!')
'Success!'
> await Promise.reject(new Error('Failure'))
Uncaught Error: Failure
```

### `async` 함수의 결과
`async` 함수는 항상 프로미스를 반환하는데요.

`return v`는 결과 프로미스를 값 `v`로 이행하고, `throw e`는 결과 프로미스를 값 `e`로 거부합니다.


### `await`를 생략하면 어떻게 될까요?
`await` 없이 비동기 함수를 호출하면 어떻게 되는지 탐색해 보겠습니다.

(C)에서 `await`를 사용하면 출력은 다음과 같습니다.

```
Before
Waiting for one second...
Logged
After
```
(C)에서 `await`를 제거하면 출력은 다음과 같습니다.

```
Before
Waiting for one second...
After
Logged
```
무슨 일이 일어난 걸까요?

비동기 함수는 항상 동기적으로 시작하지만, 그 결과는 항상 비동기적으로 전달됩니다.

`await` 없이는, 우리는 두 번째 부분이 끝나기를 기다리지 않고 'After'를 기록하고, 그 후에야 두 번째 부분이 일어나는 겁니다.


### 비동기 코드는 전염성이 있습니다
비동기 함수 `f()`는 흥미로운 전염성을 가지고 있는데요.

`await` 없이는 `f()`를 제대로 호출할 수 없습니다.

이는 `f()`를 호출하는 곳 어디든 비동기적이어야 한다는 것을 의미하며, 이 과정은 계속 이어집니다.


## 노드제이에스의 비동기 `fs` 함수들
우리는 이미 `node:fs`의 동기적인 `readFileSync()`, `writeFileSync()` 함수를 사용해 보았는데요.

하지만 이 함수들의 비동기 버전도 있습니다.

```javascript
import * as fs from 'node:fs/promises';

const str = await fs.readFile(filePath, 'utf-8');
await fs.writeFile(filePath, str);
```
왜 이 버전들을 사용하고 싶을까요?

사용하기는 덜 편리하지만, 작업을 수행하는 동안 메인 스레드를 차단하지 않거든요.

웹 서버를 구현할 때, 메인 스레드가 차단되지 않고 더 많은 들어오는 요청을 처리할 준비가 되어 있기를 원합니다.


## `fetch()`
`fetch()`는 웹에서 데이터를 다운로드할 수 있게 해주는 함수인데요.

다음과 같이 사용합니다.

```javascript
const response = await fetch(url);
const text = await response.text();
```
1단계: `fetch()`가 비동기적으로 `response` 객체를 반환합니다.

2단계: `response` 객체의 `.text()` 메서드가 비동기적으로 파일의 내용을 문자열로 반환합니다.


`response`에는 더 많은 메서드가 있는데요.

예를 들어 `response.json()`은 파일의 JSON을 파싱해주어, `.text()` 후에 해야 할 추가 단계를 절약해 줍니다.


## 프로젝트 `random-quote-browser/`
`random-quote-browser` 프로젝트는 `random-quote-nodejs` 프로젝트의 브라우저 버전인데요.

HTML 파일 옆에 있는 JSON 파일에서 명언을 로드하는 함수는 다음과 같습니다.

```javascript
const loadQuotes = async () => {
  const quotesUrl = new URL('quotes.json', import.meta.url); // (A)
  const quotesResponse = await fetch(quotesUrl);
  const quotes = await quotesResponse.json();
  return quotes;
};
```
(A)에서 우리는 다시 한번 현재 파일의 형제 파일에 대한 URL 객체를 구성하고 `fetch()`를 사용해 다운로드합니다.


프로젝트의 나머지 자바스크립트 코드는 다음과 같은데요.

```javascript
const quotes = await loadQuotes();
showQuoteButton.addEventListener(/* ... */);
showQuoteButton.disabled = false; // (π)
```
`<button>`이 초기에 비활성화되어 있다는 점에 유의하세요.

이는 모든 것이 준비되기 전에 사용자가 클릭하지 않도록 보장합니다.

준비가 되면, (π)에서 버튼을 활성화합니다.
