---
title: React useReducer 완전 정복 - useState의 한계를 넘어 구조적인 상태 관리하기
pubDatetime: 2025-07-13T10:48:08+09:00
postSlug: 2025-07-13-mastering-react-usereducer-for-structured-state-management
featured: false
draft: false
tags:
  - React
  - useReducer
  - useState
  - 상태 관리
  - 리액트 훅
  - 상태 기계
  - 리팩터링
description: useState만으로 상태 관리가 힘들어질 때, useReducer가 어떻게 구원투수가 되는지 알아봅니다. 쇼핑 카트 예제를 통해 상태 로직을 중앙에서 관리하고, 예측 가능하며 테스트하기 쉬운 코드를 작성하는 방법을 깊이 있게 탐구합니다.
---

우리는 React의 내부 메커니즘, 모범 사례, 디자인 패턴, 그리고 고급 개념들을 탐구합니다.<br /><br />
이 글들은 기본을 넘어 React가 내부적으로 어떻게 작동하는지 진정으로 이해하고자 하는 React 개발자들을 위해 작성되었습니다.<br /><br />

## 서론: 상태 관리가 복잡해질 때<br />

상태 관리는 React 애플리케이션 개발의 근본적인 측면 중 하나입니다.<br /><br />
지난 시리즈 글에서 우리는 함수형 컴포넌트에서 지역 상태를 관리하는 가장 기본적인 방법인 `useState` 훅을 탐구했습니다.<br /><br />
하지만 컴포넌트가 복잡해지고 상태 로직이 정교해지면서, `useState`는 금세 그 한계를 드러내기 시작합니다.<br /><br />
바로 이 지점에서 `useReducer` 훅이 등장합니다.<br /><br />
이 훅은 복잡한 상태를 관리하기 위한 더 구조적인 접근 방식을 제공하며, 특히 상태 업데이트가 이전 상태에 의존하거나 상태의 다른 부분들이 서로 상호 의존적일 때 강력한 힘을 발휘합니다.<br /><br />
Redux 패턴에서 영감을 받은 `useReducer`는 비즈니스 로직이 더 엄격한 구성을 요구하는 시나리오에서 `useState`의 강력한 대안이 됩니다.<br /><br />

## `useState`의 한계: 쇼핑 카트 예제<br />

`useReducer`의 가치를 이해하기 위해, 먼저 `useState`의 한계를 구체적인 예제, 즉 이커머스 쇼핑 카트를 관리하는 경우를 통해 살펴보겠습니다.<br /><br />
만약 `useState`만으로 쇼핑 카트를 구현한다면, 코드는 대략 이런 모습일 것입니다.<br /><br />

```jsx
function ShoppingCartWithUseState() {
  // 여러 상태들이 흩어져 있습니다.
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  // ...

  // 아이템을 추가하는 함수
  const addItem = product => {
    // ... 아이템 추가 로직 ...
    const newItems = updateItems(items, product);
    setItems(newItems);

    // 관련된 다른 상태들도 '수동으로' 모두 업데이트해야 합니다.
    const newTotal = calculateTotal(newItems, discount);
    const newItemCount = calculateItemCount(newItems);
    setTotal(newTotal);
    setItemCount(newItemCount);
  };

  // 아이템을 제거하는 함수
  const removeItem = productId => {
    // ... 아이템 제거 로직 ...
    const newItems = filterItems(items, productId);
    setItems(newItems);

    // 여기서도 관련된 모든 상태를 다시 계산하고 업데이트해야 합니다.
    const newTotal = calculateTotal(newItems, discount);
    const newItemCount = calculateItemCount(newItems);
    setTotal(newTotal);
    setItemCount(newItemCount);
  };

  // ... 기타 다른 함수들 (할인 적용, 결제 등)
}
```

<br /><br />

이 코드에는 몇 가지 심각한 문제가 있습니다.<br /><br />

