---
title: 프론트엔드 디벨로퍼를 위한 웹 기술의 역사 간단하게 이해하기
pubDatetime: 2024-02-13T10:21:36.529Z
postSlug: 2024-02-13-brief-understanding-web-technology
featured: false
draft: false
tags:
  - web
description: 배웠던 내용 복습차원에서 웹 기술의 역사를 정리해 보았습니다.
---

안녕하세요?

프론트엔드 디벨로퍼가 되기로 마음먹었을 때부터 생소한 웹 관련 용어 공부하면서 정리해 보았습니다.

- [1. 웹이란 무엇인가](#1-웹이란-무엇인가)
  - [1.1. 웹의 용도](#11-웹의-용도)
  - [1.2. 웹을 지탱하는 기본적인 3가지 기술](#12-웹을-지탱하는-기본적인-3가지-기술)
  - [1.3. 웹의 특징](#13-웹의-특징)
- [2. 웹의 역사](#2-웹의-역사)
  - [2.1. 웹 이전](#21-웹-이전)
  - [2.2. 인터넷](#22-인터넷)
  - [2.3. 하이퍼미디어](#23-하이퍼미디어)
  - [2.4. 분산 시스템](#24-분산-시스템)
  - [2.5. 웹의 탄생](#25-웹의-탄생)
  - [2.6. 웹의 표준화](#26-웹의-표준화)
  - [2.7. 웹 API를 둘러싼 논쟁 'SOAP VS REST'](#27-웹-api를-둘러싼-논쟁-soap-vs-rest)
  - [2.8. 그리고 현재](#28-그리고-현재)
  - [2.9. 부연설명: 하이퍼미디어 포맷의 역사](#29-부연설명-하이퍼미디어-포맷의-역사)
- [3. REST](#3-rest)
- [4. REST라는 아키텍처 스타일](#4-rest라는-아키텍처-스타일)
  - [4.1. REST에서 중요한 '리소스'라는 개념](#41-rest에서-중요한-리소스라는-개념)
  - [4.2. REST를 구성하는 특징](#42-rest를-구성하는-특징)
- [5. URI](#5-uri)
  - [5.1. URI의 포인트](#51-uri의-포인트)
  - [5.2. URL과의 차이(URI와 URL과 URN)](#52-url과의-차이uri와-url과-urn)
  - [5.3. 구성](#53-구성)
- [6. HTTP의 기본](#6-http의-기본)
  - [6.1. HTTP란](#61-http란)
  - [6.2. TCP/IP란](#62-tcpip란)
  - [6.3. IP](#63-ip)
  - [6.4. TCP](#64-tcp)
  - [6.5. HTTP의 버전](#65-http의-버전)
  - [6.6. HTTP의 구조 ①클라이언트와 서버](#66-http의-구조-클라이언트와-서버)
  - [6.7. HTTP의 구조 ②요청과 응답](#67-http의-구조-요청과-응답)
    - [6.7.1. 클라이언트 측](#671-클라이언트-측)
    - [6.7.2. 서버 측](#672-서버-측)
  - [6.8. HTTP의 구조 ③HTTP 메시지](#68-http의-구조-http-메시지)
    - [6.8.1. 요청 메시지](#681-요청-메시지)
    - [6.8.2. 응답 메시지](#682-응답-메시지)
    - [6.8.3. HTTP의 구조 ④스테이트리스성](#683-http의-구조-스테이트리스성)
  - [6.9. 스테이트풀](#69-스테이트풀)
  - [6.10. 스테이트리스](#610-스테이트리스)
- [7. 메소드](#7-메소드)
  - [7.1. 8가지의 메소드](#71-8가지의-메소드)
  - [7.2. 대표적인 메소드](#72-대표적인-메소드)
  - [7.3. POST와 PUT의 구분(생성 처리)](#73-post와-put의-구분생성-처리)
    - [7.3.1. POST](#731-post)
    - [7.3.2. PUT](#732-put)
  - [7.4. PUT/DELETE의 POST에 의한 대용](#74-putdelete의-post에-의한-대용)
    - [7.4.1. 왜 대용을 생각하는가](#741-왜-대용을-생각하는가)
    - [7.4.2. 대용 방법](#742-대용-방법)
    - [7.4.3. 조건부 요청](#743-조건부-요청)
  - [7.5. 멱등성(Idempotence)과 안전성](#75-멱등성idempotence과-안전성)
    - [7.5.1. 멱등성](#751-멱등성)
    - [7.5.2. 안전성](#752-안전성)
    - [7.5.3. POST](#753-post)
  - [7.6. 요약](#76-요약)
- [8. 상태 코드](#8-상태-코드)
  - [8.1. 분류와 자주 쓰이는 코드](#81-분류와-자주-쓰이는-코드)
    - [8.1.1. 1xx: 처리 중](#811-1xx-처리-중)
    - [8.1.2. 2xx: 성공](#812-2xx-성공)
    - [8.1.3. 3xx: 리다이렉트](#813-3xx-리다이렉트)
    - [8.1.4. 4xx: 클라이언트 에러](#814-4xx-클라이언트-에러)
    - [8.1.5. 5xx: 서버 에러](#815-5xx-서버-에러)
- [9. HTTP 헤더](#9-http-헤더)
  - [9.1. HTTP 헤더의 의미](#91-http-헤더의-의미)
  - [9.2. HTTP 헤더의 역사](#92-http-헤더의-역사)
    - [9.2.1. 메일과 공통으로 있는 헤더가 있다](#921-메일과-공통으로-있는-헤더가-있다)
    - [9.2.2. 날짜 헤더](#922-날짜-헤더)
    - [9.2.3. MIME 미디어 타입](#923-mime-미디어-타입)
    - [9.2.4. Content-Type](#924-content-type)
    - [9.2.5. 언어 지정 헤더](#925-언어-지정-헤더)
  - [9.3. 콘텐츠 네고시에이션](#93-콘텐츠-네고시에이션)
    - [9.3.1. 클라이언트와 서버가 협상하여 미디어 타입이나 문자 인코딩, 언어 태그를 정할 수도 있다](#931-클라이언트와-서버가-협상하여-미디어-타입이나-문자-인코딩-언어-태그를-정할-수도-있다)
    - [9.3.2. Content-Length](#932-content-length)
    - [9.3.3. 청크 전송](#933-청크-전송)
  - [9.4. 인증](#94-인증)
    - [9.4.1. Basic 인증](#941-basic-인증)
    - [9.4.2. Digest 인증](#942-digest-인증)
    - [9.4.3. WSSE 인증](#943-wsse-인증)
    - [9.4.4. 부가설명: OAuth](#944-부가설명-oauth)
    - [9.4.5. 캐시](#945-캐시)
    - [9.4.6. 헤더에 가지는 정보](#946-헤더에-가지는-정보)
    - [9.4.7. ETag](#947-etag)
  - [9.5. 구성](#95-구성)
    - [9.5.1. HTML](#951-html)
    - [9.5.2. microformats](#952-microformats)
    - [9.5.3. Atom](#953-atom)
    - [9.5.4. Atom Publishing Protocol(AtomPub)](#954-atom-publishing-protocolatompub)
    - [9.5.5. JSON](#955-json)
- [10. HTML](#10-html)
  - [10.1. HTML의 미디어 타입](#101-html의-미디어-타입)
    - [10.1.1. text-html](#1011-text-html)
    - [10.1.2. application/xhtml\*xml](#1012-applicationxhtmlxml)
    - [10.1.3. XML의 사양](#1013-xml의-사양)
    - [10.1.4. HTML의 구성](#1014-html의-구성)
    - [10.1.5. 헤더](#1015-헤더)
    - [10.1.6. 바디](#1016-바디)
  - [10.2. 링크](#102-링크)
    - [10.2.1. 요소(앵커)](#1021-요소앵커)
    - [10.2.2. 요소](#1022-요소)
      - [폼](#폼)
    - [10.2.3. rel속성](#1023-rel속성)
- [11. JSON](#11-json)
  - [11.1. JSON이란](#111-json이란)
    - [11.1.1. 미디어 타입](#1111-미디어-타입)
    - [11.1.2. 사용 가능한 데이터 타입](#1112-사용-가능한-데이터-타입)
  - [11.2. JSONP에 의한 크로스 도메인 통신](#112-jsonp에-의한-크로스-도메인-통신)
    - [11.2.1. 크로스 도메인 통신이란](#1121-크로스-도메인-통신이란)
    - [11.2.2. script요소에 의한 해결 방법](#1122-script요소에-의한-해결-방법)

---

## 1. <a name=''></a>웹이란 무엇인가

### 1.1. <a name='-1'></a>웹의 용도

- 사람을 위한 것

  - 웹 사이트: 야후나 아마존 같은 거
  - 각종 디바이스의 설정 화면
    　　: 프린터 같은 네트워크에 연결하는 디바이스의 설정(PC가 리모컨 같은 거보다 효율적)

- 프로그램을 위한 것
  - 프로그램용 API: 프로그램으로 해석하고 처리하는 거. 데이터 형식은 JSON이나 XML 같은 거. 여기서는 '웹 API'라고 표현함.

### 1.2. <a name='3'></a>웹을 지탱하는 기본적인 3가지 기술

HTTP: 애플리케이션 프로토콜. URI로 조작 대상을 지정하고, 정보를 가져오는 거

URI: 리소스 식별자. HTML의 링크로 사용되고, 정보의 위치를 가리키는 거

HTML: 하이퍼미디어 형식. 정보를 표현하는 거. HTTP로 주고받는 거

### 1.3. <a name='-1'></a>웹의 특징

- 하이퍼미디어의 하나라는 거: 하이퍼링크로 다양한 미디어를 엮고, 비선형적으로 사용자가 스스로 링크를 선택하는 거
  　⇔ 반대의 예: 책이나 영화. 앞에서부터 차례로 읽거나 보거나 하는 거

- 분산 시스템이라는 거: 세계 곳곳에 배치된 서버에 세계 곳곳의 브라우저가 접속할 수 있는 거. 프로토콜이 간단한 거가 특징
  - 분산 시스템: 여러 컴퓨터를 조합해서 처리를 분산시키는 형식. 엄청난 정보의 조작, 여러 컴퓨터 위의 정보를 일원적으로 다루는 거 등이 가능 ⇔ 집중 시스템: 한 대의 중앙 컴퓨터가 모든 걸 처리

---

## 2. <a name='-1'></a>웹의 역사

### 2.1. <a name='-1'></a>웹 이전

초기의 인터넷에는 웹이 없었다

### 2.2. <a name='-1'></a>인터넷

- 기원은 1969년, 미국 내의 대학 등의 사이를 회선 연결해 전미를 잇는 네트워크가 존재했다
- 메일은 영숫자만. TCP/IP(실시간 통신)뿐만 아니라 UUCP(버킷 릴레이 방식)도 존재했기 때문에 메일 도착에 지연이 있었다
- 파일 교환을 위한 FTP, UNIX 호스트에 원격 접속하기 위한 telnet 등도 탄생했다

### 2.3. <a name='-1'></a>하이퍼미디어

- 1945년의 미국 연구자가 제안했던 것(정보 검색 시스템에 관한 논문. 책이나 파일을 상호 링크로 따라갈 수 있음)
- 1965년에 Nelson이 하이퍼미디어를 고안(Xanadu). 하지만 개발은 실패로 끝남
- 1987년, Apple에서 HyperCard가 개발됐다. 네트워크로 데이터를 주고받는 기능은 없었다
- 당시 웹은 링크가 끊어질 가능성이 있다는 등 불완전하다고 생각되었지만, 필요 최소한의 링크 기능만을 갖추고 있었기 때문에 현재 보급되고 있다. 위의 것들은 복잡한 것이 문제점이었다고 할 수 있다

### 2.4. <a name='-1'></a>분산 시스템

- 통신 상대가 어느 정도 한정되어 있는 인트라넷 환경까지만 작동했다

### 2.5. <a name='-1'></a>웹의 탄생

- 1990년, 하이퍼미디어를 이용한 인터넷 기반의 분산 정보 관리 시스템으로 제안됐다
- 1993년, IE나 Firefox의 원류가 되는 브라우저 Mosaic가 공개되고, 웹의 보급이 진행됐다
- 웹과 웹 이전의 시스템의 차이는, '인터넷을 이용한' 하이퍼미디어로 설계된 것이다
- 인터넷을 이용함으로써, 불특정 다수의 정보를 링크로 서로 연결할 수 있게 됐다
- HTTP를 이용해 클라이언트와 서버 사이의 인터페이스를 고정함으로써, 불특정 다수의 클라이언트에게 서비스를 제공할 수 있게 됐다

### 2.6. <a name='-1'></a>웹의 표준화

- 여러 기업이 웹에 참여하게 되면서 HTTP, URI, HTML 등의 표준화가 요구되고, 1994년에 단체가 설립됐다
- '브라우저 호환'이라는 말은 이 시대부터 존재했다
- HTTP의 사양 작성에 참여했던 인물이, 웹의 성공 요인의 분석을 하고, 그 결과 하나의 아키텍처 스타일로서 'REST'를 제안했다
- HTTP는 '리소스의 상태'의 '표현'을 운반하기 위한 프로토콜이라는 개념

### 2.7. <a name='APISOAPVSREST'></a>웹 API를 둘러싼 논쟁 'SOAP VS REST'

- 1990년대 후반부터 웹의 용도의 다양화에 따라, 프로그램으로 웹을 조작하고 싶은 요구가 나오기 시작했다
- 2004년부터 시작된 웹2.0의 흐름 속에서 Google이나 Amazon이 REST 형식의 웹 API를 제공하기 시작했다
- SOAP는 메시지 전송의 방법만을 정한 사양이기 때문에, 표준화가 어려웠다
- Amazon이 2002년에 SOAP 형식과 REST 형식(정해진 URI를 HTTP로 GET하는 방식. 기술적으로는 정확하지 않지만 이렇게 불렸다)을 이용해 AWS를 개발
- 웹2.0에서는 매쉬업이 중요. 여러 웹 API가 제공하는 정보를 조합해 하나의 앱을 실현하는 방법. REST에서는 간단하게 HTTP나 URI로 리소스를 조작할 수 있었기 때문에 받아들여졌다

### 2.8. <a name='-1'></a>그리고 현재

- Ajax 등의 기술적 브레이크스루도 있어, 웹에서 UI가 통일되게 되었다
- 항상 최신의 정보를 웹을 통해 제공할 수 있다

### 2.9. <a name=':'></a>부연설명: 하이퍼미디어 포맷의 역사

- 초기의 웹에서는 HTML이 유일한 하이퍼미디어 포맷(정보의 표현 방식)이었다
- microformats: HTML의 구조는 그대로 두고 HTML에 다양한 의미를 부여할 수 있는 기술
- RSS: 웹의 최신 정보를 서버에서 배포하고 체크하는 기술. 최종적으로 Atom에 표준화됐다
- JSON: 데이터를 기술하기 위한 포맷.(HTML이나 Atom은 XML 기반의 것이기 때문에, 표기가 장황해져 데이터 표기에는 적합하지 않다)

---

## 3. <a name='REST'></a>REST

## 4. <a name='REST-1'></a>REST라는 아키텍처 스타일

- REST는 웹의 아키텍처 스타일
- 클라이언트/서버에서 파생된 것(몇 가지 제약을 더한 것)이므로, 네트워크 시스템의 아키텍처 스타일이라고 할 수 있어
- 아키텍처 스타일이란, 시스템의 아키텍처를 결정할 때의 나침반

### 4.1. <a name='REST-1'></a>REST에서 중요한 '리소스'라는 개념

- 리소스란 웹상에 존재하는, 이름을 가진 모든 정보
  - 예: 도쿄의 날씨 예보, 도쿄역의 사진, 이 블로그
- 리소스는 URI로 식별할 수 있고, 그러면 프로그램은 정보에 접근할 수 있어
- URI가 나오기 전에는, 디렉토리명이나 파일명, 로그인 정보를 전달해야 했어
- 한 리소스에 여러 URI를 붙일 수도 있어

### 4.2. <a name='REST-1'></a>REST를 구성하는 특징

<!-- TOC -->

- [<a name=''></a>웹이란 무엇인가](#a-namea%EC%9B%B9%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)
  - [<a name='-1'></a>웹의 용도](#a-name-1a%EC%9B%B9%EC%9D%98-%EC%9A%A9%EB%8F%84)
  - [<a name='3'></a>웹을 지탱하는 기본적인 3가지 기술](#a-name3a%EC%9B%B9%EC%9D%84-%EC%A7%80%ED%83%B1%ED%95%98%EB%8A%94-%EA%B8%B0%EB%B3%B8%EC%A0%81%EC%9D%B8-3%EA%B0%80%EC%A7%80-%EA%B8%B0%EC%88%A0)
  - [<a name='-1'></a>웹의 특징](#a-name-1a%EC%9B%B9%EC%9D%98-%ED%8A%B9%EC%A7%95)
- [<a name='-1'></a>웹의 역사](#a-name-1a%EC%9B%B9%EC%9D%98-%EC%97%AD%EC%82%AC)
  - [<a name='-1'></a>웹 이전](#a-name-1a%EC%9B%B9-%EC%9D%B4%EC%A0%84)
  - [<a name='-1'></a>인터넷](#a-name-1a%EC%9D%B8%ED%84%B0%EB%84%B7)
  - [<a name='-1'></a>하이퍼미디어](#a-name-1a%ED%95%98%EC%9D%B4%ED%8D%BC%EB%AF%B8%EB%94%94%EC%96%B4)
  - [<a name='-1'></a>분산 시스템](#a-name-1a%EB%B6%84%EC%82%B0-%EC%8B%9C%EC%8A%A4%ED%85%9C)
  - [<a name='-1'></a>웹의 탄생](#a-name-1a%EC%9B%B9%EC%9D%98-%ED%83%84%EC%83%9D)
  - [<a name='-1'></a>웹의 표준화](#a-name-1a%EC%9B%B9%EC%9D%98-%ED%91%9C%EC%A4%80%ED%99%94)
  - [<a name='APISOAPVSREST'></a>웹 API를 둘러싼 논쟁 'SOAP VS REST'](#a-nameapisoapvsresta%EC%9B%B9-api%EB%A5%BC-%EB%91%98%EB%9F%AC%EC%8B%BC-%EB%85%BC%EC%9F%81-soap-vs-rest)
  - [<a name='-1'></a>그리고 현재](#a-name-1a%EA%B7%B8%EB%A6%AC%EA%B3%A0-%ED%98%84%EC%9E%AC)
  - [<a name=':'></a>부연설명: 하이퍼미디어 포맷의 역사](#a-namea%EB%B6%80%EC%97%B0%EC%84%A4%EB%AA%85-%ED%95%98%EC%9D%B4%ED%8D%BC%EB%AF%B8%EB%94%94%EC%96%B4-%ED%8F%AC%EB%A7%B7%EC%9D%98-%EC%97%AD%EC%82%AC)
- [<a name='REST'></a>REST](#a-namerestarest)
- [<a name='REST-1'></a>REST라는 아키텍처 스타일](#a-namerest-1arest%EB%9D%BC%EB%8A%94-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%EC%8A%A4%ED%83%80%EC%9D%BC)
  - [<a name='REST-1'></a>REST에서 중요한 '리소스'라는 개념](#a-namerest-1arest%EC%97%90%EC%84%9C-%EC%A4%91%EC%9A%94%ED%95%9C-%EB%A6%AC%EC%86%8C%EC%8A%A4%EB%9D%BC%EB%8A%94-%EA%B0%9C%EB%85%90)
  - [<a name='REST-1'></a>REST를 구성하는 특징](#a-namerest-1arest%EB%A5%BC-%EA%B5%AC%EC%84%B1%ED%95%98%EB%8A%94-%ED%8A%B9%EC%A7%95)
- [<a name='URI'></a>URI](#a-nameuriauri)
  - [<a name='URI-1'></a>URI의 포인트](#a-nameuri-1auri%EC%9D%98-%ED%8F%AC%EC%9D%B8%ED%8A%B8)
  - [<a name='URLURIURLURN'></a>URL과의 차이URI와 URL과 URN](#a-nameurluriurlurnaurl%EA%B3%BC%EC%9D%98-%EC%B0%A8%EC%9D%B4uri%EC%99%80-url%EA%B3%BC-urn)
  - [<a name='-1'></a>구성](#a-name-1a%EA%B5%AC%EC%84%B1)
- [<a name='HTTP'></a>HTTP의 기본](#a-namehttpahttp%EC%9D%98-%EA%B8%B0%EB%B3%B8)
  - [<a name='HTTP-1'></a>HTTP란](#a-namehttp-1ahttp%EB%9E%80)
  - [<a name='TCPIP'></a>TCP/IP란](#a-nametcpipatcpip%EB%9E%80)
  - [<a name='IP'></a>IP](#a-nameipaip)
  - [<a name='TCP'></a>TCP](#a-nametcpatcp)
  - [<a name='HTTP-1'></a>HTTP의 버전](#a-namehttp-1ahttp%EC%9D%98-%EB%B2%84%EC%A0%84)
  - [<a name='HTTP-1'></a>HTTP의 구조 ①클라이언트와 서버](#a-namehttp-1ahttp%EC%9D%98-%EA%B5%AC%EC%A1%B0-%E2%91%A0%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8%EC%99%80-%EC%84%9C%EB%B2%84)
  - [<a name='HTTP-1'></a>HTTP의 구조 ②요청과 응답](#a-namehttp-1ahttp%EC%9D%98-%EA%B5%AC%EC%A1%B0-%E2%91%A1%EC%9A%94%EC%B2%AD%EA%B3%BC-%EC%9D%91%EB%8B%B5)
    - [<a name='-1'></a>클라이언트 측](#a-name-1a%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%B8%A1)
    - [<a name='-1'></a>서버 측](#a-name-1a%EC%84%9C%EB%B2%84-%EC%B8%A1)
  - [<a name='HTTPHTTP'></a>HTTP의 구조 ③HTTP 메시지](#a-namehttphttpahttp%EC%9D%98-%EA%B5%AC%EC%A1%B0-%E2%91%A2http-%EB%A9%94%EC%8B%9C%EC%A7%80)
    - [<a name='-1'></a>요청 메시지](#a-name-1a%EC%9A%94%EC%B2%AD-%EB%A9%94%EC%8B%9C%EC%A7%80)
    - [<a name='-1'></a>응답 메시지](#a-name-1a%EC%9D%91%EB%8B%B5-%EB%A9%94%EC%8B%9C%EC%A7%80)
    - [<a name='HTTP-1'></a>HTTP의 구조 ④스테이트리스성](#a-namehttp-1ahttp%EC%9D%98-%EA%B5%AC%EC%A1%B0-%E2%91%A3%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%8A%B8%EB%A6%AC%EC%8A%A4%EC%84%B1)
  - [<a name='-1'></a>스테이트풀](#a-name-1a%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%8A%B8%ED%92%80)
  - [<a name='-1'></a>스테이트리스](#a-name-1a%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%8A%B8%EB%A6%AC%EC%8A%A4)
- [<a name='-1'></a>메소드](#a-name-1a%EB%A9%94%EC%86%8C%EB%93%9C)
  - [<a name='-1'></a>8가지의 메소드](#a-name-1a8%EA%B0%80%EC%A7%80%EC%9D%98-%EB%A9%94%EC%86%8C%EB%93%9C)
  - [<a name='-1'></a>대표적인 메소드](#a-name-1a%EB%8C%80%ED%91%9C%EC%A0%81%EC%9D%B8-%EB%A9%94%EC%86%8C%EB%93%9C)
  - [<a name='POSTPUT'></a>POST와 PUT의 구분생성 처리](#a-namepostputapost%EC%99%80-put%EC%9D%98-%EA%B5%AC%EB%B6%84%EC%83%9D%EC%84%B1-%EC%B2%98%EB%A6%AC)
    - [<a name='POST'></a>POST](#a-namepostapost)
    - [<a name='PUT'></a>PUT](#a-nameputaput)
  - [<a name='PUTDELETEPOST'></a>PUT/DELETE의 POST에 의한 대용](#a-nameputdeletepostaputdelete%EC%9D%98-post%EC%97%90-%EC%9D%98%ED%95%9C-%EB%8C%80%EC%9A%A9)
    - [<a name='-1'></a>왜 대용을 생각하는가](#a-name-1a%EC%99%9C-%EB%8C%80%EC%9A%A9%EC%9D%84-%EC%83%9D%EA%B0%81%ED%95%98%EB%8A%94%EA%B0%80)
    - [<a name='-1'></a>대용 방법](#a-name-1a%EB%8C%80%EC%9A%A9-%EB%B0%A9%EB%B2%95)
    - [<a name='-1'></a>조건부 요청](#a-name-1a%EC%A1%B0%EA%B1%B4%EB%B6%80-%EC%9A%94%EC%B2%AD)
  - [<a name='Idempotence'></a>멱등성Idempotence과 안전성](#a-nameidempotencea%EB%A9%B1%EB%93%B1%EC%84%B1idempotence%EA%B3%BC-%EC%95%88%EC%A0%84%EC%84%B1)
    - [<a name='-1'></a>멱등성](#a-name-1a%EB%A9%B1%EB%93%B1%EC%84%B1)
    - [<a name='-1'></a>안전성](#a-name-1a%EC%95%88%EC%A0%84%EC%84%B1)
    - [<a name='POST-1'></a>POST](#a-namepost-1apost)
  - [<a name='-1'></a>요약](#a-name-1a%EC%9A%94%EC%95%BD)
- [<a name='-1'></a>상태 코드](#a-name-1a%EC%83%81%ED%83%9C-%EC%BD%94%EB%93%9C)
  - [<a name='-1'></a>분류와 자주 쓰이는 코드](#a-name-1a%EB%B6%84%EB%A5%98%EC%99%80-%EC%9E%90%EC%A3%BC-%EC%93%B0%EC%9D%B4%EB%8A%94-%EC%BD%94%EB%93%9C)
    - [<a name='xx:'></a>1xx: 처리 중](#a-namexxa1xx-%EC%B2%98%EB%A6%AC-%EC%A4%91)
    - [<a name='xx:-1'></a>2xx: 성공](#a-namexx-1a2xx-%EC%84%B1%EA%B3%B5)
    - [<a name='xx:-1'></a>3xx: 리다이렉트](#a-namexx-1a3xx-%EB%A6%AC%EB%8B%A4%EC%9D%B4%EB%A0%89%ED%8A%B8)
    - [<a name='xx:-1'></a>4xx: 클라이언트 에러](#a-namexx-1a4xx-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%97%90%EB%9F%AC)
    - [<a name='xx:-1'></a>5xx: 서버 에러](#a-namexx-1a5xx-%EC%84%9C%EB%B2%84-%EC%97%90%EB%9F%AC)
- [<a name='HTTP-1'></a>HTTP 헤더](#a-namehttp-1ahttp-%ED%97%A4%EB%8D%94)
  - [<a name='HTTP-1'></a>HTTP 헤더의 의미](#a-namehttp-1ahttp-%ED%97%A4%EB%8D%94%EC%9D%98-%EC%9D%98%EB%AF%B8)
  - [<a name='HTTP-1'></a>HTTP 헤더의 역사](#a-namehttp-1ahttp-%ED%97%A4%EB%8D%94%EC%9D%98-%EC%97%AD%EC%82%AC)
    - [<a name='-1'></a>메일과 공통으로 있는 헤더가 있다](#a-name-1a%EB%A9%94%EC%9D%BC%EA%B3%BC-%EA%B3%B5%ED%86%B5%EC%9C%BC%EB%A1%9C-%EC%9E%88%EB%8A%94-%ED%97%A4%EB%8D%94%EA%B0%80-%EC%9E%88%EB%8B%A4)
    - [<a name='-1'></a>날짜 헤더](#a-name-1a%EB%82%A0%EC%A7%9C-%ED%97%A4%EB%8D%94)
    - [<a name='MIME'></a>MIME 미디어 타입](#a-namemimeamime-%EB%AF%B8%EB%94%94%EC%96%B4-%ED%83%80%EC%9E%85)
    - [<a name='Content-Type'></a>Content-Type](#a-namecontent-typeacontent-type)
    - [<a name='-1'></a>언어 지정 헤더](#a-name-1a%EC%96%B8%EC%96%B4-%EC%A7%80%EC%A0%95-%ED%97%A4%EB%8D%94)
  - [<a name='-1'></a>콘텐츠 네고시에이션](#a-name-1a%EC%BD%98%ED%85%90%EC%B8%A0-%EB%84%A4%EA%B3%A0%EC%8B%9C%EC%97%90%EC%9D%B4%EC%85%98)
    - [<a name='-1'></a>클라이언트와 서버가 협상하여 미디어 타입이나 문자 인코딩, 언어 태그를 정할 수도 있다](#a-name-1a%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8%EC%99%80-%EC%84%9C%EB%B2%84%EA%B0%80-%ED%98%91%EC%83%81%ED%95%98%EC%97%AC-%EB%AF%B8%EB%94%94%EC%96%B4-%ED%83%80%EC%9E%85%EC%9D%B4%EB%82%98-%EB%AC%B8%EC%9E%90-%EC%9D%B8%EC%BD%94%EB%94%A9-%EC%96%B8%EC%96%B4-%ED%83%9C%EA%B7%B8%EB%A5%BC-%EC%A0%95%ED%95%A0-%EC%88%98%EB%8F%84-%EC%9E%88%EB%8B%A4)
    - [<a name='Content-Length'></a>Content-Length](#a-namecontent-lengthacontent-length)
    - [<a name='-1'></a>청크 전송](#a-name-1a%EC%B2%AD%ED%81%AC-%EC%A0%84%EC%86%A1)
  - [<a name='-1'></a>인증](#a-name-1a%EC%9D%B8%EC%A6%9D)
    - [<a name='Basic'></a>Basic 인증](#a-namebasicabasic-%EC%9D%B8%EC%A6%9D)
    - [<a name='Digest'></a>Digest 인증](#a-namedigestadigest-%EC%9D%B8%EC%A6%9D)
    - [<a name='WSSE'></a>WSSE 인증](#a-namewsseawsse-%EC%9D%B8%EC%A6%9D)
    - [<a name=':OAuth'></a>부가설명: OAuth](#a-nameoautha%EB%B6%80%EA%B0%80%EC%84%A4%EB%AA%85-oauth)
    - [<a name='-1'></a>캐시](#a-name-1a%EC%BA%90%EC%8B%9C)
    - [<a name='-1'></a>헤더에 가지는 정보](#a-name-1a%ED%97%A4%EB%8D%94%EC%97%90-%EA%B0%80%EC%A7%80%EB%8A%94-%EC%A0%95%EB%B3%B4)
    - [<a name='ETag'></a>ETag](#a-nameetagaetag)
  - [<a name='-1'></a>구성](#a-name-1a%EA%B5%AC%EC%84%B1)
    - [<a name='HTML'></a>HTML](#a-namehtmlahtml)
    - [<a name='microformats'></a>microformats](#a-namemicroformatsamicroformats)
    - [<a name='Atom'></a>Atom](#a-nameatomaatom)
    - [<a name='AtomPublishingProtocolAtomPub'></a>Atom Publishing ProtocolAtomPub](#a-nameatompublishingprotocolatompubaatom-publishing-protocolatompub)
    - [<a name='JSON'></a>JSON](#a-namejsonajson)
- [<a name='HTML-1'></a>HTML](#a-namehtml-1ahtml)
  - [<a name='HTML-1'></a>HTML의 미디어 타입](#a-namehtml-1ahtml%EC%9D%98-%EB%AF%B8%EB%94%94%EC%96%B4-%ED%83%80%EC%9E%85)
    - [<a name='text-html'></a>text-html](#a-nametext-htmlatext-html)
    - [<a name='applicationxhtmlxml'></a>application/xhtml\*xml](#a-nameapplicationxhtmlxmlaapplicationxhtmlxml)
    - [<a name='XML'></a>XML의 사양](#a-namexmlaxml%EC%9D%98-%EC%82%AC%EC%96%91)
    - [<a name='HTML-1'></a>HTML의 구성](#a-namehtml-1ahtml%EC%9D%98-%EA%B5%AC%EC%84%B1)
    - [<a name='-1'></a>헤더](#a-name-1a%ED%97%A4%EB%8D%94)
    - [<a name='-1'></a>바디](#a-name-1a%EB%B0%94%EB%94%94)
  - [<a name='-1'></a>링크](#a-name-1a%EB%A7%81%ED%81%AC)
    - [<a name='-1'></a>요소앵커](#a-name-1a%EC%9A%94%EC%86%8C%EC%95%B5%EC%BB%A4)
    - [<a name='-1'></a>요소](#a-name-1a%EC%9A%94%EC%86%8C)
      - [폼](#%ED%8F%BC)
    - [<a name='rel'></a>rel속성](#a-namerelarel%EC%86%8D%EC%84%B1)
- [<a name='JSON-1'></a>JSON](#a-namejson-1ajson)
  - [<a name='JSON-1'></a>JSON이란](#a-namejson-1ajson%EC%9D%B4%EB%9E%80)
    - [<a name='-1'></a>미디어 타입](#a-name-1a%EB%AF%B8%EB%94%94%EC%96%B4-%ED%83%80%EC%9E%85)
    - [<a name='-1'></a>사용 가능한 데이터 타입](#a-name-1a%EC%82%AC%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%83%80%EC%9E%85)
  - [<a name='JSONP'></a>JSONP에 의한 크로스 도메인 통신](#a-namejsonpajsonp%EC%97%90-%EC%9D%98%ED%95%9C-%ED%81%AC%EB%A1%9C%EC%8A%A4-%EB%8F%84%EB%A9%94%EC%9D%B8-%ED%86%B5%EC%8B%A0)
    - [<a name='-1'></a>크로스 도메인 통신이란](#a-name-1a%ED%81%AC%EB%A1%9C%EC%8A%A4-%EB%8F%84%EB%A9%94%EC%9D%B8-%ED%86%B5%EC%8B%A0%EC%9D%B4%EB%9E%80)
    - [<a name='script'></a>script요소에 의한 해결 방법](#a-namescriptascript%EC%9A%94%EC%86%8C%EC%97%90-%EC%9D%98%ED%95%9C-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)

<!-- /TOC -->

- 클라이언트/서버(여기에 아래 5가지 제약을 추가한 것이 REST)
  : UI(클라이언트)와 서버처리를 분리하면, 멀티플랫폼(PC나 스마트폰, 게임기...)이 가능해지는 등의 장점이 있어

- 스테이트리스 서버
  : 서버 쪽에서 애플리케이션의 상태를 갖지 않으면, 서버의 구현을 간단하게 할 수 있어
  ※예외로서 HTTP를 스테이트풀하게 하는 요소: 쿠키를 사용한 세션 관리

- 캐시
  : 한 번 가져온 리소스를 클라이언트 쪽에서 재사용하면, 서버와의 통신을 줄이고 처리를 효율화할 수 있어

- 통일 인터페이스
  : 인터페이스를 고정. 예를 들어 GET이나 POST 등 8개의 메소드밖에 정의하지 않음으로써, 구현의 독립성이 향상돼

- 계층화 시스템
  : 로드밸런서나 프록시를 CL/SV 사이에 설치할 수 있지만, CL 쪽은 그것을 의식하지 않고 SV를 이용할 수 있어(통일 인터페이스를 채택함으로써 계층화가 가능해지는 거야)

- 코드온디맨드
  : 프로그램을 클라이언트에 다운로드해서 실행하는 거야 예) 자바스크립트

---

## 5. <a name='URI'></a>URI

### 5.1. <a name='URI-1'></a>URI의 포인트

- 리소스의 이름이다
- 수명이 길다
- 브라우저의 주소창에 표시한다

### 5.2. <a name='URLURIURLURN'></a>URL과의 차이(URI와 URL과 URN)

- URL과 URN을 총칭한 것이 ‘URI’
- URN은 다음과 같은 표기. 리소스에 영구적인 ID를 부여하고, 그것을 이용해 접근한다
  - urn:isbn:12345678901234567890
- URL을 이용할 경우, 서버 장애, 도메인 변경 등으로 사용할 수 없게 될 가능성이 있다
- 최근에는 URL을 영구적으로 사용할 수 있도록 해야 한다는 생각이 퍼지고 있어서, 거의 URL이 사용되고 있다

### 5.3. <a name='-1'></a>구성

- HTTP의 기본: TCP/IP의 기초 지식, HTTP의 메시지 구조, 스테이트리스성
- HTTP 메소드: 각 메소드의 특징, 멱등성
- 스테이터스 코드: 코드의 분류와 의미, 에러 처리
- HTTP 헤더: 헤더의 역사, 구성 내용, 인증 방식 등

---

## 6. <a name='HTTP'></a>HTTP의 기본

### 6.1. <a name='HTTP-1'></a>HTTP란

- Web 상에서 클라이언트/서버 간에 리소스를 주고받기 위한 프로토콜
- REST의 특징인 통일 인터페이스, 스테이트리스 서버, 캐시 등을 구현하고, Web의 기반을 이루고 있다

### 6.2. <a name='TCPIP'></a>TCP/IP란

- HTTP는 TCP/IP를 기반으로 하고 있다

### 6.3. <a name='IP'></a>IP

- OSI 참조 모델에서 인터넷 계층에 해당하며, 네트워크에서 데이터를 실제로 주고받는다
- 데이터를 주고받을 때는 지정한 IP 주소를 수신처로 하여, 패킷 단위로 보낸다
- 자신의 네트워크에서 보내는 것만을 보장하고, 수신처까지 도착하는지는 보장하지 않는다

### 6.4. <a name='TCP'></a>TCP

- OSI 참조 모델에서 전송 계층에 해당하며, 데이터의 송신을 보장한다
- 연결할 상대에게 커넥션을 맺고, 커넥션을 사용하여 데이터의 누락을 체크한다
- HTTP에서는 80번 포트를 기본으로 사용한다

### 6.5. <a name='HTTP-1'></a>HTTP의 버전

필자가 배운 책이 나온 시점에서 가장 널리 사용되고 있는 버전은 HTTP1.1

> ※ 이미 HTTP2나 3이 나온 시대이므로, 자세한 내용은 생략합니다

### 6.6. <a name='HTTP-1'></a>HTTP의 구조 ①클라이언트와 서버

- 클라이언트...Web 브라우저
- 서버...Web 서버. 정보를 제공
- 클라이언트가 서버에 연결할 때에 요청을 내고 서버로부터 응답을 받는다(요청/응답형)

### 6.7. <a name='HTTP-1'></a>HTTP의 구조 ②요청과 응답

- 요청 후, 클라이언트는 응답이 돌아올 때까지 대기한다(동기형)
- URL을 두드려서 Web 사이트에 접속했을 때의 처리의 흐름을 아래에 기술

#### 6.7.1. <a name='-1'></a>클라이언트 측

- DNS를 사용하여 URL에서 호스트명을 이름 해결하고, 얻은 IP 주소의 TCP 80번 포트에 연결하고, 요청을 송신한다
- 응답 메시지를 수신
- 분석하고, 또 요청 발행이 필요하면 반복한다(이미지나 스타일시트에 대한 링크가 포함되어 있는 경우 등)
- 돌아온 HTML을 렌더링하여 윈도우에 표시한다

#### 6.7.2. <a name='-1'></a>서버 측

- 요청 메시지를 수신하면 분석
- 해당 페이지의 HTML을 렌더링하는 애플리케이션에 처리를 위임하고, 결과의 HTML을 얻는다
- 헤더를 첨가하여 응답 메시지를 구성
- 응답 메시지를 클라이언트에 반환한다

### 6.8. <a name='HTTPHTTP'></a>HTTP의 구조 ③HTTP 메시지

#### 6.8.1. <a name='-1'></a>요청 메시지

1행은 '요청 라인'

1. 메소드(GET 등)
2. 요청 URI(/test?debug=true~~~)
3. 버전(HTTP/1.1)

2행 이후는 '헤더'(메시지의 메타데이터)
※여러 개의 헤더를 가질 수 있다
※생략 가능

1. '이름:값'과 같은 형식
2. Host 헤더(필수) (Host: [example.kr:8080](http://example.kr:8080/)) ←포트 번호를 지정

- 바디가 이어질 수도 있다(갱신할 리소스 등) ※생략 가능

#### 6.8.2. <a name='-1'></a>응답 메시지

1행은 '상태 라인'

1. 버전(HTTP/1.1)
2. 상태 코드(200 등) ←요청 성공 시
3. 텍스트 프레이즈(OK 등)

2행 이후는 '헤더' ※생략 가능

1. 바디가 이어질 수도 있다(HTML 등) ※생략 가능
2. 헤더와 바디는 공백 행으로 구분된다

#### 6.8.3. <a name='HTTP-1'></a>HTTP의 구조 ④스테이트리스성

- HTTP는 스테이트리스의 구조를 채택하고 있다

### 6.9. <a name='-1'></a>스테이트풀

- 간결
- 서버가 그동안의 클라이언트의 요청을 기억하고 있다(우리 인간의 대화도 스테이트풀)

### 6.10. <a name='-1'></a>스테이트리스

- 중복
- 클라이언트는 매번 그동안의 요청도 포함하여, 반복하여 요청한다

---

## 7. <a name='-1'></a>메소드

### 7.1. <a name='-1'></a>8가지의 메소드

- GET
- POST
- PUT
- DELETE
- HEAD
- OPTIONS
- TRACE: 거의 사용되지 않음
- CONNECT: 거의 사용되지 않음

### 7.2. <a name='-1'></a>대표적인 메소드

- GET(읽기)
- POST(생성)
- PUT(생성·업데이트) ※POST로 대용 가능
- DELETE(삭제) ※POST로 대용 가능

### 7.3. <a name='POSTPUT'></a>POST와 PUT의 구분(생성 처리)

- 위에서 말했듯이, POST로도 PUT으로도 생성 처리가 가능함

#### 7.3.1. <a name='POST'></a>POST

- 리소스의 URI는 서버 측이 정함
  - 예: 트위터

#### 7.3.2. <a name='PUT'></a>PUT

- 리소스의 URI를 지정할 수 있음
  - 예: 위키백과
- URI의 문자수 제한 등 고려가 필요하기 때문에, 특별한 이유가 없으면 POST를 사용하는 것이 바람직함

### 7.4. <a name='PUTDELETEPOST'></a>PUT/DELETE의 POST에 의한 대용

#### 7.4.1. <a name='-1'></a>왜 대용을 생각하는가

- 브라우저에 따라서는 GET과 POST만 대응하는 경우가 있음
- 보안상의 이유로 프록시 서버가 GET과 POST 이외의 접근을 제한하는 것도 있음

#### 7.4.2. <a name='-1'></a>대용 방법

- \_method 파라미터(Ruby on Rails)
- X-HTTP-Method-Override(Google의 GData)

#### 7.4.3. <a name='-1'></a>조건부 요청

- 메소드를 실행할지 말지의 조건을 붙여, 실행 유무를 서버가 선택할 수 있도록 하는 것이 가능함
  - 예: 헤더에 리소스의 갱신 일시를 첨부하고, 이 일시 이후 갱신되었으면 GET 처리를 함

### 7.5. <a name='Idempotence'></a>멱등성(Idempotence)과 안전성

#### 7.5.1. <a name='-1'></a>멱등성

- 어떤 작업을 몇 번 하더라도 결과가 같아지는 것
- PUT이나 DELETE는 멱등. 같은 PUT(DELETE)를 몇 번 하더라도 같은 결과
  > 멱등성(Idempotence)은 어떤 작업이 몇 번을 반복하더라도 결과가 동일하게 되는 특성을 나타냅니다

#### 7.5.2. <a name='-1'></a>안전성

- 작업 대상의 리소스의 상태를 변화시키지 않는 것
- GET과 HEAD는 안전

#### 7.5.3. <a name='POST-1'></a>POST

- POST는 안전도 멱등도 아님
- 요청의 결과, 리소스가 변화할 가능성도 있고 전회와 결과가 달라질 가능성도 있음
  - ※PUT이 멱등이 아니게 되는 패턴 등, 예외도 책 안에서 소개되고 있음

### 7.6. <a name='-1'></a>요약

다음의 점에서 HTTP는 뛰어난 프로토콜이라고 할 수 있음

- HTTP는 제한된 메소드로 구성됨＝REST의 통일 인터페이스 제약
- GET의 안전성
- PUT과 DELETE의 멱등성
- 만약에 되면 뭐든지 할 수 있는 POST

---

## 8. <a name='-1'></a>상태 코드

### 8.1. <a name='-1'></a>분류와 자주 쓰이는 코드

앞자리의 숫자로 경우를 나누는 것으로 CL/SV 간의 약속을 줄이고, 결합을 느슨하게 하는 효과(느슨한 결합)

#### 8.1.1. <a name='xx:'></a>1xx: 처리 중

#### 8.1.2. <a name='xx:-1'></a>2xx: 성공

- 200: 요청 성공
- 201: 리소스 생성 성공

#### 8.1.3. <a name='xx:-1'></a>3xx: 리다이렉트

- 301 리소스의 영구적인 이동
- 303 다른 URI의 참조

#### 8.1.4. <a name='xx:-1'></a>4xx: 클라이언트 에러

- 400 Bad Request 요청의 잘못
- 401 Unauthorized 접근권의 불법
- 404 Not Found 리소스의 부재

#### 8.1.5. <a name='xx:-1'></a>5xx: 서버 에러

- 503 Service Unavailable 서비스 정지

---

## 9. <a name='HTTP-1'></a>HTTP 헤더

### 9.1. <a name='HTTP-1'></a>HTTP 헤더의 의미

- 헤더에는 메시지의 메타데이터가 설정되어 있다
- 클라이언트나 서버는 헤더를 보고 메시지에 대한 행동을 결정한다
  인증이나 캐시의 기능은, 헤더를 메소드나 상태 코드와 조합하여 구현되어 있다

### 9.2. <a name='HTTP-1'></a>HTTP 헤더의 역사

#### 9.2.1. <a name='-1'></a>메일과 공통으로 있는 헤더가 있다

- Content-Type, Date 등
- HTTP 헤더의 사양은 전자 메일의 메시지 사양을 바탕으로 정의되었기 때문
- 메일과 HTTP에서 다른 점은, HTTP는 양방향 통신, 메일은 단일 방향의 통신이라는 것
- 그래서, HTTP에서는 전자 메일에는 없는 헤더도 존재한다

#### 9.2.2. <a name='-1'></a>날짜 헤더

- 예: Date, Expires
- GMT 형식으로 표현
  - 예) Date:Tue, 06 Jul 2010 03:21:05 GMT

#### 9.2.3. <a name='MIME'></a>MIME 미디어 타입

- 리소스의 표현의 종류를 지정

#### 9.2.4. <a name='Content-Type'></a>Content-Type

- 예) Content-Type:application/xhtml+xml; charset=utf-8
- 'application/xhtml+xml'이 미디어 타입
  - 타입: application(이미지, 음성, 영상, 텍스트 이외)
  - 서브 타입: xhtml+xml(XML이라는 것을 나타냄)
- charset 파라미터는, XHTML 문서를 UTF-8로 인코딩하고 있다는 것을 나타냄

#### 9.2.5. <a name='-1'></a>언어 지정 헤더

- Content-Language의 값은 '언어 태그'라고 부른다
  - 예)Content-Language; ko-KR

### 9.3. <a name='-1'></a>콘텐츠 네고시에이션

#### 9.3.1. <a name='-1'></a>클라이언트와 서버가 협상하여 미디어 타입이나 문자 인코딩, 언어 태그를 정할 수도 있다

- Accept 헤더
- Accept-Charset 헤더
- Accept-Language 헤더

#### 9.3.2. <a name='Content-Length'></a>Content-Length

- 메시지에 바디가 있는 경우, 그 크기를 10진수의 바이트로 나타낸다
  - 예)Content-Length:5538

#### 9.3.3. <a name='-1'></a>청크 전송

- 동적으로 이미지를 생성하는 같은 웹 서비스의 경우, 파일 크기가 정해지기 전부터 응답을 조금씩 전송할 수 있다
  - 예) Transfer-Encoding: chunked

### 9.4. <a name='-1'></a>인증

#### 9.4.1. <a name='Basic'></a>Basic 인증

- 사용자 이름과 비밀번호에 의한 인증 방식
- 사용자 이름과 비밀번호를 ':'로 연결하고 Base64로 인코딩(※)한 문자열을 Authorization 헤더에 설정
  - ※데이터를 64가지의 문자열로 표현하는 인코딩 방식
- HTTPS로 통신로 상에서의 암호화를 권장

#### 9.4.2. <a name='Digest'></a>Digest 인증

- 메시지에 해시 함수를 적용한 결과의 해시 값을 사용한다
- 인증 정보 없이 먼저 요청을 전송하고, 돌아온 챌린지를 사용하여 다음 요청을 구성한다
- 인증에 필요한 정보가 얻어졌다면, 사용자 이름과 비밀번호를 사용하여 다이제스트를 생성한다
- 클라이언트 측의 작업이 번거로운 때문에 별로 보급되어 있지 않다

#### 9.4.3. <a name='WSSE'></a>WSSE 인증

- HTTP1.1에서는 표준 외. AtomPub 등의 WebAPI의 인증에 사용된다
- 비밀번호 그 자체를 NW 상에 흘릴 필요가 없고, Digest 인증만큼 수고가 들지 않는다
- 하지만 서버 측에서는 생의 비밀번호를 저장해 두어야 한다

#### 9.4.4. <a name=':OAuth'></a>부가설명: OAuth

- 웹 서비스 간에 데이터를 주고받을 수 있게 하는 위한 사양(인가의 위임)

#### 9.4.5. <a name='-1'></a>캐시

- 서버에서 가져온 리소스를 클라이언트의 로컬에 축적하고 재사용

#### 9.4.6. <a name='-1'></a>헤더에 가지는 정보

- 캐시 가능 여부(Pragma)
- 유효 기간(Expires)
- 상세한 캐시 방법(Cache-Control): 위의 2점의 헤더의 기능을 대용 가능

#### 9.4.7. <a name='ETag'></a>ETag

- 캐시된 리소스에는 엔티티 태그(ETag 헤더)의 정보를 가진다
- 리소스의 갱신 상태를 비교하기 위해 사용한다(갱신하면 값이 바뀐다)

####지속적 연결

- HTTP1.0에서는 클라이언트가 확립한 TCP 커넥션을 응답 반환의 때마다 끊었다
- HTTP1.1에서는 연결을 계속하는 사양이 되었다
- 응답을 기다리지 않고 같은 서버에 요청을 전송할 수 있다(파이프라인화) 때문에, 더 효율적으로 메시지를 처리할 수 있다
- 끊을 경우는, 요청의 Connection 헤더에 close라는 값을 지정한다

### 9.5. <a name='-1'></a>구성

#### 9.5.1. <a name='HTML'></a>HTML

- 제목이나 단락 등의 구조를 정의한 문서 형식

#### 9.5.2. <a name='microformats'></a>microformats

- HTML에 비해, WebAPI를 프로그램용으로 별도로 준비할 필요가 없고, 유지보수성 등의 면에서 우수하다

#### 9.5.3. <a name='Atom'></a>Atom

- 블로그뿐만 아니라 검색 엔진 등 다양한 웹 서비스의 WebAPI로서 활용 가능

#### 9.5.4. <a name='AtomPublishingProtocolAtomPub'></a>Atom Publishing Protocol(AtomPub)

- Atom은 데이터 형식의 규정인 반면, AtomPub은 Atom을 활용한 리소스 편집(CRUD작업) 프로토콜
- 블로그나 검색 데이터베이스에는 적합하지만, 실시간성이 중요한 API, 데이터의 계층 구조가 중요한 API 등에는 적합하지 않다

#### 9.5.5. <a name='JSON'></a>JSON

- 위의 XML계의 리소스 표현과 달리, 데이터를 표현하는 형식
  > ※사정상, 현재 시점에서는 'HTML', 'JSON'만 정리하게 되었습니다

---

## 10. <a name='HTML-1'></a>HTML

### 10.1. <a name='HTML-1'></a>HTML의 미디어 타입

- 2가지 존재한다

#### 10.1.1. <a name='text-html'></a>text-html

- SGML기반의 HTML

#### 10.1.2. <a name='applicationxhtmlxml'></a>application/xhtml\*xml

- XML기반의 XHTML

#### 10.1.3. <a name='XML'></a>XML의 사양

- 나무 구조로 되어 있고, 요소(head 등)를 중첩하여 표현한다
- 처음에 XML이라는 것을 선언한다

#### 10.1.4. <a name='HTML-1'></a>HTML의 구성

- 헤더와 바디로 구성된다

#### 10.1.5. <a name='-1'></a>헤더

- 문서의 메타데이터

#### 10.1.6. <a name='-1'></a>바디

문서의 내용 그 자체
블록 레벨 요소: 단락이나 제목 등 큰 덩어리
인라인 요소: 블록 레벨 요소 안에 들어가는, 강조나 개행, 이미지 삽입 등

### 10.2. <a name='-1'></a>링크

#### 10.2.1. <a name='-1'></a>요소(앵커)

- 블록 요소 안에서 다른 웹 페이지에 링크하기 위한 태그
- HTML의 헤더에서 웹 페이지의 관계를 지정한다

#### 10.2.2. <a name='-1'></a>요소

- 이미지 삽입, 기타 요소(동영상 등)의 삽입

##### 폼

- 링크 대상의 URI에 GET과 POST가 발행할 수 있다
- 요소에서는 GET밖에 발행할 수 없지만, POST도 발행할 수 있다(리소스의 생성 등)

#### 10.2.3. <a name='rel'></a>rel속성

- 요소가 가질 수 있다
- 링크 원과 링크 대상의 리소스의 관계를 기술한다
- stylesheet이 대표 예

---

## 11. <a name='JSON-1'></a>JSON

### 11.1. <a name='JSON-1'></a>JSON이란

- 데이터를 표현하는 형식
- JavaScript표기법. 많은 프로그래밍 언어가 라이브러리를 준비하고 있어, 언어 간에 데이터를 주고받는 것이 용이하다

#### 11.1.1. <a name='-1'></a>미디어 타입

- application/json
- UTF-8,16,32 중 하나로 인코딩하는 규칙
- UTF-8로 인코딩한 JSON의 경우
  - Content-Type: application/json; charset=utf-8

#### 11.1.2. <a name='-1'></a>사용 가능한 데이터 타입

- 객체: 이름과 값의 집합(멤버라고 부른다). 멤버의 이름은 항상 문자열. 값은 아래 어느 것도 사용할 수 있다
- 배열
- 문자열
- 숫자
- 부울
- null
  {
  "name": Jack",
  "age":34,
  "interests":["web","xml","rest"].
  "address":{"pref": "la" , "region":"westside"}
  }

### 11.2. <a name='JSONP'></a>JSONP에 의한 크로스 도메인 통신

- JSON with Padding의 약자

#### 11.2.1. <a name='-1'></a>크로스 도메인 통신이란

- 불특정 다수의 도메인에 속하는 서버에 접근하는 것
- Ajax에서는 JavaScript가 있는 서버와 다른 서버와는 통신할 수 없다
- 실제로는 서비스 구성 상, 다른 서버의 WebAPI와 통신이 필요한 상황도 있다(지도 데이터 등)

#### 11.2.2. <a name='script'></a>script요소에 의한 해결 방법

- script요소는 브라우저의 보안 제한을 받지 않는다
- JSONP에서는 JSON을 함수명으로 래핑하고, 도메인이 다른 서버에서 데이터를 가져온다

끝.
