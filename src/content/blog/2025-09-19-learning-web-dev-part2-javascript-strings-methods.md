---
title: 웹 개발 배우기 2편 - 자바스크립트 문자열과 메소드, 드디어 첫 앱 만들기
pubDatetime: 2025-09-19T09:58:27+09:00
postSlug: 2025-09-19-learning-web-dev-part2-javascript-strings-methods
featured: false
draft: false
tags:
  - 웹 개발 배우기
  - 자바스크립트 기초
  - 자바스크립트 문자열
  - 자바스크립트 메소드
  - 웹 앱 만들기
  - 이벤트 리스너
  - DOM 조작
description: 웹 개발 배우기 시리즈 2편입니다. 자바스크립트의 문자열과 메소드 개념을 배우고, 클릭 카운터와 온도 변환기 같은 간단한 웹 앱을 직접 만들어보며 이벤트 처리 방법을 익힙니다.
---

'웹 개발 배우기' 시리즈의 두 번째 시간이 돌아왔는데요.<br /><br />
지난 1편에서는 자바스크립트의 숫자와 변수, 함수에 대해 알아봤습니다.<br /><br />
이번 챕터에서는 텍스트, 즉 '문자열'을 다루는 방법과 함께 우리의 첫 번째 애플리케이션을 직접 만들어 볼 거거든요.<br /><br />

## 텍스트를 위한 데이터 타입, 문자열

<br />
'데이터 타입'이란 '비슷한 종류'의 값들을 모아놓은 집합이라고 할 수 있는데요.<br /><br />
우리는 지금까지 숫자(8, 1.5 등)와 함수(`(x) => {return x}` 등)라는 두 가지 데이터 타입을 만나봤습니다.<br /><br />
이제 또 다른 데이터 타입인 '문자열'에 대해 알아볼 차례인데요.<br /><br />
문자열은 0개 이상의 문자(텍스트 기호)로 이루어진 텍스트를 의미합니다.<br /><br />
문자열을 만들 때는 작은따옴표나 큰따옴표로 감싸주거든요.<br />

```javascript
"이것도 문자열";
"이것 또한 문자열";
```

물론 아무런 문자도 포함하지 않는 '빈 문자열'도 만들 수 있습니다.<br />

```javascript
"";
"";
```

여기서 흥미로운 점은 `'abc'`와 `"abc"`가 문법적으로는 다르지만 결국 같은 결과값을 만들어낸다는 점인데요.<br /><br />
이건 우리가 이전에 봤던 숫자 `123.0`과 `123`이 문법은 달라도 결국 같은 값을 나타내는 것과 비슷한 원리입니다.<br /><br />

## 문자열의 길이

<br />
우리는 `.length`라는 프로퍼티를 사용해서 문자열이 몇 개의 문자로 이루어져 있는지 알아낼 수 있는데요.<br />

```javascript
> ''.length
0
> 'abc'.length
3
```

이렇게 문자열의 길이를 쉽게 확인할 수 있습니다.<br /><br />

## 문자열 연결하기 + 연산자

<br />
변수에 문자열을 저장하고 플러스(+) 연산자로 이어 붙일 수도 있거든요.<br /><br />
이걸 '문자열 연결'이라고 합니다.<br />

```javascript
> let str = '';
> str = str + '만나서';
> str = str + ' 반가워요.';
> str
'만나서 반가워요.'
```

함수 역시 문자열을 반환할 수 있는데요.<br />

```javascript
const sayHello = name => {
  return "안녕하세요 " + name + "님!";
};
```

이 코드를 콘솔에 복사해서 붙여넣고 함수가 어떻게 작동하는지 시험해 볼 수 있습니다.<br />

```javascript
> sayHello('테리')
'안녕하세요 테리님!'
```

## 중첩된 변수 객체와 프로퍼티

<br />
자바스크립트에서는 변수 안에 또 다른 변수가 들어갈 수 있는데요.<br /><br />
이렇게 변수가 다른 변수를 담고 있는 구조를 '객체(object)'라고 부릅니다.<br /><br />
그리고 객체 안에 들어 있는 변수들은 그 객체의 '프로퍼티(property)'라고 하거든요.<br /><br />
예를 들어 자바스크립트에는 `Math`라는 미리 정의된 객체가 있고, 그 안에는 원주율 값을 가진 `PI`라는 프로퍼티가 있습니다.<br />

```javascript
> Math.PI
3.141592653589793
```

이렇게 점(.)을 사용해서 객체 안의 프로퍼티에 접근할 수 있습니다.<br /><br />

## 프로퍼티에 담긴 함수, 메소드

<br />
프로퍼티는 함수를 담을 수도 있는데, 우리는 이 함수를 호출할 수 있습니다.<br />

