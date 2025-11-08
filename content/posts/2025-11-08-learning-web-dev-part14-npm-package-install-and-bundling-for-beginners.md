---
title: 웹 개발 배우기 14편 - 이제는 빌드가 필수! npm 패키지 설치와 번들링 완벽 가이드
date: 2025-11-08T15:16:00+09:00
description: npm을 통해 외부 라이브러리를 설치하고, esbuild로 여러 자바스크립트 파일을 하나로 합치는 번들링 과정을 배웁니다. package.json 설정부터 실제 프로젝트 빌드 및 실행까지, 현대적인 웹 개발 워크플로우를 마스터합니다.
tags:
    - npm install
    - 번들링
    - esbuild
    - package.json
    - devDependencies
    - 웹 개발 워크플로우
---
![웹 개발 배우기 14편 -웹 이제는 빌드가 필수! npm 패키지 설치와 번들링 완벽 가이드](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.


이번 시간에는 대규모 전문 웹 앱을 개발하는 것과 동일한 방식으로 작은 웹 앱을 개발해 볼 건데요.

*   npm을 통해 라이브러리를 설치해서 사용합니다.

*   일부 기능에 대한 테스트를 작성합니다.

*   웹 앱을 제공하기 전에 모든 자바스크립트 코드를 하나의 파일로 결합합니다.

    이것을 '번들링'이라고 부릅니다.


## npm 패키지를 사용하는 프로젝트의 파일 구조
npm 패키지를 사용하는 웹 앱을 만드는 것은 더 복잡한데요.

곧 나올 프로젝트 `word-guessing-game/`의 파일 시스템 구조를 탐색해 보겠습니다.


이 섹션에서는 프로젝트의 최상위 레벨에 존재하는 파일들을 살펴볼 건데요.

*   `package.json`

*   `node_modules/`

*   `build/`

*   `html/`

*   `js/`


npm 패키지 관리 관련 파일은 다음과 같습니다.

*   `package.json`은 프로젝트가 사용하는 npm 패키지와 같은 프로젝트에 대한 정보를 포함하는데요.

    이 패키지들을 `word-guessing-game`의 '의존성(dependencies)'이라고 부릅니다.

*   `node_modules/`는 우리가 설치한 의존성들을 포함하는데요.

    아무것도 설치하기 전에는 비어 있거나 존재하지 않습니다.


출력 관련 파일은 다음과 같습니다.

*   `build/`는 완전하고 제공될 준비가 된 최종 웹 앱을 포함합니다.


입력 관련 파일은 다음과 같습니다.

*   `html/`은 `build/`로 복사될 HTML 파일들을 포함합니다.

*   `js/`는 우리가 사용하는 npm 라이브러리 코드와 함께 `build/bundle.js`라는 단일 파일로 번들링될 자바스크립트 파일들을 포함합니다.


`word-guessing-game` 프로젝트 자체도 하나의 npm 패키지인데요.

대략적으로, `package.json` 파일이 있는 모든 디렉토리는 npm 패키지입니다.


## 단점 새로운 '빌드' 단계의 등장
이 새로운 개발 방식의 한 가지 단점은, 이제 우리 웹 앱에 두 가지 버전이 존재하게 된다는 점인데요.

*   **개발 버전**: 자바스크립트 코드가 여러 파일에 포함되어 있습니다.

*   **배포 버전 (우리가 제공할 수 있는 버전)**: 자바스크립트 코드가 단일 파일에 포함되어 있습니다.


개발 버전에서 배포 버전으로 넘어가기 위해서는 앱을 '빌드(build)'해야 하거든요.

이 추가 단계는 우리가 이전에 했던 방식보다 덜 편리합니다.

이전에는 우리가 작성한 파일들을 즉시 제공할 수도 있었죠.


## 번들링이란 무엇일까요?
앱이 npm을 통해 설치된 라이브러리를 사용한다면, 그 코드의 총합은 다음과 같이 구성되는데요.

*   앱 자체의 자바스크립트 파일들.

*   npm 패키지에 저장된 자바스크립트 파일들.


'번들링(Bundling)'이란 이 모든 자바스크립트 코드를 담은 단 하나의 파일을 만드는 과정을 의미하는데요.

번들링을 하는 앱을 '번들러'라고 부릅니다.


왜 이것이 유용할까요?

두 가지 주요 이점이 있습니다.


*   하나의 큰 파일을 로드하는 것이 보통 여러 개의 작은 파일을 로드하는 것보다 빠릅니다.

*   번들에는 실제로 사용되는 코드만 포함됩니다.

    대부분의 앱은 실행이 시작되는 단일 메인 모듈을 가지고 있거든요.

    번들러는 그 모듈을 분석하고, 그 모듈이 가져온 코드, 그 코드가 가져온 코드 등을 포함시킵니다.

    이는 우리가 거의 모든 기능을 필요로 하지 않는 npm 라이브러리에 특히 유용합니다.


한 가지 추가적인 사소한 이점이 있는데요.

우리 코드에서는 `es-toolkit` npm 패키지에서 `randomInt()` 함수를 가져옵니다.

```javascript
import { randomInt } from 'es-toolkit';
```
추가 설정 없이는 이 문법이 브라우저에서 작동하지 않거든요.

npm 코드를 번들에 포함시킴으로써, 번들러가 우리를 위해 이 문제를 처리해 줍니다.


## npm 패키지 설치하기
처음에는 `node_modules/` 디렉토리가 없거나 비어 있는데요.

따라서 웹 앱을 빌드하고 실행하기 전에 (`package.json`에 나열된 대로) npm 패키지를 설치해야 합니다.

```bash
cd word-guessing-game/
npm install
```

## `package.json`
`package.json`은 다음과 같은데요.

```json
{
  "type": "module",
  "scripts": {
    // ...
  },
  "dependencies": {
    // ...
  },
  "devDependencies": {
    // ...
  }
}
```
`package.json`은 다음과 같은 속성을 가진 JSON 객체를 포함합니다.


*   `"type"`은 노드제이에스(Node.js)에게 파일 이름 확장자가 `.js`인 파일이 자바스크립트 모듈임을 알려줍니다.

*   `"scripts"`는 개발 중에 사용할 수 있는 셸 명령어를 정의하는데요.

    곧 이 셸 명령어들을 어떻게 호출하는지 배울 겁니다.

    이들을 '패키지 스크립트'라고 부릅니다.

*   `"dependencies"`는 런타임(앱이 실행되는 동안)에 필요한 npm 패키지들을 나열합니다.

*   `"devDependencies"`는 개발 중에만 필요한 npm 패키지들을 나열합니다.

    따라서 이 패키지들은 보통 개발 도구들입니다.


### 일반 의존성 (런타임 의존성)
`"dependencies"` 속성은 우리 앱이 사용하는 라이브러리 패키지들을 나열하는데요.

```json
"dependencies": {
  "es-toolkit": "^1.39.10"
}
```
`npm install`은 의존성들을 `node_modules`에 다운로드하고, 그 후 우리는 다음과 같이 그것들로부터 가져올 수 있습니다.

```javascript
import { randomInt } from 'es-toolkit';
```

### 개발 의존성
`"devDependencies"` 속성은 패키지 스크립트에서 사용하는 셸 명령어를 가진 npm 패키지들을 나열하는데요.

```json
"devDependencies": {
  "copyfiles": "^2.4.1",
  "esbuild": "^0.25.9",
  "live-server": "^1.2.2",
  "shx": "^0.4.0",
  "simple-file-watch": "^3.0.0"
}
```
*   **빌드 도구**: `esbuild`(번들링 도구), `simple-file-watch`(파일 변경 감지), `live-server`(라이브 리로딩 웹 서버).

*   **크로스플랫폼 셸 명령어**: `copyfiles`(파일 복사), `shx`(유닉스 셸 명령어 구현).


### `npm install` 사용 방법
`npm install`을 사용하는 세 가지 일반적인 방법은 다음과 같은데요.

*   `npm install`: 의존성으로 나열된 모든 패키지를 설치합니다.

*   `npm install some-package`: `some-package`를 설치하고 `"dependencies"`에 추가합니다.

*   `npm install --save-dev some-package`: `some-package`를 설치하고 `"devDependencies"`에 추가합니다.


## `"scripts"` 패키지 스크립트
가장 중요한 패키지 스크립트는 다음과 같은데요.

```json
"scripts": {
  "build": "...",
  "watch": "...",
  "start": "...",
  "test": "..."
}
```
셸에서 `npm run build`를 통해 `build` 스크립트를 실행할 수 있습니다.

`start`와 `test` 스크립트에는 각각 `npm start`와 `npm test`라는 더 짧은 명령어가 있습니다.


### 큰 그림
스크립트 뒤에 있는 실제 셸 명령어들은 약간 복잡한데요.

모든 세부 사항을 이해할 필요는 없습니다.

다음 기본 사항만 명심하면 됩니다.


*   `build`: `build/` 디렉토리 안에 완전한 웹 앱을 생성하는 데 사용됩니다.

*   `watch`: `html/`과 `js/` 디렉토리를 감시하고 파일이 변경될 때마다 앱을 다시 빌드합니다.

*   `start`: `build/` 디렉토리 안의 내용을 제공하는 웹 서버를 실행합니다.

*   `test`: `js/` 안의 테스트를 실행합니다.


개발 중에는 `watch`와 `start`가 동시에 실행되며(보통 별도의 터미널에서), 다음과 같은 단계가 반복적으로 일어납니다.

1.  HTML이나 자바스크립트 파일을 저장합니다.

2.  `watch`가 이를 감지하고 `build`를 호출합니다.

3.  `build`가 `build/`에 앱의 새 버전을 씁니다.

4.  `start`가 이를 감지하고 브라우저에서 앱의 웹 페이지를 새로고침합니다.


즉, 변경할 때마다 자동으로 웹 브라우저에서 결과를 볼 수 있습니다.


## 모듈 지정자 (Module Specifiers)
'모듈 지정자'는 `import` 문에서 `from` 뒤에 오는 따옴표 안의 텍스트인데요.

세 가지 종류가 있습니다.


*   **상대 지정자**: `'./sibling-module.js'`와 같이 상대 URL입니다.

*   **Bare 지정자**: `'some-package'`처럼 슬래시나 점으로 시작하지 않는 경로입니다.

    `node_modules/`에 설치된 모듈을 참조합니다.

*   **절대 지정자**: `'https://esm.sh/es-toolkit@%5E1'`과 같이 전체 URL입니다.

    주로 웹에서 직접 호스팅되는 모듈에 접근하는 데 사용됩니다.


## 프로젝트 `word-guessing-game/`
이 프로젝트를 통해 우리는 단어 추측 게임(행맨으로도 알려져 있음)을 구현하는데요.

*   컴퓨터가 단어를 생각해내면 처음에는 글자당 하나씩 일련의 빈칸으로 표시됩니다.

*   사람이 글자를 추측합니다.

    글자를 맞히면 빈칸이 채워집니다.

    여덟 번 이상 잘못 추측하면 게임에 실패합니다.


게임은 이렇게 생겼습니다.


![](https://blogger.googleusercontent.com/img/a/AVvXsEgIAD-PrEtL6jtBsVrNP7zRRSB-OhM4ma3PTwmtWEGaqWNRUcovFm48uP_fwbg2-A1pxVoYDUEKkGbl3WaC9l7_SCNWeP6O99bRlZFDbSYbJyVbicHBrIUpRmqoKurzQDRSuwHwa8P7L5FRxuOJgErNwMxLlketKYmlqVmahjX9itWpA-Y3OhXqqIWjSM4=s16000)

### 체계적으로 문제 해결하기
주어진 문제에 대한 해결책을 생각해내는 것은 항상 어려운 일인데요.

체계적으로 하기 위해 다음 단계를 따를 수 있습니다.


1.  **요구사항 수집**: 프로그램이 무엇을 해야 하는지 명확히 정의합니다.

2.  **모델 설계**: 프로그램의 '상태'를 가장 잘 나타낼 수 있는 데이터 구조(모델)를 구상합니다.

3.  **뷰 설계**: 모델을 사용자에게 어떻게 보여줄지(뷰), 즉 HTML 구조와 모델을 화면에 표시하는 방법을 구상합니다.


### 우리 게임의 모델은 어떤 모습일까요?
우리는 단 두 가지 데이터만 있으면 되는데요.

컴퓨터가 정한 단어의 글자 배열인 `wordLetters`와, 사용자가 이미 입력한 글자 배열인 `inputLetters`가 그것입니다.

이 두 가지 정보만 있으면 실패 횟수, 빈칸이 포함된 단어 표시, 이미 누른 버튼 비활성화 등 게임에 필요한 모든 정보를 파생해낼 수 있습니다.


### `html/index.html`
사용자 인터페이스를 위한 HTML은 다음과 같은데요.

```html
<div id="letterButtonsDiv">
  <!--Generated via JavaScript-->
</div>
<div>
  <label>
    Used <span id="failureCountSpan">0</span>
    of <span id="maxFailuresSpan">0</span> failures:
    <progress id="failuresProgress" value="0">0</progress>
  </label>
</div>
<!-- ... -->
<script type="module" src="bundle.js"></script>
```

### `main.js` UI 초기화하기
UI 초기화는 세 단계로 구성되는데요.


1.  **추측할 단어 로드하기**: 특별한 문법을 사용해 `words.json` 파일을 자바스크립트 모듈처럼 가져옵니다.

    ```javascript
    import wordList from './words.json' with { type: 'json' };
    ```
2.  **최대 실패 횟수 표시하기**: 상수로 정의된 `MAX_FAILURES` 값을 화면에 표시합니다.

3.  **글자 버튼 생성하기**: 반복문을 사용해 알파벳 글자 버튼들을 동적으로 생성합니다.


### `js/model.js`
`model.js` 모듈은 순수하게 데이터(모델)를 다루는 함수들로만 구성되어 있는데요.

덕분에 테스트하기가 아주 쉽습니다.

각 함수와 그에 대한 테스트를 함께 살펴보겠습니다.


*   `inputLettersToWordWithBlanks()`: 사용자를 위한 피드백, 즉 맞춘 글자와 아직 맞춰야 할 글자를 보여주는 빈칸이 포함된 단어를 만듭니다.

*   `isWordComplete()`: 사용자가 모든 글자를 맞췄는지 확인합니다.

*   `countFailures()`: 사용자가 잘못 추측한 글자의 수를 셉니다.


### `js/main.js` 핵심 뷰 기능
이 파일에서는 모델의 데이터를 실제로 화면에 그려주는 역할을 하는데요.

가장 중요한 `updateUserInterface()` 함수는 현재 모델의 상태를 기반으로 실패 횟수, 빈칸 단어, 버튼 활성화 상태 등 화면의 모든 요소를 한 번에 업데이트합니다.


이 함수는 뷰를 점진적으로 업데이트하지 않고, 항상 모델 전체로 완전한 뷰를 업데이트하는데요.

이 방식은 약간 덜 효율적이지만 훨씬 간단하고, 시간이 지나도 뷰와 모델이 동기화되지 않을 위험이 거의 없습니다.


`startGame()` 함수는 새로운 단어를 뽑아 모델을 초기화하고 `updateUserInterface()`를 호출해서 게임을 시작하고요.

사용자가 알파벳 버튼을 클릭하면 `addInputLetter()` 함수가 모델에 입력된 글자를 추가하고, 다시 `updateUserInterface()`를 호출해서 변경된 상태를 화면에 반영하는 구조입니다.
