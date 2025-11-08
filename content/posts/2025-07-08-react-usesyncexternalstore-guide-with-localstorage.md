---
title: React 18의 숨겨진 보석, useSyncExternalStore 완벽 가이드 (feat. LocalStorage)
date: 2025-07-08T11:51:11.079Z
draft: false
tags: ["hello", "useSyncExternalStore", "React 18", "상태 관리", "state management", "LocalStorage", "상태 동기화", "React 훅"]
description: React의 상태 찢어짐(tearing) 문제는 무엇이며, React 18의 useSyncExternalStore 훅이 이 문제를 어떻게 해결하는지 알아봅니다. LocalStorage와 연동하여 여러 브라우저 탭 간에 상태를 동기화하는 실용적인 예제를 통해 완벽하게 마스터해 보세요.
---

![](https://blogger.googleusercontent.com/img/a/AVvXsEgr_P_vbKgrljls-Gm7_Q94A5hP7OGGDjiZ4NqZq0cUJXCAeOxSriFZ63Fo7ho_lEsmt12FiMbXbcDJham42JrUyfgIZh1Wjqm5xJzzk3myWV9Lzbqupz9NkwIb9NtsomHN7FiIGPDnwgrqDWOtBu86bPddi0h14xq8FI5lK3012XK6vxkGx3yQWs2xW7w=s16000)

React 애플리케이션을 개발하다 보면, 애플리케이션 상태를 외부 데이터 소스와 동기화해야 할 필요가 종종 생깁니다.

특히 사용자의 테마 설정이나 장바구니 정보처럼, 브라우저 세션 간에 유지되어야 하는 데이터를 'LocalStorage'에 저장하는 경우가 대표적이죠.

React 18부터는 이러한 동기화를 원활하게 처리하기 위해 `useSyncExternalStore`라는 새로운 훅이 도입되었습니다.

오늘은 이 강력한 훅을 사용하는 구체적인 예제를 통해 그 사용법을 깊이 있게 알아보겠습니다.

## 왜 `useSyncExternalStore`를 사용해야 할까요?

이 훅의 이름을 직역하면 '외부 저장소의 상태를 동기화하는 데 사용한다'는 의미입니다.

여기서 '외부 저장소'란 React의 상태 관리 시스템 바깥에 있는 모든 데이터 소스를 의미합니다.

예를 들어, `localStorage`, `sessionStorage`, 브라우저의 `window.matchMedia` API, 심지어 Redux나 Zustand 같은 서드파티 상태 관리 라이브러리의 스토어까지 모두 해당됩니다.

### 과거의 문제점: '상태 찢어짐(State Tearing)'

React 18 이전에는 `useState`와 `useEffect`를 조합하여 외부 저장소를 구독하는 방식을 주로 사용했습니다.

하지만 이 방식은 React 18의 '동시성 렌더링(Concurrent Rendering)' 환경에서 치명적인 문제를 일으킬 수 있었습니다.

바로 '상태 찢어짐(tearing)' 현상입니다.

동시성 렌더링 환경에서 React는 렌더링을 잠시 멈추거나, 다른 렌더링을 먼저 처리할 수 있습니다.

이때 외부 저장소의 값이 변경되면, 화면의 일부 컴포넌트는 변경 전의 옛날 값을 보여주고, 다른 일부는 변경 후의 새로운 값을 보여주는 '불일치' 상태가 발생할 수 있습니다.

UI가 찢어진 것처럼 보이는 이 현상이 바로 '상태 찢어짐'입니다.

`useSyncExternalStore`는 바로 이 문제를 해결하기 위해 탄생했습니다.

이 훅은 React의 렌더링 과정과 외부 데이터 소스의 동기화를 보장하여, 동시성 환경에서도 항상 일관된 상태를 유지하도록 만듭니다.

## `useSyncExternalStore`의 세 가지 핵심 인자

이 훅은 세 개의 인자를 받습니다.

`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`

1.  `subscribe`: 외부 저장소의 '변화를 감지'하는 방법을 알려주는 함수입니다.
    이 함수는 콜백 함수를 인자로 받아, 저장소에 변화가 생겼을 때 그 콜백을 호출하도록 구독(subscribe) 로직을 구현해야 합니다.
    또한, 구독을 해지하는 함수를 반환해야 합니다.
2.  `getSnapshot`: 외부 저장소의 '현재 값'을 가져오는 방법을 알려주는 함수입니다.
    이 함수는 저장소 데이터의 스냅샷을 반환해야 합니다.
3.  `getServerSnapshot` (선택 사항): 서버 사이드 렌더링(SSR) 시에 사용할 초기 스냅샷을 제공하는 함수입니다.
    클라이언트와 서버의 초기 HTML이 일치하도록 보장하는 역할을 합니다.

## 구체적인 예제: LocalStorage와 테마 동기화하기

이제 사용자가 라이트/다크 테마를 선택하고, 그 선택이 여러 브라우저 탭에 걸쳐 동기화되는 예제를 만들어 보겠습니다.

### 1단계: 커스텀 훅 `useThemeStore` 만들기

가장 먼저 `localStorage`의 변화를 감지하고 상태를 업데이트하는 로직을 담은 커스텀 훅을 만듭니다.

```typescript
// useThemeStore.ts
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "app-theme";

// "getSnapshot" 역할을 하는 함수: 현재 localStorage의 값을 읽어옵니다.
const getThemeFromLocalStorage = (): Theme => {
  return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || "light";
};

// "subscribe" 역할을 하는 함수: localStorage의 'storage' 이벤트를 구독합니다.
const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("storage", callback);
  // 구독 해지 함수를 반환합니다.
  return () => {
    window.removeEventListener("storage", callback);
  };
};

// 우리의 최종 커스텀 훅
const useThemeStore = (): [Theme, (newTheme: Theme) => void] => {
  // useSyncExternalStore에 구독 함수와 스냅샷 함수를 전달합니다.
  const theme = useSyncExternalStore(subscribe, getThemeFromLocalStorage);

  const setTheme = (newTheme: Theme) => {
    // 1. localStorage에 새로운 테마 값을 저장합니다.
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    // 2. 'storage' 이벤트를 수동으로 발생시킵니다.
    window.dispatchEvent(new Event("storage"));
  };

  return [theme, setTheme];
};

export default useThemeStore;
```



여기서 가장 중요한 부분들을 자세히 살펴보겠습니다.

- `getThemeFromLocalStorage` 함수는 `useSyncExternalStore`의 두 번째 인자인 `getSnapshot`의 역할을 합니다.
  언제나 `localStorage`에서 최신 값을 읽어오죠.
- `subscribe` 함수는 `useSyncExternalStore`의 첫 번째 인자입니다.
  브라우저의 `storage` 이벤트는 다른 탭이나 창에서 `localStorage`가 변경되었을 때 발생합니다.
  이 이벤트를 구독함으로써 다른 탭의 변경 사항을 감지할 수 있습니다.
- `setTheme` 함수 안의 `window.dispatchEvent(new Event("storage"))`는 이 솔루션의 '핵심 트릭'입니다.
  `storage` 이벤트는 기본적으로 '다른' 탭에서의 변경만 감지합니다.
  따라서 현재 탭에서 `setTheme`을 호출했을 때도 상태가 즉시 업데이트되게 하려면, 이벤트를 수동으로 발생시켜 `subscribe`의 콜백 함수가 실행되도록 만들어야 합니다.

### 2단계: 애플리케이션에 훅 적용하기

이제 우리가 만든 `useThemeStore` 훅을 사용하여 애플리케이션을 구성해 보겠습니다.

이 훅 덕분에 각 컴포넌트는 `localStorage` 동기화의 복잡한 내부 로직을 전혀 알 필요 없이, 마치 일반적인 `useState`처럼 상태를 사용할 수 있습니다.

```typescript
// App.tsx
import React from "react";
import Header from "./Header";
import ThemeToggler from "./ThemeToggler";
import Footer from "./Footer";
import useThemeStore from "./useThemeStore";
import styled from "styled-components";

const AppContainer = styled.div<{ themeType: "light" | "dark" }>`
  min-height: 100vh;
  background-color: ${({ themeType }) =>
    themeType === "light" ? "#ffffff" : "#333333"};
  color: ${({ themeType }) => (themeType === "light" ? "#000000" : "#ffffff")};
  // ... 기타 스타일
`;

const App: React.FC = () => {
  const [theme] = useThemeStore();

  return (
    <AppContainer themeType={theme}>
      <Header />
      <ThemeToggler />
      <Footer />
    </AppContainer>
  );
};

export default App;
```



```typescript
// ThemeToggler.tsx
import React from "react";
import useThemeStore from "./useThemeStore";

const ThemeToggler: React.FC = () => {
  const [theme, setTheme] = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Theme
    </button>
  );
};

export default ThemeToggler;
```



이제 애플리케이션을 두 개의 브라우저 탭에서 열어 보세요.

한쪽 탭에서 테마 변경 버튼을 누르면, 다른 쪽 탭의 테마도 즉시 함께 변경되는 마법 같은 경험을 할 수 있습니다.

## `useSyncExternalStore`의 다른 활용 사례

이 훅의 활용 가능성은 무궁무진합니다.

- '로그인 상태 동기화': 한 탭에서 사용자가 로그아웃하면, 다른 모든 탭에서도 자동으로 로그아웃 상태가 반영되도록 할 수 있습니다.
- '장바구니 동기화': 이커머스 사이트에서 한 탭에 상품을 담으면, 다른 탭의 장바구니 아이콘에도 즉시 상품 개수가 업데이트됩니다.
- '실시간 데이터 동기화': WebSocket을 통해 들어오는 실시간 데이터를 모든 컴포넌트에서 일관되게 보여줄 수 있습니다.
- '전역 알림 관리': 애플리케이션 전체에 걸쳐 표시되는 알림 상태를 동기화할 수 있습니다.

## 결론

`useSyncExternalStore`는 React 애플리케이션의 상태를 `localStorage`와 같은 외부 데이터 소스와 동기화하기 위한 강력하고 공식적인 도구입니다.

이 훅을 사용하면 '상태 찢어짐'과 같은 복잡한 동시성 문제를 피하면서, 여러 컴포넌트나 여러 브라우저 인스턴스에 걸쳐 공유되는 데이터를 안전하고 일관되게 처리할 수 있습니다.

이제 외부 상태와 React를 동기화해야 할 때, 더 이상 복잡한 `useEffect` 로직으로 고민하지 마세요.

`useSyncExternalStore`가 여러분에게 우아하고 안정적인 해결책을 제공할 것입니다.
