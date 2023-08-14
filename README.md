# 🐘 코리니

### 코딩을 막 처음 시작한 '코린이', 주니어 개발자들을 위한 커뮤니티 서비스 입니다.

https://korini-project.vercel.app/

## 📌 프로젝트 개요

- 스파르타 코딩클럽 내일배움캠프 심화프로젝트 - React A반 6팀 6진스👖
- 개발기간 : 2023.08.07 ~ 2023.08.14

<details>
<summary>🌳 클릭 시 프로젝트 상세구조</summary>
	
<br>
	
```
📦src
 ┣ 📂api
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜editprofile.ts
 ┃ ┗ 📜post.ts
 ┣ 📂assets
 ┃ ┣ 📜headerlogo.png
 ┃ ┣ 📜imagelogo.png
 ┃ ┣ 📜korini.png
 ┃ ┣ 📜logo_character.png
 ┃ ┣ 📜logo_header.png
 ┃ ┣ 📜logo_homebutton.png
 ┃ ┣ 📜mainlogo.png
 ┃ ┗ 📜profile_elephant.png
 ┣ 📂components
 ┃ ┣ 📂board
 ┃ ┃ ┗ 📜Mainposts.tsx
 ┃ ┣ 📂chatbot
 ┃ ┃ ┗ 📜ChatBot.tsx
 ┃ ┣ 📂detail
 ┃ ┃ ┣ 📜Pagenation.tsx
 ┃ ┃ ┗ 📜Post.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┗ 📜Loading.tsx
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📜Signin.tsx
 ┃ ┃ ┗ 📜Signup.tsx
 ┃ ┗ 📂mypage
 ┃ ┃ ┣ 📜ChangeNickname.tsx
 ┃ ┃ ┣ 📜ChangePassword.tsx
 ┃ ┃ ┗ 📜MyPosts.tsx
 ┣ 📂lib
 ┃ ┣ 📜client.ts
 ┃ ┗ 📜openai.ts
 ┣ 📂pages
 ┃ ┣ 📜Detail.tsx
 ┃ ┣ 📜Freeboard.tsx
 ┃ ┣ 📜Main.tsx
 ┃ ┣ 📜Mypage.tsx
 ┃ ┣ 📜NotFound.tsx
 ┃ ┣ 📜Studyboard.tsx
 ┃ ┗ 📜Write.tsx
 ┣ 📂redux
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜configStore.tsx
 ┃ ┗ 📂module
 ┃ ┃ ┣ 📜chatBotLogSlice.ts
 ┃ ┃ ┣ 📜chatBotUISlice.ts
 ┃ ┃ ┣ 📜modalSlice.tsx
 ┃ ┃ ┗ 📜userSlice.tsx
 ┣ 📂shared
 ┃ ┣ 📜Layout.tsx
 ┃ ┣ 📜PrivateRoute.tsx
 ┃ ┗ 📜Router.tsx
 ┣ 📂styles
 ┃ ┣ 📜globalStyles.ts
 ┃ ┣ 📜StButton.ts
 ┃ ┣ 📜StChatBot.ts
 ┃ ┣ 📜StComment.ts
 ┃ ┣ 📜StHeader.ts
 ┃ ┣ 📜StLoading.ts
 ┃ ┣ 📜StMyPage.ts
 ┃ ┣ 📜StPageButton.ts
 ┃ ┣ 📜StPost.ts
 ┃ ┣ 📜StPostCard.ts
 ┃ ┣ 📜StSignInUp.ts
 ┃ ┣ 📜StWrite.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┗ 📜types.ts
 ┣ 📜App.tsx
 ┣ 📜hooks.ts
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
```
</details>

## 👥 팀원

|  팀원  | 팀원구분 | 깃허브                      | 블로그                             |
| :----: | :------: | --------------------------- | ---------------------------------- |
| 나윤빈 |   팀장   | https://github.com/skdbsqls | https://velog.io/@skdbsqls         |
| 박지원 |   팀원   | https://github.com/xoxojw   | https://xoxojw.tistory.com/        |
| 송희진 |   팀원   | https://github.com/billiweb | https://passionfruit6.tistory.com/ |
| 이세령 |   팀원   | https://github.com/Hediar   | https://velog.io/@hediar           |
| 이소영 |   팀원   | https://github.com/Hediar   | https://blog.naver.com/ddooo__ding |

