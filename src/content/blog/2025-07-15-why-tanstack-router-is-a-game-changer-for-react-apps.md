---
title: 왜 TanStack Router는 리액트 개발의 판도를 바꾸는가?
pubDatetime: 2025-07-16T21:59:21+09:00
postSlug: 2025-07-15-why-tanstack-router-is-a-game-changer-for-react-apps
featured: false
draft: false
tags:
  - TanStack Router
  - 리액트
  - 타입스크립트
  - 라우터
  - 타입 안정성
  - React
  - TypeScript
  - Router
  - Type-Safety
  - TanStack Query
  - 상태 관리
  - 파일 기반 라우팅
  - DX
  - 개발자 경험
description: 기존 리액트 라우터의 한계를 넘어, 완전한 타입 안정성과 뛰어난 개발 경험(DX)을 제공하는 TanStack Router의 핵심 기능들을 깊이 있게 분석합니다. 이 글을 통해 왜 TanStack Router가 차세대 웹 애플리케이션의 필수 선택지가 되어가고 있는지 확인하세요.
---

웹 애플리케이션을 구축할 때 '라우터'를 선택하는 것은 가장 중요한 아키텍처 결정 중 하나입니다.

라우터는 단순히 `node_modules`에 있는 또 하나의 의존성이 아닙니다.

애플리케이션 전체를 하나로 묶어주는 뼈대와도 같습니다.

사용자가 페이지를 오갈 때 훌륭한 경험을 제공해야 함은 물론, 개발자가 수많은 라우트를 추가하면서도 제정신을 유지할 수 있도록 멋진 개발 경험(DX)을 제공해야 이상적이죠.

기존 라우터들은 저마다 장점이 있었지만, '모든 것을 가질 수 있다'는 느낌을 주지는 못했습니다.

타입 안정성이 아쉽거나, URL 상태 관리가 번거롭거나, 불필요한 리렌더링으로 성능 저하를 감수해야 하는 경우가 많았죠.

하지만 최근 v1을 출시한 **TanStack Router**는 이 모든 고민을 해결할 완벽한 대안으로 떠올랐습니다.

이 글에서는 TanStack Router가 다른 라우터들과 차별화되는 핵심적인 기능들을 깊이 있게 파헤쳐 보고, 왜 이것이 당신의 다음 프로젝트의 '게임 체인저'가 될 수밖에 없는지 보여드리겠습니다.

### 1. 지긋지긋한 `any`와의 작별: 압도적인 타입 안정성

기존 라우터들의 타입 지원은 마치 나중에 덧붙인 것처럼 어설픈 경우가 많았습니다.

- `useParams` 훅은 `Record<string, string | undefined>`를 반환하며 "나머지는 알아서 하세요"라고 말하는 듯합니다.
- `<Link>` 컴포넌트는 `to` 프롭으로 어떤 `string`이든 받습니다. `/issues/${issueId}` 같은 URL이 유효한지, `issueId`가 제대로 전달되었는지는 오롯이 개발자의 책임이었습니다.

이는 TypeScript가 대중화되기 전, 순수 JavaScript 시절의 유산처럼 느껴집니다.

하지만 **TanStack Router는 태생부터 TypeScript와 함께하기 위해 설계되었습니다.**

모든 기능이 완벽하게 추론되는 타입 안정성을 염두에 두고 만들어졌죠.

**- 똑똑해진 `useParams`**

TanStack Router의 `useParams`는 현재 어떤 라우트에 있는지 명확하게 알려줘야 합니다.

```tsx
// 1. 가장 이상적인 사용법: 'from'으로 출처 명시
const { issueId } = useParams({ from: "/issues/$issueId" });
//      ^? 타입: const issueId: string
```

`from`에 전달하는 경로는 모든 라우트의 유니온 타입으로 자동 완성되기 때문에 잘못 쓸 염려가 없습니다.

`issueId`는 `string` 타입으로 완벽하게 추론되며, 만약 다른 라우트에서 이 컴포넌트를 잘못 사용하면 런타임 에러가 발생하여 실수를 즉시 바로잡을 수 있습니다.

