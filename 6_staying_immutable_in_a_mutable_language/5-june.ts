namespace June {
  type Cart = CartItem[];

  type Item = {
    readonly name: string;
    price: number;
  };

  type CartItem = Item & {
    quantity: number;
  };

  type BuyButton = {
    readonly item: CartItem;
    showFreeShippingIcon: () => void;
    hideFreeShippingIcon: () => void;
  };

  // 상수
  const TAX_RATE = 0.1;
  const FREE_SHIPPING_THRESHOLD = 20;

  // 전역변수
  let shoppingCart: Cart = [];

  // 액션
  function addItemToCart(name: string, price: number): void {
    const item = makeCartItem(name, price);
    shoppingCart = addItem(shoppingCart, item);
    calcAndUpdateTotal(shoppingCart);
  }

  function deleteItemFromCart(name: string): void {
    shoppingCart = removeItemByName(shoppingCart, name);
    calcAndUpdateTotal(shoppingCart);
  }

  const calcAndUpdateTotal = (cart: Cart) => {
    const total = calcTotal(cart);
    setCartTotalDom(total);
    updateShippingIcons(cart);
    updateTaxDom(total);
  };

  function getBuyButtonsDom(): BuyButton[] {
    return [];
  }

  // 계산
  function addItem(cart: Cart, item: CartItem): Cart {
    return [...cart, item];
  }

  function removeItemByName(cart: Cart, name: string): Cart {
    return cart.filter((item) => item.name !== name);
  }

  const addPriceByName = (cart: Cart, name: string, price: number) => {
    return cart.map((item) =>
      item.name === name ? { ...item, price: price } : item
    );
  };

  function makeCartItem(name: string, price: number): CartItem {
    return {
      name: name,
      price: price,
      quantity: 0,
    };
  }

  function calcTotal(cart: Cart): number {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }

  function getsFreeShipping(cart: Cart): boolean {
    return calcTotal(cart) >= FREE_SHIPPING_THRESHOLD;
  }

  function calcTax(amount: number): number {
    return amount * TAX_RATE;
  }

  /**
   * DOM 업데이트 액션
   */
  function updateShippingIcons(cart: CartItem[]): void {
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

  // 연습문제1
  let mailingList: string[] = [];

  const addContact = (mailingList: string[], email: string): string[] => [
    ...mailingList,
    email,
  ];

  const submitFormHandler = (event) => {
    const email = event.target.elements["email"].value;
    addContact(mailingList, email);
  };

  // 연습문제2
  const lastElement = <T>(array: T[]) => array[array.length - 1];
  const removeLastItemFromArray = <T>(array: T[]) => {
    let copyArray = [...array];
    copyArray.pop();
    return copyArray;
  };

  // 연습문제3 - 안써도 될거같다
  const addItemToArray = <T>(array: T[], element: T) => [...array, element];

  // 연습문제4
  const arraySet = <T>(array: T[], index: number, value: T) => {
    let copyArray = [...array];
    copyArray[index] = value;
    return copyArray;
  };

  // 연습문제5
  const setPrice = (item: Item, newPrice: number) => {
    return { ...item, price: newPrice };
  };

  // 이건 안쓸거같다
  const objectSet = (object: Object, key: string | number, value: unknown) => {
    return { ...object, [key]: value };
  };

  // 연습문제6
  const setQuantity = (item: Item, newQuantity: number) => {
    return { ...item, quantity: newQuantity };
  };

  // 연습문제7
  const objectDelete = (object: Object, key: string | number) => {
    const copyObject = { ...object };
    delete copyObject[key];
    return copyObject;
  };

  // 엥, shallowCopy가 최상위 데이터 구조만 복사하는건가?
  // 참조값(shallow) vs 복사값(deep) 아니였나욤
  // 최상위 데이터구조를 참조값이라고 하는건가

  const setQuantityByName = (cart: Cart, name: string, quantity: number) =>
    cart.map((item) =>
      item.name === name ? { ...item, quantity: quantity } : item
    );
}

// 계속 배열과 객체 동작에 대한 카피-온-라이트 버전을 만들어두는 것이 좋다고 하는데, 사실 js에서는 spread 문법이 있어서 잘 공감이 안갔다.
// 그렇지만 Flutter를 잠시 할때에는 이게 필요했던 것 같음 (toJSON, fromJSON 이였나...)