<br>

## 🏷️ 목차

[1. 팀 과제 소개](#1-팀-과제-소개)<br/>
[2. 팀 과제 주소](#2-팀-과제-주소)<br/>
[3. 기술스택](#3-기술-스택)<br/>
[4. 사용한 라이브러리](#4-사용한-라이브러리)<br/>
[5. 사용한 API](#5-사용한-api)<br/>
[6. 버전 관리 시스템](#6-버전-관리-시스템)<br/>
[7. 협업툴](#7-협업툴)<br/>
[8. 구현 기능 및 화면](#8-구현-기능-및-화면)<br/>

<br />

## 1. 팀 과제 소개

- 게시판 카테고리를 학습 게시판, 자유 게시판으로 분류하였고, 각 카테고리별 게시글을 분류해서 볼 수 있습니다.
- 게시판의 글을 누르면 상세페이지로 들어가게 되고, 댓글도 작성할 수 있습니다. 단 글/댓글 작성 시 로그인이 필요합니다.
- 마이페이지로 이동하면 내가 쓴 글들을 모아볼 수 있고 닉네임, 비밀번호를 변경 할 수 있습니다.
- 그리고 오른쪽 아래 버튼을 누르면 chatGPT를 사용하여 “코린이들이 제일 힘들어하는!!! 변수명 이름 짓기”를 하여 이것에 대한 의견을 내며 자유로운 소통을 할 수 있습니다.

이 웹 페이지를 통해서 코린이들끼리 서로 정보를 공유하고 도와가며 많은 정보를 알아가 취업에 성공하는 지름길이 되었으면 좋겠습니다.

## 2. 배포

- 배포 URL : https://korini-project.vercel.app/
<div align=“center”>
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>

## 3. 기술 스택

- TypeScript
- react
- html/css

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">

## 4. 사용한 라이브러리

- react-router-dom
- reduxjs/toolkit
- react-redux
- tanstack/react-query
- tanstack/react-query-devtools
- styled-components
- font-awesome
- react-hook-form
- react-js-pagination
- shortid

<img src="https://img.shields.io/badge/react router dom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/redux toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/font awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white"> <img src="https://img.shields.io/badge/react hook form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">

## 5. 사용한 API

- supabase
- OpenAI

<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img src="https://img.shields.io/badge/openai-412991?style=for-the-badge&logo=openai&logoColor=white">

## 6. 버전 관리 시스템

- Git, Github
<div align=“center”>
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</div>

## 7. 협업툴

- Visual Studio
- Slack
- figma
<div align=“center”>
  <img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudio&logoColor=white">
  <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
</div>

## 8. 구현 기능 및 화면

### 1) 메인 페이지 (전체, 학습, 자유 게시판)

  <img width="1440" src="https://github.com/Hediar/KoriniProject/assets/122673560/e363dde7-caa8-4257-89be-52d41376f5fb" />
  
  ### 2) 로그인/회원가입 창
  <div align="center">
	  <img src="https://github.com/Hediar/KoriniProject/assets/122673560/4a30127c-18e8-42a2-8689-809bc34c49c0" height="500px" /> <img src="https://github.com/Hediar/KoriniProject/assets/122673560/cf426b69-f130-477e-ab28-c70e546e3be9" height="500px" />
  </div>

### 3) 챗봇 UI

 <img width="1440" src="https://github.com/Hediar/KoriniProject/assets/124491335/cccbaf3e-35e0-453e-9ece-5f06dd434abd" />
  
 ### 4) 게시글 상세 페이지, 댓글
 <img width="1440" src="https://github.com/Hediar/KoriniProject/assets/122673560/6584a43c-ec07-48cf-8a72-30f2e86a3eab" />
 
 ### 5) 마이 페이지
 <img width="1440" src="https://github.com/Hediar/KoriniProject/assets/122673560/d16b1065-ab14-40d8-84ca-84ffc8980d1f" />
