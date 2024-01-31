---
title: 튜토리얼로 배우는 Zod 라이브러리 (타입스크립트 스키마 선언 및 검증)
pubDatetime: 2024-01-29T11:31:24.706Z
postSlug: 2024-01-29-tutorial-of-zod-with-14-example-with-vitest
featured: false
draft: false
tags:
  - zod
  - typescript
description: 튜토리얼로 배우는 Zod 라이브러리 (타입스크립트 스키마 선언 및 검증)
---

![](https://blogger.googleusercontent.com/img/a/AVvXsEgisu5_JxzT8x3APgiGdtD_wjJKyEXsmkh2q90A3esNF9Db6yWkfL9SKGlSrRXJ0gIOrPNaUaCdNPrCG2F9HFUkorBf0XWDCcgAFsGqncvVXf3t_AfnaFIHjxVs1mbVSAxZGx80C3lI4hecduPyte0frzQKBN-N5Ufl22Vu-A0goEDKXC7bknJ3_PbYB8w)

안녕하세요?

우연히 Zod 관련 튜토리얼을 구글링 하다가  [github 페이지](https://github.com/total-typescript/zod-tutorial)를 봤는데요.

원래 Matt Pococok 님의 [totaltypescript](https://www.totaltypescript.com/)에서 무료 강의 해주고 있는 내용입니다.

Zod 관련 총 14가지 문제를 vitest를 이용해서 테스트하고 설명까지 해주고 있는데요.

관련 튜토리얼 공유하면 좋을 거 같이 이렇게 한국어로 번역 또는 제 생각을 적어 보았습니다.

** 목 차 **

- 1. [Zod란](#Zod)
- 2. [기본 타입의 검증 (튜토리얼 01)](#01)
- 3. [객체의 검증 (튜토리얼 02)](#02)
- 4. [배열의 검증 (튜토리얼 03)](#03)
- 5. [스키마로부터 타입 생성 (튜토리얼 04)](#04)
- 6. [옵셔널 (튜토리얼 05)](#05)
- 7. [기본값(default 값) 설정 (튜토리얼 06)](#default06)
- 8. [유니온 타입의 검증 (튜토리얼 07)](#07)
- 9. [특정 조건 검증 (튜토리얼 08)](#08)
- 10. [스키마의 확장 (튜토리얼 09)](#09)
- 11. [값을 검증하기 전후로 변환하기 (튜토리얼 10)](#10)
- 12. [사용자 정의 유효성 검사 수행하기 (튜토리얼 11, 12)](#1112)
- 13. [재귀적인 스키마 선언하기 (튜토리얼 13)](#13)
- 14. [제네릭스 (튜토리얼 14)](#14)
- 15. [결론](#15)

---

## 1. <a name='Zod'></a>Zod란

Zod란, 간단히 말하면 타입스크립트 기반의 스키마 선언 및 검증 라이브러리입니다.

Zod는 타입스크립트의 타입 시스템을 활용하여, 폼의 입력값이나 애플리케이션에서 다루는 데이터가, 선언한 스키마에 맞는지 검증할 수 있습니다.

또한, 나중에 설명하겠지만, Zod에서는 스키마로부터 타입을 생성할 수 있는 편리한 기능이 있습니다.

일단, 같은 검증 라이브러리인 Yup에서도, 스키마로부터 타입 생성은 가능하지만 타입 추론이 약하다고 합니다.

반면에, Yup은 Zod와 비교해서 API가 풍부하다는 장점이 있으므로, 취향에 따라 사용하면 좋을 것 같습니다.

총 14가지 문제에 대해 살펴보면서 Zod 라이브러리를 이해해 보겠습니다.

---

## 2. <a name='01'></a>기본 타입의 검증 (튜토리얼 01)

가장 기본적인 Zod 사용 방법입니다.

vitest 유닛 테스트와 병행하기 위해 아래와 같이 기초적인 환경을 구축합시다.

```bash
mkdir zod-test
cd zod-test
npm init -y
npm i zod
npm i -D vitest
```

vitest는 파일 이름에 test가 들어가면 자동으로 테스트하는데요.

package.json 파일에 아래와 같이 scripts 부분을 수정합니다.

```json
  "scripts": {
    "test": "vitest"
  },
```

그러면 이제 'npm run test' 명령어로 쉽게 테스트가 가능합니다.

이제 첫 번째 유닛 테스트 파일입니다.

```ts
// CODE
import { expect, it } from "vitest";
import { z } from "zod";

export const toString = (num: unknown) => {
  return String(num);
};

// TESTS

it("Should throw a runtime error when called with not a number", () => {
  expect(() => toString("123")).toThrowError(
    "Expected number, received string"
  );
});

it("Should return a string when called with a number", () => {
  expect(toString(1)).toBeTypeOf("string");
});
```

코드를 보니 toString 함수가 의도한 데로 제대로 작동해야 하는데요.

테스트해 볼까요?

```bash
npm run test

> zod-test@1.0.0 test
> vitest


 DEV  v1.2.2 /Users/cpro95/Codings/Javascript/blog/zod-test

 ❯ test/zod-1.test.ts (2)
   × Should throw a runtime error when called with not a number
   ✓ Should return a string when called with a number

⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  test/zod-1.test.ts > Should throw a runtime error when called with not a number
AssertionError: expected [Function] to throw an error

- Expected:
null

+ Received:
undefined

 ❯ test/zod-1.test.ts:32:33
     30|
     31| it("Should throw a runtime error when called with not a number", () => {
     32|   expect(() => toString("123")).toThrowError(
       |                                 ^
     33|     "Expected number, received string",
     34|   );

⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
   Start at  18:47:31
   Duration  176ms (transform 50ms, setup 0ms, collect 41ms, tests 4ms, environment 0ms, prepare 41ms)


 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
```

위와 같이 예상했던 첫 번째 부분부터 에러가 발생했습니다.

vitest는 백그라운드에서 계속 실행되는데요.

이 상태에서 코드를 수정하면 알아서 다시 테스트 해 줍니다.

이제 테스트 통과를 위해 zod를 이용해서 toString 함수를 수정하겠습니다.

```ts
export const toString = (num: unknown) => {
  return String(z.number().parse(num));
};
```

위와 같이 고치고 파일을 저장하니까 터미널 창의 vitest가 아래와 같이 바뀌면서 통과한게 보입니다.

```bash
 RERUN  test/zod-1.test.ts x1

 ✓ test/zod-1.test.ts (2)
   ✓ Should throw a runtime error when called with not a number
   ✓ Should return a string when called with a number

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  18:48:57
   Duration  12ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

vitest가 알아서 재 시행되면서 테스트를 통과했네요.

그럼, vitest 얘기는 여기까지 하고 zod의 기본적인 타입 검증에 대해 알아보겠습니다.

제가 위에서 사용한 코드는 한 줄에 모든 코드를 다 썼는데요.

아래와 같이 쓰는 게 일반적입니다.

```ts
const numberParser = z.number();

export const toString = (num: unknown) => {
  const parsed = numberParser.parse(num);
  return String(parsed);
};
```

먼저 number 타입이 기대되는 스키마를 선언하고 있습니다.

해당 스키마의 이름은 numberParser라는 이름이고 이 스키마를 이용해서 parse를 하면 됩니다.

toString 함수에서는, 인자로 넘어온 unknown 타입의 num을 parse의 인자로 설정하고 있습니다.

이 parse는, 인자로 넘어온 값이 numberParser가 기대하는 타입, 즉 number 타입이었다면, 그 값을 반환하고, 그렇지 않았다면 에러를 반환합니다.

그래서, 첫 번째 테스트에서는 string 타입의 "123"이 toString에 넘어가기 때문에, 에러가 반환됩니다.

첫 번째 튜토리얼이 끝났네요.

---

## 3. <a name='02'></a>객체의 검증 (튜토리얼 02)

두 번째 튜토리얼은 객체의 검증인데요.

먼저, test 코드입니다.

두 번째, 문제는 아래와 같습니다.

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const PersonResult = z.unknown();

export const fetchStarWarsPersonName = async (id: string) => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people/" + id + ".json"
  ).then(res => res.json());

  const parsedData = PersonResult.parse(data);

  return parsedData.name;
};

// TESTS

it("Should return the name", async () => {
  expect(await fetchStarWarsPersonName("1")).toEqual("Luke Skywalker");
  expect(await fetchStarWarsPersonName("2")).toEqual("C-3PO");
});
```

이 문제는 fetch 함수를 이용해서 외부 API에서 데이터를 가져 오는 거네요.

fetchStarWarsPersonName 함수에 문자열로 숫자를 지정하면 해당 되는 id의 값이 나오는데요.

내용상 스타워즈 API네요.

1번 아이디의 API 결과를 볼까요?

'https://www.totaltypescript.com/swapi/people/1.json'

```json
{
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hair_color": "blond",
  "skin_color": "fair",
  "eye_color": "blue",
  "birth_year": "19BBY",
  "gender": "male",
  "homeworld": "https://swapi.dev/api/planets/1/",
  "films": [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/6/"
  ],
  "species": [],
  "vehicles": [
    "https://swapi.dev/api/vehicles/14/",
    "https://swapi.dev/api/vehicles/30/"
  ],
  "starships": [
    "https://swapi.dev/api/starships/12/",
    "https://swapi.dev/api/starships/22/"
  ],
  "created": "2014-12-09T13:50:51.644000Z",
  "edited": "2014-12-20T21:17:56.891000Z",
  "url": "https://swapi.dev/api/people/1/"
}
```

위와 같이 나오는데요.

우리가 필요한 부분은 name 부분입니다.

이제 zod를 이용해서 객체를 검증해 보겠습니다.

문제에서는 객체 검증을 z.unknown으로 했는데요.

이번에는 z.object를 사용하겠네요.

객체의 스키마를 선언할 때는, z.object를 사용하고, 프로퍼티에도 각각 스키마를 생성합니다.

아래 코드가 최종 완성된 결과물입니다.

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const PersonResult = z.object({
  name: z.string(),
});

export const fetchStarWarsPersonName = async (id: string) => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people/" + id + ".json"
  ).then(res => res.json());

  const parsedData = PersonResult.parse(data);

  return parsedData.name;
};

// TESTS

it("Should return the name", async () => {
  expect(await fetchStarWarsPersonName("1")).toEqual("Luke Skywalker");
  expect(await fetchStarWarsPersonName("2")).toEqual("C-3PO");
});
```

튜토리얼의 코드에서는, API의 응답이 { name: string }인지 검증하고 있습니다.

실행 결과는 아래와 같이 나옵니다.

```bash
✓ test/zod-1.test.ts (2)
 ✓ test/zod-2.test.ts (1)

 Test Files  2 passed (2)
      Tests  3 passed (3)
   Start at  18:59:44
   Duration  305ms (transform 83ms, setup 0ms, collect 84ms, tests 137ms, environment 0ms, prepare 80ms)
```

튜토리얼 1번과 2번의 총 3개의 테스트가 아주 빠르게 통과됐네요.

---

## 4. <a name='03'></a>배열의 검증 (튜토리얼 03)

3번째는 배열의 검증입니다.

zod에서는 배열의 스키마를 생성할 때는, z.array를 사용합니다.

먼저, 문제를 볼까요?

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.unknown();

export const fetchStarWarsPeople = async () => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people.json"
  ).then(res => res.json());

  const parsedData = StarWarsPeopleResults.parse(data);

  return parsedData.results;
};

// TESTS

it("Should return the name", async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: "Luke Skywalker",
  });
});
```

테스트 코드에서는 API의 응답이 { results: { name: string }[] }의 형태인지 검증하고 있습니다.

즉, 배열의 첫 번째 항목을 검사하고 있네요.

해결 방법을 볼까요?

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

export const fetchStarWarsPeople = async () => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people.json"
  ).then(res => res.json());

  const parsedData = StarWarsPeopleResults.parse(data);
  console.log(parsedData);
  return parsedData.results;
};

// TESTS

it("Should return the name", async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: "Luke Skywalker",
  });
});
```

StarWarsPeopleResults 스키마가 객체 중에 'results' 항목이 있고, 그 result가 배열인거를 지정하고 있습니다.

그래서 parsedData는 아래와 같이 console.log 될 겁니다.

```bash
stdout | test/zod-3.test.ts > Should return the name
{
  results: [
    { name: 'Luke Skywalker' },
    { name: 'C-3PO' },
    { name: 'R2-D2' },
    { name: 'Darth Vader' },
    { name: 'Leia Organa' },
    { name: 'Owen Lars' },
    { name: 'Beru Whitesun lars' },
    { name: 'R5-D4' },
    { name: 'Biggs Darklighter' },
    { name: 'Obi-Wan Kenobi' }
  ]
}
```

딱 우리가 원하는 데이터만 추려서 가져오네요.

---

## 5. <a name='04'></a>스키마로부터 타입 생성 (튜토리얼 04)

Zod에서는, z.infer의 타입 인자로 스키마를 넘겨주면, 그 스키마로부터 타입을 추론해서, 타입을 생성할 수 있습니다.

문제를 볼까요?

```ts
// CODE

import { z } from "zod";

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

const logStarWarsPeopleResults = (data: unknown) => {
  data.results.map(person => {
    console.log(person.name);
  });
};
```

위 코드에서 logStarWarsPeopleResults 함수의 data 변수가 아래와 같이 에러가 뜹니다.

`'data' is of type 'unknown'.ts(18046)`

이럴 경우 z.infer 함수로 타입을 추측할 수 있는데요.

두 가지 방법이 있습니다.

첫 번째는 StarWarsPeopleResults로부터 타입을 생성하고 있기 때문에, dataType의 타입을 유추하면 됩니다.

아래와 같이 StarWarsPeopleResultsType을 미리 만들어 놓으면 됩니다.

```ts
const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

type StarWarsPeopleResultsType = z.infer<typeof StarWarsPeopleResults>;

const logStarWarsPeopleResults = (data: StarWarsPeopleResultsType) => {
  data.results.map(person => {
    console.log(person.name);
  });
};
```

두 번째 방법은 아래와 같은데요.

```ts
const logStarWarsPeopleResults = (
  data: z.infer<typeof StarWarsPeopleResults>
) => {
  data.results.map(person => {
    console.log(person.name);
  });
};
```

어떤 방법이든 편하신거 쓰시면 됩니다.

z.infer를 가장 많이 쓰는 경우는 폼 입력 타입의 검증인데요.

실제로 이런 타입 생성은, 실무에서도 자주 사용되고 있습니다.

폼의 입력값을 검증하는 스키마로부터 타입 생성하고, 그 타입을 API 요청을 보내는 함수의 인자의 타입으로 하는 등의 방식으로 사용하고 있습니다.

아래 방식이 실무에서 많이 쓰이는 방법입니다.

```ts
// 폼의 입력값을 검증하는 스키마
const PersonSchema = z.object({
  name: z.string(),
  hometown: z.string(),
});

type PersonSchemType = z.infer<typeof PersonSchema>;

const handleSubmit = (formData: PersonSchemType) => {
  // API 요청 등의 처리
};
```

---

## 6. <a name='05'></a>옵셔널 (튜토리얼 05)

옵셔널한 스키마를 정의할 때는, optional을 사용합니다.

문제를 볼까요?

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  name: z.string(),
  phoneNumber: z.string(),
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should validate correct inputs", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
    })
  ).not.toThrow();

  expect(() =>
    validateFormInput({
      name: "Matt",
      phoneNumber: "123",
    })
  ).not.toThrow();
});

it("Should throw when you do not include the name", async () => {
  expect(() => validateFormInput({})).toThrowError("Required");
});
```

위 코드를 실제 테스트해 보면 아래 부분과 같이 나옵니다.

```bash
❯ test/zod-5.test.ts:24:9
     22|       name: "Matt",
     23|     }),
     24|   ).not.toThrow();
       |         ^
     25|
     26|   expect(() =>
```

테스트 결과 phoneNumber가 없다고 에러인데요.

이 경우 옵셔널을 쓰면 됩니다.

즉 { name: string, phoneNumber?: string }을 기대하는 스키마를 정의하면 됩니다.

아래와 같이 바꾸시면 됩니다.

phoneNumber가 옵셔널하게 되었기 때문에, validateFormInput에 name만 넘겨줘도, 에러가 발생하지 않습니다.

```ts
const Form = z.object({
  name: z.string(),
  phoneNumber: z.string().optional(),
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};
```

`.optional()` 부분만 추가해도 바로 vitest는 모두 통과되었네요.

zod의 옵셔널 사용방법이었습니다.

---

## 7. <a name='default06'></a>기본값(default 값) 설정 (튜토리얼 06)

이번에는 먼저 문제를 볼까요?

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  repoName: z.string(),
  keywords: z.array(z.string()).optional(),
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should include keywords if passed", async () => {
  const result = validateFormInput({
    repoName: "mattpocock",
    keywords: ["123"],
  });

  expect(result.keywords).toEqual(["123"]);
});

it("Should automatically add keywords if none are passed", async () => {
  const result = validateFormInput({
    repoName: "mattpocock",
  });

  expect(result.keywords).toEqual([]);
});
```

테스트 결과는 아래와 같습니다.

```bash
- Expected:
Array []

+ Received:
undefined

 ❯ test/zod-6.test.ts:34:27
     32|   });
     33|
     34|   expect(result.keywords).toEqual([]);
       |                           ^
     35| });
```

테스트 결과 상 배열을 예상했는데 undefined가 왔다는 뜻이죠.

이 문제를 해결하려면 keywords의 값에 옵셔널을 넣으면 되는 게 아니라 디폴트 값으로 빈 배열을 설정하면 됩니다.

당연히 Zod 스키마에 기본값을 설정할 때는, default 명령어를 사용합니다.

```ts
const Form = z.object({
  repoName: z.string(),
  keywords: z.array(z.string()).default([]),
});
```

위와 같이 `.optional()` 부분을 빼고 `.default([])`라는 체이닝 메서드로 빈 배열을 디폴트값으로 설정했습니다.

저장하자마자 테스트 결과는 아래와 같이 정상으로 나오네요.

```bash
 ✓ test/zod-6.test.ts (2)
   ✓ Should include keywords if passed
   ✓ Should automatically add keywords if none are passed

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  19:30:53
   Duration  12ms
```

---

## 8. <a name='07'></a>유니온 타입의 검증 (튜토리얼 07)

유니온 타입과 관련된 문제를 먼저 보겠습니다.

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  repoName: z.string(),
  privacyLevel: z.string(),
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should fail if an invalid privacyLevel passed", async () => {
  expect(() =>
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "something-not-allowed",
    })
  ).toThrowError();
});

it("Should permit valid privacy levels", async () => {
  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "private",
    }).privacyLevel
  ).toEqual("private");

  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "public",
    }).privacyLevel
  ).toEqual("public");
});
```

실행결과는 아래와 같습니다.

```bash
 FAIL  test/zod-7.test.ts > Should fail if an invalid privacyLevel passed
AssertionError: expected [Function] to throw an error
 ❯ test/zod-7.test.ts:25:5
     23|       privacyLevel: "something-not-allowed",
     24|     }),
     25|   ).toThrowError();
       |     ^
     26| });
     27|
```

유니온 타입의 스키마를 생성할 때는, z.enum 또는 z.union을 사용합니다.

튜토리얼의 코드에서는, `privacyLevel: "private" | "public"`을 기대하는 유니온 타입의 스키마를 떠 올릴 수 있습니다.

테스트를 실행하면, privacyLevel에 private과 public 이외의 값을 넘기면 에러를 반환하는 것을 확인할 수 있습니다.

이 유니온 타입의 스키마 정의는, 실무에서는 드롭다운 메뉴의 항목을 검증할 때 자주 쓰입니다.

아래 코드를 보시면 zod에서 유니온 타입의 사용방법을 알 수 있습니다.

두 가지 방법이 있는데요.

보통 첫 번째 방법을 많이 씁니다.

```ts
const Form = z.object({
  repoName: z.string(),
  privacyLevel: z.enum(["private", "public"]),
  //아래 방식도 가능
  //privacyLevel: z.union([z.literal("private"), z.literal("public")])
});
```

역시나 `privacyLevel: z.enum(["private", "public"])`라고 수정하니까 테스트는 바로 통과되었습니다.

---

## 9. <a name='08'></a>특정 조건 검증 (튜토리얼 08)

이번에는 폼 Validation 관련 문제입니다.

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  name: z.string(),
  //             ^ 🕵️‍♂️
  phoneNumber: z.string().optional(),
  //                    ^ 🕵️‍♂️
  email: z.string(),
  //              ^ 🕵️‍♂️
  website: z.string().optional(),
  //                ^ 🕵️‍♂️
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should fail if you pass a phone number with too few characters", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      phoneNumber: "1",
    })
  ).toThrowError("String must contain at least 5 character(s)");
});

