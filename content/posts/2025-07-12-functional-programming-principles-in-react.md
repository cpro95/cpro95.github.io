---
title: React와 함수형 프로그래밍 - 더 나은 코드를 위한 핵심 원칙
date: 2025-07-12T12:41:31.760Z
draft: false
tags:
  - React
  - 함수형 프로그래밍
  - 순수 함수
  - 불변성
  - 고차 컴포넌트
  - 컴포지션
description: React는 단순한 라이브러리가 아니라 사고방식입니다. 순수 함수, 불변성, 고차 컴포넌트, 컴포지션 등 함수형 프로그래밍의 핵심 원칙들이 어떻게 React를 더 예측 가능하고 강력하게 만드는지 깊이 있게 탐구합니다.
---
![](https://blogger.googleusercontent.com/img/a/AVvXsEgr_P_vbKgrljls-Gm7_Q94A5hP7OGGDjiZ4NqZq0cUJXCAeOxSriFZ63Fo7ho_lEsmt12FiMbXbcDJham42JrUyfgIZh1Wjqm5xJzzk3myWV9Lzbqupz9NkwIb9NtsomHN7FiIGPDnwgrqDWOtBu86bPddi0h14xq8FI5lK3012XK6vxkGx3yQWs2xW7w=s16000)

우리는 React의 내부 메커니즘, 모범 사례, 디자인 패턴, 그리고 고급 개념들을 탐구합니다.

이 글들은 기본을 넘어 React가 내부적으로 어떻게 작동하는지 진정으로 이해하고자 하는 React 개발자들을 위해 작성되었습니다.

## 서론: 함수형 프로그래밍이란 무엇인가?

'함수형 프로그래밍(Functional Programming)'은 계산을 '수학적 함수의 평가'로 취급하고, '상태 변경'과 '변경 가능한 데이터(mutable data)'를 피하는 프로그래밍 접근 방식입니다.

이는 많은 개발자에게 더 익숙한 전통적인 '명령형 프로그래밍'과는 크게 다릅니다.

마치 누군가에게 식사를 준비하기 위해 상세한 단계별 지침을 주는 것('명령형' 접근 방식)과, 재료와 적용할 변환 과정을 설명하는 레시피를 주는 것('함수형' 접근 방식)의 차이를 생각해 보세요.

함수형 프로그래밍에서 우리는 따라야 할 단계보다는 '데이터 변환'에 집중합니다.

### 다른 패러다임과의 차이점

React에 특화된 함수형 개념에 뛰어들기 전에, 함수형 프로그래밍이 다른 패러다임과 어떻게 다른지 이해해 보겠습니다.

- '명령형 프로그래밍': 프로그램의 상태를 시간에 따라 변경함으로써 '어떻게' 작업을 완수할지에 초점을 맞춥니다.

```javascript
// 명령형 접근 방식
let sum = 0; // 외부 상태
for (let i = 1; i <= 5; i++) {
  sum += i; // 상태를 직접 변경(mutate)합니다.
}
console.log(sum); // 15
```



- '함수형 프로그래밍': 데이터에 적용할 변환을 설명함으로써 '무엇을' 완수할지에 초점을 맞춥니다.
  상태 변경을 피하고 순수한 변환을 선호합니다.

```javascript
// 함수형 접근 방식
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, current) => acc + current, 0); // 새로운 값을 반환합니다.
console.log(sum); // 15
```



- '객체 지향 프로그래밍(OOP)': 데이터와 동작을 캡슐화하는 '객체'를 중심으로 코드를 구성합니다.
  상태는 이 패러다임의 중심입니다.

```javascript
// 객체 지향 접근 방식
class Counter {
  constructor() {
    this.count = 0; // 상태(데이터)를 객체 내부에 캡슐화
  }

  increment() {
    this.count += 1; // 객체 자신의 상태를 변경하는 메서드
    return this.count;
  }
}
const counter = new Counter();
counter.increment(); // 객체의 내부 상태가 변경됨
```



## React는 왜 함수형 프로그래밍을 선택했을까?

React는 몇 가지 중요한 이유로 많은 함수형 프로그래밍 개념을 사용합니다.

- '예측 가능성': 순수 함수는 동일한 입력에 대해 항상 동일한 결과를 생성하므로, 컴포넌트의 동작이 더 예측 가능하고 디버깅하기 쉬워집니다.
- '테스트 용이성': 부수 효과(side effects)가 없는 함수는 숨겨진 의존성이 없기 때문에 테스트하기가 더 쉽습니다.
- '합성(Composition)': 작은 함수들을 결합하여 복잡한 동작을 만들 수 있는 것처럼, React 컴포넌트들을 합성하여 완전한 사용자 인터페이스를 만들 수 있습니다.
- '상태 관리': 불변성(immutability)과 함수형 변환은 React가 변경 사항을 효율적으로 감지하고 렌더링 성능을 최적화할 수 있게 해줍니다.

React는 순수 함수형 프로그래밍의 모든 측면을 엄격하게 따르지는 않더라도, 이러한 함수형 원칙들을 활용하여 더 예측 가능하고 유지보수하기 쉬운 프로그래밍 모델을 제공합니다.

## 1. 일급 객체로서의 함수 (Functions as First-Class Values)

JavaScript에서 함수는 '일급 객체'입니다.

이는 함수가 언어의 다른 모든 값처럼 취급될 수 있음을 의미합니다.

이 특징은 함수형 프로그래밍의 기본이며 React에서 널리 사용됩니다.

실질적으로 이것은 JavaScript의 함수가 다음과 같은 일을 할 수 있다는 뜻입니다.

- 변수에 할당되거나 자료 구조에 저장될 수 있습니다.
- 다른 함수에 인자로 전달될 수 있습니다.
- 다른 함수에 의해 반환될 수 있습니다.

이 유연성은 함수가 일급 객체가 아닌 언어에서는 어렵거나 불가능한 디자인 패턴을 가능하게 합니다.

```jsx
// 함수가 변수에 저장됩니다.
const handleClick = () => {
  console.log("Button clicked");
};

// 함수가 prop으로 컴포넌트에 전달됩니다.
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function App() {
  return <Button onClick={handleClick}>Click here</button>;
}
```



## 2. 고차 컴포넌트 (Higher-Order Components, HOC)

HOC는 React에서 일급 함수의 개념을 가장 강력하게 적용한 예시 중 하나입니다.

HOC는 '컴포넌트를 인자로 받아, 새로운 기능이 추가된 새 컴포넌트를 반환하는 함수'입니다.

이 기법은 컴포넌트 로직 재사용과 관심사 분리를 가능하게 합니다.

'Hooks'가 등장하기 전까지, HOC는 로직을 공유하는 가장 일반적인 방법이었습니다.

```jsx
// 로딩 상태를 추가하는 HOC
function withLoading(Component) {
  // 새 컴포넌트를 반환합니다.
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    // 로딩이 아니면, 원본 컴포넌트를 렌더링합니다.
    return <Component {...props} />;
  };
}

// 기본 컴포넌트
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 로딩 상태가 추가된 강화된 컴포넌트 생성
const UserListWithLoading = withLoading(UserList);

// 사용 예시
function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ... useEffect로 데이터 페칭

  return <UserListWithLoading isLoading={isLoading} users={users} />;
}
```



HOC는 로직 재사용에 매우 강력하지만, 여러 개를 중첩하면 JSX가 복잡해지는 '래퍼 지옥(wrapper hell)'이나 prop 이름 충돌 같은 단점도 있습니다.

현대 React에서는 대부분의 경우 '커스텀 훅'이 더 나은 대안으로 여겨집니다.

## 3. 순수 함수 (Pure Functions)

순수 함수는 함수형 프로그래밍의 핵심 개념입니다.

순수 함수란:

- 동일한 인자로 호출될 때 항상 동일한 결과를 반환합니다.
- 관찰 가능한 '부수 효과(side effects)'가 없습니다.
  (외부 변수 수정, API 요청, `console.log` 등)
- 오직 자신의 인자에만 의존합니다.

React에서는 컴포넌트가 그 props에 대해 순수 함수처럼 동작하도록 노력해야 합니다.

동일한 props가 주어지면 항상 동일한 UI를 렌더링해야 하죠.

이 원칙 덕분에 React는 렌더링을 최적화할 수 있습니다.

만약 순수 컴포넌트의 props가 변경되지 않았다면, React는 결과가 동일할 것임을 알기 때문에 렌더링 과정을 건너뛸 수 있습니다.
(`React.memo`가 바로 이 원리를 이용합니다.)

```jsx
// 순수 함수: 오직 매개변수에만 의존합니다.
function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// 순수 React 컴포넌트: 동일한 items prop에 대해 항상 동일한 UI를 렌더링합니다.
function OrderSummary({ items }) {
  const total = calculateTotal(items);

  return (
    <div>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
```



## 4. 불변성 (Immutability)

'불변성'은 기존 데이터를 직접 수정하지 않고, 대신 원하는 변경 사항이 적용된 '새로운 복사본'을 만드는 원칙입니다.

React에서 불변성이 중요한 이유는, React가 변경 사항을 감지하고 DOM을 언제 업데이트할지 결정하는 방식 때문입니다.

React는 객체의 '참조(reference)'를 비교하여 무언가 변경되었는지 판단합니다.

만약 객체를 직접 수정하면(mutation), 객체의 메모리 주소, 즉 참조는 그대로 유지됩니다.

React는 `'이전 상태 === 새로운 상태'` 인지 매우 빠른 참조 비교 검사를 수행하는데, 참조가 동일하면 아무것도 바뀌지 않았다고 착각하고 리렌더링을 건너뛰게 됩니다.

### 불변성을 지키는 방법 (해야 할 것)

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    /* ... */
  ]);

  const toggleTodo = id => {
    // map을 사용해 '새로운 배열'을 생성합니다.
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // 스프레드 연산자로 '새로운 객체'를 생성합니다.
          : todo
      )
    );
  };
  // ...
}
```



### 직접 수정하는 방법 (피해야 할 것)

```jsx
function TodoListBad() {
  const [todos, setTodos] = useState([
    /* ... */
  ]);

  // ❌ 나쁜 접근 방식 (직접 수정)
  const toggleTodoBad = id => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    // ❌ 기존 배열 내부의 객체를 직접 수정합니다.
    todos[todoIndex].completed = !todos[todoIndex].completed;
    // 배열의 참조가 바뀌지 않았기 때문에 React는 변화를 감지하지 못합니다.
    setTodos(todos);
  };
  // ...
}
```



## 5. 커링과 합성 (Currying & Composition)

'커링'은 여러 인자를 받는 함수를, 각각 하나의 인자를 받는 함수들의 연속으로 변환하는 기법입니다.

이를 통해 더 일반적인 함수로부터 특화된 함수를 만들 수 있습니다.

React에서는 특히 여러 데이터를 필요로 하는 이벤트 핸들러를 만들 때 유용합니다.

```jsx
function ProductList({ products, onProductAction }) {
  // 커링된 함수: action => productId => event
  const handleProductAction = action => productId => event => {
    onProductAction(action, productId);
  };

  return (
    <div>
      {products.map(product => (
        <button onClick={handleProductAction("view")(product.id)}>View</button>
      ))}
    </div>
  );
}
```



'합성'은 단순한 함수들을 결합하여 더 복잡한 함수를 만드는 원리입니다.

React에서는 작은 컴포넌트들을 조립하여 복잡한 UI를 만드는 방식으로 나타납니다.

상속보다 합성을 사용하는 것이 React에서는 강력히 권장되는 패턴이며, 이는 고도로 재사용 가능하고 모듈적인 컴포넌트를 만들 수 있게 해줍니다.

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

function App() {
  return (
    <Card title="User Profile">
      <UserInfo user={user} />
    </Card>
  );
}
```



## 결론

함수형 프로그래밍은 React를 위한 코딩 스타일 이상입니다.

그것은 React의 설계와 아키텍처를 안내하는 철학입니다.

일급 함수, 순수 함수, 불변성, 커링, 합성 같은 원칙들을 채택함으로써, 우리는 더 예측 가능하고, 테스트하기 쉬우며, 유지보수하기 좋은 React 애플리케이션을 만들 수 있습니다.

이 접근 방식은 우리의 코드 작성 방식뿐만 아니라, 해결책을 설계하는 방식까지 변화시킵니다.

그것은 우리를 더 작고, 더 집중되고, 더 재사용 가능한 컴포넌트를 만들도록 밀어붙이며, 이는 결국 유지보수하고 발전시키기 더 쉬운 애플리케이션으로 이어집니다.
