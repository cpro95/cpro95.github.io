---
title: CORS 에러, 더 이상 두렵지 않다 (완전 정복 가이드)
pubDatetime: 2025-07-09T11:43:10.519Z
postSlug: 2025-07-09-complete-guide-to-understanding-cors
featured: false
draft: false
tags:
  - CORS
  - 동일 출처 정책
  - SOP
  - Cross-Origin
  - 프리플라이트
  - 웹 보안
description: Cross-Origin Request Blocked 에러의 정체는 무엇일까요? 웹 보안의 핵심인 동일 출처 정책부터 CORS 헤더, 프리플라이트 요청의 흐름, 그리고 흔한 에러 해결법까지, CORS의 모든 것을 알아봅니다.
---

프론트엔드에서 API 요청을 보냈을 때, 브라우저 콘솔에 떠오르는 붉은색의 "Cross-Origin Request Blocked" 에러 메시지를 마주하고 좌절해 본 적이 있으신가요?<br /><br />
이 문제는 대부분 'Cross-Origin Resource Sharing', 즉 CORS에 대한 이해 부족에서 비롯됩니다.<br /><br />
저 역시 몇 년 전에는 같은 배를 타고 있었습니다.<br /><br />
결국 CORS를 더 깊이 파고들기 위해 CakePHP 플러그인을 만들기로 결심하기까지 했죠.<br /><br />
오늘은 그 경험을 바탕으로 CORS가 무엇이고 어떻게 동작하는지, 그 근본 원리부터 함께 파헤쳐 보겠습니다.<br /><br />

## 1. 문제의 근원: '동일 출처 정책(Same-Origin Policy, SOP)'<br />

CORS를 이해하려면, 먼저 웹 브라우저의 가장 근본적인 보안 원칙인 '동일 출처 정책'부터 알아야 합니다.<br /><br />
'출처(Origin)'란 프로토콜(http/https), 도메인(example.com), 포트(:80)의 조합을 의미합니다.<br /><br />
이 세 가지가 모두 같아야 '동일 출처'로 인정됩니다.<br /><br />
'동일 출처 정책'이란, **'한 출처에서 로드된 문서나 스크립트는 다른 출처의 리소스와 상호작용할 수 없다'**는 규칙입니다.<br /><br />
마치 아파트 보안 시스템과 같습니다.<br /><br />
여러분의 집(https://mydomain.com) 안에서는 자유롭게 물건을 옮길 수 있지만, 옆 동 아파트(https://api.another.com)에 허락 없이 들어가 물건을 가져올 수는 없는 것과 같은 이치입니다.<br /><br />
이 정책 덕분에, 악의적인 웹사이트가 여러분이 로그인해 둔 은행 사이트나 이메일에 멋대로 요청을 보내 데이터를 훔쳐보는 끔찍한 일을 방지할 수 있습니다.<br /><br />

## 2. 해결책의 등장: 'CORS'<br />

하지만 현대 웹 애플리케이션은 여러 도메인에 걸쳐 분산된 서비스(예: 프론트엔드 서버와 API 서버)가 서로 통신해야 하는 경우가 많습니다.<br /><br />
SOP를 무조건 지키면 이런 아키텍처는 불가능하겠죠.<br /><br />
'CORS(Cross-Origin Resource Sharing)'는 바로 이 문제를 해결하기 위해 등장한 메커니즘입니다.<br /><br />
CORS는 **서버가 특정 출처의 요청을 허용하도록 명시적인 '허락'을 내릴 수 있게 해주는 HTTP 헤더 기반의 체계**입니다.<br /><br />
즉, 옆 동 아파트의 집주인(서버)이 "아, mydomain.com에서 온 요청은 괜찮으니 들여보내 주세요"라고 경비원(브라우저)에게 미리 말해주는 것과 같습니다.<br /><br />
만약 `https://mydomain.com`에서 `https://google.com`으로 요청을 보내면, 구글 서버는 `mydomain.com`을 허용하지 않았으므로 브라우저는 다음과 같은 에러를 보여줍니다.<br /><br />

```
Access to fetch at 'https://www.google.com/' from origin 'https://mydomain.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

이는 "구글 서버 응답에 'Access-Control-Allow-Origin' 헤더가 없어서, 우리 브라우저 보안 정책상 이 요청을 차단했습니다"라는 의미입니다.<br /><br />

'중요한 사실': CORS는 서버를 보호하는 기술이 아니라, **사용자의 브라우저를 보호하는 기술**입니다.<br /><br />
따라서 `curl`이나 Postman 같은 도구로 API를 직접 호출하면 CORS 에러가 발생하지 않습니다.<br /><br />
오직 브라우저만이 이 정책을 강제합니다.<br /><br />

## 3. CORS는 어떻게 동작할까? (통신 흐름)<br />

CORS는 요청의 종류에 따라 두 가지 방식으로 동작합니다: '단순 요청(Simple Requests)'과 '프리플라이트 요청(Preflight Requests)'.<br /><br />

### 단순 요청 (Simple Request)<br />

아래의 특정 조건을 모두 만족하는 요청은 '단순 요청'으로 분류되어, 브라우저는 별도의 확인 절차 없이 바로 본 요청을 보냅니다.<br /><br />

- 메서드: `GET`, `HEAD`, `POST` 중 하나<br />
- 헤더: 기본 헤더 외에 `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`만 허용 (단, `Content-Type`은 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain` 값만 가능)<br /><br />