it("Should fail if you pass a phone number with too many characters", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      phoneNumber: "1238712387612387612837612873612387162387",
    })
  ).toThrowError("String must contain at most 20 character(s)");
});

it("Should throw when you pass an invalid email", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt",
    })
  ).toThrowError("Invalid email");
});

it("Should throw when you pass an invalid website URL", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      website: "/",
    })
  ).toThrowError("Invalid url");
});

it("Should pass when you pass a valid website URL", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      website: "https://mattpocock.com",
    })
  ).not.toThrowError();
});
```

테스트 결과는 에러가 너무 많아 다 쓰기도 귀찮은데요.

이번 테스트의 주제인 최소값, 최대값 등 특정 조건을 만족하는지 검증하는 방법에 대한 겁니다.

스키마를 잘 보면 name에 최소 1글자, phoneNumber에 5글자 이상 20글자 이하, email에 'x@x.x'의 형식, website에 'foo://bar'의 형식을 기대하는게 보이네요.

정답은 아래와 같이 z.object 스키마 구성할 때 최소, 최대값, 그리고 email인지, url인지 특정 조건을 추가하면 됩니다.

```ts
const Form = z.object({
  name: z.string().min(1),
  phoneNumber: z.string().min(5).max(20).optional(),
  email: z.string().email(),
  website: z.string().url().optional(),
});
```

위와 같이 수정하니까 그 많던 에러가 하나도 없어졌네요.

```bash
test/zod-8.test.ts (5)
   ✓ Should fail if you pass a phone number with too few characters
   ✓ Should fail if you pass a phone number with too many characters
   ✓ Should throw when you pass an invalid email
   ✓ Should throw when you pass an invalid website URL
   ✓ Should pass when you pass a valid website URL

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  19:41:57
   Duration  16ms