- '분산된 비즈니스 로직': 장바구니 관리 로직이 `addItem`, `removeItem` 등 여러 함수에 흩어져 있고, `total`과 `itemCount`를 다시 계산하는 코드가 중복됩니다.<br /><br />
- '누락의 위험': 각 함수는 여러 상태(`items`, `total`, `itemCount`)를 수동으로 업데이트해야 하므로, 실수로 하나라도 빠뜨리면 버그가 발생합니다.<br /><br />
- '산발적인 업데이트 로직': 할인 적용 같은 계산 규칙이 여러 곳에 흩어져 있어 일관성을 유지하기 어렵습니다.<br /><br />
- '중앙 관리의 부재': 가능한 모든 상태 전환을 한눈에 파악하기가 어렵습니다.<br /><br />
- '테스트의 어려움': 비즈니스 로직이 이벤트 핸들링과 섞여 있어 테스트가 복잡해집니다.<br /><br />

## `useReducer` 이해하기: 지휘 센터 만들기<br />

`useReducer` 훅은 상태 로직을 '리듀서(reducer)'라고 불리는 순수 함수에 중앙 집중화하여 이러한 문제들을 해결합니다.<br /><br />
마치 복잡한 교통 시스템을 통제하는 '중앙 관제소'를 만드는 것과 같습니다.<br /><br />

### `useReducer`란 무엇인가?<br />

`useReducer`의 기본 구문은 다음과 같습니다.<br /><br />

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

<br /><br />

- `state`: 모든 데이터를 단일 객체에 그룹화한 현재 상태입니다.<br /><br />
- `dispatch`: 리듀서에 '액션(action)'을 보내는 함수입니다.<br /><br />
  마치 관제소에 "사고 발생!" 또는 "도로 개통!" 같은 '사건'을 보고하는 무전기와 같습니다.<br /><br />
- `reducer`: 현재 상태와 액션을 받아 '새로운 상태'를 반환하는 순수 함수입니다.<br /><br />
  관제소의 핵심 두뇌 역할을 합니다.<br /><br />
- `initialState`: 초기 상태입니다.<br /><br />

### 리듀서 패턴<br />

`useReducer`의 핵심은 리듀서 함수입니다.<br /><br />
이 함수는 `(state, action) => newState`라는 형태를 가지며, 반드시 '순수 함수'여야 합니다.<br /><br />
즉, 원본 상태를 직접 수정해서는 안 되며(불변성 원칙), 부수 효과가 없어야 합니다.<br /><br />
'액션'은 일반적으로 수행할 작업의 종류를 나타내는 `type` 속성과, 필요한 데이터를 담는 `payload` 속성을 가진 객체입니다.<br /><br />

## `useReducer`로 리팩터링하기: 쇼핑 카트 예제<br />

이제 `useReducer`로 쇼핑 카트를 어떻게 리팩터링하는지 보겠습니다.<br /><br />

### 1단계: 타입과 초기 상태, 그리고 리듀서 정의<br />

먼저 필요한 모든 타입과 초기 상태, 그리고 모든 로직을 담을 리듀서 함수를 정의합니다.<br /><br />
이들은 컴포넌트 외부에 위치할 수 있어, 로직과 뷰의 분리가 명확해집니다.<br /><br />

```typescript
// 타입 정의
type CartState = { /* ... */ };
type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  // ... 기타 액션 타입

// 초기 상태
const initialState: CartState = { /* ... */ };

// 중앙 관제소: 리듀서 함수
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // ... 아이템 추가 로직 ...
      const updatedItems = /* ... */;
      // 관련된 모든 파생 상태를 여기서 한 번에 계산합니다.
      const newTotal = calculateTotal(updatedItems, state.discount);
      const newItemCount = calculateItemCount(updatedItems);
      // '새로운 상태' 객체를 반환합니다.
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }
    case "REMOVE_ITEM": {
      // ... 아이템 제거 로직 ...
      const updatedItems = /* ... */;
      const newTotal = calculateTotal(updatedItems, state.discount);
      const newItemCount = calculateItemCount(updatedItems);
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    }
    // ... 다른 모든 케이스 ...
    default:
      return state;
  }
}
```

<br /><br />

### 2단계: 컴포넌트에서 `useReducer` 사용하기<br />

