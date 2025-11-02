---
title: 웹 개발 배우기 기초 3편 - 화면을 지배하는 기술, CSS 레이아웃 완벽 가이드
date: 2025-11-14T15:54:00+09:00
summary: CSS 레이아웃의 핵심인 플렉스박스와 그리드의 기본 개념과 사용법을 배우고, 미디어 쿼리와 컨테이너 쿼리를 통해 반응형 디자인을 구현하는 방법을 알아봅니다.
tags: CSS 레이아웃, 플렉스박스, CSS 그리드, 반응형 디자인, 미디어 쿼리, 컨테이너 쿼리
tags: ["CSS 레이아웃", "플렉스박스", "CSS 그리드", "반응형 디자인", "미디어 쿼리", "컨테이너 쿼리"]
---

# 웹 개발 배우기 기초 3편 - 화면을 지배하는 기술, CSS 레이아웃 완벽 가이드

![웹 개발 배우기 기초 3편 - 화면을 지배하는 기술, CSS 레이아웃 완벽 가이드
](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

CSS는 웹 콘텐츠를 위한 다양한 서비스를 제공하는데요.

지난 챕터에서는 색상, 서체 등을 변경하여 콘텐츠의 서식을 지정하는 데 CSS를 사용했습니다.

이번 챕터에서는 페이지에 HTML 요소를 배치하는, 즉 콘텐츠의 '레이아웃'을 잡는 데 CSS를 사용할 겁니다.


이 블로그 포스트에 있는 거의 모든 다이어그램은 HTML과 CSS를 통해 만들어졌거든요.

원본은 `html/css-layout.html`에서 확인하실 수 있습니다.


## CSS 레이아웃이란 무엇일까요?
'콘텐츠 레이아웃을 잡는다'는 것은 실제로 무엇을 의미할까요?

HTML 요소들을 페이지에 특정 방식으로 배치하고 싶은 두 가지 예시를 살펴보겠습니다.


### CSS 레이아웃 예시 가로 링크 목록
첫 번째 예시는 링크들 사이에 간격이 있는 가로 링크 목록인데요.

점선으로 된 회색 테두리는 링크들을 담고 있는 `<div>`의 (보이지 않는) 경계를 보여줍니다.

![웹 개발 배우기 기초 3편 - 화면을 지배하는 기술, CSS 레이아웃 완벽 가이드](https://blogger.googleusercontent.com/img/a/AVvXsEhyrntjoHzPMUHPj1jyluy1GLRopUPAxD7QAiT7eYZrFBBZY456rmP-LR4BpU3P4UmOCTMOVfwSUvLUJoXVcdOp1eApW0Unplljoviw5AbRZkC6zLnNs3GQblWS1X-ncCbMuk3hVUKwTJVExY4R1IR87S-ggiA1vdtV57A3NLPqAXxHquMvuOqrL-lEek4=s16000)

우리는 CSS에게 "링크들을 가로 한 줄로 배치하고, 그 사이에 간격을 넣어줘"라고 말하고 싶은 건데요.

바로 'CSS 플렉서블 박스(플렉스박스) 레이아웃'이 이런 작업을 도와줍니다.


### CSS 레이아웃 예시 콘텐츠와 사이드바
두 번째 예시는 페이지 왼쪽에 고정된 좁은 공간을 차지하는 사이드바인데요.

나머지 공간은 실제 콘텐츠가 차지합니다.


![웹 개발 배우기 기초 3편 - 화면을 지배하는 기술, CSS 레이아웃 완벽 가이드](https://blogger.googleusercontent.com/img/a/AVvXsEjxdl1ud8cv2ZfqxGe05r7TIx-M-WjSJn_aJ0LOFoj1lkqd6bbIe-sZj1k_h79PSL9jgP0HROhaDKV_sqYttrIKbecUmP3c5P_1KK8CTDu6VLxzPp2h_3_kGIp-sdLdBkp5_OdKaaX6yZV5XvgmmcdUqog2T78v4OzNoWiz1BHYMVVGrdY7aMIEAyjfaP0)

이번에는 CSS에게 "두 개의 열과 하나의 행으로 이루어진 그리드가 있어. 첫 번째 열은 좁은 고정 너비를 갖고, 두 번째 열은 페이지에 맞게 최대한 넓게 해줘"라고 말하고 싶은 건데요.

'CSS 그리드 레이아웃'이 바로 이런 2차원 그리드 위에 HTML 요소를 배치할 수 있게 해줍니다.


## CSS 레이아웃 용어
### 레이아웃 컨테이너 vs. 레이아웃 아이템
CSS 레이아웃은 이렇게 동작하는데요.

바깥쪽 HTML 요소가 우리가 배치하고 싶은 자식 요소들을 포함합니다.

```html
<div class="container">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>
```
바깥쪽 HTML 요소를 '컨테이너', 그 자식 요소들을 '아이템'이라고 부르거든요.

우리는 `display` 속성을 통해 레이아웃을 활성화합니다.

```css
.container {
  display: flex;
}
```
이렇게 하면 `.container` 내부의 요소들이 배열되는 방식이 바뀝니다.


### CSS 축 인라인(행) vs. 블록(열)
CSS는 모든 쓰기 시스템이 왼쪽에서 오른쪽으로, 위에서 아래로 흐르지 않는다는 점을 고려하는데요.

그래서 '인라인 축'과 '블록 축'을 구분합니다.


'인라인 축'은 `<strong>`과 같은 인라인 HTML 요소가 흐르는 방향인데요.

영어에서는 왼쪽에서 오른쪽으로 흐릅니다.

'행(row)'이라는 용어는 인라인 축의 동의어입니다.


'블록 축'은 `<p>`와 같은 블록 HTML 요소가 흐르는 방향인데요.

영어에서는 위에서 아래로 흐릅니다.

'열(column)'이라는 용어는 블록 축의 동의어입니다.


## CSS 플렉서블 박스 (플렉스박스) 레이아웃
CSS 플렉서블 박스 레이아웃(줄여서 플렉스박스 레이아웃)은 1차원 레이아웃인데요.

가장 일반적인 사용 사례는 다음과 같습니다.


*   HTML 요소 시퀀스를 간격을 두고 한 줄(가로)로 배열하기

*   HTML 요소 시퀀스를 간격을 두고 한 열(세로)로 배열하기


### 기본적인 플렉스박스 사용법
플렉스박스를 사용하기 위해 필요한 CSS 속성들은 다음과 같은데요.


*   `display: flex`: 플렉스박스 레이아웃을 활성화합니다.

*   `flex-direction`: 레이아웃 아이템들이 컨테이너 내부에서 흐르는 방향을 지정합니다.

*   `justify-content`: 주축(main axis)을 따라 아이템들을 분배합니다.

*   `align-items`, `align-self`: 교차축(cross-axis)을 따라 아이템들을 정렬합니다.

*   `gap`: 아이템들 사이에 고정된 간격을 삽입합니다.


![](https://blogger.googleusercontent.com/img/a/AVvXsEiTAozO6t0IT2AfYjpFQxLSgYXQR5qCkPEt6055MRCiB4wQfvBuXozXKz3YXlmicUGd7HOVBYERVLxxJ9568IF_cdnp78IKxLvmCYGP1LESWWkMvSfZarW9MQTJQ89DkAoPzoQdonQmUMZwBvlGlRn5nD0lRygOiYi3ZyU59fwyls-Qmasegy7Qh6aTZuA=s16000)

`display: flex;`와 `flex-direction: column;`을 사용하면 인라인 요소들을 수직으로 배열할 수 있는데요.

![](https://blogger.googleusercontent.com/img/a/AVvXsEi45pMGzQeUwiqiyHGWB4uFdA8GsQ45Cbkj61EZSOdJNj11a7NWmXPNwjId47FiYrLrNrIv300FnLMJ2pzICqn8H3DnVmnqfpADvF4mGQu38we-Smm9JvkLQVcn_Yzhpz2XOKZGIX2hg7fP2mjp0HGntezsDy7q4O2w5OBYe-pN9oa2kmlJx4AFtaJbB7M=s16000)

흥미롭게도 플렉스박스는 자식 요소가 인라인인지 블록인지 신경 쓰지 않습니다.


![](https://blogger.googleusercontent.com/img/a/AVvXsEiT8amQF55oz0FYWIQ8G9_s1kCDwEBvcRzVkQWZeBCjNSgEy-8TyLcil5Ips7H2foLFJLS77J7hokCOoDIj1jDpSrxXz0PDdvLN4Nej31NeutyTVu3eoFVdUw3hyHDbemCakuZvkoMOShh-xaSJEo6JDCzMTIBY2fBa0SCSRSofI24Lno2tLdg4bUxFn8w=s16000)

`justify-content` 속성은 주축을 따라 남는 공간을 어떻게 분배할지 결정하는데요.

`space-between`(아이템 사이에만 균등하게), `space-around`(각 아이템의 양옆에), `space-evenly`(시작, 사이, 끝 모두 균등하게) 등의 값을 가집니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEgQarjKiYfhO3THC62obs2DvBYe1G-Jm-XVCykLomv8Un1kYRfDYzL2SSfOlrXVO2o91OQAf1Ds8iB8yZ_7mAAwxpq7yN3rqvHSLKsKH8Umze36JCB0YEEicJrLmleWKnhAO0h8t-Nb-kK_WODVsIPrsBfML97tf6d9x2ycj_cdk00Kg2Y8bIhLGedXuzE=s16000)

`align-items`는 교차축을 따라 모든 아이템을 정렬하는데요.

`stretch`(기본값, 교차축 방향으로 최대한 늘어남), `center`(가운데 정렬), `flex-start`(시작점 정렬), `flex-end`(끝점 정렬) 등의 값을 가집니다.


`align-self`를 사용하면 개별 아이템의 정렬을 `align-items`의 기본값과 다르게 지정할 수 있습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEilxvB9SjQf5E0psG9_ZP5nezT2MMrzk6b0gj-qGRGXjSfUaAr--ej2zWoUpK-bWX4sXoLXdXj3FPkeCeZXuo-nNuA7bq-uFMja_BAbK648bTLqIyJ4h1rnZ2ArpHg932oxbXBXPmfweFpxiFnGWUTAmBFKTD4GGE99Gcn0wJZo-v6r3qh0W0WfFQsDaB8=s16000)

### 아이템 줄 바꿈
`flex-wrap` 속성을 `wrap`으로 설정하면, 아이템들이 한 줄에 다 들어가지 않을 때 다음 줄로 넘어가게 할 수 있는데요.

![](https://blogger.googleusercontent.com/img/a/AVvXsEjJ7ez2CTizffkhiY-LFhVC5WdXYjDFwnjXb3d2To486N2gvSkiY7S6XpM3zMXTATjZzSlM_zEVWo7QitSaBnCcTmc3rIIvuXKvv3INuZhN6-AQSigF0EMGEkv5ac3wYGs-LRHg5OkEKwJ34b0saQh2Ift309qwPE6zD56IdTiD1715FR2gFty3XPmVkdk=s16000)

이렇게 줄 바꿈이 활성화되면 `align-content` 속성을 사용해 여러 줄 사이의 간격을 분배할 수 있습니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEj0Z55QYmFlf_oW1tShQUOoTvsCIdSVhtWUxLstAdL6xVE6OFPRKOAyFHQ77ABzf2ksURNUA6_WcXzqRTArF7GtNy0JEgnk2eWGyoY-a4NXAECaIC7tazPwEVtITAsBsTrYpIC0L9o5lr6dFEL_kVz57FlIQRjcjTr_LdHaVRToet6-ZMyj_cOZ_nQCoyo=s16000)

## CSS 그리드 레이아웃
플렉스박스가 주로 1차원 레이아웃에 사용되는 반면, 그리드는 2차원 레이아웃을 위한 것인데요.

컨테이너가 그리드를 정의하고 아이템들이 그 위에 배치됩니다.


### 그리드 레이아웃 예시
그리드 레이아웃이 어떻게 동작하는지 탐색하기 위해, 다음과 같은 레이아웃을 만들어 보겠습니다.


![](https://blogger.googleusercontent.com/img/a/AVvXsEhrky6HBZfpf5hCjZTIZmau9Fke7EA189xjcD0YYyrKjS9A_jBBuZwBjP3__Tgo8ZEQvYW88y2XNUHF40ESJocGG7OphjCeyIt1VsTDwb7U6tSqpFcbIoNPHManJW6QhX_SbICTPmPWfWr_z7os8JubeS87tVWpUQFFETcoI4YU0vr3gDB3i26RzGVhqH0=s16000)

### 그리드 레이아웃 활성화하고 정의하기
다음 CSS는 그리드를 설정하는데요.

```css
.container {
  display: grid;
  grid-template-columns: 3.5rem 1fr 3.5rem;
  grid-template-rows: 1.5rem 1fr 1.5rem;
}
```
`grid-template-columns`와 `grid-template-rows` 속성으로 그리드의 열과 행의 크기를 정의합니다.

`3.5rem`처럼 고정된 크기를 사용할 수도 있고, `1fr`(fraction, 비율) 단위를 사용해 남은 공간을 비율에 따라 나눠 갖도록 할 수도 있습니다.


![](https://blogger.googleusercontent.com/img/a/AVvXsEjkfP62saoE04G5HB0FQ3CP0rf1RVabSonD475dkeF8rO-cLEut9jeHw1Aelc6xkl8CT9YopQ6_EvAhIHa9Psvk6RCm4vOsi4ue97PjUOH3ErTbSD_94-pVE6NHGHBb0CdS-wePxIjEdcldh31IBUlMIgj1tBSqN4GfwL_v7dAAQLbD295qlDgylY3Lx9g=s16000)

### 그리드에 아이템 배치하기
그리드에 아이템을 배치하는 방법은 여러 가지가 있는데요.


*   **선을 이용한 배치**: `grid-column-start`, `grid-column-end` 등으로 각 아이템이 몇 번째 줄에서 시작해서 몇 번째 줄에서 끝나는지 지정합니다.

*   **그리드 영역을 이용한 배치**: `grid-template-areas` 속성으로 그리드에 이름 붙은 영역을 정의하고, 각 아이템이 어떤 영역을 차지할지 `grid-area` 속성으로 지정합니다.

*   **자동 배치**: 아이템을 명시적으로 배치하지 않으면, 그리드 레이아웃이 자동으로 셀마다 하나씩 배치합니다.



### 정렬
그리드 레이아웃의 정렬 속성들은 플렉스박스와 유사한 개념을 사용하는데요.

`justify-*`는 인라인 축(가로) 방향의 정렬을, `align-*`은 블록 축(세로) 방향의 정렬을 다룹니다.


*   `justify-items`, `align-items`: 셀 '안에서' 아이템을 어떻게 정렬할지 지정합니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEjMLONsaX09ZJnBP6VtwaDlnB5qVcX3JRO1GYnZgPHtG4ulD6eqT6qPooRPcWL4FBRPUKe4Pqv29zxlu3BBsDJinA1ZLDcMXFqcH4YdD8JHOtGiC5xw8yc0AFyYHyc00tjViGfwEuOMznlGB4j_ULmZZxpYOSdU2kT9zVQoJNfKAdSmnFjMULpz-urMIPY=s16000)

*   `justify-content`, `align-content`: 그리드 '전체'가 컨테이너보다 작을 때, 남는 공간을 트랙(열/행)들 사이에 어떻게 분배할지 지정합니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEgmwUrCb9C0SS4nOulvGEk3ZCoj3Lup2N7G3ZE4YBkYnXLZyQIWfvDUUKUVooO0TJDFkN2WANwDQZHCuLBF69BCIzcy8xtOKtWlsRj9H2jQ3H9vqg2JN6XBDbaoQ-ll73sYKAhUcw7ZlZnZphjV-JcaXuYMzD9oqf_3RAiucZsnICQyyAPy6sWMJGgYy2U=s16000)

### 플렉스박스 vs. 그리드 선택하기
어떤 CSS 레이아웃 메커니즘을 사용해야 할지 어떻게 결정할 수 있을까요?

간단한 간격 조절에는 `margin`, `padding` 같은 속성만으로도 충분할 수 있습니다.


플렉스박스는 다음과 같은 명확한 사용 사례가 있는데요.

*   간격이 있는 단일 행의 HTML 요소들

*   필요에 따라 여러 줄로 줄 바꿈되는 간격이 있는 행

*   간격이 있는 열


대부분의 다른 경우에는 그리드가 잘 작동합니다.

종종 우리는 단일 레이아웃 사용 사례가 아닌, 중첩된 여러 사례에 직면하게 되거든요.

예를 들어, 최상위 레이아웃은 그리드일 수 있지만, 그 그리드에는 중첩된 플렉스박스로 배치된 요소들의 열이 포함될 수 있습니다.


## 레이아웃 예제들

### 콘텐츠 수평 및 수직 중앙 정렬
플렉스박스를 사용하면 콘텐츠를 수평 및 수직으로 중앙 정렬하는 것이 아주 간단해지는데요.

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
`justify-content`는 인라인 축을 따라, `align-items`는 블록 축을 따라 중앙 정렬합니다.


![](https://blogger.googleusercontent.com/img/a/AVvXsEjr7m46GqQ_vNpOGuhCn2Zcjt_JW5nyp4_MXM36eLExdfrYjKIukeA-ACW2tqJR2vmTLimiEMCekU8ruuC9a34hOhE2B4KNupZZXPmJXzRq5sgt5kHTh6gGO2T05s_JS4BOhdr6I4eLULmZAiwA4JNUYwY0VAu-C3Lj_HFxOSUnGDRbTd6pk4Gm1wyc5Qw=s16000)

![](https://blogger.googleusercontent.com/img/a/AVvXsEg40Ed-WNSWdfuDGZQFkvX54_QVVbNO57kmzSwoM_xQAVBTcelANj9v39k5tbySAQAu9j7YygW1SZce_hUTP-MB4XCHabSbuB-4W8bPtkl0bnPPYI-WI92PnG00aC1BpcbhlpNFqRjKqTNWouyYDZbAkoc65u1JOh3TWRZ0Fv9MpourQP9wgnhKcvZkbE4=s16000)


### 레이블과 텍스트 필드 정렬하기
그리드를 사용하면 레이블과 텍스트 필드를 깔끔하게 정렬할 수 있는데요.

```css
.container {
  display: grid;
  grid-template-columns: min-content min-content;
  gap: 0.5rem;
}
```
`grid-template-columns: min-content min-content;`는 각 열이 그 안의 콘텐츠만큼만 너비를 갖도록 만듭니다.

![](https://blogger.googleusercontent.com/img/a/AVvXsEjWzbBc5AH9IIeabrNwbyMEJLvz-NP20SrdvuMpllRO8fz5_kOxrOqZTU6gZv6QlQ782zTzrYfvVz39flPbQXH-LjsjAks9M9MMWBuAVCe4P62BWF23N2wtIjXxcQxt8_SDzHIu3V2Szntbr1T9FtPTSkaxLYs5PdBJ3QmkRroITYU7a09dCmKTRMNA6Tg=s16000)

## CSS 쿼리를 통한 반응형 디자인
'반응형 디자인'의 아이디어는 화면 크기에 유연하게 적응하는 단일 디자인을 사용하는 것인데요.


### 미디어 쿼리 뷰포트 크기에 적응하기
미디어 쿼리는 화면 크기와 같은 기준에 따라 다른 CSS 선언을 활성화하는데요.

```css
@media (width < 1024px) {
  /* 뷰포트 너비가 1024px보다 작을 때만 적용될 선언들 */
}
```
이를 이용하면 뷰포트가 특정 너비(중단점, breakpoint)보다 좁아졌을 때, 사이드바를 콘텐츠 옆이 아닌 아래로 이동시키는 등의 레이아웃 변경을 구현할 수 있습니다.


### 컨테이너 쿼리
미디어 쿼리가 뷰포트 크기 변화에 반응하는 반면, '컨테이너 쿼리'는 HTML 요소의 크기 변화에 반응하는데요.

이는 단일 HTML 요소 자체가 반응형이 될 수 있다는 것을 의미합니다.


```css
.wrapper {
  container-type: size;
  container-name: wrapper;
}
.layout {
  @container wrapper (width < 300px) {
    /* .wrapper의 너비가 300px보다 작을 때 적용될 선언들 */
  }
}
```
이를 활용하면 연락처 카드 같은 컴포넌트가 자신이 놓인 공간의 크기에 따라 수평 레이아웃에서 수직 레이아웃으로 바뀌거나, 특정 정보(설명 등)를 숨기는 등의 동작을 스스로 결정하게 만들 수 있습니다.

## 더 많은 CSS 레이아웃 기능들
우리는 CSS 레이아웃 메커니즘을 포괄적으로 살펴보았지만, 이 외에도 더 많은 기능들이 있는데요.

플렉스박스의 `flex-grow` 속성이나 그리드의 `subgrid` 기능, 그리고 뷰포트 단위 등이 그 예입니다.


CSS의 방대한 기능에 압도당하지 않기 위한 팁은, 대부분의 기능에 대해 그것이 '무엇을 하는지' 정도만 인지하고 있다가, 실제로 필요할 때 세부 사항을 그 자리에서 배우는 것인데요.

보통은 '미리 학습'하는 것보다 이것이 더 효과적입니다.