```

---

## 10. <a name='09'></a>스키마의 확장 (튜토리얼 09)

먼저, 문제를 살펴볼까요?

```ts
import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

const User = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

const Post = z.object({
  id: z.string().uuid(),
  title: z.string(),
  body: z.string(),
});

const Comment = z.object({
  id: z.string().uuid(),
  text: z.string(),
});
```

뭔가 중복된 걸 축약하라는 뜻인 거 같은데요.

닥 보면 id가 같은 거네요.

아래와 같이 하면 됩니다.

```ts
const Id = z.string().uuid();

const User = z.object({
  id: Id,
  name: z.string(),
});

const Post = z.object({
  id: Id,
  title: z.string(),
  body: z.string(),
});

const Comment = z.object({
  id: Id,
  text: z.string(),
});
```

좀 더 나아가서, zod에서는 한 번 정의한 스키마는, extend나 merge를 사용해서 확장할 수 있습니다.

먼저, extend를 사용한 결과입니다.

```ts
const ObjectWithId = z.object({
  id: z.string().uuid(),
});

const User = ObjectWithId.extend({
  name: z.string(),
});

const Post = ObjectWithId.extend({
  title: z.string(),
  body: z.string(),
});

const Comment = ObjectWithId.extend({
  text: z.string(),
});
```

다음 코드는 merge를 이용한 정답입니다.

```ts
const ObjectWithId = z.object({
  id: z.string().uuid(),
});

