# ๐ Board_app 
NestJS๋ฅผ ์ฌ์ฉํ์ฌ ๊ฒ์ํ ์๋น์ค๋ฅผ ๊ฐ๋ฐํ ๊ฐ์ธ ํ๋ก์ ํธ ์๋๋ค.

## ๋ฐฐํฌ
- aws-EC2 / Docker compose
- http://ec2-13-209-5-70.ap-northeast-2.compute.amazonaws.com:3000
- Swagger API docs : http://ec2-13-209-5-70.ap-northeast-2.compute.amazonaws.com:3000/api

## ์ค๋ช
- ํ๋ก์ ํธ ๊ธฐ๊ฐ : 22-02-17 ~ 22-02-21 (5 Days)
- ์ฌ์ฉ๋ ๊ธฐ์  : NestJS, PostgreSQL, TypeORM, Multer, bcyrpt, JWT, Docker, aws-EC2
- ๊ธฐ๋ฅ ์ค๋ช : ๋ก๊ทธ์ธ/ํ์๊ฐ์, ๊ฒ์ํ CRUD API, ๋๊ธ CRUD API, ํ์ผ์๋ก๋

## ์คํ
### 1. git clone

```
https://github.com/markkim340/Board_app.git
```

### 2. ํจํค์ง ์ค์น

```
npm install
```
- ๋์ปค ์ฌ์ฉ์
```
1. docker pull postgres
2. docker compose up
```

### 3. ํ๊ฒฝ๋ณ์ ์ค์ 

- **.env**
```
**NODE_ENV=production
POSTGRES_HOST={DB host} ex)postgres
POSTGRES_USER={DB USER} ex)postgres
POSTGRES_PASSWORD={DB PASSWORD} ex)postgres
POSTGRES_DB={๋ฐ์ดํฐ๋ฒ ์ด์ค๋ช} ex)boardapp
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

### 4. ์๋ฒ ์คํ

```
npm run start:prod         // ๊ฐ๋ฐ ๋ชจ๋๋ก ์คํ
```