재사용 가능한 컴포넌트를 만들고 싶다면 `strict: false` 옵션을 주면 됩니다.

```tsx
// 2. 재사용 컴포넌트를 위한 방법: 'strict: false'
const params = useParams({ strict: false });
//    ^? 타입: const params: {
//           issueId: string | undefined,
//           dashboardId: number | undefined
//       }
```

이 방식은 런타임 에러를 발생시키지 않으면서, 라우터가 아는 모든 경로 파라미터의 유니온 타입을 반환합니다.

`issueId`나 `dashboardId`가 존재할 수도, 아닐 수도 있다는 사실을 타입으로 명확히 알려줍니다.

이보다 더 안전할 수 있을까요?

**- 실수를 허용하지 않는 `<Link>` 컴포넌트**

`<Link>` 컴포넌트 역시 마찬가지입니다.

라우터가 모든 경로를 알고 있기 때문에, `to`와 `params`를 잘못 전달하면 즉시 타입 에러를 띄워줍니다.

```tsx
<Link to="/issues/$issueId" params={{ issueId: "TSR-25" }}>
  Go to details
</Link>
```

위 코드에서 `issueId`를 빼먹거나, 다른 이름의 `id`를 전달하거나, `string`이 아닌 값을 주거나, 존재하지 않는 URL로 이동하려고 하면 TypeScript가 즉시 당신을 막아줄 것입니다.

### 2. URL 검색 파라미터, 이제는 검증의 시대

URL의 검색 파라미터(`?page=1&filter=open`)는 사용자가 직접 수정할 수 있기 때문에 신뢰할 수 없는 값으로 취급해야 합니다.

그래서 항상 유효성 검사가 필요했죠.

그런데, "라우터가 검색 파라미터를 검증해주면 안 되나?"라는 합리적인 의문이 듭니다.

**TanStack Router는 바로 그 일을 합니다.**

라우트 정의에서 직접 검색 파라미터의 유효성을 검사할 수 있습니다.

```tsx
// routes/issues.tsx

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod"; // Zod나 ArkType, Valibot 등 사용 가능

// 1. 검색 파라미터 스키마 정의
const issuesSearchSchema = z.object({
  page: z.number().min(1).default(1),
  filter: z.string().optional().default(""),
});

// 2. 라우트 정의 시 스키마를 이용해 유효성 검사
export const Route = createFileRoute("/issues")({
  validateSearch: issuesSearchSchema,
});
```

이제 `useSearch({ from: '/issues' })`를 호출하면, 반환되는 값은 완벽하게 검증되고 타입이 지정된 객체입니다.

`page`는 기본값이 1인 숫자, `filter`는 기본값이 빈 문자열인 선택적 문자열이 되죠.

라우터가 파싱과 직렬화까지 알아서 처리해주니 개발자는 비즈니스 로직에만 집중할 수 있습니다.

### 3. 불필요한 리렌더링을 막는 정밀한 상태 구독 (Selectors)

기존 라우터에서는 URL이 조금만 바뀌어도 해당 URL을 구독하는 모든 컴포넌트가 리렌더링되는 문제가 있었습니다.

예를 들어, 테이블 필터 값이 URL에 저장된 페이지에서 특정 행을 클릭해 다이얼로그(서브 라우트)를 열면, URL이 바뀌면서 거대한 테이블 컴포넌트까지 불필요하게 리렌더링되는 것이죠.

이는 마치 Redux나 Zustand 같은 상태 관리 라이브러리가 필요한 이유와 같습니다.

거대한 상태의 일부만 구독하여, 내가 관심 있는 값이 바뀔 때만 리렌더링하는 것이죠.

TanStack Router는 바로 이 '셀렉터(selector)' 기능을 내장하고 있습니다.

```tsx
const page = useSearch({
  from: "/issues",
  select: search => search.page, // 전체 search 객체가 아닌 'page'만 구독
});
```

`select` 옵션을 사용하면 `search` 객체 전체가 아닌 `search.page` 값의 변경에만 반응하여 컴포넌트가 리렌더링됩니다.