```javascript
> Math.sqrt(9)
3
```

`Math.sqrt`는 숫자의 제곱근을 계산하는 함수를 담고 있는 프로퍼티인데요.<br /><br />
이처럼 프로퍼티의 값이 함수일 경우, 특별히 '메소드(method)'라고 부릅니다.<br /><br />
어떤 메소드들은 자신이 속한 객체의 내용을 바탕으로 결과를 만들어내기도 하거든요.<br />

```javascript
> 'hello'.toUpperCase()
'HELLO'
```

`toUpperCase` 메소드는 'hello'라는 문자열 객체의 내용을 대문자로 바꿔주는 역할을 합니다.<br /><br />

## 코딩을 위한 필수 도구, 텍스트 에디터

<br />
HTML과 자바스크립트 코드는 텍스트 파일에 저장되거든요.<br /><br />
그래서 이 파일들을 만들고 수정하려면 '텍스트 에디터'가 필요합니다.<br /><br />
특히 개발자들을 위해 전문화된 텍스트 에디터를 'IDE(통합 개발 환경)'라고 부르는데요.<br /><br />
웹 개발에 널리 쓰이는 인기 있는 IDE 두 가지를 소개해 드립니다.<br /><br />
무료로 사용할 수 있는 '비주얼 스튜디오 코드(Visual Studio Code)'와 개인 비상업용으로 무료인 '웹스톰(WebStorm)'이 대표적입니다.<br /><br />
IDE를 다운로드해서 설치한 뒤에, 제공되는 프로젝트 폴더를 열어 파일을 만들어보고 텍스트를 입력했다가 다시 지워보면서 사용법을 익혀보세요.<br /><br />

## 프로젝트 log-hello.html

<br />
이제 브라우저 콘솔에서 벗어나 실제 웹 앱의 세계로 들어가 볼까요.<br /><br />
웹 앱이란 간단히 말해 '프로그램이 내장된 웹 페이지'라고 할 수 있습니다.<br /><br />
아래 HTML 코드는 자바스크립트 코드를 포함하고 있는데요.<br />

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Log hello</title>
  </head>
  <body>
    <script type="module">
      const sayHello = name => {
        return "Hello " + name + "!";
      };
      const message = sayHello("Terry");
      // `message`의 값을 콘솔에 기록합니다:
      console.log(message);
    </script>
  </body>
</html>
```

여기서 `<script>` 태그 안에 있는 코드가 바로 자바스크립트 코드입니다.<br /><br />
마지막 두 줄은 우리가 처음 보는 내용인데요.<br /><br />
`//`로 시작하는 줄은 '주석'이라고 합니다.<br /><br />
자바스크립트는 `//` 기호를 만나면 그 줄의 끝까지 모든 내용을 무시하는데요.<br /><br />
덕분에 우리는 컴퓨터가 아닌 사람을 위해 코드에 대한 설명을 남길 수 있습니다.<br /><br />
그리고 `console.log(message);`는 `message`라는 변수에 담긴 값을 콘솔에 출력하라는 명령어입니다.<br /><br />
이 HTML 파일을 브라우저에서 열고 개발자 도구 콘솔을 확인하면 'Hello Terry!'라는 메시지가 출력된 것을 볼 수 있을 겁니다.<br /><br />

## 프로젝트 log-clicks.html

<br />
이번에는 사용자가 링크를 클릭할 때마다 자바스크립트 코드를 실행시켜 볼 건데요.<br /><br />
아래와 같이 `id`가 'link'인 `< a >` 태그가 있다고 가정해 봅시다.<br />

```html
<a id="link" href="">Click here</a>
```

그리고 이 링크가 클릭될 때마다 콘솔에 메시지를 찍어주는 자바스크립트 코드입니다.<br /><br />

```javascript
let count = 1;
const link = document.querySelector("#link");
link.addEventListener("click", event => {
  event.preventDefault(); // (A)
  console.log("Click " + count); // (B)
  count = count + 1;
});
```

2번째 줄의 `document.querySelector('#link')`는 HTML 문서에서 `id`가 'link'인 요소를 찾아오라는 뜻입니다.<br /><br />
그리고 3번째 줄의 `addEventListener`는 '이벤트 리스너'를 추가하는 메소드인데요.<br /><br />
'click' 이벤트가 발생할 때마다, 즉 사용자가 링크를 클릭할 때마다 두 번째 인자로 전달된 함수를 실행하라는 의미입니다.<br /><br />
A라인의 `event.preventDefault()`는 링크를 클릭했을 때 페이지가 이동하는 기본 동작을 막아주는 역할을 하거든요.<br /><br />
이렇게 하면 클릭할 때마다 콘솔에 'Click 1', 'Click 2'와 같이 숫자가 1씩 증가하며 기록되는 것을 볼 수 있습니다.<br /><br />

