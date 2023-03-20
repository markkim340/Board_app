# 📋 Board_app 
NestJS를 사용하여 게시판 서비스를 개발한 개인 프로젝트 입니다.

## 설명
- 프로젝트 기간 : 22-02-17 ~ 22-02-21 (5 Days)
- 사용된 기술 : NestJS, PostgreSQL, TypeORM, Multer, bcyrpt, JWT, Docker, aws-EC2
- 기능 설명 : 로그인/회원가입, 게시판 CRUD API, 댓글 CRUD API, 파일업로드

## 실행
### 1. git clone

```
https://github.com/markkim340/Board_app.git
```

### 2. 패키지 설치

```
npm install
```
- 도커 사용시
```
1. docker pull postgres
2. docker compose up
```

### 3. 환경변수 설정

- **.env**
```
**NODE_ENV=production
POSTGRES_HOST={DB host} ex)postgres
POSTGRES_USER={DB USER} ex)postgres
POSTGRES_PASSWORD={DB PASSWORD} ex)postgres
POSTGRES_DB={데이터베이스명} ex)boardapp
```

- **src/config/production.yaml**
```
server:
  port:  ex)3000 

db:
  synchronize:  ex)false

jwt:
  secret:   ex)'secretKey'
  expiresIn:   ex)10800

```

### 4. 서버 실행

```
npm run start:prod         // 개발 모드로 실행
```
