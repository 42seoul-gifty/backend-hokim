# Gifty
http://hokim.gifty4u.com/

# Gifty 어드민 페이지
http://hokim.gifty4u.com/admin/app

# api test시
1. https

 자체 서명된 ssl로 인증되어 있으므로 프론트 로컬호스트에서 api 를 요청하기 전에 http://hokim.gifty4u.com/ 에 접근해서 thisisunsafe 해주어야 합니다.
 결제 테스트는 자체서명된 https에서 동작하지 않습니다. http://hokim.gifty4u.com/4000 로 접근해서 테스트해주세요. 

2. http

  http://hokim.gifty4u.com/ 로 접근시 자동으로 https로 리다이렉트 되므로 http://hokim.gifty4u.com/4000 으로 바로 접근해야 합니다.


# 실행 방법
1. 현재 저장소 클론
```
git clone https://github.com/42seoul-gifty/backend-hokim.git
```

2. `.env.sample`을 참고해 `.env` 파일 만들기

3. 패키지 설치
```
npm install
```

4. 시드 생성
```
npm run makeSeed
```

4. 실행
```
npm start
```


