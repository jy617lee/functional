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
export let mailingList: string[] = [];

function addContact(mailingList: string[], email: string): string[] {
  return [...mailingList, email];
}

export function submitFormHandler(event: SubmitEvent) {
  const form = event.target as HTMLFormElement;
  const email = form.elements["email"]?.value;
  mailingList = email ? addContact(mailingList, email) : mailingList;
}

/**
 * p125
 * pop 메서드 분리하기
 */
const a = [1, 2, 3, 4];
const b = a.pop();

const pop = (arr) => {
  // AK
  // return {last: arr[arr.length -1], array: arr.slice(0, -1)};

  const newArr = [...arr];
  const last = newArr.pop();
  return {
    last,
    array: newArr,
  };
};

// June
// const lastElement = <T>(array: T[]) => array[array.length - 1];
// const removeLastItemFromArray = <T>(array: T[]) => {
//   let copyArray = [...array];
//   copyArray.pop();
//   return copyArray;
// };

// Roro
// function shiftExampleReadAndWrite() {
//   var a = [1, 2, 3, 4];

//   function popWithCopyOnWrite(origin) {
//     function readLast(array: number[]) {
//       return array[array.length - 1];
//     }

//     function pop(array) {
//       const newArray = array.slice();
//       newArray.pop();
//       return newArray;
//     }

//     const last = readLast(origin);
//     const originMinusLast = pop(origin);

//     return [last, originMinusLast];
//   }

//   const [last, removed] = popWithCopyOnWrite(a);
// }

/**
 * p128
 * push
 */
const push = (arr, item) => {
  return [...arr, item];
};

/**
 * p129
 * add_contact
 */
function addContact2<T>(mailingList: T[], email: T): T[] {
  // return push(mailingList, email);
  return [...mailingList, email];
}

// June
// const addContact = (mailingList: string[], email: string): string[] => [
//   ...mailingList,
//   email,
// ];

/**
 * p130
 */
function arraySet<T>(arr: T[], index: number, item: T): T[] {
  return [...arr.slice(0, index), item, ...arr.slice(index + 1)];
}

// AK
// export function arraySet<T>(arr: T[], index: number, item: T): T[] {
//   return arr.map((v, i) => (i === index ? item : v));
// }

// June
// const arraySet = <T>(array: T[], index: number, value: T) => {
//   let copyArray = [...array]
//   copyArray[index] = value;
//   return copyArray;
// };

// Jin
//  function arraySet<T>(array: T[], idx: number, value: T): T[] {
//  const newArray = array.slice();
// TODO: if we want this util func to act like array[idx] = sth, it would be fine
//  newArray[idx] = value;
//  return newArray;
//}

// 오브젝트를 복사해서 그 안의 아이템을 수정하고 리턴한다 -> 아이템은 참조된 원본 값이 수정된다? -> 아이템을 수정할 때도 복사해서 수정해야 한다?
// 구조적 공유 structural sharing

/**
 * p136
 * objectSet
 */
function objectSet<T>(obj: T, key: string, value: number): T {
  return {
    ...obj,
    [key]: value,
  };
}

// AK
// function objectSet2<
//   T extends Record<K, unknown>,
//   K extends keyof T,
//   V extends T[K]
// >(object: T, key: K, value: V): T {
//   const copy = Object.assign({}, object);
//   copy[key] = value;
//   return copy;
// }

/**
 * p137
 * setPrice
 */
type Item = { name: string; price: number; quantity: number };

function setPrice2(item: Item, newPrice: number): Item {
  return objectSet(item, "price", newPrice);
}

// June
// const setPrice = (item: Item, newPrice: number) => {
//   return { ...item, price: newPrice };
// };

// Jin
// enum ITEM_KEY {
//   PRICE = "price",
//   QUANTITY = "quantity",
// }

// function setPrice(item: Item, price: number): Item {
//   // objectSet(item, ITEM_KEY.PRICE, price)
//   return { ...item, price };
// }

// AK
// function setPriceByName(cart: Cart, name: string, price: number): Cart {
//   return cart.map(item => item.name === name ? {...item, price} : item)
// }

/**
 * p138
 * setQuantity
 */
function setQuantity(item: Item, newQuantity: number): Item {
  return objectSet(item, "quantity", newQuantity);
}

/**
 * p139
 * objectDelete
 */
function objectDelete(obj: Object, key: keyof Object): Object {
  const newObj = { ...obj };
  delete newObj[key];
  return newObj;
}

// AK (타입 붙이는 재미가 쏠쏠...)
// function objectDelete<T extends Record<K, unknown>, K extends keyof T>(
//   object: T,
//   key: K
// ): Omit<T, K> {
//   const { [key]: _, ...rest } = object; 👍👍 와웅 (챗지피티가 해줬어염...)
//   return rest
// }

/**
 * 144
 */
function setQuantityByName(cart, name, quantity) {
  const index = cart.findIndex((item) => item.name === name);
  return arraySet(cart, index, setQuantity(cart[index], quantity));
}

// JY
// const setQuantityByName = (cart: Cart, name: string, quantity: number) =>
// cart.map((item) =>
//   item.name === name ? { ...item, quantity: quantity } : item
// );

// AK
// type Item = {
//   name: string;
//   price: number;
// };
// type DisplayItem = Item & {
//   freeShipping: boolean;
// };
// type CartItem = Item & {
//   quantity: number;
// };

// June
// type Item = {
//   readonly name: string; // --> 어차피 item을 replace할거기 때문에 다 readonly라고 보는것이 좋다
//   price: number;
// };

// type CartItem = Item & {
//   quantity: number;
// };

// Shallow Copy
// const object = {
//   1: { a: "aaa" },
//   2: { b: "bbb" },
//   3: { c: "ccc" },
// };
// object[1], object[2], object[3] --> 얘네에 대한 참조값만 가지고 있다

// https://pythontutor.com/render.html#mode=display
// 여기서 아래 코드 실행해보면서 이해해보자
// const a = { x: 1, y: [2, 3, 4] }
// const b = a
// const s = Object.assign({}, a) //  Shallow Copy
// const d = JSON.parse(JSON.stringify(a)) // Deep Copy
