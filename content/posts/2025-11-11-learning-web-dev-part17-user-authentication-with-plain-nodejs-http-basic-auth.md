---
title: 웹 개발 배우기 17편 - Node.js로 구현하는 로그인 기능, HTTP 기본 인증 정복하기
date: 2025-11-11T15:29:00+09:00
description: Node.js로 사용자를 인증하는 방법을 배웁니다. HTTP 기본 인증의 원리부터 시작해, 해싱과 솔팅을 통해 비밀번호를 안전하게 저장하는 방법까지, 서버 보안의 기초를 다집니다.
series: ["웹 개발 배우기"]
weight: 17
tags:
    - 사용자 인증
    - 로그인
    - HTTP 기본 인증
    - Node.js
    - 비밀번호 해싱
    - 솔팅
---
![웹 개발 배우기 17편 - Node.js로 구현하는 로그인 기능, HTTP 기본 인증 정복하기](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

이번 시간에는 사용자가 비밀번호로 로그인할 수 있게 해주는 서버를 직접 만들어 볼 건데요.

이 과정을 바로 '인증(authentication)'이라고 부릅니다.


## 프로젝트 `basic-http-authentication/`
이 프로젝트는 비밀번호를 통해 자신이 제공하는 페이지를 보호하는 웹 서버를 만드는 것인데요.

이제부터 나오는 모든 파일 경로는 `basic-http-authentication/` 디렉토리를 기준으로 합니다.


## 새로운 자바스크립트 기능들
### 파라미터 기본값
함수의 파라미터에 기본값을 할당해두면, 해당 파라미터에 값이 전달되지 않았을 때 그 기본값이 자동으로 사용되거든요.

```javascript
function add(x = 0, y = 0) {
  return x + y;
}
assert.equal(add(3, 4), 7);
assert.equal(add(3), 3); // y의 기본값이 사용됨
assert.equal(add(), 0);  // x와 y의 기본값이 사용됨
```
### 동적 `import()`
일반적인 `import` 문은 모듈의 최상위 레벨에서만 사용할 수 있는 '정적 임포트'인데요.

자바스크립트에는 `import()`라는, 함수처럼 사용할 수 있는 특별한 연산자가 있습니다.


이 '동적 `import()`'는 모듈을 더 유연하게 불러올 수 있게 해주며, 그 결과로 모듈의 `export`들을 담은 객체를 약속하는 프로미스를 반환합니다.

```javascript
> const {getHashForText} = await import('./server/crypto-tools.js');
> await getHashForText('abc')
'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
```
`crypto-tools.js`는 우리 현재 프로젝트의 유틸리티 라이브러리인데요.

객체 구조 분해를 사용해 `getHashForText`라는 `export`에 접근합니다.

이 함수는 비동기 함수이기 때문에, 그 결과를 가져오기 위해 `await`를 사용합니다.


`import()`의 결과 또한 `await`하고 있으며, 그 인자는 고정된 문자열이 아닌 어떤 문자열이든 될 수 있다는 점에 주목해주세요.


### Base64 텍스트로 바이너리 데이터 표현하기
'Base64'는 바이너리 데이터를 텍스트로 인코딩하는 한 가지 방법인데요.

덕분에 HTML이나 JSON처럼 텍스트만 지원하는 형식에서도 바이너리 데이터를 저장할 수 있게 됩니다.


노드제이에스(Node.js) REPL을 사용해 Base64가 어떻게 동작하는지 탐색해 보겠습니다.

```javascript
> const {toBase64, fromBase64} = await import('./server/crypto-tools.js');
> toBase64(Uint8Array.of(0, 1, 2))
'AAEC'
> fromBase64('AAEC')
Uint8Array(3) [ 0, 1, 2 ]
```
먼저 `crypto-tools.js` 모듈에서 Base64 변환 함수들을 가져왔는데요.

`Uint8Array`는 바이트(부호 없는 8비트 정수)를 위한 이른바 '타입 배열'입니다.

바이너리 데이터를 위한 배열이라고 생각하시면 됩니다.

`toBase64()`를 통해 바이너리 데이터를 Base64 문자열로 변환하고, `fromBase64()`를 통해 다시 원래대로 되돌립니다.


## HTTP 기본 인증 (Basic HTTP Authentication)
npm에는 훌륭한 인증 라이브러리가 많지만, 거의 대부분이 익스프레스(Express)와 같은 백엔드 프레임워크와 함께 사용하도록 만들어졌는데요.

이번 챕터에서는 아주 간단한 인증 방식인 'HTTP 기본 인증'을 사용해 볼 겁니다.

이 방식은 장단점이 아주 명확하거든요.


장점은 별도의 백엔드 프레임워크 없이 순수 노드제이에스(Node.js)만으로 구현한 서버에 추가하기가 아주 쉽다는 점인데요.

단점은 암호화 없이 비밀번호를 네트워크로 전송한다는 점입니다.


만약 `HTTP`를 사용한다면 같은 와이파이 네트워크에 있는 모든 사람, 인터넷 제공업체 등 많은 사람들이 비밀번호를 볼 수 있거든요.

하지만 `HTTPS`를 사용하면 클라이언트와 서버 간의 트래픽이 암호화되어 아무도 인증 데이터를 볼 수 없습니다.


따라서 웹 앱은 `HTTPS`를 통해 서비스될 경우에만 HTTP 기본 인증을 사용해야 하는데요.

하지만 개발 중에 `localhost`와 함께 `HTTP`를 사용하는 것은 모든 트래픽이 로컬에 머무르기 때문에 문제가 되지 않습니다.


### `Authorization` 헤더 필드
HTTP 기본 인증에서 브라우저는 특정 웹 페이지를 요청할 때 사용자를 인증하기 위해 다음과 같은 헤더 필드를 보내는데요.

```
Authorization: Basic VXNlcjpQYXNzd29yZA==
```
끝에 있는 텍스트는 사용자 이름과 비밀번호를 Base64로 인코딩한 값을 담고 있습니다.

```javascript
> const {fromBase64} = await import('./server/crypto-tools.js');
> new TextDecoder().decode(fromBase64('VXNlcjpQYXNzd29yZA=='))
'User:Password'
```
`TextDecoder` 클래스를 사용해 UTF-8 형식의 바이트 시퀀스를 자바스크립트 문자열로 변환합니다.


이런 종류의 인코딩은 너무 단순해서 암호화라고 할 수 없으며, 결코 안전하지 않은데요.

단지 사람이 우연히 비밀번호를 보는 것을 막을 뿐입니다.


### 인증 과정
보통 브라우저는 요청에 `Authorization` 헤더 필드를 추가하지 않는데요.

만약 이 헤더 없이 보호된 페이지를 요청하면, 서버는 콘텐츠 없이 다음과 같은 응답을 보냅니다.


*   상태 코드: 401 Unauthorized

*   헤더 필드: `WWW-Authenticate: Basic realm="..."`


'realm'의 이름은 동일한 사용자 및 비밀번호를 가진 서버상의 페이지 그룹을 식별하는데요.

401 응답은 브라우저가 사용자에게 사용자 이름과 비밀번호를 묻게 만듭니다.

그러면 브라우저는 이전 요청을 다시 보내되, 이번에는 `Authorization` 헤더 필드를 추가합니다.

그 요청을 받으면, 브라우저는 사용자 이름과 비밀번호를 확인하는데요.

만약 정확하면 웹 페이지를 제공하고, 그렇지 않으면 다시 401 응답을 보냅니다.


성공적인 인증 후, 대부분의 브라우저는 사용자 이름과 비밀번호를 저장하고 동일한 디렉토리나 그 하위의 모든 페이지에 대해 사용하거든요.

따라서 사용자가 `https://example.com/protected/index.html`에 로그인하면, 브라우저는 `https://example.com/protected/help.html`에도 자동으로 로그인시켜 줍니다.


### 로그아웃
HTTP 기본 인증의 한 가지 흥미로운 난관은, 브라우저에게 특정 사용자를 잊으라고 말할 수 없기 때문에 사실상 로그아웃을 할 수 없다는 점인데요.

브라우저는 계속해서 인증 데이터를 보낼 뿐입니다.

따라서 우리는 일종의 트릭에 의존해야 하거든요.

`fetch()`를 통해 요청을 보내고 일부러 틀린 인증 데이터를 사용하는 겁니다.


결과적으로 브라우저는 이전의 (올바른) 데이터를 새로운 (틀린) 데이터로 대체하는데요.

서버는 후자를 거부하고, 브라우저는 사용자에게 다시 로그인하라고 요청하게 됩니다.


`site/index.html`에서는 다음과 같이 보입니다.

```javascript
document.querySelector('a').addEventListener(
  'click',
  async (event) => {
    event.preventDefault();
    await fetch(
      '/index.html',
      {
        headers: {
          'Authorization': 'Basic ' + btoa('logout:logout'),
        },
      }
    );
    location.reload();
  }
);
```
위의 모든 작업을 클라이언트에서 수행한다는 점에 유의해주세요.

서버는 사용자를 로그아웃시킬 수 없습니다.


## 비밀번호를 안전하게 저장하는 방법
비밀번호를 파일이나 데이터베이스에 어떻게 저장해야 할까요?

혹시 `passwords.json` 파일에 다음과 같이 저장하면 될까요?

```json
{
  "Kane": "Rosebud",
  "Wagstaff": "Swordfish"
}
```
이렇게 하는 데는 단 한 가지 문제가 있는데요.

만약 누군가 `passwords.json` 파일을 손에 넣게 되면, 그 안에 저장된 비밀번호로 보호되는 모든 계정에 자유롭게 접근할 수 있게 됩니다.

어떻게 하면 이를 방지할 수 있는지 살펴보겠습니다.


### 1단계 해시(Hash) 계산하기
우리의 초기 아이디어는 비밀번호를 저장하는 대신, 비밀번호의 '해시'를 저장하는 것인데요.

대략적으로 해시는 입력 데이터로부터 파생되며, 그 데이터를 잘 나타내는 (종종 더 짧은) 표현이어야 합니다.


해시는 종종 긴 파일이 변경되었는지 감지하거나 데이터 조각에 대한 ID를 계산하기 위해 프로그래밍에서 사용되거든요.

우리는 비밀번호를 인코딩하기 위해 해시를 사용할 수도 있습니다.


아이디어는 이렇습니다.

*   우리는 사용자 이름과 비밀번호의 해시를 어딘가에 저장합니다.

*   사용자가 사용자 이름과 비밀번호로 로그인하면, 후자를 해싱하고 우리가 저장한 것과 비교합니다.


비밀번호를 해싱할 때 핵심 요구사항은 입력에서 해시로 가는 것은 비교적 빠르지만, 해시에서 입력으로 가는 것은 매우 어려워야 한다는 것인데요.

흥미롭게도 컴퓨터가 빨라짐에 따라, 공격을 계속 어렵게 만들기 위해 비밀번호 해시도 더 길어졌습니다.


노드제이에스(Node.js) REPL에서 해싱을 실험해 볼 수 있습니다.

```javascript
> const { getHashForText } = await import('./server/crypto-tools.js');
> await getHashForText('Rosebud')
'1727f9eedb5128f0cdf892ad31eac287ea16e261fd7ff9007037807c3ebc02dc'
```
보시다시피, `getHashForText()`에는 무작위 요소가 없는데요.

인자가 같으면 동일한 출력을 생성합니다.

결과를 비동기적으로 계산하기 때문에, 반환하는 것을 `await`해야 합니다.


### 2단계 소금(Salt) 추가하기
아쉽게도 비밀번호를 해싱하는 것만으로는 여전히 충분히 안전하지 않은데요.

만약 누군가 우리의 `passwords.json`을 가지고 있다면, 인기 있는 비밀번호와 그 해시가 포함된 테이블(레인보우 테이블)을 사용하여 많은 계정에 접근할 수 있습니다.

고맙게도 이를 해결할 방법이 있거든요.

사용자가 새 비밀번호를 설정할 때마다 무작위 문자열을 만들어 '솔트(salt)'로 사용하는 겁니다.


솔트는 해싱을 위한 또 다른 매개변수일 뿐인데요.

이것을 사용하는 것은 해싱하기 전에 비밀번호에 솔트를 덧붙이는 것과 거의 같습니다.

주어진 비밀번호가 올바른지 확인하려면, 이전 해싱을 재현할 수 있도록 솔트가 필요하거든요.

이것이 우리가 `passwords.json`에 솔트와 해시된 비밀번호를 모두 보관하는 이유입니다.


`server/password-tools.js`가 Map에 비밀번호를 저장하는 방식은 다음과 같습니다.

```javascript
export async function setPassword(passwordsMap, user, password) {
  const saltBin = generateSalt();
  const hashedPasswordBin = await hash(password, saltBin);
  passwordsMap.set(
    user,
    {
      salt: toBase64(saltBin),
      hashedPassword: toBase64(hashedPasswordBin),
    }
  );
}
```
`saltBin`과 `hashedPasswordBin`은 바이너리 데이터이므로 `toBase64()`를 사용해 문자열로 변환하여 JSON으로 쉽게 저장할 수 있습니다.


### 비밀번호와 그 해시 비교하기
`server/password-tools.js`가 비밀번호가 유효한지 확인하는 방법은 다음과 같은데요.

```javascript
export async function isValidPassword(passwordsMap, user, password) {
  const entry = passwordsMap.get(user);
  if (entry === undefined) {
    return false;
  }
  const { salt, hashedPassword } = entry;
  const saltBin = fromBase64(salt);
  const hashedPasswordBin = fromBase64(hashedPassword);

  return await verify(password, hashedPasswordBin, saltBin);
}
```
이 코드는 해싱을 다시 수행하고 비동기 함수 `verify()`를 통해 저장된 해시와 결과를 비교합니다.

엄격한 동등 연산자 `===`를 사용할 수 없는 이유는, 피연산자가 같지 않으면 빠르게 끝나버려서 공격자에게 귀중한 정보를 주기 때문인데요.

따라서 `verify()`는 항상 동일한 시간이 걸립니다.


## 프로젝트 `basic-http-authentication/` 살펴보기
### 이 프로젝트에서 비밀번호를 관리하는 방법
전문적인 웹사이트에서는 비밀번호 관리가 상당히 복잡한데요.

우리 취미 프로젝트에서는 더 간단한 접근 방식을 취합니다.


셸 명령어를 통해 비밀번호가 담긴 JSON 파일을 관리하고, 서버는 그 JSON 파일을 사용하여 인증합니다.


### 파일 구조
이 프로젝트의 최상위 파일 시스템 구조는 다음과 같은데요.

*   `package.json`

*   `site/`: 서버가 제공하는 파일들

*   `data/passwords.json`: 비밀번호

*   `server/`: 서버 코드

*   `cli/passman.js`: 비밀번호 관리를 위한 셸 명령어


### `package.json`
이 프로젝트의 `package.json`은 다음과 같은데요.

```json
{
  "type": "module",
  "scripts": {
    "start": "node --watch server/server.js",
    "test": "node --test \"server/**/*_test.js\""
  },
  "dependencies": {
    "http-auth": "^4.2.1"
  }
}
```
`http-auth` 패키지는 서버의 의존성으로, 인증을 도와줍니다.


### `cli/passman.js`
`cli/passman.js`는 비밀번호 관리를 위한 셸 명령어인데요.

`set`, `rm`, `check`, `ls`와 같은 서브커맨드를 통해 사용자를 추가, 삭제, 확인, 목록 조회를 할 수 있습니다.


### `server/server.js`
이것이 우리의 인증 서버인데요.

```javascript
import auth from 'http-auth';
import * as http from 'node:http';
// ...

const basic = auth.basic( // (A)
  { realm: 'Users' },
  async (user, password, callback) => {
    const isValid = await isValidPassword(passwordsMap, user, password);
    callback(isValid);
  }
);

http
  .createServer(
    basic.check( // (B)
      async (request, response) => { // (C)
        await handleFileRequest(
          request, response,
          { user: request.user }
        );
      }
    )
  )
  .listen(/* ... */);
```
(A)에서 기본 인증 객체 `basic`을 설정하는데요.

(B)에서는 `basic.check()` 메서드를 사용해 `createServer()`를 위한 콜백을 만듭니다.

그 콜백은 인증이 성공한 경우에만 자신이 감싸고 있는 함수(C)를 호출합니다.


### `site/index.html`
우리 프로젝트의 클라이언트 측은 다음과 같은데요.

```html
<h1>Authenticated: {{user}}</h1>
<p><a href="">Log out</a></p>
<script type="module">
  // ... 로그아웃 코드
</script>
```
`handle-file-request.js`는 HTML 파일을 제공하기 전에 `{{user}}` 변수를 실제 사용자 이름으로 교체해주는 역할을 합니다.