## 숫자 123과 문자열 '123'의 차이

<br />
이제 우리는 숫자와 문자열을 모두 알게 되었는데요.<br /><br />
그렇다면 숫자 `123`과 문자열 `'123'`은 무슨 차이가 있을까요?<br /><br />
`123`은 숫자라서 산술 연산을 할 수 있지만, `'123'`은 문자열이라 다른 문자열과 연결하는 등의 작업만 가능합니다.<br /><br />
이 차이는 '강아지'와 '강아지 사진'의 차이와 비슷한데요.<br /><br />
사진이 강아지처럼 보이긴 하지만, 우리가 사진을 데리고 산책을 할 수는 없는 것과 같습니다.<br /><br />
마찬가지로 문자열 `'123'`은 숫자처럼 보이지만 숫자는 아닙니다.<br /><br />

## 숫자와 문자열 변환하기

<br />
다행히 자바스크립트는 이 둘을 서로 변환할 수 있는 함수를 제공하는데요.<br /><br />
`String()` 함수는 숫자를 문자열로, `Number()` 함수는 문자열을 숫자로 바꿔줍니다.<br />

```javascript
> String(123)
'123'
> Number('123')
123
```

또한 플러스(+) 연산자는 다른 한쪽이 문자열일 경우, 숫자를 자동으로 문자열로 변환해서 연결하거든요.<br /><br />

```javascript
> '구매한 사과 개수: ' + 3
'구매한 사과 개수: 3'
```

이런 특징을 잘 알아두면 유용합니다.<br /><br />

## 프로젝트 display-clicks.html

<br />
지금까지는 콘솔에 정보를 표시했지만, 일반 사용자들이 콘솔을 열어보지는 않겠죠.<br /><br />
이제는 웹 페이지에 직접 정보를 표시해 볼 건데요.<br /><br />
클릭 횟수를 보여줄 `<span>` 태그를 HTML에 추가하고, 자바스크립트 코드를 조금 수정해 보겠습니다.<br />

```html
<div>클릭 횟수: <span id="clickCount">0</span></div>
```

```javascript
const clickCountElement = document.querySelector("#clickCount"); // (A)

// ... 이벤트 리스너 내부 코드 ...
clickCountElement.innerText = String(count); // (B)
```

A라인에서 `id`가 'clickCount'인 `<span>` 요소를 가져왔습니다.<br /><br />
그리고 B라인에서는 `console.log` 대신, `count` 값을 문자열로 변환해서 해당 요소의 `.innerText` 프로퍼티에 저장했는데요.<br /><br />
이 `.innerText`는 HTML 요소의 텍스트 내용을 바꾸는 특별한 프로퍼티입니다.<br /><br />
이제 링크를 클릭하면 콘솔이 아닌 웹 페이지의 숫자가 직접 바뀌는 것을 확인할 수 있습니다.<br /><br />

## 프로젝트 temperature-converter.html

<br />
마지막 프로젝트는 섭씨 온도를 화씨 온도로 변환하는 앱인데요.<br /><br />
한쪽 입력 필드에 숫자를 입력하면 다른 쪽에 변환된 결과가 나타나는 방식입니다.<br /><br />
HTML에는 `id`가 각각 'celsius'와 'fahrenheit'인 두 개의 `<input>` 필드가 있습니다.<br />

```javascript
const celsius = document.querySelector("#celsius");
const fahrenheit = document.querySelector("#fahrenheit");

const celsiusToFahrenheit = c => {
  return c * (9 / 5) + 32;
};

celsius.addEventListener("change", () => {
  const c = Number(celsius.value); // (B)
  fahrenheit.value = String(celsiusToFahrenheit(c)); // (C)
});
```

이번에는 'change'라는 이벤트를 사용했는데요.<br /><br />
이 이벤트는 입력 필드에 값을 입력하고 엔터를 치거나 다른 곳을 클릭했을 때 발생합니다.<br /><br />
이벤트가 발생하면, B라인에서는 `celsius` 입력 필드의 내용(`.value`)을 문자열로 가져와 숫자로 변환합니다.<br /><br />
그리고 C라인에서는 그 숫자를 화씨로 변환한 뒤, 다시 문자열로 바꿔 `fahrenheit` 입력 필드의 `.value`에 넣어주는 거죠.<br /><br />
이렇게 입력 필드의 `.value` 프로퍼티는 값을 읽어올 수도, 값을 넣어 화면을 변경할 수도 있습니다.<br /><br />
