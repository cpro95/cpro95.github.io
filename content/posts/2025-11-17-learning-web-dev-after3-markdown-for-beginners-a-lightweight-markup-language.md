---
title: 웹 개발 배우기 번외 3편 - 개발자의 글쓰기 도구, 마크다운(Markdown) 빠르게 익히기
date: 2025-11-17T16:52:00+09:00
description: 배우기 쉽고 널리 사용되는 경량 마크업 언어인 마크다운에 대해 알아봅니다. 마크다운의 기본 개념과 문법, 그리고 개발 문서 작성에 어떻게 활용되는지까지 핵심만 빠르게 살펴봅니다.
tags:
    - 마크다운
    - Markdown
    - 마크업 언어
    - 개발 문서
    - 웹 개발 기초
---
![웹 개발 배우기 번외 3편 - 개발자 필수 교양, 패키지 매니저 시작하기
](https://blogger.googleusercontent.com/img/a/AVvXsEg8mv704ujbQaFfvzSDk-RynqWPf4ubpoNf9kN2b3m4yQg34f2gRqr3DIo9euCZNhJ7T6LoGNin1-eHy_ZkdbXRKcF7OmuDbTqwvRa64EGDrmVA2ODt3poUUESctKPcbqucSPsvLuALvoXxGmJtvky41ZXi1dMx6R2LhYKd9TwH18LX9bKjIGmB_HqS5Wg=s16000)

이 글은 프로그래밍 경험이 없는 분들을 대상으로 자바스크립트 웹 앱 제작법을 알려드리는 '웹 개발 배우기' 시리즈의 일부인데요.

이번 챕터에서는 '마크다운(Markdown)'이라는 경량 마크업 언어를 탐색해 볼 건데요.

배우기 쉽고 프로그래밍에 관한 글을 쓸 때 아주 많이 사용됩니다.

문서, 주석 등에서 말이죠.

다음 챕터에서 필요할 예정인데요.

배우는 것이 약간 돌아가는 길처럼 보일 수 있지만, 익히기 쉽고 웹 개발에 관심이 있다면 자주 마주치게 될 겁니다.


## 마크다운이란 무엇일까요?
마크다운은 2004년에 존 그루버(John Gruber)에 의해 만들어졌는데요.

그것을 만든 동기는 다음과 같습니다.


'마크업 언어'는 일반 텍스트와 특별하게 취급하는 문자들을 사용해, 단순한 문자 시퀀스가 아닌 구조(제목, 단락, 목록 등)를 가진 텍스트를 기술하는데요.

HTML도 마크업 언어입니다.


마크업 언어의 두 가지 장점은 다음과 같습니다.

*   대부분의 워드 프로세서보다 덜 까다롭습니다.

*   콘텐츠가 일반 텍스트로 저장되기 때문에, 깃(Git)과 같은 버전 관리 시스템을 통해 관리하기 쉽습니다.


하지만 특히 HTML은 (웹 브라우저에서 보지 않는 한) 작성하고 읽기가 약간 불편한데요.

그래서 그루버는 일반 텍스트 상태에서도 보기 좋은 마크업 언어를 만들고 싶었습니다.


마크다운은 다음과 같이 생겼습니다.

```markdown
## Heading

One paragraph with **bold** text.

* Bullet list
```
편리하게도, 비주얼 스튜디오 코드(Visual Studio Code)와 같은 코드 에디터에서 마크다운 파일을 열면 '구문 강조(syntax highlighting)'가 적용되는데요.

덕분에 마크다운을 훨씬 더 쉽게 읽을 수 있습니다.


### 마크다운의 파일 확장자와 미디어 타입
*   **파일 확장자**: `.md`

*   **미디어 타입**: `text/markdown`


## 마크다운 개요
| 마크다운 | HTML |
|---|---|
| `*italic*` 또는 `_italic_` | `<em>italic</em>` |
| `**bold**` 또는 `__bold__` | `<strong>bold</strong>` |
| `# Heading 1` | `<h1>Heading 1</h1>` |
| `[Link](http:...)` | `<a href="http:...">Link</a>` |
| `![Img](http:...)` | `<img src="http:..." alt="Img">` |
| `> Quoted` | `<blockquote>Quoted</blockquote>` |
| `* Bullet list` | `<ul><li>Bullet list</li></ul>` |
| `1. Numbered list` | `<ol><li>Numbered list</li></ol>` |
| `---` 또는 `***` | `<hr>` |
| `` `Inline code` `` | `<code>Inline code</code>` |
| `<!-- Comment -->` | `<!-- Comment -->` |

**단락과 줄 바꿈**: 빈 줄로 단락을 구분하고, 줄 끝에 역슬래시(`\`)를 사용해 줄 바꿈을 할 수 있습니다.


**코드 블록**: 세 개의 백틱(```)으로 코드 블록을 감싸고, 첫 번째 백틱 뒤에 `js`와 같이 언어 이름을 명시하면 구문 강조를 적용할 수 있습니다.


## 더 읽을거리
*   존 그루버가 2004년에 마크다운을 소개한 블로그 포스트

*   커먼마크(CommonMark)는 마크다운의 표준입니다.

*   판독(Pandoc)은 마크다운을 HTML, 워드 문서, PDF 등 다양한 형식으로 변환하는 도구입니다.
