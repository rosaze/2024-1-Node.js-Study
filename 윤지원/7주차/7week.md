## npm -> 남이 만이 만들어준 서버 구조를 쓸 수 있음

## package.json: npm init 으로 만들 수 있음

package-lock.json : 버전 문제를 막아주는 파일

- 콘솔에 입력 내용: liscence 보통 MIT 로 , author 은 자기 이름 . 콘솔 말고 직접 파일에 내용 입력해도 됨. node 프로젝트 할때는 package.json 부터 만들고 시작
- 파일에 script: 명령어 저장.
  npm start-> 유명한 명령어이기 때문에 콘솔에 run 안 붙임
- express 설치:
  npm run test
  npm start
  npm i express
  npm i cookie parser body parser
  위 입력을 마치면 node_modules 가 생김.
- node_modules: 용량이 많으므로 배포할 때는 삭제하고, 다시 npm i를 쳐서 설치함

# 명령어 :npm i -g rimraf-->

- rimraf node_modules 이란 명령어 사용 가능. 무언가를 삭제할 때 사용 ( 근데 오류 남)
- 하지만 현재는 글로벌 설치 기피 ( 다른 사용자가 명령어 존재 모를 수 있기 때문 )
- 따라서 #npm i rimraf -D 개발용으로만 설치 함. 설치 한 다음 npx 을 앞에 붙여 글로벌 명령으로 쓸 수 있음. ( 이건 에러 안 남 !!!!)

- 중요: 사용하고자 하는 패키지들은 package.json 파일에 명시되어 있어야 함

# SemVer 버저닝

> > 노드 패키지의 버전은 SemVer 방식을 따름.
> > Major Minor Patch
> > 노드에서는 배포를 할 때 항상 버전을 올려야 함. Major 는 하위 버전과 호환되지 않은 수정 사항이 생겼을 때 올림.Minor 는 하위 버전과 호환되는 수정 사항이 생겼을 때 올림. Patch 는 기능에 버그를 해결했을 떄 올림  
> > "^" -> 첫번째 자리 고정 의미. 보통 첫 번째 자리까지만 고정해 줌
> > "~" -> 두번째 자리 고정.

# npm 명령어

> > npm outdated : 버전이 바뀐 경우
> > npm info: 패키지에 대한 정보를 알려줌
> > npm adduser : 회원가입

## npm 배포하기

배포 잘 안됨 -> npm adduser -> npm whomai 로 내 이름 뜨는지 확인 -> npm config registry 로 사이트 주소가 떴는지 확인 -> npm publist --access public

- 등록 확인 : npm info npmtest-30499

"npmtest-30499@1.0.0 | MIT | deps: none | versions: 1
geenietest
--생략--
maintainers:

- rosaze <geenieeyoon@gmail.com>

dist-tags:
latest: 1.0.0

published 5 minutes ago by rosaze <geenieeyoon@gmail.com>"

- 삭제하기 : >npm unpublish --force npmtest-30499
