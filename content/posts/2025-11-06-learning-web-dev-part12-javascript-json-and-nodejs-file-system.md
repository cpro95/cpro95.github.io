---
title: 웹 개발 배우기 12편 - 데이터를 다루는 표준, JSON과 Node.js 파일 시스템 정복하기
date: 2025-11-06T15:01:00+09:00
summary: 널리 사용되는 데이터 포맷인 JSON의 개념과 문법, 그리고 Node.js의 fs 모듈을 활용해 파일을 읽고 쓰는 방법을 배웁니다. JSON 데이터를 관리하는 실용적인 CLI 프로젝트를 통해 실습까지 완벽하게 마무리합니다.
tags:
    - JSON
    - Node.js
    - 파일 시스템
    - fs 모듈
    - JSON.parse
    - JSON.stringify
    - 웹 개발 기초
---

# 웹 개발 배우기 12편 - 데이터를 다루는 표준, JSON과 Node.js 파일 시스템 정복하기

![웹 개발 배우기 12편 - 글자를 뒤집는 마법, 자바스크립트 Map 완전 정복](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

이번 시간에는 아주 널리 쓰이는 데이터 포맷인 JSON에 대해 알아볼 건데요.

그리고 노드제이에스(Node.js)를 통해 파일을 읽고 쓰는 셸 명령어를 직접 구현해 볼 겁니다.


## JSON (제이슨)
'JSON(JavaScript Object Notation)'은 데이터를 텍스트 형태로 표현(인코딩)하는 한 가지 방법인데요.

예를 들어 텍스트 파일에 데이터를 저장할 때 사용됩니다.

이름에서 알 수 있듯이 그 문법은 자바스크립트의 일부이기도 합니다.


다시 말해, 모든 JSON 데이터는 그 자체로 유효한 자바스크립트 코드(표현식)라는 의미거든요.

아래는 JSON 데이터가 담긴 텍스트 파일의 한 예시입니다.

```json
{
  "first": "Jane",
  "last": "Porter",
  "married": true,
  "born": 1890,
  "friends": [ "Tarzan", "Cheeta" ]
}
```
### JSON의 문법
JSON의 문법은 다음과 같이 동작하는데요.

JSON은 `null`, 불리언, 숫자, 문자열과 같은 원시 값을 지원합니다.

단, 문자열은 반드시 '큰따옴표'로 감싸야 하고, `NaN`이나 `Infinity` 같은 에러 값은 지원하지 않습니다.


객체와 배열도 만들 수 있는데요.

객체 리터럴의 프로퍼티 키는 반드시 큰따옴표로 감싸야 하고, 배열과 객체 모두 마지막 요소 뒤에 쉼표를 붙이는 '트레일링 콤마'는 허용되지 않는다는 점이 중요합니다.


### `JSON.parse()`로 JSON 파싱하기
JSON 파싱은 텍스트를 자바스크립트 값으로 변환하는 것을 의미하는데요.

`JSON.parse()` 함수를 사용하면 됩니다.

```javascript
> JSON.parse('123')
123
> JSON.parse('"abc"')
'abc'
> JSON.parse('["dog", "cat"]')
[ 'dog', 'cat' ]
```
문자열을 인코딩하는 JSON 문자열을 파싱하는 것은 문자열 안에 또 다른 문자열이 포함되어 있기 때문에 흥미롭습니다.


### `JSON.stringify()`로 자바스크립트 값을 JSON으로 변환하기
문자열화(Stringifying)는 반대로 자바스크립트 값을 텍스트로 변환하는 것을 의미하는데요.

`JSON.stringify()` 함수를 사용하면 됩니다.

```javascript
> JSON.stringify(123)
'123'
> JSON.stringify('abc')
'"abc"'
> JSON.stringify(['dog', 'cat'])
'["dog","cat"]'
```
`JSON.stringify()`에 세 번째 인자로 숫자를 전달하면, 출력되는 JSON 문자열에 예쁘게 들여쓰기를 추가할 수 있거든요.

```javascript
const obj = {first: 'Jane', last: 'Porter'};
console.log(JSON.stringify(obj, null, 2));
```
결과는 다음과 같습니다.

```json
{
  "first": "Jane",
  "last": "Porter"
}
```

## `array.slice()`
이 배열 메서드는 기존 배열의 일부를 복사해서 새로운 배열을 만드는 역할을 하는데요.

인자 없이 호출하면 배열 전체를 복사합니다.


인자를 하나만 전달하면 해당 인덱스부터 끝까지 복사하고요.

인자를 두 개 전달하면 첫 번째 인덱스부터 두 번째 인덱스 '전'까지 복사합니다.


## 노드제이에스에서 파일 읽고 쓰기
노드제이에스(Node.js)에는 파일 관련 작업을 처리하는 내장 모듈이 있는데요.

바로 `node:fs` 입니다.

`fs.readFileSync()` 함수는 파일 경로를 인자로 받아 그 내용을 문자열로 반환하고요.

`fs.writeFileSync()` 함수는 파일 경로와 문자열을 인자로 받아 텍스트 파일을 생성하거나 덮어씁니다.


## 프로젝트 `item-store.js`
`item-store.js`는 JSON 파일에 문자열을 추가하는 셸 명령어인데요.

`item-store.js add <file-path> "string to add"` 와 같은 형태로 사용합니다.


먼저, 주어진 경로의 JSON 파일을 읽어 자바스크립트 값으로 반환하는 함수를 만들어 보겠습니다.

```javascript
const readData = (filePath) => {
  try {
    const json = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(json);
  } catch (err) {
    if (err instanceof Error && err.code === 'ENOENT') {
      return { items: [] }; // 파일이 없으면 새 데이터로 시작
    } else {
      throw err;
    }
  }
};
```
만약 파일이 아직 존재하지 않는다면 에러가 발생하는데요.

이때 `err.code`가 'ENOENT'인지 확인해서, 파일이 없어서 발생한 에러가 맞다면 기본 데이터를 반환합니다.


다음은 데이터를 다시 JSON 파일로 쓰는 함수입니다.

```javascript
const writeData = (filePath, data) => {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, json);
};
```
이제 이 함수들을 조합해서 셸 명령어의 핵심 로직을 완성해 볼까요?

```javascript
const SUBCMD_ADD = 'add';

const main = () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`item-store.js ${SUBCMD_ADD} <file-path> "string to add"`);
    return;
  }
  
  const subcommand = args[0];
  if (subcommand === SUBCMD_ADD) {
    // ... 인자 개수 확인 로직 ...
    const filePath = args[1];
    const strToAdd = args[2];

    const data = readData(filePath);
    data.items.push(strToAdd);
    writeData(filePath, data);
  } else {
    throw new Error('Unknown subcommand: ' + subcommand);
  }
};

main();
```
`process.argv.slice(2)`를 사용해 실제 인자들만 `args` 배열에 담았는데요.

사용자가 `add` 서브커맨드를 입력하면, 파일을 읽고, `items` 배열에 새로운 문자열을 추가한 뒤, 다시 파일에 쓰는 과정을 거칩니다.


## `URL` 객체와 `import.meta.url`
`URL` 클래스는 URL 주소를 다루는 데 아주 유용한 내장 클래스인데요.

URL의 각 부분을 쉽게 추출할 수 있고, 상대 참조를 기반 URL과 조합하는 기능도 제공합니다.

```javascript
> new URL('../toc.html', 'http://example.com/book/chap/index.html').href
'http://example.com/book/toc.html'
```
그리고 `import.meta.url`은 현재 실행 중인 모듈의 URL을 문자열로 담고 있는 특별한 값인데요.

보통 `file:///`로 시작하는 파일 경로 URL을 가지고 있습니다.


## 프로젝트 `random-quote-nodejs/`
이 프로젝트는 JSON 파일에서 무작위로 명언을 하나 골라 터미널에 출력하는 셸 명령어인데요.

명언 데이터는 `quotes.json` 파일에 저장되어 있습니다.

`random-quote-nodejs.js` 파일과 `quotes.json` 파일은 같은 디렉토리에 위치하는데요.

이럴 때 `import.meta.url`을 사용하면 아주 편리하게 `quotes.json` 파일의 전체 경로를 알아낼 수 있습니다.

```javascript
const fileUrl = new URL('quotes.json', import.meta.url);
```
이렇게 하면 셸 명령어를 어느 위치에서 실행하든 항상 정확한 `quotes.json` 파일의 경로를 찾을 수 있습니다.


나머지 코드는 이 `fileUrl`을 사용해 파일을 읽고, 파싱한 뒤, 무작위로 명언을 하나 골라 출력하는 간단한 로직으로 구성됩니다.

```javascript
const main = () => {
  const json = fs.readFileSync(fileUrl, 'utf-8');
  const quotes = JSON.parse(json);
  
  const randomIndex = /* ... */;
  const randomQuote = quotes[randomIndex];
  
  console.log(randomQuote.quote);
  console.log('— ' + randomQuote.author);
};
```