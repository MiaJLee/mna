# 참석 여부 데이터 → Google 스프레드시트 연동

참석의사 체크 폼에서 제출된 데이터를 **Google 스프레드시트**에 한 행씩 쌓이도록 설정하는 방법입니다.

---

## 1. Google 스프레드시트 만들기

1. [Google 스프레드시트](https://sheets.google.com)에서 **새 스프레드시트** 생성
2. 첫 번째 시트의 **1행에 아래 헤더** 입력 (그대로 복사해서 A1~D1에 넣으면 됨)

   | A (이름) | B (연락처) | C (참석여부) | D (제출일시) |
   |----------|------------|--------------|--------------|
   | 이름     | 연락처     | 참석여부     | 제출일시     |

---

## 2. Google Apps Script 연결

1. 스프레드시트 메뉴에서 **확장 프로그램** → **Apps Script** 클릭
2. 열린 편집기에서 기본 코드를 **전부 지우고**, 아래 코드를 **붙여넣기**
3. **저장** (Ctrl+S / Cmd+S)

```javascript
/**
 * 웨딩 청첩장 참석 여부 폼 → 이 스프레드시트에 행 추가
 * 배포: 웹 앱 (실행 사용자: 나, 액세스: 모든 사용자)
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var params = e.parameter;

    var name = params.name || "";
    var phone = params.phone || "";
    var attendance = params.attendance || "";
    var timestamp = params.timestamp || "";

    sheet.appendRow([name, phone, attendance, timestamp]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "저장되었습니다."
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/** GET 요청 시 테스트용 (선택) */
function doGet(e) {
  return ContentService.createTextOutput("RSVP Web App is running.");
}
```

---

## 3. 웹 앱으로 배포

1. Apps Script 편집기 상단에서 **배포** → **새 배포** 클릭
2. **유형 선택**에서 **웹 앱** 선택
3. 설정
   - **설명**: 예) `RSVP 제출 받기`
   - **실행 사용자**: **나**
   - **액세스 권한**: **모든 사용자** (알 수 없는 사용자도 폼 제출 가능하도록)
4. **배포** 클릭 후 나오는 **웹 앱 URL**을 복사  
   (형식: `https://script.google.com/macros/s/xxxxx/exec`)

---

## 4. 청첩장 설정에 URL 넣기

1. 프로젝트에서 `src/config/wedding.ts` 열기
2. `googleScriptUrl` 값을 위에서 복사한 **웹 앱 URL**로 변경

```ts
// wedding.ts
googleScriptUrl: 'https://script.google.com/macros/s/여기에_배포_URL/exec',
```

저장 후 청첩장에서 참석의사를 제출하면 해당 스프레드시트에 행이 추가됩니다.

---

## 참고

- **no-cors** 때문에 브라우저에서는 응답 본문을 읽지 못합니다. 스프레드시트에 행이 추가되면 성공으로 간주하고 있습니다.
- 시트를 수정하거나 다른 시트를 쓰고 싶다면 `getActiveSheet()` 대신 `getSheetByName('시트이름')` 등으로 시트를 지정하면 됩니다.