**단순 요청의 흐름:**<br />

1.  **클라이언트 (브라우저)** → **서버**: `Origin: https://mydomain.com` 헤더를 포함하여 실제 요청을 보냅니다.<br />
2.  **서버** → **클라이언트**: `Access-Control-Allow-Origin: https://mydomain.com` (또는 `*`) 헤더를 포함하여 응답합니다.<br />
3.  **클라이언트 (브라우저)**: 응답 헤더의 `Access-Control-Allow-Origin` 값을 보고, 현재 출처가 허용되었는지 확인합니다.<br /><br />
    허용되었다면 요청을 성공 처리하고, 그렇지 않다면 CORS 에러를 발생시킵니다.<br /><br />

### 프리플라이트 요청 (Preflight Request)<br />

'단순 요청'의 조건을 벗어나는 복잡한 요청(예: `PUT`, `DELETE` 메서드, `Content-Type: application/json`, 커스텀 헤더 포함 등)은 브라우저가 본 요청을 보내기 전에 먼저 '프리플라이트(preflight, 사전 확인)' 요청을 보냅니다.<br /><br />
이 프리플라이트 요청은 `OPTIONS` 메서드를 사용하며, "제가 잠시 후에 이런이런 메서드와 헤더로 본 요청을 보낼 건데, 괜찮을까요?"라고 서버에 미리 물어보는 역할을 합니다.<br /><br />

**프리플라이트 요청의 흐름:**<br />

1.  **클라이언트 (브라우저)** → **서버**: `OPTIONS` 메서드로 프리플라이트 요청을 보냅니다.<br /><br />
    이 요청에는 `Access-Control-Request-Method` (실제 요청의 메서드), `Access-Control-Request-Headers` (실제 요청의 헤더) 같은 정보가 담겨 있습니다.<br /><br />
2.  **서버** → **클라이언트**: 이 서버가 허용하는 정책을 담은 헤더들로 응답합니다.<br /><br />
    (`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` 등)<br />
3.  **클라이언트 (브라우저)**: 서버의 응답을 보고, 자신이 보내려던 본 요청이 허용되는지 확인합니다.<br /><br />
4.  **(허용된 경우)** → **서버**: 이제서야 실제 `PUT` 이나 `DELETE` 같은 본 요청을 보냅니다.<br /><br />
5.  **서버** → **클라이언트**: 본 요청에 대한 실제 응답을 보냅니다.<br /><br />

이처럼 두 번의 통신이 일어나기 때문에, 프리플라이트 요청은 약간의 성능 저하를 유발할 수 있습니다.<br /><br />
이를 완화하기 위해 서버는 `Access-Control-Max-Age` 헤더를 사용하여 프리플라이트 응답을 특정 시간 동안 브라우저에 캐시하도록 할 수 있습니다.<br /><br />

## 4. 서버와 클라이언트 구현 예제<br />

### 서버 측 설정 (Express.js)<br />

실제 서버에서는 `cors` 같은 라이브러리를 사용하면 편리하게 CORS 헤더를 설정할 수 있습니다.<br /><br />