이제 컴포넌트는 훨씬 더 단순해집니다.<br /><br />
복잡한 상태 업데이트 로직 대신, 단지 어떤 일이 일어났는지를 설명하는 '액션'을 `dispatch`하기만 하면 됩니다.<br /><br />

```jsx
// useReducer를 사용하는 컴포넌트
function ShoppingCartWithReducer() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { items, total, itemCount } = state;

  // 제품 추가
  const addToCart = (product: Product) => {
    // "ADD_ITEM 액션이 발생했어!"라고 보고합니다.
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  // 제품 제거
  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  // 결제 처리
  const checkout = async () => {
    dispatch({ type: "CHECKOUT_START" });
    try {
      await processPayment(items, total);
      dispatch({ type: "CHECKOUT_SUCCESS" });
    } catch (error) {
      dispatch({ type: "CHECKOUT_FAILURE", payload: { error: "Payment failed" } });
    }
  };

  // ... 컴포넌트 렌더링 ...
}
```

<br /><br />

이 접근 방식의 장점은 명확합니다.<br /><br />

- '비즈니스 로직 중앙화': 모든 장바구니 관련 작업이 단일 리듀서 함수에 그룹화됩니다.<br /><br />
- '명시적인 액션': 각 작업이 `ADD_ITEM`처럼 명시적으로 이름 붙은 액션으로 표현되어 코드가 스스로를 문서화합니다.<br /><br />
- '계산 일관성': 파생된 계산(총액, 아이템 수)이 항상 같은 방식으로 수행되어 데이터 일관성이 보장됩니다.<br /><br />
- '향상된 테스트 용이성': 리듀서 함수는 순수 함수이므로, 컴포넌트와 독립적으로 매우 쉽게 테스트할 수 있습니다.<br /><br />

## `useReducer` 모범 사례<br />

`useReducer`를 더 효과적으로 사용하기 위한 몇 가지 팁이 있습니다.<br /><br />

1.  'TypeScript와 함께 사용하기': '판별된 유니온(discriminated unions)'을 사용하여 액션 타입을 정의하면, `switch` 문 내에서 TypeScript가 `action.payload`의 타입을 정확하게 추론하여 코드 안정성을 높여줍니다.<br /><br />
2.  '액션 생성자 만들기': `dispatch({ type: "ADD_ITEM", payload: product })`처럼 매번 객체를 만드는 대신, `dispatch(addItem(product))`와 같이 호출할 수 있는 함수(액션 생성자)를 만들면 코드가 더 깔끔해지고 오류가 줄어듭니다.<br /><br />
3.  '리듀서 단순화하기': 리듀서가 너무 비대해지는 것을 막기 위해, 복잡한 계산 로직은 별도의 유틸리티 함수로 추출하는 것이 좋습니다.<br /><br />
4.  `useContext`와 결합하기: `useReducer`와 `useContext`를 결합하면, Redux와 유사한 전역 상태 관리 시스템을 직접 만들 수 있습니다.<br /><br />
    이를 통해 앱 전체에서 상태(`state`)와 `dispatch` 함수를 props drilling 없이 사용할 수 있습니다.<br /><br />

## 결론<br />

`useReducer` 훅은 상태 로직이 복잡하고 비즈니스 지향적인 상황에 특히 적합한, 강력하고 구조적인 상태 관리 접근 방식을 나타냅니다.<br /><br />
상태 전환을 순수 리듀서 함수에 중앙 집중화함으로써, 여러 가지 주요 이점을 제공합니다.<br /><br />
`useState`가 간단한 경우에 선호되는 옵션으로 남아 있지만, 쇼핑 카트, 예약 시스템 또는 상태의 다른 부분들이 서로 상호 작용하는 다른 로직을 모델링해야 할 때 `useReducer`는 이상적인 해결책으로 부상합니다.<br /><br />
`useReducer`를 마스터하는 것은 복잡한 상태를 다루는 여러분의 능력을 한 단계 끌어올리고, 더 유지보수하기 쉽고, 예측 가능하며, 더 잘 구조화된 React 애플리케이션을 구축할 수 있게 해줄 것입니다.<br /><br />

---
