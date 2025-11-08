---
title: 웹 개발 배우기 8편 - 코드를 나누고 자동으로 검증하기, 자바스크립트 모듈과 테스트 완전 정복
date: 2025-11-02T11:05:00+09:00
description: 자바스크립트 모듈 시스템을 이용해 코드를 분리하고, Node.js의 내장 테스트 러너와 assert를 활용해 코드를 자동으로 검증하는 방법을 알아봅니다.
series: ["웹 개발 배우기"]
weight: 8
tags:
    - 자바스크립트 모듈
    - import
    - export
    - Node.js 테스트,
    - 단위 테스트
    - ROT13
    - 웹 개발 기초

---
![웹 개발 배우기 8편 - 코드를 나누고 자동으로 검증하기, 자바스크립트 모듈과 테스트 완전 정복](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.


지금까지는 우리의 모든 자바스크립트 코드를 .html 파일이든 .js 파일이든 단 하나의 파일에 담아왔는데요.

이번 시간에는 코드를 여러 파일로 나누는 방법과, 우리가 작성한 코드가 제대로 동작하는지 자동으로 검증하는 방법에 대해 알아볼 겁니다.


## 화살표 함수, 이렇게도 쓸 수 있어요
지금까지 우리는 항상 이런 형태의 화살표 함수를 사용해왔는데요.

```javascript
(x) => { /* body */ }
```
이 문법은 괄호 안의 0개 이상의 파라미터와 중괄호 안의 코드 블록(body)으로 구성되어 있습니다.

화살표 함수를 다르게 쓰는 두 가지 방법을 살펴볼게요.


### 괄호 생략하기
파라미터가 딱 하나일 때는 괄호를 생략할 수 있거든요.

```javascript
x => { /* body */ }
```
하지만 파라미터가 두 개 이상이거나 하나도 없다면, 괄호는 필수입니다.


### 표현식 본문(Expression bodies)
함수의 본문으로 표현식(expression) 자체를 사용할 수도 있는데요.

아래 세 가지 화살표 함수는 모두 똑같이 동작합니다.

```javascript
(x) => { return expr }
(x) => expr
x => expr
```
단순히 어떤 값을 반환하는 것 이상의 작업을 해야 한다면, 반드시 중괄호를 사용한 코드 블록 형태를 사용해야 합니다.


### 어떤 문법을 써야 할까요?
그럼 어떤 문법을 사용하는 게 좋을지 궁금하실 텐데요.

화살표 함수가 단지 표현식 하나만 반환한다면 '표현식 본문'이 훨씬 간결하고 편리합니다.

개인적으로는 짧은 표현식 본문이 한 줄에 쏙 들어갈 때만 파라미터의 괄호를 생략하는 편이거든요.

예를 들면 `x => x + 1` 처럼 말이죠.


## 코드를 분리하는 기술, 모듈(Modules)
먼저 `simple-module/library.js`라는 모듈 파일부터 살펴보겠습니다.

```javascript
export const add = (x, y) => x + y;
```
'모듈'은 그냥 자바스크립트 파일의 또 다른 이름이라고 생각하면 편한데요.

원래 모듈 안에서 만든 것들은 그 모듈 안에서만 쓸 수 있지만, 변수 선언 앞에 'export'를 붙이면 이야기가 달라집니다.


이제 `import`를 사용해서 다른 모듈에서 `add` 함수를 가져올 수 있거든요.

`simple-module/main.js` 파일을 한번 보시죠.

```javascript
import { add } from './library.js';

console.log('One plus one is ' + add(1, 1));
```
첫 줄에 있는 `import` 구문을 자세히 뜯어볼까요?

`from './library.js'`는 어떤 파일에서 코드를 가져올지 알려주는 부분이고, `import { add }`는 그 파일에서 정확히 무엇을 가져올지 지정하는 부분입니다.


'노드제이에스(Node.js)'로 `main.js` 파일을 직접 실행해보면 의도한 대로 잘 동작하는 걸 확인할 수 있을 겁니다.

```bash
cd learning-web-dev-code/projects/
node simple-module/main.js
```

### 라이브러리가 뭔가요?
'라이브러리(library)'는 다른 모듈에게 특정 기능을 제공하는 하나 이상의 모듈 묶음을 말하는데요.

`simple-module/library.js` 파일이 바로 그런 라이브러리인 셈입니다.


### 네임스페이스 가져오기(Namespace imports)
모듈을 가져오는 또 다른 방법으로, 가져온 모듈을 위한 '네임스페이스(namespace) 객체'를 만드는 방식이 있는데요.

이 방식을 사용하면 `main.js` 코드는 아래와 같이 바뀝니다.

```javascript
import * as lib from './library.js';

console.log('One plus one is ' + lib.add(1, 1));
```
`lib`라는 새로운 변수가 `library.js` 모듈에서 `export`된 모든 것을 프로퍼티로 가지는 하나의 객체를 가리키게 되는 겁니다.


### 노드제이에스의 내장 모듈
노드제이에스에는 `node:`로 시작하는 여러 내장 모듈이 있는데요.

예를 들어 `node:fs`는 파일 시스템에 접근할 수 있게 해주는 모듈입니다.


## 함수의 동작을 자동으로 테스트하기
`library.js` 모듈에 있는 `add` 함수를 다시 한번 볼까요?

```javascript
const add = (x, y) => x + y;
```
이 함수가 제대로 동작하는지 확인하려면, 보통 자바스크립트 콘솔에서 이렇게 테스트해볼 텐데요.

하지만 코드를 수정하고 기능이 복잡해질수록, 이 과정을 계속해서 반복해야 한다는 단점이 있습니다.

'자동화된 테스트'는 바로 "이런 반복적인 확인 작업을 컴퓨터가 대신해주면 어떨까?" 하는 생각에서 출발했거든요.


### `assert`로 값이 같은지 확인하기
체크를 자동화하려면, 먼저 두 값이 같은지 확인할 방법이 필요한데요.

노드제이에스에는 이를 위한 'node:assert'라는 내장 모듈이 있습니다.

이 모듈은 '반드시 참이어야 하는 것'을 단언(assert)하는 함수들을 제공하거든요.

```javascript
import * as assert from 'node:assert/strict';

const toUpper = str => str.toUpperCase();
assert.equal(toUpper('yes'), 'YES');
```
만약 단언이 사실이 아니면 프로그램은 그 자리에서 멈추고 에러를 보고합니다.

`assert.equal()`은 원시 값과 객체를 다룰 때 `===` 연산자와 똑같은 문제를 가지고 있는데요.

객체의 내용물을 비교해주는 `assert.deepEqual()` 함수도 있습니다.


### 노드제이에스의 내장 테스트 러너
사실 `assert`만으로도 `add()` 함수를 테스트할 수는 있는데요.

하지만 검증할 항목이 많아지면 코드에 좀 더 체계적인 구조가 필요해지거든요.

바로 이럴 때 노드제이에스의 내장 '테스트 러너(test runner)'가 아주 유용합니다.

```javascript
import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import { add } from './library.js';

test('add() must work for numbers and strings', () => {
  assert.equal(add(1, 2), 3);
  assert.equal(add('yes', 'no'), 'yesno');
});
```
테스트는 `test()` 함수를 통해 등록하는 하나의 함수인데요.

테스트를 등록할 때는 어떤 테스트인지 설명하는 이름을 붙여줍니다.

파일 이름 끝에 붙은 `_test`는 테스트 코드가 담긴 파일임을 나타내는 일반적인 약속입니다.


자, 그럼 테스트 러너를 직접 실행해 볼까요?

```bash
cd learning-web-dev-code/projects/
node --test simple-module/library_test.js
```
셸 명령어에 `--test` 옵션을 추가하면 노드제이에스가 테스트 러너 모드로 전환됩니다.


## 다음 프로젝트를 위한 준비 운동
이 섹션에서는 다음 프로젝트에 필요한 몇 가지 개념들을 미리 배워볼 텐데요.

조금 복잡한 내용도 있으니, 모든 걸 완벽하게 이해하지 못해도 괜찮습니다.


### 텍스트의 단위들
자바스크립트에서 텍스트를 다루는 중요한 단위 세 가지가 있는데요.

첫 번째는 '문자(character)', 두 번째는 유니코드 표준의 문자인 '코드 포인트(code point)', 세 번째는 화면에 표시되는 하나의 '글자'를 나타내는 '그래핌 클러스터(grapheme cluster)'입니다.


### 문자와 숫자 사이의 변환
엄밀히 말해, 코드 포인트는 사실 숫자인데요.

`string.codePointAt()`을 사용하면 특정 문자의 코드 포인트를 얻을 수 있고, `String.fromCodePoint()`는 코드 포인트 숫자를 다시 문자열로 바꿔줍니다.


### `while` 반복문
`while` 반복문은 `if`문과 비슷하지만, 조건이 참인 동안 '계속해서' 실행된다는 큰 차이점이 있습니다.


### 숫자 순환시키기
배열 같은 값을 반복적으로 순회하다가 끝에 도달하면 다시 처음부터 시작하고 싶을 때가 있는데요.

자바스크립트의 '나머지 연산자(%)'를 사용하면 이 과정을 아주 간단하게 구현할 수 있습니다.

```javascript
const inc = (len, index) => {
  return (index + 1) % len;
};
```

## 프로젝트 `encode-decode-text/`
'ROT13'은 텍스트를 암호화하고 복호화하는 아주 간단한 방법인데요.

알파벳을 13자리씩 밀어서 문자를 바꾸는 방식이라 'Rotate13'이라고도 불립니다.

알파벳은 총 26글자이기 때문에, 암호화하는 것과 복호화하는 것이 완전히 똑같습니다.


### ROT13은 어디에 쓸까요?
ROT13은 보안이 중요한 정보를 암호화하는 데는 적합하지 않은데요.

하지만 온라인에서 스포일러나 짓궂은 농담 같은 내용을 바로 보이지 않게 살짝 가리는 용도로는 종종 사용됩니다.


### `encode-decode-text/rot13.js`
`rot13()` 함수를 구현하기 위해, 먼저 문자를 13자리 밀어주는 `rot13Char()` 함수를 만듭니다.

문자의 코드 포인트 값을 이용해 상대적인 위치를 계산하고, 13을 더한 후 26으로 나눈 나머지를 구해 알파벳 범위를 벗어나지 않도록 순환시킵니다.

이 함수를 이용해서 `rot13()` 함수를 구현하면, 대소문자를 구분해서 알파벳만 변환하는 코드가 완성됩니다.


### `encode-decode-text/rot13_test.js`
`rot13Char()`와 `rot13()` 함수를 위한 테스트 코드는 다음과 같은데요.

```javascript
import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import { rot13, rot13Char } from './rot13.js';

test('rot13Char()', () => { /* ... */ });
test('rot13(): once', () => { /* ... */ });
test('rot13(): twice', () => { /* ... */ });
```
마지막 테스트에서는 문자열을 두 번 암호화하면 원래대로 돌아오는지 확인하는데요.

테스트를 작성할 때는 빈 문자열처럼 예상치 못한 값도 잘 처리하는지 확인하는 것이 아주 중요합니다.


### `rot13()`을 위한 웹 UI
`rot13.js`는 브라우저 코드와 노드제이에스 코드 양쪽에서 모두 사용하는 라이브러리인데요.

`encode-decode-text.html` 파일은 웹 브라우저에서 `rot13()` 함수를 사용할 수 있는 UI를 제공합니다.


자바스크립트 코드에서 `import { rot13 } from './rot13.js';` 처럼 모듈을 가져오는 것을 볼 수 있는데요.

이것이 브라우저 코드에서 함수를 `import`하는 첫 번째 사례입니다.


아쉽게도 웹 브라우저는 `file://` URL을 가진 웹 페이지에서 모듈을 `import`하는 것을 허용하지 않거든요.

따라서 우리는 웹 서버를 실행해야만 합니다.

```bash
cd learning-web-dev-code/projects/
npx http-server
```
이제 `http://127.0.0.1:8080/encode-decode-text/encode-decode-text.html` 주소로 접속하면 웹 앱을 사용할 수 있습니다.
