---
title: 웹 개발 배우기 10편 - 예측 불가능한 에러를 우아하게 다루는 법, 자바스크립트 예외 처리
date: 2025-11-04T14:53:00+09:00
description: 자바스크립트의 에러 처리 메커니즘인 예외(Exception)에 대해 알아봅니다. 클래스와 인스턴스의 개념부터 try-catch를 사용한 예외 처리, 스택 트레이스 읽는 법까지, 안정적인 코드를 만드는 핵심 기술을 배웁니다.
series: ["웹 개발 배우기"]
weight: 10
tags:
    - 자바스크립트 예외
    - try catch
    - throw
    - Error 객체
    - 스택 트레이스
    - 에러 처리
---
![웹 개발 배우기 10편 - 예측 불가능한 에러를 우아하게 다루는 법, 자바스크립트 예외 처리](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.


이번 시간에는 자바스크립트의 '예외(Exception)'에 대해 자세히 알아볼 건데요.

이건 에러를 다루는 아주 중요한 방식이라, 다음 챕터로 넘어가기 전에 꼭 짚고 넘어가야 할 개념입니다.


## 자바스크립트의 클래스(Class)
자바스크립트의 '클래스(class)'는 함수와 비슷한 점이 있는데요.

인자를 전달해서 호출하면 결과를 반환한다는 점이 그렇습니다.


하지만 두 가지 다른 점이 있거든요.

*   클래스는 일반적인 함수 호출 문법 앞에 `new` 키워드를 붙여서 호출합니다.

    그 이유는 역사적인 배경에 있습니다.

*   클래스는 항상 '객체(object)'를 반환하는데요.

    객체를 위한 공장이라고 할 수 있습니다.

    이 객체들을 해당 클래스의 '인스턴스(instance)'라고 부릅니다.


이 섹션에서는 두 가지 내장 클래스를 살펴볼 건데요.

우리만의 클래스를 정의할 수도 있지만, 그것은 이 시리즈의 범위를 벗어납니다.


대략적으로, 다음 두 표현식은 거의 같다고 볼 수 있습니다.

```javascript
new Array('a', 'b', 'c')
['a', 'b', 'c']
```
하지만 전자는 몇 가지 까다로운 점이 있어서, 실제로는 거의 항상 배열 리터럴이 더 나은 선택입니다.

마찬가지로 `new Object()`는 `{}`와 같습니다.


### `instanceof`로 클래스 인스턴스인지 확인하기
어떤 값 `v`가 특정 클래스 `C`의 '인스턴스(instance)'인지 확인하고 싶을 때 `v instanceof C` 연산자를 사용할 수 있거든요.

```javascript
> [] instanceof Array
true
> 123 instanceof Array
false

> {} instanceof Object
true
> 'abc' instanceof Object
false
```

### `Error` 클래스
`Error`는 자바스크립트에서 에러를 보고할 때 사용하는 특별한 클래스인데요.

에러 객체를 만드는 방법은 다음과 같습니다.

```javascript
new Error('Something went wrong')
```
에러 객체는 몇 가지 흥미로운 프로퍼티를 가지고 있거든요.

```javascript
> const err = new Error('Message');
> err.message
'Message'
> err.name
'Error'
```

## 프로젝트 `create-error.js`
`error.stack` 프로퍼티는 `Error` 인스턴스가 소스 코드의 어느 위치에서 생성되었는지 알려주는 아주 유용한 정보거든요.

덕분에 우리는 에러가 '어디서' 발생했는지 정확히 추적할 수 있습니다.


`create-error.js` 프로젝트를 통해 어떻게 동작하는지 한번 살펴보시죠.

```javascript
const createError = () => {
  return new Error('Something went wrong!');
};

const err = createError();
console.log(err.stack);
```
이 코드를 노드제이에스(Node.js)로 실행하면 다음과 같은 결과가 나오는데요.

```
Error: Something went wrong!
    at createError (create-error.js:2:10)
    at Object.<anonymous> (create-error.js:5:13)
```
이 정보는 `err` 객체가 `create-error.js` 파일의 2번째 줄 10번째 칸에서, `createError()` 함수가 실행되는 동안 만들어졌다는 것을 의미합니다.

그리고 그 `createError()` 함수는 같은 파일 5번째 줄 13번째 칸에서 호출되었고요.


`at`으로 시작하는 이 줄들을 '스택 트레이스(stack trace)'라고 부르는데요.

함수 호출이 '스택'이라는 자료 구조를 통해 관리되기 때문에 붙은 이름입니다.

스택 트레이스는 어떤 함수 호출이 이루어졌는지를 보여주는, 이른바 '함수 호출 스택'의 스냅샷입니다.


## 예외 던지기(Throwing exceptions)
'예외를 던진다(throwing an exception)'는 말은 간단히 말해 '에러를 보고한다'는 의미와 거의 같은데요.

어떤 값이든 던질 수 있지만, 스택 트레이스 정보를 얻기 위해 `Error`의 인스턴스를 사용하는 것이 일반적입니다.


아래 코드에서는 `throw` 구문을 사용해서 예외를 던지고 있습니다.

```javascript
const divide = (dividend, divisor) => {
  if (divisor === 0) {
    throw new Error('Division by zero not supported');
  }
  return dividend / divisor;
};
```
보통 예외가 던져지면 현재 코드 조각의 실행은 그 즉시 멈추게 됩니다.

하지만 곧 이를 막을 방법을 배울 겁니다.


### 무엇을 던져야 할까요?
가장 기본적인 에러 클래스는 `Error`이지만, 상황에 따라 더 구체적인 에러를 표현할 수 있는 '서브클래스(subclass)'들도 존재하거든요.

포유류(`Error`)와 인간(`Error`의 서브클래스)의 관계를 생각하면 이해하기 쉽습니다.


이 서브클래스들은 두 가지 장점이 있는데요.

*   이름만으로도 어떤 종류의 에러인지 짐작할 수 있습니다.

*   에러의 종류를 더 쉽게 구분할 수 있게 해줍니다.


자주 사용되는 서브클래스는 다음과 같습니다.

*   `RangeError`: 값이 허용된 범위를 벗어났을 때 발생합니다.

*   `ReferenceError`: 유효하지 않은 참조를 했을 때 발생합니다.

*   `SyntaxError`: 코드의 문법이 잘못되었을 때 발생합니다.

*   `TypeError`: 값이 예상된 타입이 아닐 때 발생합니다.

*   `URIError`: URI 관련 함수가 잘못 사용되었을 때 발생합니다.


`instanceof`나 `.name` 프로퍼티를 통해 어떤 종류의 에러인지 구분할 수 있습니다.

```javascript
> const err = new TypeError();
> err instanceof TypeError
true
> err.name
'TypeError'
```

## 예외 잡기(Catching exceptions)
`try-catch` 구문은 예외가 발생했을 때 프로그램이 중단되는 것을 막아주는 역할을 하는데요.

```javascript
try {
  throw new Error();
} catch (err) {
  // 여기서 에러를 처리합니다
}
```
함수 호출은 아주 깊게 중첩될 수 있거든요.

이렇게 깊게 중첩된 함수 안에서 예외가 발생하면, 그 예외는 자신을 호출한 함수로 계속해서 전달됩니다.

결국 `catch` 블록을 만나 처리되거나, 프로그램의 최상위 레벨에 도달해 프로그램을 중단시키게 됩니다.


## 왜 예외를 던지고 잡아야 할까요?
그렇다면 왜 굳이 예외를 던지고 잡는 복잡한 과정을 거쳐야 하는 걸까요?

아래 코드를 보면 그 이유를 명확하게 알 수 있습니다.

```javascript
function readProfiles(filePaths) {
  for (const filePath of filePaths) {
    try {
      const profile = readOneProfile(filePath);
      profiles.push(profile);
    } catch (err) { // (A)
      console.log('Error in: '+filePath, err);
    }
  }
}
function readOneProfile(filePath) {
  // ...
  const file = openFile(filePath);
  // ...
}
function openFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error('Could not find file '+filePath); // (B)
  }
  // ...
}
```
(B) 지점에서 '파일을 찾을 수 없다'는 에러가 발생했다고 가정해 봅시다.

하지만 이 문제를 처리하기에 가장 좋은 위치는 지금 여기가 아니라 (A) 지점이거든요.

(A) 지점에서는 문제가 생긴 파일을 건너뛰고 다음 파일 처리를 계속 진행할 수 있기 때문입니다.


따라서 (B)에서는 `throw`를 사용해 문제가 발생했음을 '알리고', (A)에서는 `try-catch`를 사용해 그 문제를 '처리'하는 겁니다.

이것이 바로 예외 처리의 핵심 원리입니다.


## 자바스크립트는 예외를 자주 던지지 않아요
그런데 한 가지 흥미로운 점은, 자바스크립트가 생각보다 예외를 자주 던지지 않는다는 사실인데요.

대신 `undefined`, `Infinity`, `NaN`과 같은 '에러 값'을 반환하는 경우가 훨씬 많습니다.


존재하지 않는 프로퍼티에 접근하면 `undefined`를 반환하고, 0으로 나누면 `Infinity`를, 숫자가 아닌 문자열을 숫자로 변환하려고 하면 `NaN`을 반환하죠.


왜 그럴까요?

자바스크립트는 ES3 버전 이전까지는 예외 처리 기능이 없었기 때문인데요.

이런 역사적인 이유 때문에 언어 자체나 표준 라이브러리에서는 예외를 아주 제한적으로 사용합니다.


## 우리는 예외를 어떻게 사용해야 할까요?
그렇다면 앞으로 우리는 예외를 어떻게 사용해야 할까요?

지금 단계에서는 무언가 잘못되었을 때 그냥 예외를 던지는 것만으로도 충분합니다.

`catch`로 잡지 않은 예외는 웹 브라우저의 콘솔이나 노드제이에스의 터미널에 자동으로 기록되거든요.


하지만 더 완성도 높은 프로그램을 만들게 되면, 적절한 위치에서 예외를 잡아서 잘못된 것을 수정하거나 사용자에게 유용한 에러 메시지를 보여주는 등의 처리를 해야 합니다.

이것을 잘 해내는 것은 쉽지 않아서, 심지어 대기업의 상용 애플리케이션에서도 정기적으로 실수를 하곤 합니다.
