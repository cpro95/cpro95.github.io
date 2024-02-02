---
title: 자바스크립트 named export와 default export 차이점 이해하기
pubDatetime: 2024-02-02T11:54:01.532Z
postSlug: 2024-02-02-javascript-import-named-export-vs-default-export
featured: false
draft: false
tags:
  - javascript
  - export
description: 자바스크립트 named export와 default export 차이점 이해하기
---

안녕하세요?

React를 사용하면서 느끼는 의문이 있었는데요.

바로 “named export와 default export 중 어느 것을 사용하는 것이 좋을까?”라는 생각이었습니다.

그래서 여러 가지 생각나는데로 적어보았습니다.

개인적인 해석이므로, 오류가 있을 수 있으니 참고 바랍니다.

---

## Default export

default export의 예제입니다.

```js
// default export
export default function sampleFunc() {
  return "hoge";
}
```

그리고 import 할 때 사용하는 방법은 아래와 같습니다.

```js
import sampleFunc from "./path";
```

## Named export

named export 입니다.

```js
export function sampleFunc() {
  return "hoge";
}
```

import는 아래와 같이 컬리브레이스 안에 이름을 넣어야 합니다.

```js
import { sampleFunc } from "./path";
```

---

## 차이점

default export의 경우 import 할 때 모듈 이름을 변경할 수 있습니다.

```js
export default function sampleFunc() {
  return "hello";
}
```

위와 같이 sampleFunc 이름으로 default export 되었지만 아래와 같이 import 시 이름을 바꿔서 import 해도 아무 문제 없습니다.

```js
import renamedSampleFunc from "./path"; // <- 모듈 이름 변경
```

반면, named export 의 경우 에러가 발생하므로 꼭 아래와 같이 작성해야 합니다.

```js
export function sampleFunc() {
  return message;
}
```

위와 같이 sampleFunc 이름으로 export 했으면 아래와 같이 이름을 바꿔서 임포트 할 수 있습니다.

```js
import { sampleFunc as renamedSampleFunc } from "./path";
```

또 named export를 여러 개 export가 가능합니다.

default export 에서는 할 수 없는 기능입니다.

```js
export const message = "Hello, world!";

export function sampleFunc() {
  return message;
}
```

아래와 같이 named export 가 된 2개를 동시에 import 할 수 있습니다.

```js
import { message, sampleFunc } from "./path";
```

## 결론

Next.js의 Page 파일 등 예외는 있지만, 저는 앞으로 named export 만 쓰고 싶네요.

주된 이유는 다음 두 가지입니다.

- import의 일관성 :기본적으로 default export 로 프로젝트를 진행하고 있었다고 가정했을 때, 중간에 여러 모듈을 export 해야 하는 경우 아래와 같아지면 조금 어색합니다.

```js
import DefaultExportFunc from "./path";
import { NamedExportFunc, NamedExportVar } from "./path";
```

- 명시적인 리네임 : default export 의 경우 import 문을 오타로 작성하면 리네임으로 처리되어 의도치 않게 그대로 사용될 수 있습니다.
  또한, 경로가 잘못되었더라도 해당 경로에 default export 된 TypeScript 파일이 있을 경우, 그 파일을 리네임해서 import하게 될 수도 있습니다.

```js
// sample의 'e'가 빠져있음
import samplFunc from "./path"; // <- 그대로 통과
import { samplFunc } from "./path"; // <- 에러
```

---

전체적으로 named export가 더 좋은 이유는 구글 검색하면 보통 아래와 같이 나오니 참고 바랍니다.

테스트 용이성: named export 는 테스트를 더 쉽게 만들어줍니다. 각 함수나 변수를 개별적으로 import하여 테스트할 수 있기 때문입니다. 반면에, default export 는 전체 모듈을 import해야 하므로 테스트가 복잡해질 수 있습니다.

자동완성과 도구 지원: 대부분의 코드 에디터는 named export 를 더 잘 지원합니다. 자동완성 기능을 사용하면 모듈에서 내보낸 모든 것을 쉽게 볼 수 있습니다. default export 의 경우, 이러한 도구 지원이 제한적일 수 있습니다.

명확성과 가독성: named export 는 코드를 읽는 사람에게 더 명확한 정보를 제공합니다. import문을 보면 어떤 함수나 변수가 사용되는지 바로 알 수 있습니다. default export 의 경우, import문만으로는 어떤 것이 내보내진 것인지 알 수 없습니다.

리팩토링 용이성: named export 는 리팩토링을 더 쉽게 만들어줍니다. 특정 함수나 변수의 이름을 변경하면, 해당 이름을 import하는 모든 곳에서 에러가 발생하므로 쉽게 찾아낼 수 있습니다. default export 의 경우, 이름을 변경해도 에러가 발생하지 않으므로 문제를 찾기 어렵습니다.

이러한 이유로, 저는 일반적으로 named export 를 선호합니다.

때때로는 상황에 따라 default export가 더 적합한 경우도 있습니다.

예를 들어, 모듈이 하나의 주요 함수를 export 하고 다른 export는 이를 지원하는 작은 함수나 변수인 경우, default export 를 사용하는 것이 더 자연스러울 수 있습니다.

이러한 결정은 온전히 코딩하는 개발자의 판단에 달려 있다고 생각합니다.

그럼.
