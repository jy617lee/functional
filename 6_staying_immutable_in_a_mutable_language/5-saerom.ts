namespace SR {
  type Cart = Item[];

  type Item = {
    name: string;
    price: number;
  };

  type BuyButton = {
    item: Item;
    showFreeShippingIcon: () => void;
    hideFreeShippingIcon: () => void;
  };

  /**
   * 상수
   */
  const TAX_RATE = 0.1;
  const FREE_SHIPPING_THRESHOLD = 20;

  let shoppingCart: Cart = [];

  function addItemToCart(name: string, price: number): void {
    const item = makeCartItem(name, price);
    shoppingCart = addItem(shoppingCart, item);
    const total = calcTotal(shoppingCart);
    setCartTotalDom(total);
    updateShippingIcons(shoppingCart);
    updateTaxDom(total);
  }

  function addItem(cart: Cart, item: Item): Cart {
    return addElementLast(cart, item);
  }

  function makeCartItem(name: string, price: number): Item {
    return {
      name: name,
      price: price,
    };
  }

  function calcTotal(cart: Cart): number {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      total += item.price;
    }
    return total;
  }

  function getsFreeShipping(cart: Cart): boolean {
    return calcTotal(cart) >= FREE_SHIPPING_THRESHOLD;
  }

  function calcTax(amount: number): number {
    return amount * TAX_RATE;
  }

  function getBuyButtonsDom(): BuyButton[] {
    return [];
  }

  /**
   * util 함수
   */
  function addElementLast<T>(array: T[], element: T): T[] {
    var newArray = array.slice();
    newArray.push(element);
    return newArray;
  }

  /**
   * DOM 업데이트 액션
   */
  function updateShippingIcons(cart: Item[]): void {
    getBuyButtonsDom().forEach((button) => {
      const hasFreeShipping = getsFreeShipping(addItem(cart, button.item));
      setFreeShippingIcon(button, hasFreeShipping);
    });
  }
  function updateTaxDom(total: number): void {
    setTaxDom(calcTax(total));
  }
  function setCartTotalDom(total: number): void {}
  function setTaxDom(tax: number): void {}
  function setFreeShippingIcon(button: BuyButton, isShown: boolean): void {
    isShown ? button.showFreeShippingIcon() : button.hideFreeShippingIcon();
  }
}

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
let mailingList = [];

function addContact(email) {
  mailingList.push(email);
}

function submitFormHandler(event) {
  const form = event.target;
  const email = form.elements["email"].value;
  addContact(email);
}

// 1연습문제
function addContact(email: string, mailingList): void {
  const newMailingList = mailingList.slice();
  newMailingList.push(email);
  return newMailingList;
}

function submitFormHandler(event: Event, mailingList): void {
  const form = event.target as HTMLFormElement;
  const email = form.elements["email"].value;
  addContact(mailingList, email);
}
/**
 * p125
 */
const a = [];

let mailingList = [];

// p 125 의 1 연습문제

function lastItem<T>(array: T[]): T {
  return array[array.length - 1];
}

function dorpLastItem<T>(array: T[]): T[] {
  const newArray = array.slice();
  newArray.pop();
  return newArray;
}

function pop<T>(array: T[]): [T, T[]] {
  const newArray = array.slice();
  const last = newArray.pop();
  return { last: last, array: newArray };
}

// p 128
function push<T>(array: T[], newItem: T): T[] {
  const newArray = array.slice();
  newArray.push(newItem);
  return newArray;
}

function push<T>(array: T[], newItem: T): T[] {
  return [...array, newItem];
}

// P 129

function addContact(email: string, mailingList: string[]): string[] {
  return push(mailingList, email);
}

//  P 130

function arraySet(array: string[], index: number, item: string): string[] {
  const newArray = array.slice();
  newArray[index] = item;
  return newArray;
}

// P 131
function objectSet(object: any, key: string, value: any): any {
  // 얕은 복사
  // const newObject = { ...object };
  const newObject = Object.assign({}, object);
  newObject[key] = value;
  return newObject;
}

// P 132
function setPrice(item: Item, price: number): Item {
  return objectSet(item, "price", price);
}

// P 133
function setQuantity(item, newQuantity) {
  return objectSet(item, "quantity", newQuantity);
}

function objectDelete(object: any, key: string): any {
  const newObject = Object.assign({}, object);
  delete newObject[key];
  return newObject;
}