const User = ObjectWithId.merge(
  z.object({
    name: z.string(),
  })
);

const Post = ObjectWithId.merge(
  z.object({
    title: z.string(),
    body: z.string(),
  })
);

const Comment = ObjectWithId.merge(
  z.object({
    text: z.string(),
  })
);
```

첫 번째 방식이든, extend, merge 방식이든 편하고 이해하기 쉬운 걸 사용하시면 됩니다.

---

## 11. <a name='10'></a>값을 검증하기 전후로 변환하기 (튜토리얼 10)

문제를 먼저 보겠습니다.

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

export const fetchStarWarsPeople = async () => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people.json"
  ).then(res => res.json());

  const parsedData = StarWarsPeopleResults.parse(data);

  return parsedData.results;
};

// TESTS

it("Should resolve the name and nameAsArray", async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: "Luke Skywalker",
    nameAsArray: ["Luke", "Skywalker"],
  });
});
```

테스트 결과입니다.

```bash
 FAIL  test/zod-10.test.ts > Should resolve the name and nameAsArray
AssertionError: expected { name: 'Luke Skywalker' } to deeply equal { name: 'Luke Skywalker', …(1) }

- Expected
+ Received

  Object {
    "name": "Luke Skywalker",
-   "nameAsArray": Array [
-     "Luke",
-     "Skywalker",
-   ],
  }

 ❯ test/zod-10.test.ts:28:44
     26|
     27| it("Should resolve the name and nameAsArray", async () => {
     28|   expect((await fetchStarWarsPeople())[0]).toEqual({
       |                                            ^
     29|     name: "Luke Skywalker",
     30|     nameAsArray: ["Luke", "Skywalker"],
```

