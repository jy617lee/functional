namespace Jin {
  type Cart = Item[];

  type Item = {
    name: string;
    price: number;
    quantity?: number;
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
  let mailingList: string[] = [];

  function addContact(mailingList: string[], email: string) {
    return addElementLast(mailingList, email);
  }

  export function submitFormHandler(event) {
    const form = event.target;
    const email = form.elements["email"].value;
    mailingList = addContact(mailingList, email);
  }

  function lastElement<T>(array: T[]): T {
    return array[array.length - 1];
  }

  function dropLast<T>(array: T[]): T[] {
    const newArray = array.slice();
    newArray.pop();
    return newArray;
  }

  function pop<T>(array: T[]): { last: T; array: T[] } {
    return {
      last: lastElement(array),
      array: dropLast(array),
    };
  }

  function push<T>(array: T[], element: T): { count: number; array: T[] } {
    const newArray = array.slice();
    newArray.push(element);
    return {
      count: newArray.length,
      array: newArray,
    };
  }

  function arraySet<T>(array: T[], idx: number, value: T): T[] {
    const newArray = array.slice();
    // TODO: if we want this util func to act like array[idx] = sth, it would be fine
    newArray[idx] = value;
    return newArray;
  }

  type Obj = { [key: string]: any };
  function objectSet(object: Obj, key: string, value: any): Obj {
    return { ...object, [key]: value };
  }

  enum ITEM_KEY {
    PRICE = "price",
    QUANTITY = "quantity",
  }

  function setPrice(item: Item, price: number): Item {
    // objectSet(item, ITEM_KEY.PRICE, price)
    return { ...item, price };
  }

  function setQuantity(item: Item, quantity: number): Item {
    // objectSet(item, ITEM_KEY.QUANTITY, quantity)
    return { ...item, quantity };
  }

  function setQuantityByName(cart: Cart, targetName: string, quantity: number) {
    const cartCopy = cart.slice();
    cartCopy.forEach((item: Item, idx: number) => {
      const { name } = item;
      if (name === targetName) {
        cartCopy[idx] = { ...item, quantity };
      }
    });
    return cartCopy;
  }

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
}
