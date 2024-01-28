---
title: TypeScript에서 `infer` 키워드 활용하기
pubDatetime: 2024-01-28T09:25:21.480Z
postSlug: 2024-01-28-typescript-utilizing-infer-keyword
featured: false
draft: false
tags:
  - typescript
  - infer
description: TypeScript 'infer' 키워드로 함수, 프로미스, 배열 및 문자열 리터럴에 대한 타입 추론을 해봅시다.
---

안녕하세요?

오늘은 Typescript에서 'infer' 키워드의 고급 사용법에 대해 알아보려고 합니다.

** 목 차 **

- 1. [`infer`란?](#infer)
- 2. [구체적인 사용 예](#1)
  - 2.1. [함수의 반환 값의 타입 추론](#2)
  - 2.2. [Promise의 내부 타입 추론](#Promise)
  - 2.3. [배열의 내용 추론](#3)
  - 2.4. [문자열 리터럴과 결합](#4)
- 3. [결론](#5)

## 1. <a name='infer'></a>`infer`란?

`infer`는 타입 추론을 할 때 사용되는 키워드로, 제네릭 타입 및 조건 타입(Conditional Types)과 함께 사용됩니다.

`infer`를 사용하면 함수의 반환 값이나 배열의 내용 등, 제네릭 타입의 내용에 따라 변하는 타입 정보를 Conditional Types의 조건 분기 내에서 추론할 수 있습니다.

## 2. <a name='1'></a>구체적인 사용 예

---

### 2.1. <a name='2'></a>함수의 반환 값의 타입 추론

아래 코드에서는 제네릭 타입 `T`가 함수인 경우, 그 반환 값의 타입을 `R`로 추론하고, 이 `R`이 `ReturnType`의 결과로 얻어집니다.

함수가 제네릭 타입인 경우, 반환 값은 문자열이나 숫자 등 다양한 패턴이 있지만, `infer`를 사용함으로써 유연하게 타입 정보를 얻을 수 있습니다.

```typescript
// ReturnType 유틸리티 타입을 직접 만들어봅시다.
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// 예제 함수들
const helloFn = () => "Hello World";
const addition = (num1: number, num2: number) => num1 + num2;
const isEvenNumber = (num: number) => num % 2 === 0;

// 각 함수의 반환 값의 타입을 추론하여 할당
type HelloFnReturnType = ReturnType<typeof helloFn>; // string 타입
type AdditionReturnType = ReturnType<typeof addition>; // number 타입
type IsEvenNumberReturnType = ReturnType<typeof isEvenNumber>; // boolean 타입
```

---

### 2.2. <a name='Promise'></a>Promise의 내부 타입 추론

`infer`를 사용하면 Promise 타입이 포함하고 있는 타입을 추론할 수 있습니다.

아래 코드에서는 제네릭 타입 `T`가 Promise 타입인 경우, Promise의 타입 인수 부분을 `R`로 추론하고, 이 `R`이 `ExtractPromise`의 결과로 얻어집니다.

```typescript
// Promise의 내부 타입을 추출하는 유틸리티 타입
type ExtractPromise<T> = T extends Promise<infer R> ? R : never;

// 예제 Promise 타입들
type SampleStringType = ExtractPromise<Promise<string>>; // string 타입
type SampleNumberType = ExtractPromise<Promise<number>>; // number 타입
```

---

### 2.3. <a name='3'></a>배열의 내용 추론

`infer`를 사용하면 배열의 내용을 추론할 수 있습니다.

아래 코드의 `First`는 제네릭 타입 `T`가 배열의 타입인 경우, 그 배열의 첫 번째 요소를 `R`로 추론합니다.

`Array1`의 경우, 첫 번째 요소 이외의 요소(2와 3)는 `...any[]`가 되고, 1만이 `R`로 추론되므로, 결과적으로 `Array1FirstType`은 1이 됩니다.

```typescript
// 배열의 첫 번째 요소를 추출하는 유틸리티 타입
type First<T extends any[]> = T extends [infer R, ...any[]] ? R : never;

// 예제 배열들
type Array1 = [1, 2, 3];
type Array2 = ["1", 2, 3];

// 배열의 첫 번째 요소의 타입을 추론하여 할당
type Array1FirstType = First<Array1>; // 1이 됩니다.
type Array2FirstType = First<Array2>; // "1"이 됩니다.
```

---

### 2.4. <a name='4'></a>문자열 리터럴과 결합

`infer`는 문자열 리터럴과 결합할 수 있습니다.

`Replace`는 문자열 `S`에 포함된 문자열 `T`를 `U`로 바꾸는 타입입니다.

구체적인 처리 흐름으로는, 먼저 string 타입의 `S`에 `T`가 포함되어 있는지를 Conditional Types를 사용하여 확인합니다.

이 때, `T`의 앞뒤의 문자열을 각각 `A`, `B`로 추론합니다.

마지막으로 `T`를 `U`로 바꾸고, 추론된 `A`와 `B`를 문자열 리터럴로 결합하여, 결과를 반환합니다.

아래의 예에서는, `A`는 'NO', `B`는 'NO LIFE'가 되고, `T`의 'MONEY'가 `U`의 'CAT'으로 바뀌므로, 결과적으로 'NO CAT NO LIFE'가 얻어집니다.

```typescript
// 문자열 내부에서 지정된 부분을 다른 문자열로 치환하는 유틸리티 타입
type Replace<
  S extends string,
  T extends string,
  U extends string,
> = S extends `${infer A}${T}${infer B}` ? `${A}${U}${B}` : never;

// 예제 문자열 치환
type Replaced = Replace<" NO MONEY NO LIFE", "MONEY", "CAT">; // "NO CAT NO LIFE"가 됩니다.
```

---

## 3. <a name='5'></a>결론

오늘은 TypeScript의 `infer` 키워드에 대해 소개했는데요.

개인적으로는, 함수의 반환 값이나 Promise의 타입 인수 등, 타입 정보가 불확정인 것에 대해서도, `infer`를 사용함으로써 유연하게 타입 정보를 얻을 수 있는 부분이 매력적으로 느껴지는데요.

더 깊은 이해를 원하는 분은 [type-challenges](https://github.com/type-challenges/type-challenges/blob/main/README.ko.md)에 도전해보시는 것이 좋을 것 같습니다.

그럼.