코드에서 원하는 결과는 nameAsArray 값이네요.

이름을 배열로 다시 재정의하는 겁니다.

그리고 Zod에서는, 검증하기 전후로 값을 변환할 수 있습니다.

transform을 사용하여 검증 후에 값을 변환할 수 있습니다.

정답은 아래와 같이 바꾸면 됩니다.

```javascript
const StarWarsPerson = z
  .object({
    name: z.string(),
  })
  .transform(person => ({
    ...person,
    nameAsArray: person.name.split(" "),
  }));

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

export const fetchStarWarsPeople = async () => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people.json"
  ).then(res => res.json());

  const parsedData = StarWarsPeopleResults.parse(data);

  return parsedData.results;
};
```

transform을 이용해서 최종적으로 parse에 전달하는 data가 아래와 같은 형태로 반환하는 흐름입니다.

```ts
{
  results: [{ name: "foo bar", nameAsArray: ["foo", "bar"] }];
}
```

---

## 12. <a name='1112'></a>사용자 정의 유효성 검사 수행하기 (튜토리얼 11, 12)

11번째 튜토리얼 문제입니다.

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should error if the passwords are not the same", () => {
  expect(() =>
    validateFormInput({
      password: "password",
      confirmPassword: "password1",
    })
  ).toThrowError("Passwords don't match");
});
```

실행결과는 아래와 같습니다.

```bash
 FAIL  test/zod-11.test.ts > Should error if the passwords are not the same
