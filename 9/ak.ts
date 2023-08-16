namespace Base {
  // 타입
  type Item = {
    readonly name: string;
    readonly price: number;
  };

  type Cart = Readonly<Record<string, Item>>;

  // 상수 및 데이터
  const TAX_RATE = 0.1;
  const FREE_SHIPPING_THRESHOLD = 20;
  const WATCH_DISCOUNT_THRESHOLD = 100;

  // 장바구니 비지니스 로직
  const getsFreeShipping = (cart: Cart): boolean =>
    calcTotal(cart) >= FREE_SHIPPING_THRESHOLD;
  const getsWatchDiscount = (cart: Cart): boolean =>
    isInCart(cart, "watch") && calcTotal(cart) > WATCH_DISCOUNT_THRESHOLD;
  const calcCartTax = (cart: Cart): number => calcTax(calcTotal(cart));

  // 장바구니 기본로직
  const addItem = (cart: Cart, name: string, price: number): Cart => ({
    ...cart,
    [name]: { name, price },
  });
  const removeItem = (cart: Cart, name: string): Cart => {
    const { [name]: _, ...result } = cart;
    return result;
  };
  const setPrice = (cart: Cart, name: string, price: number): Cart => ({
    ...cart,
    [name]: { name, price },
  });
  const isInCart = (cart: Cart, name: string): boolean =>
    cart[name] !== undefined;
  const calcTotal = (cart: Cart): number =>
    Object.entries(cart).reduce((total, [_, { price }]) => total + price, 0);

  // 공통 비지니스 로직
  const calcTax = (amount: number): number => amount * TAX_RATE;
}

/*
Straightforward implementation

- 읽기 쉬우려면 한 함수 내의 abstraction level이 같아야.

Abstraction barrier

- isInCart()는 Middle Man 냄새가 나지만 Abstraction barrier 관점에서는 놔누는 게 좋음

Minimal interface

- 소수의 잘 정의된 오퍼레이션을 사용하기
- eDSL (embedded Domain Specific Language) 같은 느낌

Re-implementing the shopping cart as an object

- 기존의 base.ts에서 Cart 타입을 바꾸었을 때 어디어디가 깨지는지 살펴보면 레이어가
  잘 나뉘었는지 알 수 있음. 정정 타입 시스템의 장점.

When to use (and when not to use!) abstraction barriers

- YAGNI (You Ain't Gonna Need It)

*/
