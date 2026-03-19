# 남은 할일

## 1. 지도 바로가기 버튼 연결
- [ ] 카카오내비 링크 실제 좌표/장소명 확인
- [ ] 네이버지도 링크 실제 장소 검색 URL 확인
- [ ] 티맵 링크 appKey 및 좌표 설정
- [ ] 영문 버전 네비게이션 링크 검토 (Google Maps 등)

## 2. 타임라인 이미지와 내용 수정
- [ ] `public/images/timeline/` 에 실제 사진 추가 (first-meet, dating, propose, wedding)
- [ ] `wedding.ts` 타임라인 날짜/제목/설명 실제 내용으로 수정
- [ ] `wedding.en.ts` 영문 타임라인 내용 동기화

## 3. 톡 캘린더 / 톡 공유 연동
- [ ] 카카오 디벨로퍼 앱 생성 및 JavaScript 키 발급
- [ ] `wedding.ts` 의 `kakaoJsKey` 실제 값으로 교체
- [ ] 카카오 디벨로퍼 콘솔에서 도메인 등록 (`https://miajlee.github.io`)
- [ ] 카카오톡 공유 기능 테스트

## 4. 갤러리 이미지 추가
- [ ] `public/images/gallery/` 에 실제 웨딩 사진 추가
- [ ] `wedding.ts` 갤러리 목록과 파일명 매칭 확인
- [ ] 이미지 최적화 (리사이즈/압축)

## 5. 구글폼 연동 테스트
- [ ] Google Apps Script 배포 및 URL 발급
- [ ] `wedding.ts` 의 `googleScriptUrl` 실제 값으로 교체
- [ ] RSVP 폼 제출 → 스프레드시트 기록 확인
- [ ] 영문 버전 RSVP 동작 확인

## 6. 공유기능 검토
- [ ] 카카오톡 공유 미리보기 (OG 이미지/제목/설명) 확인
- [ ] URL 복사 기능 테스트
- [ ] 모바일 네이티브 공유 기능 테스트
- [ ] `public/images/main-og.jpg` OG 이미지 추가

## 7. 디자인 필터링
- [ ] 전체 섹션 모바일/PC 레이아웃 리뷰
- [ ] 폰트 크기/간격 최종 조정
- [ ] 색상 톤 통일성 검토
- [ ] 이미지 밝기/채도 최종 확인
- [ ] 영문 버전 레이아웃 깨짐 여부 확인
