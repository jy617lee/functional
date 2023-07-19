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

export function addItemToCart(name: string, price: number): void {
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

("feat: 지난 5장까지의 코드");
