function mailingListExample() {
  let mailingList: string[] = [];
  function addContact(mailingList: string[], email: string) {
    const newMailingList = mailingList.slice();
    newMailingList.push(email);
    return newMailingList;
  }
  function submitFormHandler(event) {
    const form = event.target;
    const email = form.element["email"].value;
    mailingList = addContact(mailingList, email);
  }
}

function shiftExampleOrigin() {
  var a = [1, 2, 3, 4];
  var b = a.pop();
  console.log(b); // 4
  console.log(a); // [1,2,3]
}

function shiftExampleReadAndWrite() {
  var a = [1, 2, 3, 4];

  function popWithCopyOnWrite(origin) {
    function readLast(array: number[]) {
      return array[array.length - 1];
    }

    function pop(array) {
      const newArray = array.slice();
      newArray.pop();
      return newArray;
    }

    const last = readLast(origin);
    const originMinusLast = pop(origin);

    return [last, originMinusLast];
  }

  const [last, removed] = popWithCopyOnWrite(a);
}
function pushExample(array, element) {
  const newArray = array.slice();
  newArray.push(element);
  return newArray;
}
