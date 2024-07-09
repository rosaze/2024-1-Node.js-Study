## < 섹션 4. 패키지 매니저 >

### 4.1 package.json ~ 4.2 node_modules와 npx, SemVer ###

**NPM (Node Package Manager)**
- 노드의 패키지 매니저
- 다른 사람들이 만든 소스 코드들을 모아둔 **저장소**
- 남의 코드를 사용하여 프로그래밍 가능
- 이미 있는 기능을 다시 구현할 필요가 없어 효율적
- 오픈 소스 생태계를 구성중
- 패키지: npm에 업로드된 노드 모듈
- 모듈이 다른 모듈 사용할 수 있듯 패키지도 다른 패키지 사용 가능

**package.json**
- 현재 프로젝트에 대한 정보와 사용 중인 패키지에 대한 정보를 담은 파일
  - 같은 패기지라도 버전별로 기능이 다를 수 있으므로 버전을 기록해두어야함
- 노드 프로젝트 시작 전 package.json부터 만들고 시작함
  - package.json 만드는 법 => **npm init**
- npm install 시 node_modules 폴더 생성 내부에
  - 설치한 패키지 포함 의존 관계가 있는 패키지 모두 설치됨
- express 설치: **npm install express** (dependencies에 express 이름과 버전 추가됨)
  - express또한 npm package이기 때문에 express만의 dependencies와 devDependecies도 같이 다운 받아짐 (dependncy의 dependency)
- npm i -D 패키지명 : devDependencies에 추가됨
- 노드 모듈은 용량을 많이 차지하기 때문에 베포할 때는 삭제하고 npm i로 다시 서버에 설치함
- 인터넷을 패쇄망으로 구축한 서버에서는(npm i 사용 불가) 노드 모듈을 직접 복사해서 옮겨야함
- 글로벌 설치는 기피하는 것이 좋음 (dependency에 저장되지 않음)
- 명령어로 사용할 수 있는 패키지는 dependencies 또는 devDepndencies에 저장하고 npx를 사용해 글로벌 명령어로 사용할 수 있음.
  - ex: npx rimraf node_modules

**SemVer 버저닝**
- 노드 패키지의 버전은 SemVer(유의적 버저닝) 방식을 따름
  - 자바스크립트 노드 생태계에서는 패키지의 버전을 세 자릿수로 기록함
  - Major(주 버전), Minor(부 버전), Patch(수 버전)
- 노드에서는 배포를 할 때 항상 버전을 올려야 함
- Major는 하위 버전과 호환되지 않은 수정 사항이 생겼을 때 올림 (대대적 수정 고로 기존 코드가 돌아가지 않음)
- Minor는 하위 버전과 호환되는 수정 사항이 생겼을 때 올림
- Patch는 기능에 버그를 해결했을 때 올림
- npm i express@latest (최신 버전 설치)
- npm i express@3.5.1
- npm i express@next (다음에 나올 버전 미리 테스트)

---
### 4.3 npm 명령어들 알아보기 ###
- **npm outdated**: 어떤 패키지에 기능 변화가 생겼는지 알 수 있음
- **npm update**: package.json에 따라 패키지 업데이트
- **npm uninstall** 패키지명: 패키지 삭제(npm rm 패키지명으로도 가능)
- **npm search 검색어**: npm 패키지를 검색할 수 있음 (npmjs.com에서도 가능)
- **npm info 패키지명**: 패키지의 세부 정보 파악 가능
- **npm login**: npm에 로그인을 하기 위한 명령어(npmjs.com에서 회원가입 필요)
- **npm whoami**: 현재 사용자가 누구인지 알려줌
- **npm logout**: 로그인한 계정을 로그아웃
- **npm version 버전**: package.json의 버전을 올림 (Git에 커밋도 함)
- **npm deprecate [패키지명][버전] [메시지]**: 패키지를 설치할 때 경고 메시지를 띄우게 함(오류가 있는 패키지에 적용)
- **npm publish**: 자신이 만든 패키지를 배포
- **npm unpublish --force**: 자신이 만든 패키지를 배포 중단 (배포 후 72시간 내에만 가능)
- 기타 명령어는 [npm Docs](https://docs.npmjs.com) 에서 CLI Commands에서 확인

---
### 4.4 npm 배포하기 ###

1. npm init으로 배포할 패키지 작성
2. npm publish로 패키지 배포
3. 패키지 이름이 겹치지 않게 조심
4. 배포 후 npm info 패키지명으로 확인
5. npm unpublish 패키지명 --force로 배포 72시간 내 배포 취소할 수 있음