AssertionError: expected [Function] to throw an error

- Expected:
null

+ Received:
undefined

 ❯ test/zod-11.test.ts:26:5
     24|       confirmPassword: "password1",
     25|     }),
     26|   ).toThrowError("Passwords don't match");
       |     ^
     27| });
```

테스트 결과를 보니까 패스워드 사전 검증을 하라는 얘기 같네요.

Zod에서는, refine를 사용하여 사용자 정의 유효성 검사를 생성할 수 있습니다.

refine는 parse를 실행할 때, 조건식이 false인 경우, 오류를 반환합니다.

튜토리얼 11의 코드에서는, password와 confirmPassword가 일치하지 않는 경우, 오류 메시지를 반환하는 형태입니다.

아래와 같이 하시면 테스트는 통과 될 겁니다.

```ts
const Form = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
  });
```

튜토리얼 12는 refine 관련인데, 비동기 함수 관련인데요.

결론부터 말하자면 refine는 비동기 함수를 전달할 수 있습니다.

doesStarWarsPersonExist는, parseAsync에 전달된 id로 API를 호출하고, data가 있었던 경우 true를 반환하고, 없었던 경우 false를 반환하고,

doesStarWarsPersonExist가 false인 경우, refine는 오류 메시지인 Not Found를 반환하는 코드는 아래와 같이 하시면 됩니다.

```ts
const doesStarWarsPersonExist = async (id: string) => {
  try {
    const data = await fetch(
      "https://www.totaltypescript.com/swapi/people/" + id + ".json"
    ).then(res => res.json());
    return Boolean(data?.name);
  } catch (e) {
    return false;
  }
};