이는 `useParams`, `useLoaderData` 등 다양한 훅에서 지원되며, 복잡한 페이지에서 극적인 성능 최적화를 이끌어냅니다.

### 4. 라우팅 패러다임의 진화: 파일 기반 라우팅

- **1세대 (선언적 라우팅):** `<Route>` 컴포넌트를 JSX 안에 흩뿌려 놓는 방식은 유지보수의 악몽이었습니다. 특정 URL이 어떤 컴포넌트 트리 깊숙한 곳에서 정의되었는지 찾기 어려웠죠.
- **2세대 (코드 기반 라우팅):** 모든 라우트 정의를 하나의 설정 객체로 모으는 방식은 타입 안정성을 확보하는 데 큰 도움이 되었습니다.
- **3세대 (파일 기반 라우팅):** TanStack Router는 여기서 한 걸음 더 나아갑니다. 라우트 설정을 파일 시스템 구조로 옮겨버리는 것이죠.

`src/routes/issues/$issueId.tsx` 라는 파일 구조는 그 자체로 `issues/:issueId` 경로를 의미합니다.

이는 버그 리포트에서 본 URL을 코드와 즉시 매핑할 수 있는 가장 빠른 방법이며, 라우트 기반 코드 분할(Code Splitting)을 자동으로 구현하는 최고의 방법이기도 합니다.

물론, 원한다면 전통적인 코드 기반 라우팅도 완벽하게 지원합니다.

### 5. 데이터 로딩과의 완벽한 통합 (feat. Suspense)

TanStack Router는 React Suspense 및 ErrorBoundary와 완벽하게 통합됩니다.

모든 라우트는 기본적으로 `<Suspense>`와 `<ErrorBoundary>`로 감싸져 있죠.

여기에 TanStack Query를 결합하면 놀라운 시너지가 발생합니다.

```tsx
// routes/issues/$issueId.tsx

export const Route = createFileRoute("/issues/$issueId")({
  // 컴포넌트가 렌더링되기 전에 데이터를 미리 가져옴
  loader: ({ context: { queryClient }, params: { issueId } }) => {
    queryClient.prefetchQuery(issueQueryOptions(issueId));
  },
  component: IssueComponent,
});

function IssueComponent() {
  const { issueId } = Route.useParams();
  // useSuspenseQuery를 사용하면 데이터가 항상 존재함을 보장받음
  const { data } = useSuspenseQuery(issueQueryOptions(issueId));
  //      ^? 타입: const data: Issue (undefined가 아님!)

  // 이제 로딩, 에러 상태 처리 없이 'happy path' 렌더링에만 집중!
  return <div>{data.title}</div>;
}
```

`loader`에서 데이터를 미리 가져오고, 컴포넌트에서는 `useSuspenseQuery`를 사용해 데이터가 보장된 상태로 렌더링에만 집중할 수 있습니다.

로딩과 에러 상태는 라우터가 상위 경계(Boundary)에서 알아서 처리해줍니다.

### 결론: 한번 빠지면 헤어나올 수 없는 매력

TanStack Router를 한번 경험하고 나면, 다른 라우팅 솔루션으로 돌아가기 어려워집니다.

그만큼 압도적인 타입 안정성과 개발자 경험에 중독되기 때문입니다.

이 글에서는 라우트 컨텍스트, 중첩 라우트, SSR 프레임워크인 TanStack Start 등 더 많은 기능을 다루지 못했지만, 오늘 소개한 핵심 기능들만으로도 TanStack Router가 얼마나 강력한 도구인지 충분히 느끼셨을 겁니다.

TanStack Router는 단순한 라이브러리를 넘어, 우리가 웹 애플리케이션을 생각하고 구축하는 방식을 바꾸고 있습니다.

그들이 보여준 디테일, DX, 타입 안정성에 대한 집념은 모든 개발자에게 큰 영감을 줍니다.

당신의 생산성을 한 단계 끌어올리고 싶다면, 다음 프로젝트에서는 망설이지 말고 TanStack Router를 선택하세요.

---
