---
title: 웹 개발 배우기 8편 - 코드를 나누고 자동으로 검증하기, 자바스크립트 모듈과 테스트 완전 정복
date: 2025-11-02T11:05:00+09:00
summary: 자바스크립트 모듈 시스템을 이용해 코드를 분리하고, Node.js의 내장 테스트 러너와 assert를 활용해 코드를 자동으로 검증하는 방법을 알아봅니다. ROT13 암호화 프로젝트로 실습까지 완벽하게 마무리합니다.
tags:
    - 자바스크립트 모듈
    - import
    - export
    - Node.js 테스트,
    - 단위 테스트
    - ROT13
    - 웹 개발 기초

---

# 웹 개발 배우기 8편 - 코드를 나누고 자동으로 검증하기, 자바스크립트 모듈과 테스트 완전 정복

![](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

지금까지는 우리의 모든 자바스크립트 코드를 .html 파일이든 .js 파일이든 단 하나의 파일에 담아왔는데요.

이번 시간에는 코드를 여러 파일로 나누는 방법과, 우리가 작성한 코드가 제대로 동작하는지 자동으로 검증하는 방법에 대해 알아볼 겁니다.

## 화살표 함수, 이렇게도 쓸 수 있어요

지금까지 우리는 항상 이런 형태의 화살표 함수를 사용해왔는데요.

```javascript
(x) => { /* body */ }
```
이 문법은 괄호 안의 파라미터와 중괄호 안의 코드 블록(body)으로 구성되어 있습니다.

여기서 조금 더 나아가, 화살표 함수를 다르게 쓰는 두 가지 방법을 살펴볼게요.

### 괄호 생략하기

파라미터가 딱 하나일 때는 괄호를 생략할 수 있거든요.

```javascript
x => { /* body */ }
```

하지만 파라미터가 두 개 이상이거나 하나도 없다면, 괄호는 필수입니다.

```javascript
(x, y) => { /* body */ }
() => { /* body */ }
```

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

`from './library.js'`: 어떤 파일에서 코드를 가져올지 알려주는 부분인데요.

전체 URL을 쓸 수도 있고, 지금처럼 현재 파일을 기준으로 경로를 알려주는 상대 경로를 사용할 수도 있습니다.

`import { add }`: `library.js` 파일에서 정확히 무엇을 가져올지 지정하는 부분인데요.

마치 변수 선언처럼 현재 모듈에 새로운 변수를 만들지만, 그 값은 다른 모듈에서 가져온다는 점이 특별합니다.

'노드제이에스(Node.js)'로 `main.js` 파일을 직접 실행해보면 의도한 대로 잘 동작하는 걸 확인할 수 있을 겁니다.

```bash
cd learning-web-dev-code/projects/
node simple-module/main.js
```

### 라이브러리가 뭔가요?

'라이브러리(library)'는 다른 모듈에게 특정 기능을 제공하는 하나 이상의 모듈 묶음을 말하는데요.

`simple-module/library.js` 파일이 바로 그런 라이브러리인 셈입니다.

수많은 라이브러리가 'npm'을 통해 배포되고 여러 프로젝트에서 사용되거든요.

하지만 대부분의 프로젝트는 `library.js`처럼 프로젝트 내부에서만 사용하는 자체 라이브러리도 가지고 있습니다.

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

이런 내장 모듈들의 전체 목록은 공식 웹 페이지에서 확인하실 수 있습니다.

## 함수의 동작을 자동으로 테스트하기

`library.js` 모듈에 있는 `add` 함수를 다시 한번 볼까요?

```javascript
const add = (x, y) => x + y;
```

이 함수가 숫자와 문자열에 대해 잘 동작하는지 확인하려면, 보통 자바스크립트 콘솔에서 이렇게 테스트해볼 텐데요.

```javascript
add(1, 2)
3
add('yes', 'no')
'yesno'
```

하지만 여기에는 한 가지 단점이 있습니다.

코드를 수정하고 기능이 점점 복잡해질수록, 뭔가 망가진 건 없는지 확인하기 위해 이 과정을 계속해서 반복해야 한다는 점이죠.

'자동화된 테스트'는 바로 이런 생각에서 출발했거든요.

'이런 반복적인 확인 작업을 컴퓨터가 대신해주면 어떨까?' 하고 말이죠.

### `assert`로 값이 같은지 확인하기

체크를 자동화하려면, 먼저 두 값이 같은지 확인할 방법이 필요한데요.

노드제이에스에는 이를 위한 'node:assert'라는 내장 모듈이 있습니다.

이 모듈은 '반드시 참이어야 하는 것'을 단언(assert)하는 함수들을 제공하거든요.

아래 코드의 (A) 지점에서 바로 그 `assert` 함수를 사용해 값이 같은지 확인하고 있습니다.

```javascript
import * as assert from 'node:assert/strict';

const toUpper = str => str.toUpperCase();
assert.equal( // (A)
  toUpper('yes'), 'YES'
);
```

(A) 지점의 코드는 "함수 호출의 결과가 'YES'와 같다고 단언한다"라는 의미입니다.

만약 이 단언이 사실이면 아무 일도 일어나지 않고 다음 코드로 넘어가거든요.

하지만 사실이 아니라면 프로그램은 그 자리에서 멈추고 에러를 보고합니다.

노드제이에스 REPL 환경에서는 모든 `node:` 모듈이 이미 로드되어 있어서 `assert.equal()`을 바로 시험해 볼 수 있습니다.

```javascript
assert.equal(1 + 1, 2);
```

이번에도 확인 결과가 참이라 아무 일도 일어나지 않았네요.

만약 결과가 거짓이라면, 'AssertionError'가 발생합니다.

```javascript
assert.equal(1 + 1, 0);
AssertionError
```

`assert.equal()`은 원시 값과 객체를 다룰 때 `===` 연산자와 똑같은 문제를 가지고 있는데요.

두 객체가 완전히 동일한 객체일 때만 같다고 판단합니다.

```javascript
assert.equal(['a'], ['a']);
AssertionError
```
하지만 객체의 내용물을 비교해주는 `assert` 함수도 있거든요.

바로 `assert.deepEqual()` 입니다.

```javascript
assert.deepEqual(['a'], ['a']);
```

이제는 확인이 성공적으로 끝났네요.

### 노드제이에스의 내장 테스트 러너
사실 `assert`만으로도 `add()` 함수를 테스트할 수는 있는데요.

하지만 검증할 항목이 많아지면 코드에 좀 더 체계적인 구조가 필요해지거든요.

바로 이럴 때 노드제이에스의 내장 '테스트 러너(test runner)'가 아주 유용합니다.

`simple-module/library_test.js` 파일에서 어떻게 사용하는지 한번 보시죠.

```javascript
import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import { add } from './library.js';

test('add() must work for numbers and strings', () => { // (A)
  assert.equal(
    add(1, 2),
    3
  );
  assert.equal(
    add('yes', 'no'),
    'yesno'
  );
});
```

첫 줄에서 테스트 러너 모듈로부터 `test()` 함수를 가져왔는데요.

테스트는 `test()` 함수를 통해 등록하는 하나의 함수입니다.

(A) 지점에서 볼 수 있듯이, 테스트를 등록할 때는 첫 번째 인자로 어떤 테스트인지 설명하는 이름을 붙여주거든요.

이렇게 테스트를 등록하는 것을 '테스트를 정의했다'고 말하기도 합니다.

파일 이름 끝에 붙은 `_test`는 테스트 코드가 담긴 파일임을 나타내는 일반적인 약속인데요.

덕분에 노드제이에스 테스트 러너는 프로젝트 내의 모든 테스트 파일을 찾아 한 번에 실행할 수 있습니다.

자, 그럼 테스트 러너를 직접 실행해 볼까요?

```bash
cd learning-web-dev-code/projects/
node --test simple-module/library_test.js
```
셸 명령어에 `--test` 옵션을 추가하면 노드제이에스가 테스트 러너 모드로 전환됩니다.

## 다음 프로젝트를 위한 준비 운동

이 섹션에서는 다음 프로젝트에 필요한 몇 가지 개념들을 미리 배워볼 텐데요.

조금 복잡한 내용도 있으니, 모든 걸 완벽하게 이해하지 못해도 괜찮습니다.

대략적인 감만 잡아도 충분하거든요.

### 텍스트의 단위들

자바스크립트에서 텍스트를 다루는 중요한 단위 세 가지가 있는데요.

첫 번째는 우리가 이미 다뤄본 '문자(character)'입니다.

`.length`는 이 문자의 개수를 세고, 인덱스로 각 문자에 접근할 수 있죠.

```javascript
'abc'.length
3
'abc'[1]
'b'
```

두 번째는 유니코드 표준의 문자인 '코드 포인트(code point)'인데요.

가끔은 자바스크립트 문자 두 개가 모여 하나의 코드 포인트를 나타내기도 합니다.

```javascript
'🙂'.length
2
```

문자열은 코드 포인트 단위로 순회할 수 있기 때문에, `for-of`나 `Array.from()`을 사용하면 문자열을 코드 포인트로 나눌 수 있습니다.

```javascript
Array.from('a🙂b')
[ 'a', '🙂', 'b' ]
```

하지만 여기서 한 단계 더 나아간 개념이 있거든요.

바로 '그래핌 클러스터(grapheme cluster)'입니다.

화면이나 종이에 표시되는 하나의 '글자'를 나타내는 단위인데, 여러 개의 코드 포인트가 모여 하나의 그래핌 클러스터를 만들기도 합니다.

```javascript
Array.from('😵‍💫')
[ '😵', '\u200D', '💫' ]
'😵‍💫'.length
5
```

### 문자와 숫자 사이의 변환

엄밀히 말해, 코드 포인트는 사실 숫자인데요.

`string.codePointAt()`을 사용하면 특정 인덱스에 있는 자바스크립트 문자의 코드 포인트를 얻을 수 있습니다.

```javascript
'a'.codePointAt(0)
97
'🙂'.codePointAt(0)
128578
```

반대로 `String.fromCodePoint()`는 코드 포인트 숫자를 다시 문자열로 바꿔줍니다.

```javascript
String.fromCodePoint(97)
'a'
String.fromCodePoint(128578)
'🙂'
```

### `while` 반복문

`while` 반복문은 `if`문과 비슷하지만 한 가지 큰 차이점이 있는데요.

`if`문이 참일 때 한 번만 실행되는 반면, `while`문은 조건이 참인 동안 '계속해서' 실행됩니다.

```javascript
const logNTimes = (n, str) => {
  while (n > 0) {
    console.log(n + ' ' + str);
    n -= 1; // (A)
  }
};
logNTimes(3, 'Beetlejuice');
```

(A) 지점에서는 `n -= 1` 이라는 연산자를 사용했는데, 이건 `n = n - 1`과 완전히 똑같은 의미입니다.


위 함수를 호출하면 결과는 다음과 같이 나옵니다.

```
3 Beetlejuice
2 Beetlejuice
1 Beetlejuice
```

### 숫자 순환시키기

배열 같은 값을 반복적으로 순회하다가 끝에 도달하면 다시 처음부터 시작하고 싶을 때가 있는데요.

이때 사용하는 인덱스를 '순환한다(rotate)'고 말합니다.

```javascript
const inc = (len, index) => {
  index += 1;
  while (index >= len) {
    index -= len;
  }
  return index;
};
```

이 함수는 `inc()`를 호출했을 때 `index`가 이미 `len`보다 훨씬 클 수도 있기 때문에 `if` 대신 `while`을 사용합니다.

이 함수를 사용하면 배열의 인덱스를 계속해서 순환시킬 수 있습니다.

```javascript
> inc(3, 0)
1
> inc(3, 1)
2
> inc(3, 2)
0
> inc(3, 0)
1
```

그런데 자바스크립트의 '나머지 연산자(%)'를 사용하면 `inc()` 함수를 훨씬 더 간단하게 만들 수 있거든요.

나머지 연산자는 나눗셈을 하고 남은 나머지를 구해줍니다.

```javascript
8 % 4 // 4로 나누면 나머지가 없음
0
8 % 5 // 5로 나누면 3이 남음
3
```

나머지 연산자를 쓰면 인덱스 순환이 이렇게나 간단해집니다.

```javascript
(0 + 1) % 3
1
(1 + 1) % 3
2
(2 + 1) % 3
0
(0 + 1) % 3
1
```

훨씬 간단해진 `inc()` 함수의 모습입니다.

```javascript
const inc = (len, index) => {
  return (index + 1) % len;
};
```

## 프로젝트 `encode-decode-text/`

'ROT13'은 텍스트를 암호화하고 복호화하는 아주 간단한 방법인데요.

알파벳을 13자리씩 밀어서 문자를 바꾸는 방식이라 'Rotate13'이라고도 불립니다.

*   a → n
*   b → o
*   ...
*   m → z
*   n → a
*   ...
*   z → m

알파벳은 총 26글자이기 때문에, 암호화하는 것과 복호화하는 것이 완전히 똑같은데요.

위 목록에서 'a'를 암호화하면 'n'이 되고, 'n'을 다시 암호화하면 'a'로 돌아오는 것을 볼 수 있습니다.

곧 보게 될 `rot13()` 함수를 사용해서 텍스트를 암호화하고 복호화해 볼까요?

```javascript
rot13('Let’s party like it’s 1999!')
'Yrg’f cnegl yvxr vg’f 1999!'
rot13('Yrg’f cnegl yvxr vg’f 1999!')
'Let’s party like it’s 1999!'
```

알파벳이 아닌 문자들은 바뀌지 않는다는 점에 주목해 주세요.

### ROT13은 어디에 쓸까요?

ROT13은 보안이 중요한 정보를 암호화하는 데는 적합하지 않은데요.

하지만 온라인에서 스포일러나 짓궂은 농담 같은 내용을 바로 보이지 않게 살짝 가리는 용도로는 종종 사용됩니다.

### `encode-decode-text/rot13.js`

`rot13()` 함수를 어떻게 구현하는지 한번 살펴볼까요?

먼저 문자를 13자리 밀어주는 `rot13Char()` 함수입니다.

```javascript
export const rot13Char = (baseChar, char) => {
  const baseCodePoint = baseChar.codePointAt(0);
  let relCodePoint = char.codePointAt(0) - baseCodePoint; // (A)
  relCodePoint = (relCodePoint + 13) % 26; // (B)
  return String.fromCodePoint(
    baseCodePoint + relCodePoint
  );
};
```

'c' 같은 소문자를 변환하는 과정은 이렇습니다.

1. (A) 'c'의 코드 포인트에서 기준 문자인 'a'의 코드 포인트를 빼서 'a'로부터의 상대적인 위치(2)를 구합니다.

2. (B) 이 위치 값에 13을 더한 후, 26으로 나눈 나머지를 구해서 알파벳 범위를 벗어나지 않도록 순환시킵니다.

3. 마지막으로, 이 새로운 위치 값을 다시 'a'의 코드 포인트에 더해서 실제 문자로 되돌려줍니다.

소문자는 기준 문자로 'a'를, 대문자는 'A'를 사용합니다.

`rot13Char` 함수가 `export` 되어 있다는 점에 주목하세요.

덕분에 다른 모듈에서 이 함수를 가져와 테스트할 수 있습니다.

이 함수를 이용해서 `rot13()` 함수를 구현하면 다음과 같습니다.

```javascript
export const rot13 = (str) => {
  let result = '';
  for (const char of Array.from(str)) {
    if (char.length === 1 && char >= 'A' && char <= 'Z') { // (A)
      result += rot13Char('A', char);
    } else if (char.length === 1 && char >= 'a' && char <= 'z') {
      result += rot13Char('a', char);
    } else {
      result += char;
    }
  }
  return result;
};
```

대소문자를 구분해서 알파벳만 변환하는 코드인데요.

(A)에서 `char.length`를 확인하는 이유는, 'Banana' 같은 문자열도 `'A'`보다는 크고 `'Z'`보다는 작다는 조건을 만족시키기 때문입니다.

### `encode-decode-text/rot13_test.js`

`rot13Char()`와 `rot13()` 함수를 위한 테스트 코드는 다음과 같습니다.

```javascript
import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import { rot13, rot13Char } from './rot13.js';

test('rot13Char()', () => {
  assert.equal(rot13Char('a', 'a'), 'n');
  assert.equal(rot13Char('a', 'n'), 'a');
  assert.equal(rot13Char('A', 'A'), 'N');
  assert.equal(rot13Char('A', 'N'), 'A');
});

test('rot13(): once', () => {
  assert.equal(rot13('This is a secret!'), 'Guvf vf n frperg!');
  assert.equal(rot13('Guvf vf n frperg!'), 'This is a secret!');
});

test('rot13(): twice', () => {
  const rot13Twice = (str) => {
    assert.equal(rot13(rot13(str)), str);
  };
  rot13Twice('');
  rot13Twice('one space');
  rot13Twice('UPPERCASE lowercase');
  rot13Twice('Non-letters: 1 ! * /');
});
```

마지막 테스트에서는 문자열을 두 번 암호화하면 원래대로 돌아오는지 확인하는데요.

테스트를 작성할 때는 빈 문자열처럼 예상치 못한 값도 잘 처리하는지 확인하는 것이 아주 중요합니다.

### `rot13()`을 위한 웹 UI

지금까지 우리는 `rot13.js`와 `rot13_test.js` 두 개의 파일을 살펴봤는데요.

이 프로젝트에는 웹 브라우저에서 `rot13()` 함수를 사용할 수 있는 `encode-decode-text.html` 파일이 하나 더 있습니다.

`rot13.js`는 브라우저 코드와 노드제이에스 코드 양쪽에서 모두 사용하는 라이브러리인 셈이죠.

**HTML**

이번에는 더 긴 텍스트를 입력할 수 있도록 `<textarea>` 태그를 사용했는데요.

사용법은 일반적인 텍스트 입력 필드와 크게 다르지 않습니다.

```html
<div>
  <textarea cols="80" rows="5"></textarea>
</div>

<div>
  <button>Encode/decode</button>
</div>
```

**JavaScript**

자바스크립트 코드에도 크게 새로운 내용은 없는데요.

```javascript
import { rot13 } from './rot13.js';
const textarea = document.querySelector('textarea');
document.querySelector('button')
  .addEventListener(
    'click',
    () => {
      textarea.value = rot13(textarea.value);
    }
  );
```

첫 줄에서 브라우저 코드인데도 `import`를 사용했다는 점이 가장 큰 특징입니다.

### `encode-decode-text.html` 실행하기

아쉽게도 웹 브라우저는 `file://` URL을 가진 웹 페이지에서 모듈을 `import`하는 것을 허용하지 않는데요.

따라서 우리는 웹 서버를 실행해야만 합니다.

```bash
cd learning-web-dev-code/projects/
npx http-server
```

이제 아래 주소로 접속하면 웹 앱을 사용할 수 있습니다.

`http://127.0.0.1:8080/encode-decode-text/encode-decode-text.html`