```javascript
const express = require("express");
const cors = require("cors");
const app = express();

// CORS 설정을 구성합니다.
app.use(
  cors({
    origin: "https://example.com", // Access-Control-Allow-Origin: 허용할 출처
    methods: "GET, POST, PUT, DELETE", // Access-Control-Allow-Methods: 허용할 메서드
    allowedHeaders: "Content-Type, Authorization", // Access-Control-Allow-Headers: 허용할 헤더
    credentials: true, // Access-Control-Allow-Credentials: 쿠키 등 자격 증명 허용
  })
);

// ... 나머지 API 라우트
```

### 클라이언트 측 구현 (`fetch`)<br />

`fetch` API를 사용할 때, CORS는 브라우저가 자동으로 처리합니다.<br /><br />
다만, 쿠키나 인증 토큰 같은 '자격 증명(credentials)'을 함께 보내야 할 경우, `credentials: 'include'` 옵션을 명시해야 합니다.<br /><br />

```javascript
fetch("https://api.example.com/data", {
  method: "GET",
  credentials: "include", // 세션 쿠키 등을 함께 보내기 위해 필요합니다.
}).then(response => {
  // ...
});
```

## 5. 흔한 CORS 에러와 해결책<br />

이제 개발자들이 가장 고통받는 부분, 바로 에러 메시지별 해결책입니다.<br /><br />

- **에러 1: "No 'Access-Control-Allow-Origin' header"**<br />
  '원인': 가장 흔한 에러로, 서버 응답에 이 헤더가 아예 없는 경우입니다.<br /><br />
  브라우저는 허락의 증표를 찾지 못했으므로 요청을 차단합니다.<br /><br />
  '해결책': 서버에서 `Access-Control-Allow-Origin` 헤더에 요청을 보낸 출처(예: `https://example.com`)나 모든 출처를 허용하는 `*`를 포함하여 응답하도록 설정합니다.<br /><br />

- **에러 2: "The value of the 'Access-Control-Allow-Origin' header ... must not be the wildcard '\*' when the credentials flag is true."**<br />
  '원인': 요청에 `credentials: 'include'` 옵션이 있는데, 서버가 `Access-Control-Allow-Origin: *`로 응답한 경우입니다.<br /><br />
  보안상의 이유로, 자격 증명이 포함된 요청에는 모든 출처를 허용하는 와일드카드(`*`)를 사용할 수 없습니다.<br /><br />
  '해결책': `*` 대신, 요청을 허용할 정확한 출처(예: `https://example.com`)를 명시해야 합니다.<br /><br />

- **에러 3: "Response to preflight request doesn't pass access control check: It does not have HTTP ok status."**<br />
  '원인': 프리플라이트 `OPTIONS` 요청에 대해 서버가 200번대의 성공적인 HTTP 상태 코드로 응답하지 않은 경우입니다.<br /><br />
  서버가 `OPTIONS` 요청을 제대로 처리하지 못하고 404나 500 에러를 반환하는 경우에 발생합니다.<br /><br />
  '해결책': 서버가 `OPTIONS` 메서드에 대해 200 OK 상태 코드와 함께 필요한 CORS 헤더들을 정상적으로 응답하도록 설정해야 합니다.<br /><br />

- **에러 4: "Access-Control-Allow-Headers ... contains invalid values" 또는 "No 'Access-Control-Allow-Headers' header"**<br />
  '원인': 클라이언트가 보낸 요청에 커스텀 헤더(예: `X-Custom-Header`)가 있는데, 서버의 프리플라이트 응답에 있는 `Access-Control-Allow-Headers` 목록에 이 헤더가 포함되어 있지 않은 경우입니다.<br /><br />
  '해결책': 서버 설정의 `allowedHeaders`에 클라이언트가 사용하는 모든 커스텀 헤더를 명시적으로 추가해 줍니다.<br /><br />

## 결론<br />

CORS는 개발자를 괴롭히기 위한 버그가 아니라, 사용자를 보호하기 위한 필수적인 웹 보안 장치입니다.<br /><br />
그것은 서버의 리소스가 다른 출처에서 어떻게 접근될 수 있는지를 규제합니다.<br /><br />
CORS의 동작 원리, 특히 '동일 출처 정책'과 '프리플라이트 요청'의 흐름을 이해하고 올바르게 설정한다면, 더 이상 붉은 에러 메시지에 당황하지 않고 안전하고 원활한 교차 출처 통신을 구현할 수 있을 것입니다.<br /><br />