const Form = z.object({
  id: z.string().refine(doesStarWarsPersonExist, { message: "Not found" }),
});

export const validateFormInput = async (values: unknown) => {
  const parsedData = await Form.parseAsync(values);

  return parsedData;
};
```

---

## 13. <a name='13'></a>재귀적인 스키마 선언하기 (튜토리얼 13)

13번째 문제를 볼까요?

```ts
// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const MenuItem = z.object({
  link: z.string(),
  label: z.string(),
  children: z.array(MenuItem).default([]),
});

// TESTS

it("Should succeed when it encounters a correct structure", async () => {
  const menuItem = {
    link: "/",
    label: "Home",
    children: [
      {
        link: "/somewhere",
        label: "Somewhere",
        children: [],
      },
    ],
  };
  expect(MenuItem.parse(menuItem)).toEqual(menuItem);
});

it("Should error when it encounters an incorrect structure", async () => {
  const menuItem = {
    children: [
      {
        link: "/somewhere",
        label: "Somewhere",
        children: [],
      },
    ],
  };
  expect(() => MenuItem.parse(menuItem)).toThrowError();
});
```

실행결과는 아래와 같습니다.

```bash
 FAIL  test/zod-13.test.ts [ test/zod-13.test.ts ]
ReferenceError: Cannot access 'MenuItem' before initialization
 ❯ test/zod-13.test.ts:9:21
      7|   link: z.string(),
      8|   label: z.string(),
      9|   children: z.array(MenuItem).default([]),
       |                     ^
     10| });
     11|
