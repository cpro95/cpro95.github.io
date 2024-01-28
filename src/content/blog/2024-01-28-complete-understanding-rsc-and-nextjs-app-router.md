---
title: React Server Components와 Next.js App Router 제대로 이해하기
pubDatetime: 2024-01-28T08:09:03.423Z
postSlug: 2024-01-28-complete-understanding-rsc-and-nextjs-app-router
featured: true
draft: false
tags:
  - rsc
  - next.js
  - app router
description: Next.js App Router와 RSC(React Server Components)에 대해 알아보기
---

안녕하세요?

오늘은 취미로 React와 Next.js를 사용하고 있지만, "RSC, App Router, Suspense 등에 대해 전혀 모르겠다." 이런 분들을 위해 제가 공부한 내용을 정리해서 적어보려 합니다.

조금 두서없이 글을 써서 그런지 지저분한데요.

조금이나마 도움이 됐으면 하네요.

** 목 차 **

- 1. [React와 Next.js에 대해](#ReactNext.js)
- 2. [React 렌더링에 대해](#React)
  - 2.1. [렌더링 트리거 감지](#1)
  - 2.2. [브라우저 렌더링 콘텐츠 결정](#2)
  - 2.3. [변경사항을 DOM에 적용](#DOM)
- 3. [Next.js 렌더링에 대해](#Next.js)
- 4. [Next.js Pages Router 렌더링에 대해](#Next.jsPagesRouter)
- 5. [하이드레이션(Hydration)이란 무엇인가?](#Hydration)
- 6. [Next.js Pages Router 렌더링 유형에 대해](#Next.jsPagesRouter-1)
  - 6.1. [SSR(Server-side Rendering)](#SSRServer-sideRendering)
  - 6.2. [SSG(Static Site Generation)](#SSGStaticSiteGeneration)
  - 6.3. [ISR(Incremental Static Regeneration)](#ISRIncrementalStaticRegeneration)
  - 6.4. [CSR(Client-side rendering)](#CSRClient-siderendering)
- 7. [RSC(React Server Components)란 무엇인가?](#RSCReactServerComponents)
- 8. [App Router란 무엇인가?](#AppRouter)
- 9. [SSR과 App Router(RSC)의 차이점에 대해](#SSRAppRouterRSC)
- 10. [React Server Components와 데이터 가져오기에 대해](#ReactServerComponents)
- 11. [실제로 RSC와 App Router를 사용해보기](#RSCAppRouter)
- 12. [요약](#3)

---

## 1. <a name='ReactNext.js'></a>React와 Next.js에 대해

먼저, React와 Next.js에 대해 간단히 설명하겠습니다.

React는 UI를 쉽게 구축하기 위한 JavaScript 라이브러리입니다.

'컴포넌트’라는 개념을 사용하여 선언적으로 UI를 정의함으로써, 간단하게 화면을 구축할 수 있습니다.

그리고 Next.js는 React의 프레임워크입니다.

'React의 기능을 확장하여, 더욱 사용하기 쉽게 만든 것’으로 이해하면 좋을 겁니다.

---

## 2. <a name='React'></a>React 렌더링에 대해

React는 create-react-app으로 생성된 초기 상태에서 CSR(클라이언트 사이드 렌더링)로 렌더링을 수행합니다.

CSR은 브라우저 상에서 JavaScript를 실행하여 DOM을 생성하고 콘텐츠를 표시하는 방법입니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEhbSqySN2gIluYXi8LUYu2nHUyZLFuNgvLGd_163P2gYtfCAwc1LCPbWUIGbbz7AjggrthULu34HX2OP7vnjw-00mZT2NZqCxn1C6OS26teYmN_IvILo4NJ6GNp_1Vv03JiKRxGCFj_8Gt3EHN90tPAX8sTf_ch0MMOD1jGtYquTHcgMdhX9SW0GJbbgto)

페이지의 초기 로드 시에는 콘텐츠가 아무것도 표시되지 않고, 브라우저에서의 JavaScript 실행 후에 처음으로 화면이 표시됩니다.

자세히 설명하면, React의 렌더링은 다음의 단계로 수행됩니다.

1. 렌더링 트리거 감지
2. 브라우저 렌더링 콘텐츠 결정
3. 변경사항을 DOM에 적용

### 2.1. <a name='1'></a>렌더링 트리거 감지

먼저, 렌더링의 시작점이 되는 트리거를 감지합니다.

여기서의 트리거는 다음 두 가지입니다.

- 컴포넌트의 초기 렌더링(화면의 초기 로드)
- 컴포넌트의 상태(state)의 업데이트

이 중 어느 하나의 트리거를 감지했을 때, React는 렌더링을 시작합니다.

### 2.2. <a name='2'></a>브라우저 렌더링 콘텐츠 결정

다음으로, 브라우저 렌더링할 내용을 결정합니다.

이는 다음의 과정으로 수행됩니다.

- 대상 컴포넌트의 호출
- 이전 컴포넌트의 상태와의 비교
- 커밋(브라우저 렌더링)할 내용의 결정

1의 '대상 컴포넌트의 호출'에 대해, 첫 번째 렌더링에서는 루트 컴포넌트를 호출하고, 그 이후의 렌더링에서는 상태 업데이트가 렌더링 트리거가 된 컴포넌트를 호출합니다.

그리고 2에서 이전 컴포넌트의 상태와의 차이를 계산하고, (화면을 업데이트할 필요가 있는지를 포함하여) 화면 업데이트의 내용을 결정합니다.

마지막으로, 차이가 감지되어 화면을 업데이트할 필요가 있는 경우, 3을 실행합니다.

즉, React에서의 렌더링이란, '렌더링 대상 컴포넌트를 호출하여 이전 내용과의 차이를 비교하고, 무엇을 브라우저 렌더링(commit)할지를 결정하는 것'이라고 할 수 있습니다.

같은 '렌더링'이라는 이름이 붙어 있어 혼동하기 쉽지만, '브라우저 렌더링(화면에 그리기)'과는 다른 개념이므로, 확실히 구분하도록 합시다.

※ React의 공식에서는 'React의 렌더링'과 '브라우저의 렌더링'을 구분하기 위해, '브라우저의 렌더링'을 painting(페인팅)으로 표현하고 있습니다.

### 2.3. <a name='DOM'></a>변경사항을 DOM에 적용

2의 '브라우저 렌더링 콘텐츠 결정'에서 이전 상태와의 차이가 있었다면, 그 차이를 커밋(변경사항을 DOM에 적용)합니다.

즉, DOM 트리의 구조 수정을 수행합니다.

그리고 React에 의해 이러한 3가지 처리가 수행된 후, 브라우저는 그 변경사항을 화면에 적용합니다(브라우저 렌더링/페인팅).

이러한 과정을 통해, React에서 화면의 표시나 업데이트가 수행됩니다.

※ 이러한 3가지 과정에 대해, [React의 공식문서에서는 레스토랑을 예](https://react.dev/learn/render-and-commit)로 설명하고 있습니다.

매우 이해하기 쉽기 때문에 꼭 읽어보시길 바랍니다.

---

## 3. <a name='Next.js'></a>Next.js 렌더링에 대해

다음으로, Next.js의 렌더링 방식에 대해 정리하겠습니다.

2023년 9월 현재, Next.js에는 다음 두 가지 모드가 있습니다.

원래는 Pages Router만 있었지만, 최근에 App Router가 추가되었습니다.

- Pages Router
- App Router

먼저 Pages Router에 대한 렌더링을 정리해 보겠습니다.

---

## 4. <a name='Next.jsPagesRouter'></a>Next.js Pages Router 렌더링에 대해

기본적으로, Next.js는 모든 페이지를 '프리렌더링’합니다.

프리렌더링이란, Next.js가 각 페이지의 HTML을 클라이언트 사이드 JavaScript로 생성하는 것이 아니라, 미리 생성해 두는 것을 말합니다.

이 프리렌더링으로 인해, 성능과 SEO가 향상된다고 알려져 있습니다.

생성된 HTML은 필요한 JavaScript와 연결되어 있으며, 페이지가 브라우저에 로드되면, 해당 JavaScript가 실행되고, 페이지가 완전히 인터랙티브해집니다.(이를 하이드레이션이라고 합니다)

Next.js(Pages Router)에는 다음의 두 가지 프리렌더링 방식이 있으며, 상황에 따라 선택해서 사용할 수 있습니다.

- 정적 생성(Static Generation)
  - HTML은 빌드 시에 생성되며, 요청마다 재사용됩니다.
- 서버 사이드 렌더링(Server-side Rendering)
  - HTML은 요청마다 생성됩니다.

---

## 5. <a name='Hydration'></a>하이드레이션(Hydration)이란 무엇인가?

하이드레이션(Hydration)이란, 서버 측에서 렌더링된 HTML에 연결된 JavaScript를 실행하여 대상 페이지를 완성된 상태로 만드는 것을 말합니다.

요컨대, 이런 흐름이죠.

1. (SSR 등으로) 서버 측에서 HTML이 반환됩니다.
2. 클라이언트에 전송된 JavaScript를 실행합니다(이벤트 리스너 등록 및 인터랙티브한 동작 추가).

서버에서 받은 초기 HTML은 인터랙티브한 기능이 없는 건조한 HTML이고, 여기에 클라이언트 측에서 수분(필요한 설정이나 기능)을 추가하는 상상을 해보세요.

주로 SSR과 같이, 서버 측에서 HTML을 생성하여 반환하는 경우에 사용됩니다.

---

## 6. <a name='Next.jsPagesRouter-1'></a>Next.js Pages Router 렌더링 유형에 대해

React의 경우 기본적으로 CSR로 그리기를 수행했지만, Next.js에서는 다음과 같이 다양한 렌더링 방식을 선택할 수 있습니다.

- SSR
- SSG
- ISR
- CSR

각각에 대해 간단히 설명해 드리겠습니다.

### 6.1. <a name='SSRServer-sideRendering'></a>SSR(Server-side Rendering)

SSR은 Dynamic Rendering이라고도 합니다.

페이지의 HTML이 요청마다 생성되는 방식입니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEgBk4wGur24iOZR710AMgA8tWQM_yLWFttKMUphQfrigyRuaz570FaHwisnKyOb87IpaqfSnfXhAAXNylxGIIxBBIx4lrgBTlMzetJ27cIYNXPtEk0mk4clmgYOixY9dR-HQTAGm3pG3jgO1B1dYa3y6DMxTY_HehQNV2mqFvGTblcfxZAZIbvo4y-UW5U)

서버 측에서 생성된 원시 HTML(DOM)이 JavaScript 실행 전에 브라우저에 표시되므로, 화면의 초기 표시 속도를 빠르게 할 수 있습니다.

이는 사용자 경험의 향상은 물론, SEO에도 효과가 있다고 알려져 있습니다.

Pages Router에서 서버 사이드 렌더링을 사용하려면, getServerSideProps라는 비동기 함수를 사용합니다.

### 6.2. <a name='SSGStaticSiteGeneration'></a>SSG(Static Site Generation)

SSG를 사용하는 경우, 페이지의 HTML은 빌드 시에 생성됩니다.

이 HTML은 요청마다 재사용되며, CDN에서 캐시할 수도 있습니다.

Next.js에서는 데이터가 없는 페이지(정적 HTML)뿐만 아니라, getStaticProps나 getStaticPaths를 사용하여 빌드 시에 데이터를 가져오고 등록하여 HTML을 생성할 수도 있습니다.

SSG에서는 요청마다 서버가 페이지를 렌더링할 필요가 없으므로, 렌더링이 매우 빠른 것이 특징입니다.

그래서 기본적으로 렌더링 방식으로 SSG 사용이 권장됩니다.

### 6.3. <a name='ISRIncrementalStaticRegeneration'></a>ISR(Incremental Static Regeneration)

SSG는 미리 페이지를 생성하고, 요청마다 그 정적 복사본을 제공하는 방법이지만, ISR은 이를 더 발전시킨 겁니다.

ISR을 사용하면, 정적 페이지가 미리 생성된 후에도 일정 시간 간격으로 해당 페이지를 재생성할 수 있습니다.

이를 통해, SSG에 의한 빠른 응답을 실현하면서도, 어느 정도의 실시간성도 제공할 수 있습니다.

ISR 구현은, Next.js의 페이지마다 revalidate라는 매개변수를 설정함으로써 수행합니다.

이 매개변수에는 재생성 간격을 지정합니다.

예를 들어, revalidate: 60으로 설정하면, 60초마다 페이지가 재생성됩니다.

즉, ISR은 정적 콘텐츠를 효과적으로 제공하면서, 정기적으로 최신 정보를 반영하는 메커니즘을 제공하는 기능입니다.

### 6.4. <a name='CSRClient-siderendering'></a>CSR(Client-side rendering)

CSR은 React의 기본 렌더링 방식입니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEhDCVJt_iz3Wz1LdFtPVt7liy4QAk0XaVUsjiCU-N07EbBG8qmmdQCJXCOQe-Y5oeZji3GOSr63r4zoX30T26OupjGCgi27_1hfcwiflWq3gBa43EYX7BWPhj5qbBQDb0vaXuq_t3mLHa8dYir4n2YRxYEQpZQzpOiaPWfJpUDKierKp8o8ps2bsMvyibE)

브라우저 상에서 JavaScript를 실행하여 DOM을 생성하고 콘텐츠를 표시합니다.

Next.js에서는 useEffect 훅을 사용하는 등으로 CSR을 구현할 수 있습니다.

---

## 7. <a name='RSCReactServerComponents'></a>RSC(React Server Components)란 무엇인가?

이제, Pages Router에 이어 Next.js의 두 번째 모드인 App Router에 대해 설명하겠습니다.

하지만, App Router를 이해하기 위해서는 그 기반 기술인 RSC(React Server Components)를 이해해야 합니다.

그러므로, 먼저 'RSC란 무엇인가’에 대해 설명하겠습니다.

원래 React에는 앞서 설명한 CSR밖에 없었습니다.

하지만, CSR의 경우, 클라이언트에 모든 컴포넌트의 리소스(JavaScript)를 전송해야 하므로, 클라이언트 측의 성능 저하가 우려되었습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEj4_R5mOpFPKglBhNhAK41eWu6bJpEC7020IMIxMyWW1LMGaKKPtO1AKagmkRTEsOtLRbMiKVLsB4kqcKmiDRjpmRuff4rt6zpC7j99FLaN93KK155T3hLeY9M1elnuBMcvcoCqDAt3tOSbQaJiPNXYPhYjrtKiqANafecTD59UHDcda4rmNg_BHnTMXYE)

그래서 탄생한 것이 RSC(React Server Components)입니다.

RSC란, 한마디로, 컴포넌트를 '서버 측에서 렌더링되는 컴포넌트’와 '클라이언트 측에서 렌더링되는 컴포넌트’로 나누는 기술입니다.

지금까지 React에는 '클라이언트 컴포넌트’밖에 없었습니다.

하지만 RSC에서는 어떤 컴포넌트를 서버 전용으로 할지, 어떤 컴포넌트를 클라이언트 전용으로 할지를 선택할 수 있습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEgEooWU92drDbS0tmpWKah-7gzqpeITbvwWQWyEcMZ6YESu-EtJhdD6wnGrlcTPAYjiMRT44d_jWfVlQJDHXXVdJsEXTfVlUKKOtG1UxqQseOXXPC4WohL8iCKS0bpApX9ReJmacnDk2xWQEQfQhr2BwCtWKOMmYrA4b2XWeL3NXyGsBKN_ihC74To-dhM)

RSC를 통해, 데이터를 더 DB에 가까운 서버 측에서 실행할 수 있고, 또 서버 컴포넌트와 다른 필수 의존 패키지의 일부를 클라이언트 측에 전송하는 JavaScript의 크기(bundle 크기)를 줄일 수 있어, 성능이 향상된다고 알려져 있습니다.

또한, RSC에는 다음과 같은 특징이 있습니다.

- 서버 측에서 더 빠르게 데이터를 가져올 수 있게 됩니다(클라이언트에서의 요청량도 줄어듭니다).
- console.log는 브라우저의 콘솔이 아닌, 서버의 콘솔에 정보를 출력합니다.
- onClick이나 onChange 등의 이벤트 리스너는 사용할 수 없습니다.
- useState, useEffect는 사용할 수 없습니다.
- 서버 컴포넌트는 클라이언트 컴포넌트를 가져와 렌더링할 수 있지만, 클라이언트 컴포넌트는 그 안에 서버 컴포넌트를 렌더링할 수 없습니다.

※ 그러나, RSC를 사용하면 무조건 bundle 크기가 줄어드는 것은 아닙니다. 자세한 내용은 아래를 참조하십시오.

---

## 8. <a name='AppRouter'></a>App Router란 무엇인가?

App Router는 Next.js 13에서 추가된 새로운 라우터 구현입니다.

App Router에서는 기본적으로 RSC(React Server Components)가 적용됩니다.

즉, 모든 컴포넌트가 기본적으로 서버 측에서 실행된다는 것입니다.

클라이언트 측에서 실행하려면, 컴포넌트의 상단에 'use client’를 정의해야 합니다.

가능한 한 서버 측에 처리를 집중함으로써, 성능 향상을 도모하려는 의도로 파악할 수 있습니다.

기본적으로는 서버 컴포넌트로 구현하고, 필요한 부분만 클라이언트에서 실행하는 것이 기본적인 생각 방식이라고 할 수 있습니다.

---

## 9. <a name='SSRAppRouterRSC'></a>SSR과 App Router(RSC)의 차이점에 대해

많은 초보자들이 혼동하기 쉬운 'SSR과 RSC의 차이점’에 대해, 그림을 활용하여 설명하겠습니다.

SSR은 다음과 같이 렌더링됩니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEjfMB-bEbVZ0O2FZHrT3tGGkolJUDnN4XsSo2LTTUgXR-1b48WFDdTlFm_izVmTgsvt4zlpFDal5tKEd6gk8Wf2P-i0bgGrW-wdlJkWDGdS9iY1BjslW_eI38e4Bqh8o0n8fwHElZVe1Yy-WmtLS20X_C8sTD3xP7QmiG9pJX_YtBsUx0daysHaBRUoZkM)

1. 서버 측에서 전체를 렌더링하여 원시 HTML을 만듭니다.
2. 생성된 HTML을 DOM에 반영하여 클라이언트 측에서 표시합니다(초기 표시를 빠르게 합니다).
3. 번들된 JavaScript(컴포넌트)를 클라이언트에 전송하고 하이드레이션을 수행합니다.

처음에 서버 측에서 HTML을 생성하여 클라이언트 측에 반영함으로써 초기 표시를 빠르게 하는 것이 가장 큰 특징입니다.

반면, RSC에서는 다음과 같이 렌더링됩니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEgg7hFPVHuo5ZSInN0hv9LR-BgXCEjXXfepD36piJcKQi5UsJbTsas3Lb1t8g-KK_eLpFE_d0bJ0ICVhqszEgvTpZpncBXqDQemVZo1_WcGgBiXcowss7elGLZXvhDh1U_YaCUnNnlbDtuBp7ltJuryAjnAR8Fapw36oBwvfr2bUOeZ3aGpWSEfwaoDR48)

1. 서버 측에서 서버 컴포넌트를 렌더링합니다.
2. 서버 컴포넌트의 HTML과 클라이언트 컴포넌트의 JavaScript를 클라이언트에 전송합니다.
3. 클라이언트 컴포넌트를 렌더링합니다.
4. 생성된 HTML을 DOM에 반영하여 클라이언트 측에서 표시합니다.

큰 차이점은 다음 세 가지입니다.

- SSR의 경우 초기 표시가 빠릅니다.
- RSC의 경우 서버와 클라이언트에서 각각의 컴포넌트가 렌더링됩니다.
- SSR의 경우 클라이언트에 전송되는 JavaScript의 양이 많습니다.

이 SSR과 RSC는 교차하지 않는 기술이 아니며, 조합하여 사용할 수 있습니다.
(사실, 조합하여 사용하는 경우가 더 효과적인 경우가 많습니다)

SSR과 RSC를 조합하여 사용한 경우, 처리 흐름은 다음과 같습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEi5hnl3zQzwoNuxNPRdBMnfuhhWgjZQlbzmJIHjzNs18GDsgCxepC1Knx3KX3kSxiQ-x3px9eTJBRaIZU3lVLRBjSnAT86eIsd62icoT29Cx42Y-xgriMvUKy7sVNVKhmE1eEflnS8tYtW4J_HfolCF3uoIED_zMvrAC9ErWYaOJE7OJoNfYj9gsB8SFWc)

1. 서버 측에서 서버 컴포넌트를 렌더링합니다.
2. 서버 측에서 클라이언트 컴포넌트도 렌더링합니다(SSR 특유의 동작).
3. 생성된 서버 컴포넌트와 클라이언트 컴포넌트의 HTML을 클라이언트 측에 전송하여 DOM에 반영하고 클라이언트 측에서 표시합니다(초기 표시를 빠르게 합니다).
4. 클라이언트 측에 JavaScript(클라이언트 컴포넌트)를 전송하고, 렌더링과 하이드레이션을 실행합니다.

이렇게, SSR과 RSC를 조합함으로써, 초기 표시를 빠르게 하면서, 클라이언트 측에 전송하는 JavaScript의 양도 줄일 수 있습니다.

그러므로, 기본적으로는 RSC를 단독으로 사용하기보다는, RSC와 SSR을 조합하여 사용하는 경우가 더 많을 것입니다.

---

## 10. <a name='ReactServerComponents'></a>React Server Components와 데이터 가져오기에 대해

지금까지, 특히 '외부에서 데이터를 가져오는 것'에 대해선 크게 고려하지 않고 설명해 왔습니다.

하지만, 실제 애플리케이션에서는 외부(DB나 API)에서 데이터를 가져와 사용하는 경우가 많을 겁니다.

그런 경우에 어떤 흐름이 되는지 설명해 보겠습니다.

원래 클라이언트 측에서는 useState 등을 사용하여 로딩 중 상태를 표시함으로써, 컴포넌트 단위로 비동기적인 데이터 획득이 가능했습니다.

그러나, SSR을 하는 경우, useState 등을 사용하여 서버 측에서 컴포넌트 단위로 비동기적인 데이터 획득을 할 수 없는 문제가 있었습니다.

Next.js의 getServerSideProps를 사용하여 데이터 획득 자체는 가능했지만, 데이터 획득이 '동기적'이라는 문제가 있었습니다.

이렇게 되면, 페이지를 사용자에게 표시하기 전에, 서버에서 데이터 획득을 모두 완료해야 하므로, 사용자에게 화면의 초기 표시가 지연될 수 있습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEhDvSjsImKO67uQih8qORaRi9v3YfVkutcnPI4ZJftLP8ln4Q5miluoy9h2Tqvs7NwH4yxPLpwNYksufMWs4cdwXkUUbm2oGqQHFceBVo7MRI1nOBd5lIOGz2g_rupe-oTeN9zS60YkP-xwrdppQTytbGA6LO5EohNRUmQHWMTyWpPjMMHfqfISIMcxrFg)

그러나, 이 상황은 Suspense와 React Server Components의 등장으로 변하게 됩니다.

Suspense란, useState 등에 의존하지 않고 '로딩 중'을 선언적으로 표현할 수 있는 기능입니다.

예를 들어, 다음과 같은 컴포넌트를 준비합니다.

```js
import { Suspense } from "react";
import Loading from "./components/loading";
import { ServerComponent } from "./components/ServerComponent";

export default async function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <Suspense fallback={<Loading />}>
        <ServerComponent />
      </Suspense>
    </div>
  );
}
```

이를 화면에 표시하면, 다음과 같이 됩니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEhovYq2njvqgjdoT3NEcnvVfPjfNgJp5R2j_McFe8eHuup0lLcUs4uj0UnsMoDkz-m-ucpBMYBXVNXdS6bqv352qZRYlEJamXPhgcGd_WMStKPQXxRYaMYa5_EVlGbLBJzpG57Fv9Ibs3Ed0_kE2I4OxiDbDAGMMwhothltuUngKY9qJVk1aiu_WaJHfNA)

useState를 사용하지 않고 '로딩 중'을 표현할 수 있다는 것을 알 수 있습니다.

또한, React Server Components에서는 Async/await(비동기 함수)를 사용할 수 있습니다.

이러한 특성을 가진 Suspense와 React Server Components를 사용함으로써, SSR을 사용하는 서버 측에서도 (getSSP를 사용하지 않는) 컴포넌트 단위의 비동기적인 데이터 가져오기가 가능해졌습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEglcjl2wUPNrwQ8CMmLFDrFMaTQviqVweAfU-0XKnUwhbump0L-mzSzUhhmJ7AjzZrqaMy8YSrtwjAVyDPOyacve2fhnB6KP4ajdJmEKQDOiuzHMx4M8fLj_b_ICMLPmv4z3uxXZxD7kaY8BEvauBSo5qluHstL4CILiHr4GOo9xBNwL9pN0M336o15vxY)

이를 통해, 완전히 데이터를 가져오기 전에 사용자는 화면을 볼 수 있습니다.

기존의 SSR보다 표시 속도를 빠르게 할 수 있을 것입니다.

SSR로 데이터 가져오기를 하는 경우, RSC를 사용하여 서버 컴포넌트 내에서 Suspense를 사용하여 로딩 중을 표시하면서 데이터를 가져오는 것이 현재의 정석이라고 할 수 있습니다.

---

## 11. <a name='RSCAppRouter'></a>실제로 RSC와 App Router를 사용해보기

실제로 앱을 실행하면서 확인해 보겠습니다.

먼저, 임의의 디렉토리에서 다음 명령을 실행하여 Next.js를 설치합니다.

```bash
npx create-next-app@latest .
```

※ 질문이 나오면 모두 Enter를 눌러주세요. Pages Router가 아닌, App Router를 선택해주세요.

먼저, 간단한 서버 컴포넌트와 클라이언트 컴포넌트를 만들어 보겠습니다.

다음 파일을 각각 만들어 주세요.

app/page.tsx

```jsx
import { ClientComponent } from "./components/ClientComponent";
import { ServerComponent } from "./components/ServerComponent";

export default async function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <ClientComponent />
      <ServerComponent />
    </div>
  );
}
```

app/components/ServerComponent.tsx

```jsx
export async function ServerComponent() {
  const boxStyle = {
    width: "400px",
    height: "300px",
    backgroundColor: "#006400",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = { color: "white", footSize: "larger", fontWeight: "bold" };

  console.log("Server Component를 실행하고 있습니다");

  return (
    <div style={boxStyle}>
      <p style={textStyle}>Server Component</p>
    </div>
  );
}
```

app/components/ClientComponent.tsx

```jsx
"use client";

export function ClientComponent() {
  const boxStyle = {
    width: "400px",
    height: "300px",
    backgroundColor: "#ffff00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = { footSize: "larger", fontWeight: "bold", color: "black" };

  console.log("Client Component를 실행하고 있습니다");

  return (
    <div style={boxStyle}>
      <p style={textStyle}>Client Component</p>
    </div>
  );
}
```

App Router에서는, 모든 컴포넌트는 기본적으로 서버 컴포넌트가 됩니다.

클라이언트 컴포넌트로 만들려면, 페이지의 맨 처음에 'use client;'를 작성해야 합니다.

여기에서는, 서버 컴포넌트와 클라이언트 컴포넌트를 각각 만들고, 루트 컴포넌트(page.tsx)에서 둘 다 불러왔습니다.

이제, 'npm run dev'로 애플리케이션을 실행합니다.

'localhost:3000'에 접속하면, 다음과 같은 화면이 표시될 것입니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEjaWQteOSaIuuFeUhNFClreKkiWEr8J6mKrOPbTTiFquJXO3mX764_-2hyu_6OgG-H-mwjEmHZE38Ft-bGUuFl3huTU1UdbrLmpn7trldkBHNc6Ud7PbgIsA2h0Kv-l11ninKnTMABE_ceTfoInQX0v9NVfhYbr_90VNwMYyCJisWbA2kVB1PQtMGb1vxY)

먼저, 개발자 도구의 콘솔을 엽니다.

그러면, 클라이언트 측에서 클라이언트 컴포넌트만이 실행(렌더링)되고 있음을 알 수 있습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEhex_uBgSP3DIOnXFX9DftddhBthB0RNVLUaqyCEJHuqEXJcQZZ92bdMKDAKtxfDDA22x-rTen7muf6hkv4iQeI0XSnSkmbQhGHoZBeiBks1X8myrsUAviw4Ht1--GeAyXvVPH-zahZrCWcqVJQRkC1UdLFKjXGzGtjIArAUx7m3zO69pZXhXLE-aBBaNE)

또한, Network 탭을 보면, page.js는 52.4kB임을 알 수 있습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEhbusLo-G16TEWCZMvhuDW3KJh4k8Bt7wUxYCS4jPRcU5A2Y944lzXr7obM2F20JlA5iA9jyKmY5oKiL1DKXib4tIyJTZ2dCJOtkgMQnnZ5vf8Z-_TH6SrDGK3wrteuoqdzw7tPnFiEF1_VsgM-rxTstEe2ukAQfRiFnxxmMY1F3qBTLL9GDHKO-fHWii8)

테스트를 위해 조금 무리한 걸 해보겠습니다.

이제 모든 컴포넌트에 'use client;'를 추가합시다.

app/page.tsx

```jsx
"use client";

import { ClientComponent } from "./components/ClientComponent";
import { ServerComponent } from "./components/ServerComponent";

export default async function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <ClientComponent />
      <ServerComponent />
    </div>
  );
}
```

app/components/ServerComponent.tsx

```jsx
"use client";

export async function ServerComponent() {
  const boxStyle = {
    width: "400px",
    height: "300px",
    backgroundColor: "#006400",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = { color: "white", footSize: "larger", fontWeight: "bold" };

  console.log("Server Component를 실행하고 있습니다");

  return (
    <div style={boxStyle}>
      <p style={textStyle}>Server Component</p>
    </div>
  );
}
```

app/components/ClientComponent.tsx

```jsx
"use client";

export function ClientComponent() {
  const boxStyle = {
    width: "400px",
    height: "300px",
    backgroundColor: "#ffff00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = { footSize: "larger", fontWeight: "bold", color: "black" };

  console.log("Client Component를 실행하고 있습니다");

  return (
    <div style={boxStyle}>
      <p style={textStyle}>Client Component</p>
    </div>
  );
}
```

이 상태에서 새로고침 해봅니다.

그러면, ServerComponent도 클라이언트 측에서 표시되고 있음을 알 수 있습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEi3PHHYqT4aWYnZZ0A87XfFHN1ktD34AKDNaxqmtOF58XAtZkSUhI1DOPcV8hsef3vCb9w_R9Us-TCXIvo481PPgUG7KrFW5AZfSCdJjG9M6Kh_q4jrZiSCSnIK92lb1xNQuje_hzCo1Ws0WLSO-Un9xIPGwND0LZDQK-N5_NnrmXlUEu0uG8Dl5qXt7uY)

그리고, 네트워크 탭을 보면, page.js의 크기가 53.8kB임을 알 수 있습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEhr2ATLJyN_o4JADbu9049uS4P_sDCL4hdC4dSgePXLIFuRAGP9OKbanzB6BXmktIysik1r1QpGLevVsYlTXBKcDf115yoruP5UB32FwmM66JziYWWYZOLpoJacNFFjX-AlempuBUkPuKA87WEeXZ8-aHS8MpkRtzyCEWzh-qlRqn6PGpkn9-H4DSUKQzg)

ServerComponent를 클라이언트 컴포넌트로 만든 만큼, 크기가 증가한 것을 알 수 있습니다.

이번에는 반대로, 모든 컴포넌트에서 'use client;'를 제거합니다.

app/page.tsx

```jsx
import { ClientComponent } from "./components/ClientComponent";
import { ServerComponent } from "./components/ServerComponent";

export default async function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <ClientComponent />
      <ServerComponent />
    </div>
  );
}
```

app/components/ServerComponent.tsx

```jsx
export async function ServerComponent() {
  const boxStyle = {
    width: "400px",
    height: "300px",
    backgroundColor: "#006400",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = { color: "white", footSize: "larger", fontWeight: "bold" };

  console.log("Server Component를 실행하고 있습니다");

  return (
    <div style={boxStyle}>
      <p style={textStyle}>Server Component</p>
    </div>
  );
}
```

app/components/ClientComponent.tsx

```jsx
export function ClientComponent() {
  const boxStyle = {
    width: "400px",
    height: "300px",
    backgroundColor: "#ffff00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = { footSize: "larger", fontWeight: "bold", color: "black" };

  console.log("Client Component를 실행하고 있습니다");

  return (
    <div style={boxStyle}>
      <p style={textStyle}>Client Component</p>
    </div>
  );
}
```

'use client;'를 제거하여 서버 컴포넌트로 변경했습니다.

새로고침 해보십시요.

콘솔에는 아무것도 표시되지 않습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEgnX9DC64z30z1sOWHnCWjWY9p-ZnKiFbMhgQIm3SFA2s2LdYxj8j15KhLm9fauQVXmR0ehvNTDW1Gh0KnU2ms9fS52J3FBQKnKru0XcNczUoqwfgftJJ_eWVwjvK8jbghOn9Mrk4ftq7e6JMMO7D76dQ3b0Ro48k-tcMhktQM1URtKJOMwt2n2A5xbhlA)

그리고, 네트워크 탭을 보면, page.js가 사라진 것을 알 수 있습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEh0Ro9A9HgjFAFaoc2wfZlPxgZ9TNTzrMvkuBjJGhgBEEiM0rdIlymmoLihFP2g78SBSECbBeHWGwkw_Yg9LhSiQcIWwAXfn-5ZCxITJ06-j-BzIUMf6uhvBK4be1OtKUZtyR7RQmLeusN_g_VhfhKFjBG4_Lj-VOQzoi1ansM-LJZAqd6dQ7a0vWUUi5g)

컴포넌트의 모든 렌더링이 서버 측에서 이루어졌음을 나타냅니다.

다음으로, Suspense를 사용하여 서버 컴포넌트에서 비동기적으로 데이터를 가져오는 것을 시뮬레이션해 보겠습니다.

각각 다음과 같이 변경해 주세요.

app/page.tsx

```jsx
import { Suspense } from "react";
import { ClientComponent } from "./components/ClientComponent";
import Loading from "./components/loading";
import { ServerComponent } from "./components/ServerComponent";

export default async function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <ClientComponent />
      <Suspense fallback={<Loading />}>
        <ServerComponent />
      </Suspense>
    </div>
  );
}
```

app/components/ServerComponent.tsx

```jsx
const sleep = async (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

export async function ServerComponent() {
  console.log("ServerComponent를 실행하고 있습니다(sleep 전)");

  await sleep(3000);

  const boxStyle = {
    width: "400px",
    height: "300px",
    backgroundColor: "#006400",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = { color: "white", footSize: "larger", fontWeight: "bold" };

  console.log("Server Component를 실행하고 있습니다(sleep 후)");

  return (
    <div style={boxStyle}>
      <p style={textStyle}>Server Component</p>
    </div>
  );
}
```

app/components/ClientComponent.tsx

```jsx
"use client";

export function ClientComponent() {
  const boxStyle = {
    width: "400px",
    height: "300px",
    backgroundColor: "#ffff00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = { footSize: "larger", fontWeight: "bold", color: "black" };

  console.log("Client Component를 실행하고 있습니다");

  return (
    <div style={boxStyle}>
      <p style={textStyle}>Client Component</p>
    </div>
  );
}
```

또한, 다음의 loading.tsx도 추가합니다.

app/components/loading.tsx

```jsx
export default function Loading() {
  const boxStyle = {
    width: "400px",
    height: "300px",
    backgroundColor: "#CACACA",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = { color: "black", fontSize: "larger", fontWeight: "bold" };

  return (
    <div style={boxStyle}>
      <p style={textStyle}>...Loading</p>
    </div>
  );
}
```

이제 새로 고침하면 다음과 같이 됩니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEiZ1fOAhPEl23GxdZCB2nVyX_uYjWFZ7X9r_cCg2mOU-5JLeWUJzTrcvjaG6E3Wc1LH_DEVYawG1sEayfF3Vtzig3w3Kxq-WJ7if11ZX27ALJlLOGBMNC1ObubKLJ34znULH4x0J1Mg9-JBcvBI-f9s1-Sk54SOgbPAjnnjGWyFoB3q9tuom0x9KZYv71M)

서버 측에서 비동기적으로 데이터를 가져온 후에 화면 표시를 하고 있음을 알 수 있습니다.

---

## 12. <a name='3'></a>요약

마지막으로 지금까지의 내용을 정리해 보겠습니다.

- React는 UI를 쉽게 구축하기 위한 JavaScript 라이브러리입니다.
- Next.js는 React의 프레임워크입니다.
- React는 다음의 흐름으로 렌더링(CSR)을 수행합니다.
  - 렌더링의 트리거를 감지합니다.
  - 브라우저가 렌더링할 내용을 결정합니다.
  - 변경 사항을 DOM에 적용합니다.
- Next.js에는 다음의 두 가지 모드(라우팅 방식)가 있습니다.
  - Pages Router
  - App Router
- Next.js의 Pages Router에서는 다음의 4가지 렌더링 방식을 선택할 수 있습니다.
  - SSR
  - SSG
  - ISR
  - CSR
- React Server Components는 컴포넌트를 '서버 측에서 렌더링되는 컴포넌트'와 '클라이언트 측에서 렌더링되는 컴포넌트'로 나누는 기술입니다.
- Next.js의 App Router에서는, 기본적으로 생성한 컴포넌트가 서버 컴포넌트가 됩니다.
- 클라이언트 컴포넌트로 만들려면 'use client;'를 작성해야 합니다.
- RSC와 SSR을 결합하면, 초기 표시를 빠르게 하면서, 클라이언트 측에 전송하는 JavaScript의 양을 줄일 수 있습니다.
- Suspense는 useState에 의존하지 않고 '로딩 중'을 표현할 수 있는 기능입니다.
- Suspense와 React Server Components를 사용하면, SSR을 사용하는 서버 측에서도 컴포넌트 단위의 비동기적인 데이터 획득이 가능해집니다.

---

이 글이 React Server Components와 App Router를 공부하는 데, 조금이라도 도움이 되었다면 기쁠 것입니다.

읽어 주셔서 감사합니다.

그럼.
