# Gifty
http://hokim.gifty4u.com/

# Gifty 어드민 페이지
http://hokim.gifty4u.com/admin/app

# 2021-10-04 업데이트
### 1. 사용자측의 Bearer인증이 추가되었습니다.
헤더로 {Authorization: 'bearer 인증토큰'}을 넘겨줄 경우 사용자가 인증됩니다.

### 2. API 문서에서 사용자 토큰을 쉽게 발급 받을 수 있는 TEST용 API가 추가되었습니다.
사용자 id를 이용해 테스트용 토큰을 발급 받을 수 있습니다.

### 3. Swagger 문서가 수정되었습니다.
기존에 각 헤더에 Authorization을 추가하도록 되어있었는데 해당 방식이 헤더를 제대로 넘겨주지 못하는 이슈가 발생했습니다.
페이지 접속시 오른쪽 상단의 Authorization 버튼을 눌러 한번만 인증해두면 알아서 값을 넘겨주도록 수정되었습니다.
인증헤더를 사용하는 API는 이름 오른쪽에 자물쇠가 잠겨있으니 참고하시기 바랍니다.


# api test시
1. https

 자체 서명된 ssl로 인증되어 있으므로 프론트 로컬호스트에서 api 를 요청하기 전에 http://hokim.gifty4u.com/ 에 접근해서 thisisunsafe 해주어야 합니다.
 결제 테스트는 자체서명된 https에서 동작하지 않습니다. http://hokim.gifty4u.com:4000 로 접근해서 테스트해주세요. 

2. http

  http://hokim.gifty4u.com/ 로 접근시 자동으로 https로 리다이렉트 되므로 http://hokim.gifty4u.com:4000 으로 바로 접근해야 합니다.


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


