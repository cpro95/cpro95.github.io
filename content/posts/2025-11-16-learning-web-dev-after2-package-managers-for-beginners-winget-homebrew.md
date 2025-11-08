---
title: 웹 개발 배우기 번외 2편 - 개발자 필수 교양, 패키지 매니저 시작하기
date: 2025-11-16T16:50:00+09:00
description: 소프트웨어 설치와 관리를 혁신적으로 바꿔주는 패키지 매니저의 개념을 알아봅니다. WinGet, Homebrew 등 운영체제별 대표적인 패키지 매니저를 소개하고, 강력한 셸 명령어 curl을 설치하고 사용해 봅니다.
series: ["웹 개발 배우기 번외"]
weight: 2
tags:
    - 패키지 매니저
    - WinGet
    - Homebrew
    - curl
    - 소프트웨어 설치
    - 개발 환경
---
![웹 개발 배우기 번외 2편 - 개발자 필수 교양, 패키지 매니저 시작하기
](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

이번 챕터에서는 '패키지 매니저'를 설치할 건데요.

이를 통해 온갖 종류의 소프트웨어에 접근할 수 있게 됩니다.


## 패키지 매니저란 무엇일까요?
'소프트웨어 패키지'는 운영체제를 위한 기능, 예를 들어 새로운 셸 명령어 같은 것을 포함하는데요.

이름에서 알 수 있듯이, '패키지 매니저'는 우리가 패키지를 관리하는 것을 도와줍니다.

새로운 패키지를 설치하고, 설치된 패키지를 나열하며, 패키지를 제거하는 등의 작업을 할 수 있거든요.


널리 사용되는 몇 가지 패키지 매니저는 다음과 같습니다.

*   **윈도우**: 윙겟(WinGet)

*   **맥OS**: 홈브루(Homebrew)

*   **리눅스**: 다양한 패키지 매니저가 있습니다.

    사용 중인 배포판에 가장 적합한 것을 찾아야 합니다.


## 중요한 셸 명령어 `curl`
HTTP(S)로 작업할 때 아주 유용한 셸 명령어가 하나 있는데요.

바로 `curl`입니다.

이미 운영체제에 설치되어 있을 수도 있거든요.

다음과 같이 확인할 수 있습니다.

```bash
curl -h
```
오류 메시지가 나타나지 않는다면 `curl`은 이미 설치되어 있는 겁니다.


### 패키지 매니저를 통해 `curl` 설치하기
다음과 같이 `curl`을 설치할 수 있는데요.

*   **윙겟(WinGet)**: `cURL.cURL`

*   **홈브루(Homebrew)**: `curl`


### `curl` 사용하기
`curl`을 빠르게 한번 시험해 보겠습니다.

가장 간단한 사용법은 다음과 같은데요.

웹에서 리소스를 다운로드하여 터미널에 출력합니다.

```bash
curl https://example.com
```
`curl`에는 훨씬 더 많은 기능이 있거든요.

더 많은 정보는 curl.se에서 확인해 보세요.
