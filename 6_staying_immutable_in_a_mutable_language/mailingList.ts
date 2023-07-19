/**
 * p120
 * 아래는 메일링 리스트에 연락처를 추가하는 코드입니다.
 * 이메일 주소를 전역변수인 리스트에 추가합니다.
 * 입력 폼을 처리하는 핸들러에서 이 동작을 부릅니다.
 *
 * 이 코드를 Copy-on-write 형식으로 바꿔 보세요. 아래는 몇 가지 힌트입니다.
 * 1. addContact()가 전역변수에 접근하면 안됩니다. mailingList를 인자로 받아 복사하고 변경한 다음 리턴해야 합니다.
 * 2. addContact() 함수의 리턴값을 mailingList 전역변수에 할당해야 합니다.
 *
 * Copy-on-write 원칙에 따라 코드를 바꿔보세요.
 */
let mailingList: string[] = [];

function addContact(email: string) {
  mailingList.push(email);
}

export function submitFormHandler(event) {
  const form = event.target;
  const email = form.elements["email"].value;
  addContact(email);
}

/**
 * p125
 */
const a = [];
