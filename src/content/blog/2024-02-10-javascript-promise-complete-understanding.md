---
title: JavaScript의 Promise, 그것이 알고싶다
pubDatetime: 2024-02-10T00:26:04.495Z
postSlug: 2024-02-10-javascript-promise-complete-understanding
featured: false
draft: false
tags:
  - javascript
  - promise
description: JavaScript의 Promise, 그것이 알고싶다
---

** 목 차 **

- 1. [Promise의 코드화](#Promise)
- 2. [Promise를 사용하는 방법(약속을 지킨 경우)](#Promise-1)
- 3. [Promise를 사용하는 방법(약속을 지키지 않은 경우)](#Promise-2)
- 4. [Promise의 상태란 무엇인가?](#Promise-3)
- 5. [Pending 상태란 무엇인가?](#Pending)
- 6. [Promise를 어떻게 사용하는가?](#Promise-4)
- 7. ["Promise를 반환한다"는 것은 무엇을 의미하는가?](#Promise-5)
- 8. [Promise를 연결하는 방법](#Promise-6)
  - 8.1. [두 개의 Promise를 연결](#Promise-7)
- 9. [간단한 함수를 사용하여 여러 Promise를 연결하는 예를 들어보겠습니다.](#Promise-8)

---

안녕하세요?

JavaScript의 Promise를 사용해보신 분들 중에도 실제로 어떻게 작동하는지 이해하지 못하고 계신 분들이 계실 것입니다.

또한 JavaScript를 처음 배우시는 분들 중에는 Promise라는 용어를 들어보셨지만 그게 무엇인지 잘 모르시는 분들도 계실 것입니다.

이런 분들을 위해, 가능한 한 많은 분들이 Promise를 이해할 수 있도록 친근한 예시와 단순한 코드를 사용하여 Promise에 대해 설명해보겠습니다.

Promise를 설명하려고 하면 동기와 비동기라는 단어들이 함께 나오는 경우가 많아서, JavaScript를 처음 배우시는 분들에게는 Promise를 이해하는 것보다 비동기 부분의 설명에서 이미지를 이해하지 못하고 혼란스러워하시는 분들이 많을 것입니다.

Promise를 이해하려면, 동기와 비동기 그리고 Promise의 관계를 잠시 잊는 것이 좋습니다.

그렇게 하면 Promise 자체가 얼마나 단순한지 알 수 있습니다.

Promise라는 영어 단어는 "약속"이라는 뜻으로 알려져 있습니다.

프로그래밍에서 사용되는 기능의 이름은 그 이름의 의미를 기반으로 지어지므로 "약속"이라는 의미를 염두에 두고 Promise를 이해해봅시다.

예를 들어, 내일 친구와 근처 카페에서 10시에 만나기로 약속을 했다고 생각해봅시다.

이 약속은 10시에 카페에 가는 경우와 10시에 카페에 가지 못하는 경우, 두 가지 결과가 있습니다.

Promise도 이와 같이 약속을 지키는 결과(이를 Promise에서는 resolve라고 합니다)와 약속을 지키지 않는 결과(이를 Promise에서는 reject라고 합니다)의 두 가지 결과를 가지고 있습니다.

이 두 가지 결과 중 반드시 하나의 결과를 반환해야 합니다.

---

## 1. <a name='Promise'></a>Promise의 코드화

"Promise가 두 가지 결과를 가지고 있고 어느 한 쪽의 결과를 반환한다"는 것이 무엇을 의미하는지 확인하기 위해 Promise의 실제 코드를 사용하여 설명해보겠습니다.

먼저 Promise 객체를 new 연산자를 사용하여 인스턴스화하고 변수 yaksok에 할당합니다.

```js
let yaksok = new Promise()
Promise의 인자 함수에는 두 개의 콜백 함수 resolve와 reject가 들어갑니다.

let yaksok = new Promise(function(resolve,reject){
   // ...
})

// 애로우 함수를 사용하면 다음과 같이 작성할 수 있습니다.
let yaksok = new Promise((resolve, reject) => {
    // ...
});
```

마지막으로 약속을 지킨 경우와 지키지 않은 경우의 코드를 추가해 봅시다.

약속을 지킨 경우는 resolve에 값을 넣고, 지키지 않은 경우에는 reject에 값을 넣습니다.

```js
const keep_promise = true;

const yaksok = new Promise(function (resolve, reject) {
  if (keep_promise) {
    resolve("약속대로 왔어.");
  } else {
    reject("약속을 어겼어, 미안.");
  }
});

const keep_promise = true;

const yaksok = new Promise((resolve, reject) => {
  if (keep_promise) {
    resolve("약속대로 왔어.");
  } else {
    reject("약속을 어겼어, 미안.");
  }
});
```

이것으로 Promise로 약속을 코드화하는 것이 완료됩니다.

keep_promise의 값에 따라 resolve 또는 reject의 값이 반환됩니다.

100% 약속대로 카페에 도착한다고 확신하는 사람이라면 아래와 같이 reject를 생략하고 resolve만을 기술할 수도 있습니다.

```js
const yaksok = new Promise(function (resolve) {
  resolve("항상 약속대로 간다.");
});

const yaksok = new Promise(resolve => {
  resolve("항상 약속대로 간다.");
});
```

또한 Promise.resolve를 사용하여 new Promise를 간략화할 수도 있습니다.

```js
const yaksok = Promise.resolve("항상 약속대로 간다.");
```

resolve와 reject를 가진 Promise를 함수를 사용하여 기술할 수도 있습니다.

```js
const keep_promise = true;

const yaksok = function () {
  return new Promise(function (resolve, reject) {
    if (keep_promise) {
      resolve("약속대로 왔어.");
    } else {
      reject("약속을 어겼어, 미안.");
    }
  });
};
```

또한 함수를 사용하면 이런 기술도 문제가 없습니다.

```js
const keep_promise = true;

function yaksok() {
  return new Promise(function (resolve, reject) {
    if (keep_promise) {
      resolve("약속대로 왔어.");
    } else {
      reject("약속을 어겼어, 미안.");
    }
  });
}
```

JavaScript는 같은 처리를 수행하기 위한 기술 방법이 여러 가지 있으므로 참조하는 문서에 따라 기술 방법이 다르므로 주의해야 합니다.

---

## 2. <a name='Promise-1'></a>Promise를 사용하는 방법(약속을 지킨 경우)

Promise를 생성할 수 있게 되었으므로 이 Promise를 사용하여 약속을 지킨 경우의 코드 진행을 알아 보겠습니다.

생성한 변수 yaksok에 then을 붙이면 Promise의 resolve의 결과를 얻을 수 있습니다.

then 안에는 함수가 들어가고, 그 인자에는 resolve의 결과가 들어갑니다.

keep_promise의 값은 true로 약속을 지킨 경우입니다.

```js
// keep_promise = true인 경우
yaksok.then(function (comment) {
  console.log(comment);
});

// keep_promise = true인 경우
yaksok.then(comment => {
  console.log(comment);
});
```

여기서는 받는 값을 comment라는 이름으로 쓰고 있지만, 아무 이름이나 붙일 수 있습니다.

comment에는 resolve의 인자에 기술한 내용이 들어가고, 코드가 그대로 실행되면 "약속대로 왔어."가 표시됩니다.

문자열이 아닌 resolve에 들어가는 값이 배열인 경우에 대해 확인해봅시다.

```js
if (keep_promise) {
  resolve(["a", "b", "c"]);
} else {
  reject("약속을 어겼어, 미안.");
}
```

결과는 예상하신데로, 배열을 얻을 수 있습니다.

```js
["a", "b", "c"];
```

---

## 3. <a name='Promise-2'></a>Promise를 사용하는 방법(약속을 지키지 않은 경우)

약속을 지키지 않은 경우(keep_promise = false)에는 어떻게 reject에 들어간 값을 얻는지 확인해봅시다.

약속을 지키지 않은 경우에는 then이 아닌 catch를 사용하여 reject의 값을 얻을 수 있습니다.

약속을 지킨 경우에는 then 안에서, 약속을 지키지 않은 경우에는 catch 안에서 결과에 따라 다른 처리를 할 수 있습니다.

```js
// keep_promise = false인 경우
yaksok
  .then(function (comment) {
    console.log(comment);
  })
  .catch(function (comment) {
    console.log(comment);
  });

// keep_promise = false인 경우
yaksok
  .then(comment => {
    console.log(comment);
  })
  .catch(comment => {
    console.log(comment);
  });
```

실행하면 catch 안의 처리가 실행되고, "약속을 어겼어, 미안."이 표시됩니다.

catch를 사용하는 것이 일반적이지만 catch를 사용하지 않고도 then에 두 개의 함수를 넣어 reject의 값을 얻을 수도 있습니다.

이는 잘 보이지 않을 수도 있습니다.

```js
yaksok.then(function(comment){
                console.log(comment)
            },
            function(comment){
                console.log(comment)
            })
        })
```

위 코드에서는 약속을 지키면 then의 첫 번째 함수가 실행되고, 약속을 어기면 두 번째 함수가 실행되어 코멘트가 표시됩니다.

두 함수의 인자에 같은 이름이 사용되어 있어서 이해하기 어려울 경우 아래와 같이 이름을 바꿔 사용할 수 있습니다.
(reject를 포함하지 않아도 됩니다)

```js
yaksok.then(function(result){
                console.log(result)
            },
            function(error){
                console.log(error)
            })
        })
```

Promise를 자주 접하는 경우는 아마도 React 코드 작성시 외부 리소스에서 데이터를 가져오는 axios를 사용할 때입니다.

처음 axios를 사용했을 때는 조금은 낯설었던 `then`, `catch` 키워드가 오늘은 조금 쉽게 이해 할 수 있으실 겁니다.

```js
axios
  .get("/api")
  .then(function (response) {
    //데이터를 성공적으로 가져온 경우에 실행할 코드를 작성
  })
  .catch(function (error) {
    //데이터를 가져오는 데 실패한 경우에 실행할 코드를 작성
  });

axios
  .get("/api")
  .then(response => {
    //데이터를 성공적으로 가져온 경우에 실행할 코드를 작성
  })
  .catch(error => {
    //데이터를 가져오는 데 실패한 경우에 실행할 코드를 작성
  });
```

이제 여러분은 Promise를 구성하는 있는 resolve, reject, then, catch 등의 사용법을 완벽히 이해할 수 있을 겁니다.

---

## 4. <a name='Promise-3'></a>Promise의 상태란 무엇인가?

Promise는 세 가지 상태를 가집니다.

pending, fulfilled, rejected의 세 가지입니다.

상태의 상황을 시각적으로 이해하기 위해 Chrome의 개발자 도구를 사용합니다.

상태 fulfilled는 영어 뜻 그대로 약속을 지키고 resolve의 값이 반환된 경우의 상태와 관련이 있고,

상태 rejected는 약속을 지키지 못하고 reject의 값이 반환된 경우의 상태와 관련이 있습니다.

Chrome의 개발자 도구에서 resolve와 reject의 Promise 상태를 확인할 수 있습니다.

keep_promise의 값을 변경함으로써 두 가지 상태를 모두 확인할 수 있습니다.

```js
const keep_promise = true;

const yaksok = new Promise((resolve, reject) => {
  if (keep_promise) {
    resolve("약속대로 왔어.");
  } else {
    reject("약속을 어겼어, 미안.");
  }
});

console.log(yaksok);
```

아래 그림과 같이 나옵니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEgqkkbdTqPU2Yd3rKvopaY_vyoqABfHx5lTdlR1cl4HPBWMAJdMBX9-ohEQQLCzQm2ZdkVL54-WBc6Y9OVZ4JRtAj312Y_48ZN6XwZsnBOuAqjYgzh0RY9W1b3c1F9rViDEZGe6pnUIKIB8UAThoAUpCM7GWRJ4QgrDKY3TMgNa3pNRr8jNZKtjhOluzAg)

참고로, 위 그림에서 볼 수 있듯이 크롬이 버전업되면서 보안에 큰 신경을 썼는지, 크롬 개발자 도구에 코드를 붙혀넣기 못하게 세팅되어 있는데요.

간단하게 'allow pasting'라고 치시면 붙혀넣기 할 수 있을 겁니다.

```js
const keep_promise = false;

const yaksok = new Promise((resolve, reject) => {
  if (keep_promise) {
    resolve("약속대로 왔어.");
  } else {
    reject("약속을 어겼어, 미안.");
  }
});

console.log(yaksok);
```

![](https://blogger.googleusercontent.com/img/a/AVvXsEh9T3wItUYPNCjVEudIaqpZdvvpRdNq8RaqFgXT81WNfh2Q2ofUpOuaKH_gzuWfE9CBiuHSE9JpsgpH5RgH8P7835BoqV-kFDMlhIpO9l3eBHjDhX6Yy6jR1cAA_E2W2yno5yYIfXn6CXu3Cg2kG210JOmAgfGgvkDTF38u5rRw_hPCeS7lHIbbyk6qcSU)

위 그림과 같이 Promise 상태가 rejected로 나옵니다.

---

## 5. <a name='Pending'></a>Pending 상태란 무엇인가?

또 하나의 상태인 pending에 대해 알아볼까요?

pending은 결정을 기다리는 상태를 의미하며, 지금까지 살펴본 예제로 생각해 보면 약속의 시간이 아직 오지 않은 상태입니다.

즉, pending 상태는 아직 뭔가 결정되지 않은 상태여서 약속을 지키는 resolve인지 지키지 못하는 reject인지 알 수 없는 상태입니다.

pending 상태를 확인하기 위해 setTimeout 함수를 사용하여 5초 후에 resolve와 reject의 결과를 얻도록 코드를 고쳐서 살펴보겠습니다.

```js
const keep_promise = false;

const yaksok = new Promise(function (resolve, reject) {
  setTimeout(function () {
    if (keep_promise) {
      resolve("약속대로 왔어.");
    } else {
      reject("약속을 어겼어, 미안.");
    }
  }, 1000 * 5);
});

console.log(yaksok);

//5초가 지난 후에 다시
console.log(yaksok);
```

개발자 도구를 보면 아래 그림과 같이 5초 후에 resolve 또는 reject가 반환되므로 그 사이에는 pending 상태가 됩니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEhaTEi4-Cc0WXY1fFGnM9l5F2bjJkbD5rpfD1c9EgEmVO-6ABK6J8eMQUFwy9wbS6-ZXFBrYptzCI6IUc4y9iQDiJWRVP4t9nyV6dwQfzDj0Z3KIH_D5OhFY7Jy27yhHiPoni0SMQWnoRiYVWDTrjyYFie0Q-pno4dixLrbMwuyQI5C_sjVPB_JGuFC9BQ)

keep_promise를 false로 설정한 경우에는 5초가 지나면 콘솔에 오류가 표시됩니다.

그 후 상태를 확인하면 rejected가 된 것을 확인할 수 있습니다.

위 그림처럼 keep_promise가 false라서 Uncaught 에러가 나옵니다.

keep_promise를 true로 설정한 경우에는 Uncaught (in promise)는 표시되지 않습니다.

여기까지의 실제 코드 확인으로 Promise의 세 가지 상태의 의미를 이해할 수 있었을 것입니다.

---

## 6. <a name='Promise-4'></a>Promise를 어떻게 사용하는가?

여기까지 읽어온 사람이라면, Promise의 resolve, reject, then, catch, 상태의 fulfilled, rejected, pending의 차이를 이해할 수 있을 것입니다.

그렇다면 Promise는 어떤 경우에 사용할 수 있는지 먼저 아래의 예제로 확인해봅시다.

교실에서 이름 순으로 학생의 이름을 부르는 경우를 생각해봅시다.

```javascript
console.log("김씨");
console.log("강씨");
console.log("심씨");
//콘솔
김씨;
강씨;
심씨;
```

위에서 아래로 순서대로 처리가 이루어지므로 콘솔에도 이름이 순서대로 표시됩니다.

(이 같은 처리를 동기(sync) 처리라고 합니다)

여기서 '강씨'를 부를 때 1초의 간격을 두려고 합니다.

setTimeout 함수를 사용하여 1초 후에 "강씨"를 표시하도록 변경합니다.

```javascript
console.log("김씨");
setTimeout(() => {
  console.log("강씨");
}, 1000);
console.log("심씨");
//콘솔
김씨;
심씨;
강씨;
```

변경한 결과, 심씨가 먼저 나오고, 그 후에 강씨가 나오게 됩니다.

(이를 비동기(async) 처리라고 합니다)

그렇다면 setTimeout을 사용하여 일정 시간을 두고도 순서대로 이름을 부르려면 어떻게 해야 할까요.

사람에 따라서는 심씨도 setTimeout을 설정하면 좋다고 생각하는 사람도 있을 것입니다.

```js
console.log("김씨");
setTimeout(() => {
  console.log("강씨");
}, 1000);
setTimeout(() => {
  console.log("심씨");
}, 1000);
//콘솔
김씨;
강씨;
심씨;
```

위 코드에서는 setTimeout을 사용하고 있어 경과 시간을 임의로 설정할 수 있었지만 처리가 완료되는 시간을 알 수 없는 경우에는 이 방법을 사용할 수 없습니다.

이럴 경우 '강씨'를 부른 후에 '심씨'의 이름을 부르고 싶은 경우에 사용할 수 있는 것이 바로 Promise입니다.

Promise의 then은 resolve가 실행된 후에 처리되므로 그 특성을 활용하면 됩니다.

```js
console.log("김씨");
new Promise(resolve => {
  setTimeout(() => {
    console.log("강씨");
    resolve();
  }, 1000);
}).then(() => {
  console.log("심씨");
});

//콘솔
김씨;
강씨;
심씨;
```

Promise 내부에서 setTimeout을 처리하는 동안은 Promise의 상태는 Pending입니다.

처리가 완료(fulfilled)되면 resolve에 의해 then의 처리가 실행되게 됩니다.

확실히 '강씨' 다음에 '심씨'가 불리게 됩니다.

(코딩측면에서 보면 이 같은 경우를 비동기 처리를 동기 처리처럼 다룰 수 있게 되었다고 합니다)

만약 '강씨'를 부른 후에 문제가 발생했다면 '심씨'의 이름이 불리지 않을 수도 있습니다.

그 때에는 reject와 catch를 사용할 수 있습니다.

```js
console.log('김씨')
new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log('강씨')
        reject('교내 방송')
    }, 1000)
}).then(() => {
    console.log('심씨')
}).catch((error) => {
    console.log(error)
})

//콘솔
김씨
강씨
교내 방송
```

이런 식으로 중간에 시간이 걸리는 처리가 있었을 경우에 Promise를 사용하여 순서대로 처리를 할 수 있게 됩니다.

---

## 7. <a name='Promise-5'></a>"Promise를 반환한다"는 것은 무엇을 의미하는가?

외부 리소스에서 데이터를 가져올 때 fetch 함수나 axios 라이브러리가 사용됩니다.

이때 "Promise를 반환한다"라는 표현을 자주 듣게 되는데요.

Promise를 반환한다는 것은 어떤 의미인지 fetch 함수를 사용하여 확인해봅시다.

무료로 사용할 수 있는 JSONPlaceHolder의 URL에 대해 fetch 함수를 사용하여 접근을 시도해 봅시다.

크롬 개발서 도구의 콘솔창에 아래와 입력합니다.

```javascript
const response = fetch("https://jsonplaceholder.typicode.com/todos/1");
```

잠시 후 console.log(response)를 실행합니다.

여기서 중요한 점은 잠시 후가 중요합니다.

fetch 함수는 네트워크를 통해 JSONPlaceHolder에서 데이터를 가져오기 때문에 즉시 데이터를 가져올 수 없습니다.

response의 값이 Promise임을 알 수 있습니다.

fetch 함수가 resolve, reject를 처리해주므로 우리가 resolve, reject를 사용한 코드를 작성할 필요가 없습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEj6l93DgYJ2mfi50X6pa1LsulAQkVw7tMH11Dp4Nz2BE5dGaAISyyheGm1cIZTm3l4QRVwEdSO-loQn7hc9YFmvSHreJCJ7cRZbfbI6KZwU8284t3pYW-mnC0exk2cpPfXiAjreAt6CtaN0jMrcRCtPMCUSPmZ1XLXttmLvKA5v6yjGDR_W-Y-kS76Wg_0)

상태에 대해서는 fulfilled가 아닌 pending의 가능성도 있습니다.

그 경우 fetch 함수가 데이터를 가져오는 중인 상태입니다.

Promise가 반환된다는 것은 fulfilled의 경우에는 then을 사용하여 반환된 값을 가져올 수 있다는 것을 의미합니다.

```js
fetch("https://jsonplaceholder.typicode.com/todos/1").then(response => {
  console.log(response);
});
```

![](https://blogger.googleusercontent.com/img/a/AVvXsEiFKEO1wA1WowvFFzgEsCDa4LOcNzHc7sC9ur9TPsIQAoYeW4FSO359QpRnG4WA7htYlVBh2LSrxg6clUy_QiYDA_5xOhPJdNZM6wNCUqH5YgBx5SPOSb8PcPlpEfdg3J_LjsSczwKdmt-KCCSKqLJ-DWRWuYaOJY1-7RHdTcnyMAYr8WYcRUZbmGCBx4g)

"Promise를 반환하는" 함수나 라이브러리를 사용한 경우에는 then을 사용하여 그 후의 처리를 수행할 수 있습니다.

또 잘 보시면 Promise 사용할 때 new Promise 방식으로 사용하지도 않았고 또 resolve, reject로 코드를 작성하지 않았습니다. fetch를 사용하면 그 모든게 내부에서 사용되고 있다는 것을 알 수 있습니다.

그래서 Promise를 사용한다고는 하지만 resolve, reject를 사용한 코드의 작성 방법을 모르거나 잊어버려서 찾아보지 않으면 코드를 작성할 수 없다는 사람들도 많은데요.

여기까지 이해할 수 있다면 Promise에 대한 이해는 꽤 깊어졌다고 생각합니다.

---

## 8. <a name='Promise-6'></a>Promise를 연결하는 방법

### 8.1. <a name='Promise-7'></a>두 개의 Promise를 연결

Promise는 체인으로 연결하여 처리를 연결할 수 있습니다.

연결하는 방법을 확인해 볼까요?

연결하면 한 번 처리를 수행한 후 그 처리 결과를 다음 처리에 전달할 수 있게 됩니다.

새로 catchTrain이라는 변수를 만들고 함수를 설정합니다.

함수는 인수를 받아들이고 return으로 Promise를 반환합니다.

on_schedule라는 변수의 값에 따라 resolve로 반환할지 reject로 반환할지가 결정됩니다.

> 함수를 사용할 때는 return으로 Promise를 반환하는 것을 잊지 마세요.

```js
const catchTrain = function (comment) {
  return new Promise(function (resolve, reject) {
    if (on_schedule) {
      resolve(comment + "10시 2분의 기차에 타자!");
    } else {
      reject(comment + "하지만 오늘은 기차가 늦네.");
    }
  });
};
```

앞서 만든 yaksok 코드에 catchTrain을 추가합니다.

약속대로 도착하고 기차의 출발 시간이 정각인지에 따라 표시되는 내용이 달라집니다.

```js
const keep_promise = true;
const on_schedule = true;

const yaksok = new Promise(function (resolve, reject) {
  if (keep_promise) {
    resolve("약속대로 왔어.");
  } else {
    reject("약속을 어겼어, 미안.");
  }
});

//함수의 경우
//const yaksok = function() {
//  return new Promise(function(resolve,reject){
//    if　(keep_promise){
//        resolve('약속대로 왔어.')
//    } else {
//        reject('약속을 어겼어, 미안.')
//    }
//  })
// }

const catchTrain = function (comment) {
  return new Promise(function (resolve, reject) {
    if (on_schedule) {
      resolve(comment + "10시 2분의 기차에 타자!");
    } else {
      reject(comment + "하지만 오늘은 기차가 늦네.");
    }
  });
};
```

실행할 때는 아래와 같이 then을 사용하여 연결할 수 있습니다.

catchTrain은 yaksok의 resolve의 값을 받아 내부의 처리를 실행합니다.

catchTrain의 처리에서 resolve의 값이 반환되면 그 아래의 then이 실행되고, console.log에 코멘트가 표시됩니다.

yaksok와 catchTrain 중 어느 것에서든 reject가 반환되면 catch가 실행됩니다.

약속을 어겼을 경우(keep_promise = false)는 catchTrain의 처리는 실행되지 않고 catch가 실행됩니다.

```js
//함수의 경우
// yaksok().then(catchTrain)
yaksok
  .then(catchTrain)
  .then(function (comment) {
    console.log(comment);
  })
  .catch(function (comment) {
    console.log(comment);
  });
```

keep_promise와 on_schedule의 값에 따라 표시되는 내용이 달라지므로 확인해봅시다.

둘 다 true인 경우에는 아래와 같이 표시됩니다.

```sh
//const keep_promise = true
//const on_schedule = true
약속대로 왔어. 10시 2분의 기차에 타자!
```

on_schedule가 false인 경우에는 아래와 같이 표시됩니다.

```sh
//const keep_promise = true
//const on_schedule = false
약속대로 왔어. 하지만 오늘은 기차가 늦네.
```

keep_promise가 false인 경우에는 yaksok가 실행되고 reject로 값이 반환되므로 catchTrain을 거치지 않고 catch가 실행됩니다.

```sh
//const keep_promise = false
//const on_schedule = true
약속을 어겼어, 미안.
```

```sh
//const keep_promise = false
//const on_schedule = false
약속을 어겼어, 미안.
```

이렇게 Promise는 연결함으로써 첫 번째 처리(yaksok)의 결과가 다음 처리(catchTrain)에 전달되는 것을 확인할 수 있었습니다.

"Promise를 반환한다"는 것은 Promise 객체를 생성하고 이를 반환한다는 것을 의미합니다.

이 Promise 객체는 비동기 작업이 완료될 때까지 대기 상태에 있고, 작업이 완료되면 이행(fulfilled) 상태가 됩니다.

이행 상태가 되면, Promise의 `then` 메서드를 통해 등록된 콜백 함수가 호출되어 작업 결과를 처리할 수 있습니다.

---

## 9. <a name='Promise-8'></a>간단한 함수를 사용하여 여러 Promise를 연결하는 예를 들어보겠습니다.

1초 후에 입력된 숫자에 1을 더하여 반환하는 Promise 함수를 만들어 보겠습니다.

```js
const addNumber = function (number) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(number + 1);
    }, 1000);
  });
};
```

addNumber 함수에 1을 인자로 전달하고 실행하면, 1초 후에 2가 출력됩니다.

```javascript
addNumber(1).then(function (number) {
  console.log(number); // 2
});
```

이 함수를 이전에 배웠던 Promise 연결 방법을 사용하여 3개 연결해 보겠습니다.

같은 함수를 연결했을 뿐이지만 3개를 연결하면 3초 후에 6이 출력됩니다.

이는 이전 작업의 결과가 다음 작업으로 전달되는 것을 보여줍니다.

```javascript
addNumber(3)
  .then(addNumber)
  .then(addNumber)
  .then(function (number) {
    console.log(number); // 6
  });
```

위의 코드는 아래와 같이 작성할 수도 있습니다.

```javascript
addNumber(3).then(function (number) {
  addNumber(number).then(function (number) {
    addNumber(number).then(function (number) {
      console.log(number); // 6
    });
  });
});
```

Promise를 연결했을 때 `then` 메서드 내부에 다시 Promise 함수를 넣었지만, `then` 메서드 내부에 Promise가 아닌 `return`을 사용하여 값을 반환함으로써 `then` 메서드를 사용하여 처리를 연결할 수 있습니다.

아래의 예에서는 `addNumber(1)`을 실행하여 `resolve`로 2가 반환됩니다.

다음 `then` 메서드에 2를 전달하고, `then` 메서드 내에서 2 \* 2를 반환합니다.

`return`으로 반환된 값은 다음 `then` 메서드로 전달되고, 2 _ 2 _ 3이 실행됩니다.

최종적으로는 48이 됩니다.

```js
addNumber(1)
  .then(function (number) {
    return number * 2;
  })
  .then(function (number) {
    return number * 3;
  })
  .then(function (number) {
    return number * 4;
  })
  .then(function (number) {
    console.log(number); // 48
  });
```

Promise의 `resolve`만 `then` 메서드에 전달할 수 있는 것이 아니라 `return`을 사용하여 다음 `then` 메서드에 값을 전달할 수 있다는 것을 이해해야 합니다.

처음 `addNumber`를 Promise를 사용하지 않고 단순히 `return`을 실행한 경우에는 당연히 오류가 발생합니다.

`then` 메서드 내에서 `return`을 사용하여 다음 처리에 값을 전달하려면, 첫 번째 함수는 Promise 함수여야 합니다.

```js
const addNumber = function (number) {
  return number + 1;
};

addNumber(1)
  .then(function (number) {
    return number * 2;
  })
  .then(function (number) {
    return number * 3;
  })
  .then(function (number) {
    return number * 4;
  })
  .then(function (number) {
    console.log(number);
  });

// 오류
```

여러 Promise 처리의 결과를 한 번에 받으려면 `Promise.all`을 사용할 수 있습니다.

```js
Promise.all([addNumber(1), addNumber(2), addNumber(3)]).then(function (result) {
  console.log(result); // [2, 3, 4]
});
```

이렇게 Promise는 연결함으로써 첫 번째 처리(`yaksok`)의 결과가 다음 처리(`catchTrain`)에 전달되는 것을 확인할 수 있었습니다.

이는 Promise의 중요한 특성 중 하나로, 비동기 작업을 순차적으로 처리하고 그 결과를 체인처럼 연결할 수 있게 해줍니다.

이를 통해 비동기 코드를 마치 동기 코드처럼 읽고 작성할 수 있게 됩니다.

이는 코드의 가독성을 크게 향상시키며, 복잡한 비동기 로직을 더 쉽게 관리할 수 있게 해줍니다.

이러한 특성 덕분에 Promise는 자바스크립트에서 비동기 처리를 다루는 데 있어 핵심씨적인 개념이 되었습니다.

끝.