```

MenuItem이 초기화되기 전에 참조되었다는 에러네요.

MenuItem이 자기 자신을 갖는 재귀적인 타입이네요.

zod에서는 재귀적인 스키마를 선언할 때는, lazy를 사용합니다.

그런데 lazy만 사용하면 MenuItem이 any 타입이 되므로, 약간의 수고가 필요하지만, 수동으로 MenuItemType을 정의하고, 그 타입 정보를 MenuItem에 전달해야 합니다.

정답은 아래와 같이 하시면 됩니다.

```ts
interface MenuItemType {
  link: string;
  label: string;
  children?: MenuItemType[];
}

const MenuItem: z.ZodType<MenuItemType> = z.lazy(() =>
  z.object({
    link: z.string(),
    label: z.string(),
    children: z.array(MenuItem).default([]),
  })
);
```

위 코드는 MenuItem을 재귀적으로 정의하는 겁니다.

이렇게 Zod를 사용하면 복잡한 데이터 구조를 간편하게 처리할 수 있습니다.

---

## 14. <a name='14'></a>제네릭스 (튜토리얼 14)

14번째 문제를 보겠습니다.

```ts
// CODE

import { it } from "vitest";
import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

const genericFetch = (url: string, schema: z.ZodSchema) => {
  return fetch(url)
    .then(res => res.json())
    .then(result => schema.parse(result));
};

// TESTS

it("Should fetch from the Star Wars API", async () => {
  const result = await genericFetch(
    "https://www.totaltypescript.com/swapi/people/1.json",
    z.object({
      name: z.string(),
    })
  );

  type cases = [
    // Result should equal { name: string }, not any
    Expect<Equal<typeof result, { name: string }>>,
  ];
});
```

실행 결과는 아래와 같습니다.

```bash
 RERUN  test/zod-14.test.ts x3

 ✓ test/zod-14.test.ts (1)
   ✓ Should fetch from the Star Wars API
```

신기하게 테스트는 성공입니다.

위 코드를 제네릭을 사용한 코드로 바꾸는 게 이번 문제인 거 같네요.

아래와 같이 하면 됩니다.

```ts
const genericFetch = <ZSchema extends z.ZodSchema>(
  url: string,
  schema: ZSchema
): Promise<z.infer<ZSchema>> => {
  return fetch(url)
    .then(res => res.json())
    .then(result => schema.parse(result));
};
```

위 코드는 제네릭스를 사용하여 스키마를 전달하고, 그 스키마로부터 타입을 추론하는 예제입니다.

이렇게 Zod를 사용하면 데이터를 검증하고 변환하는 과정을 간편하게 처리할 수 있습니다.

---

## 15. <a name='15'></a>결론

튜토리얼 코드를 통해 Zod의 기본에 대해 소개하였습니다.

재귀적인 스키마 선언이나 제네릭스 등 약간 응용적인 부분도 있었지만, 저 자신도 튜토리얼을 통해 기본적인 부분을 복습할 수 있었다고 생각합니다.

그럼.
