---
title: 웹 개발 배우기 16편 - 클라이언트와 서버의 만남, Node.js로 나만의 웹 서버 만들기
date: 2025-11-10T15:25:00+09:00
description: Node.js의 http 모듈을 사용해 직접 웹 서버를 구현하는 방법을 배웁니다. HTTP 요청과 응답의 기본 원리부터 시작해, 파일을 제공하고 API 요청을 처리하는 Todo 리스트 백엔드 서버를 만들어봅니다.
tags:
    - 웹 서버
    - Node.js
    - HTTP
    - API 서버
    - 클라이언트-서버
    - 백엔드
    - 프론트엔드
---
![웹 개발 배우기 16편 - 클라이언트와 서버의 만남, Node.js로 나만의 웹 서버 만들기](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

이번 시간에는 드디어 우리만의 웹 서버를 직접 만들어 볼 건데요.

파일을 제공하고, 브라우저 앱을 위한 데이터를 관리하는 진짜 서버의 역할을 수행하게 될 겁니다.


## 용어 정리 브라우저 vs. 서버
다음의 반대말 쌍들은 모두 서로 관련이 있는데요.


*   브라우저 vs. 서버

*   로컬 vs. 원격

*   프론트엔드 vs. 백엔드

*   클라이언트 vs. 서버


'클라이언트'라는 용어는 '브라우저'라는 용어보다 더 일반적이기 때문에 흥미로운데요.

서버에 연결하는 모든 앱(웹 앱, 모바일 앱 등)을 가리킵니다.

웹 개발에서는 보통 '브라우저'나 '웹 앱'을 의미합니다.


## 웹 리소스 제공의 배경 지식
우리가 직접 첫 웹 서버를 만들기 전에, 먼저 웹에서 리소스(대략 '파일'이라고 생각하시면 됩니다)가 어떻게 제공되는지 그 원리를 좀 더 알아야 하는데요.

브라우저는 서버에게 리소스를 달라는 '요청(request)'을 보냅니다.


서버는 그 요청에 대한 '응답(response)'으로 해당 리소스의 데이터를 보내주는 구조거든요.

HTTP 요청과 응답을 'HTTP 메시지'라고 부릅니다.


### HTTP 응답
HTTP/1.1 프로토콜 버전에서는 HTML 페이지를 다음과 같은 텍스트 형식으로 제공하는데요.

```http
HTTP/1.1 200 OK
content-type: text/html
last-modified: Mon, 13 Jan 2025 20:11:20 GMT
date: Thu, 11 Sep 2025 09:55:04 GMT
content-length: 1256

<!doctype html>
<html>
...
```
첫 번째 줄은 시작 줄인데요.

HTTP 프로토콜의 버전과 모든 것이 잘 진행되었는지(`200`) 또는 오류가 발생했는지(`404` 등)를 알려주는 '상태 코드'를 명시합니다.


그 뒤에는 0개 이상의 헤더 필드로 구성된 '헤더(header)'가 따라오거든요.

하나의 중요한 헤더 필드는 `content-type`인데, 제공되는 리소스의 미디어 타입을 지정합니다.

`text/html`은 HTML의 미디어 타입입니다.


헤더는 빈 줄로 끝나고요.

그 뒤에 '본문(body)'이 응답의 실제 데이터를 포함합니다.

헤더 필드는 메타데이터(데이터에 대한 데이터)이고, 본문은 데이터입니다.


현재 HTTP 버전인 HTTP/3와 1.1 이후의 HTTP 버전들은 더 이상 텍스트 형식을 사용하지 않지만, 프로토콜 버전, 상태 코드, 헤더, 본문과 같은 핵심 부분은 동일합니다.


### 상태 코드
각 상태 코드는 숫자와 설명을 가지고 있는데요.

숫자는 다음과 같은 범위를 가집니다.


*   `1xx`: 정보 - 요청을 받았으며, 프로세스를 계속합니다.

*   `2xx`: 성공 - 동작이 성공적으로 수신되고, 이해되었으며, 수용되었습니다.

*   `3xx`: 리디렉션 - 요청을 완료하기 위해 추가 조치가 필요합니다.

*   `4xx`: 클라이언트 오류 - 요청에 잘못된 문법이 있거나 수행될 수 없습니다.

*   `5xx`: 서버 오류 - 서버가 유효해 보이는 요청을 이행하지 못했습니다.


몇 가지 예시는 다음과 같습니다.

`200 OK`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`


### 미디어 타입 데이터의 종류
대부분의 운영체제에서는 파일 확장자가 파일에 저장된 데이터의 종류를 나타내는데요.

웹은 리소스를 위해 다른 종류의 메커니즘을 사용합니다.

바로 '미디어 타입(Media Type, MIME 타입)'입니다.


몇 가지 예시는 다음과 같은데요.

*   일반 텍스트: `text/plain`

*   HTML: `text/html`

*   CSS: `text/css`

*   자바스크립트: `text/javascript`

*   JSON: `application/json`


## 프로젝트 `simple-server-html.js`
이제 문자열에서 콘텐츠를 가져오는 단일 웹 페이지만을 제공하는 간단한 웹 서버를 작성해 보겠습니다.

다음과 같이 서버를 실행할 수 있는데요.

```bash
node --watch simple-server-html.js
```
`--watch` 옵션은 자바스크립트 파일이 변경될 때마다 노드제이에스(Node.js)가 파일을 다시 시작하게 만듭니다.


`simple-server-html.js`는 다음과 같은데요.

```javascript
import { createServer } from 'node:http';

const hostname = 'localhost';
const port = 3000;

const server = createServer(
  (request, response) => {
    // ...
  }
);

server.listen(port, hostname, () => { // (A)
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
먼저 서버를 만드는데요.

그 인자는 요청에 대한 리스너입니다.

이벤트 리스너와 유사한데, 이 경우 이벤트는 HTTP 요청입니다.


그런 다음 서버를 시작하고(A), 어떤 포트에서 수신 대기할지 지정합니다.


요청은 다음과 같이 처리되는데요.

```javascript
const server = createServer(
  (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    const content = `<!DOCTYPE html>... Path: ${request.url}`;
    response.end(content.join('\n'));
  }
);
```
먼저 상태 코드와 콘텐츠 타입이라는 두 가지 메타데이터를 설정하고요.

콘텐츠를 단일 텍스트 덩어리로 제공한 다음 응답을 끝냅니다(닫습니다).


### `request.url`
제공된 웹 페이지는 웹 서버가 요청을 받을 때 수신하는 경로를 검토할 기회를 주는데요.

`request.url`은 약간 잘못된 이름입니다.

URL에서 호스트 뒤에 오는 부분일 뿐이거든요.

`http://localhost:3000/file.html`이라는 URL의 `request.url`은 `/file.html`입니다.


### URL의 기능 검색 파라미터
'검색 파라미터(search parameter)' 또는 '쿼리 문자열(query string)'은 URL의 경로 뒤에 추가할 수 있는 것인데요.

물음표(`?`) 뒤에 하나 이상의 `키=값` 쌍이 앰퍼샌드(`&`)로 구분되어 구성됩니다.


검색 파라미터는 서버에 지침을 보내는 데 사용될 수 있습니다.


### `URLSearchParams`
`URLSearchParams` 클래스는 검색 파라미터를 파싱하는 데 도움이 되는데요.

`new URLSearchParams('?k1=v1&k2=v2')`와 같이 인스턴스를 생성하면, `.get('k1')`로 값을 가져오거나 `.has('k1')`로 키의 존재 여부를 확인할 수 있습니다.


URL 객체는 `.searchParams` 속성을 통해 편리하게 `URLSearchParams` 인스턴스를 제공하거든요.

`new URL('...?key=value').searchParams`와 같이 접근할 수 있습니다.


### 퍼센트 인코딩
공백과 같은 일부 문자는 URL에 허용되지 않기 때문에 인코딩되는데요.

공백은 더하기 기호(`+`)로, 다른 문자들은 퍼센트 기호(`%`)와 문자의 코드 포인트에 해당하는 두 자리 16진수로 인코딩됩니다.


## 인터페이스 vs. 구현 그리고 API
프로그래밍에서 우리는 '인터페이스'와 '구현'을 구분하는데요.

'인터페이스'는 함수, 클래스 등의 모음의 표면입니다.

그들의 구조(이름, 파라미터 수 등)를 설명하죠.


'API(Application Programming Interface)'는 특정 목적을 위한 인터페이스인데요.

예를 들어 브라우저가 제공하는 기능은 종종 '웹 API'라고 불립니다.


## 프로젝트 `simple-server-api.js`
이 프로젝트에서는 API 서버를 작성하는데요.

서버에서 실행되는 기능을 호출할 수 있게 해줍니다.

```javascript
const server = createServer(
  (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain'); // (A)
    const url = new URL('file:' + request.url); // (B)
    const params = url.searchParams;
    // ...
    response.end(/* ... */);
  }
);
```
이번에는 HTML 페이지 대신 일반 텍스트를 제공하는데요(A).

`request.url`에서 검색 파라미터를 추출하기 위해, `file:` 프로토콜을 접두사로 붙여 실제 URL로 변환하는 트릭을 사용합니다(B).


### 원격 함수 호출
지금 일어나고 있는 일은 (원격) 함수 호출과 같은데요.

입력은 검색 파라미터, 출력은 일반 텍스트입니다.

JSON을 반환할 수도 있었겠죠.


## 자바스크립트 객체를 [키, 값] 쌍으로 변환하고 그 반대도 하기
`Object.entries()`는 객체를 `[키, 값]` 쌍의 배열로 변환하고요.

`Object.fromEntries()`는 그 반대 작업을 수행합니다.

우리는 다음 프로젝트에서 이 두 가지 모두를 필요로 할 겁니다.


## 프로젝트 `todo-list-server`
이전 챕터에서는 브라우저에서 Todo 리스트를 편집하는 웹 앱을 구현했는데요.

이 프로젝트에서는 추가로 웹 서버를 구현하고 Todo 리스트를 그곳에 저장합니다.


### 웹 앱은 서버와 어떻게 상호작용해야 할까요?
우리는 Todo 리스트 모델을 서버에 유지하고, 브라우저는 API 호출을 통해 모델을 변경하며, 변경 후에는 현재 모델을 다시 받는 두 번째 접근 방식을 사용할 건데요.

이를 통해 서버 측 API와 사용자 인터페이스의 비동기 업데이트를 탐색할 수 있습니다.


### 파일 시스템 구조
이제 우리는 클라이언트 앱과 서버 앱, 두 개의 자바스크립트 앱을 갖게 되는데요.

*   **공유**: `package.json`, `site/`(서버가 제공하고 클라이언트 앱이 빌드되는 디렉토리)

*   **클라이언트**: `node_modules/`, `html/`, `client/`(번들링될 자바스크립트 모듈)

*   **서버**: `server/`, `data/`(모델이 저장되는 곳)


### `server/server.js`
요청의 경로가 `/api/`로 시작하는지에 따라 서버가 수행하는 작업이 결정되는데요.

`/api/`로 시작하면 API 호출이고, 그렇지 않으면 서버는 파일을 제공합니다.

```javascript
const server = createServer(
  async (request, response) => {
    const webPath = request.url;
    if (webPath.startsWith(API_PATH_PREFIX)) {
      await handleApiRequest(request, response, webPath);
      return;
    }
    await handleFileRequest(request, response, webPath);
  }
);
```

### `server/handle-file-request.js`
파일을 제공하는 방법은 다음과 같은데요.

웹 경로가 서버의 최상위 디렉토리를 참조하면, 해당 디렉토리의 `index.html`을 제공합니다.

그런 다음 절대 경로를 `site/` 디렉토리 내 파일의 URL로 변환하고, 해당 URL에 파일이 있으면 제공합니다.


파일 확장자를 기반으로 콘텐츠 타입을 조회하고, `fs.readFile()`로 파일 내용을 읽어 응답에 추가합니다.

파일을 찾을 수 없으면, `404` 오류 메시지로 응답합니다.


### `server/handle-api-request.js`
서버가 시작되면 스토리지에서 모델을 읽어오는데요.

API 요청이 처리되는 방식은 다음과 같습니다.

```javascript
export const handleApiRequest = async (request, response) => {
  try {
    const url = new URL('file:' + request.url);
    const functionName = url.pathname.slice(API_PATH_PREFIX.length);
    const params = Object.fromEntries(/* ... */);
    
    if (functionName === 'addTodo') {
      coreModel.todos.push({ text: params.text, checked: false });
      await writeCoreModelFile(coreModel);
      serveCoreModel(response, coreModel);
      return;
    }
    // ...
  } catch (err) {
    // ...
  }
};
```
먼저 경로에서 `functionName`을 추출하고, 검색 파라미터를 객체로 변환합니다.

각 함수는 `coreModel`을 업데이트하고, 새 모델을 스토리지에 저장한 다음, 클라이언트에 제공하는 동일한 패턴을 따릅니다.


### `client/main.js`
클라이언트 측에서는 한 가지 딜레마에 직면하는데요.

UI를 가능한 한 빨리 표시하고 싶지만, 그러려면 먼저 서버에서 모델을 로드해야 합니다.


따라서 우리는 다음과 같은 접근 방식을 사용하거든요.

```javascript
const appModel = signal(undefined);

function App() {
  if (appModel.value === undefined) {
    return html`<div>Loading...</div>`;
  }
  // ...
}

render(html`<${App} />`, document.body); // (A)

const coreModel = await loadCoreModel(); // (B)
appModel.value = coreModel;
```
`appModel.value`는 초기에 `undefined`인데요.

따라서 (A)에서 처음 렌더링될 때 `App` 컴포넌트는 "Loading..." 메시지를 표시합니다.

초기 렌더링 후, (B)에서 모델을 로드하고 `appModel.value`에 할당하거든요.

이는 `App`을 다시 렌더링하게 하고, 그러면 Todo 리스트가 표시됩니다.


### `client/app-model.js`
`todo-list-browser`의 `app-model.js`가 모델 변경을 직접 수행했던 것과 달리, `todo-list-server` 버전의 해당 모듈은 그 작업을 API 서버에 위임하는데요.

```javascript
export const addTodo = async (appModel, text) => {
  const coreModel = await sendApiRequest('addTodo', { text });
  appModel.value = coreModel;
};
```
API 요청을 보내고, 서버가 새 모델을 반환할 때까지 기다린 다음, 그 모델을 `appModel.value`에 할당합니다.

그러면 사용자 인터페이스가 다시 렌더링되는 거죠.

