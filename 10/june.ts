namespace June {
  // 연습문제1 - Cart를 Item[]이 아닌 Map으로 바꾸면 어떤 함수를 고쳐야 하나요? 직접 고쳐봅시다 p207 (완료)
  // 연습문제2 - 시계 할인함수인 getsWatchDiscount를 구현해봅시다 213p
  // 연습문제3 - 장바구니에 제품을 담을 때 로그를 남기는 코드 작성해보기 216p

  // 책을 보기 전에 연습문제를 먼저 풀어본 후 책과 비교해보면 좋을 것 같아요.

  // 타입
  type Item = {
    id: number;
    name: string;
    price: number;
  };
  type CartItem = Item & { quantity: number; size: number };
  type Cart = Map<number, CartItem>;

  // 상수 및 데이터
  const TAX_RATE = 0.1;
  const FREE_SHIPPING_THRESHOLD = 20;

  // 장바구니 비지니스 로직
  const getFreeShipping = (cart: Cart): boolean =>
    calcTotal(cart) >= FREE_SHIPPING_THRESHOLD;
  const cartTax = (cart: Cart): number => {
    const total = calcTotal(cart);
    const tax = calcTax(total);
    return tax;
  };

  // 장바구니 기본로직
  const removeItem = (cart: Cart, id: number): Cart => {
    const copiedCart = { ...cart };
    if (!copiedCart[id]) throw new Error("no item");

    if (copiedCart[id]) {
      if (copiedCart[id].quantity === 1) {
        const { [id]: _, ...rest } = copiedCart;
        return { ...rest };
      }
      return {
        ...copiedCart,
        [id]: { ...copiedCart[id], quantity: copiedCart[id].quantity - 1 },
      };
    }

    return copiedCart;
  };

  const calcTotal = (cart: Cart): number => {
    let total = 0;
    for (const [key, item] of cart) {
      total += item.price * item.quantity;
    }
    return total;
  };

  const isInCart = (cart: Cart, id: number): boolean => cart[id] !== undefined; // !!cart[id] 로 안한것은 id가 0인 경우 때문에

  const addItem = (cart: Cart, item: Item): Cart => {
    const newQuantity = cart[item.id] ? cart[item.id].quantity + 1 : 1;
    return {
      ...cart,
      [item.id]: {
        ...item,
        quantity: newQuantity,
      },
    };
  };

  const setField = <T extends keyof CartItem>(
    cart: Cart,
    id: number,
    field: T,
    value: CartItem[T]
  ): Cart => {
    const copiedCart = { ...cart };
    if (!copiedCart[id]) throw new Error("no item");

    return {
      ...copiedCart,
      [id]: {
        ...copiedCart[id],
        [field]: value,
      },
    };
  };

  // 공통 비지니스 로직
  const calcTax = (amount: number): number => amount * TAX_RATE;

  // 2번 - 30% 할인 가정했을 때
  const WATCH_DISCOUNT_RATE = 0.3;
  const WATCH_ID = 1;
  const getsWatchDiscount = (cart: Cart): Cart => {
    return setField(
      cart,
      WATCH_ID,
      "price",
      cart[WATCH_ID].price * (1 - WATCH_DISCOUNT_RATE)
    );
  };

  // 3번
  const sendEventLog = (
    eventName: string,
    property: { [key: string]: string | number }
  ) => {};

  // 10장
  // 연습문제 1번
  const multiplyByFour = (value: number): number => value * 4;
  const multiplyByTwo = (value: number): number => value * 2;
  const multiplyByEight = (value: number): number => value * 8;
  const multiplyBYPie = (value: number): number => value * Math.PI;

  const multiply = (value: number, multiplier: number): number =>
    value * multiplier;

  // 연습문제 2번(p244), 3번(p256)
  type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
  };
  const incrementField = <T extends keyof KeysOfType<CartItem, number>>(
    cart: Cart,
    id: number,
    field: T
  ): Cart => {
    const value = cart[id][field];
    return setField(cart, id, field, value + 1);
  };
  // price를 increment 1 하는건 이상해. value가 number인 필드 모두가 아니라 지정해주는게 더 좋을까?
  const incrementField2 = (
    cart: Cart,
    id: number,
    field: "quantity" | "size"
  ): Cart => {
    const value = cart[id][field];
    return setField(cart, id, field, value + 1);
  };

  // Jin: Pick을 사용해보자
  const incrementField3 = (
    cart: Cart,
    id: number,
    // 타입이 점점 괴랄해진다... 그냥 "quantity" | "size"를 하는게 낫나
    // 그치만 size를 amount로 바꾸거나 quantity type을 string으로 바꿀 때 정적 타입검사가 가능
    field: keyof Pick<CartItem, "quantity" | "size">
  ): Cart => {
    const value = cart[id][field];
    return setField(cart, id, field, value + 1);
  };

  // 연습문제 4번 (p251)
  const sub = (a: number, b: number): number => a - b;
  const devideBy = (value: number, devider: number): number => value / devider;

  // 반복문 예제: 먹고 치우기
  const cookAndEat = (foods: string[]): void =>
    foods.forEach((food) => {
      cook(food);
      eat(food);
    });

  const clean = (dishes: string[]): void =>
    dishes.forEach((dish) => {
      wash(dish);
      dry(dish);
      putAway(dish);
    });

  // 리팩터링: 함수 본문을 콜백으로 바꾸기
  const withLogging = (action: Function): void => {
    try {
      action();
    } catch (error) {
      logToSnapErros(error);
    }
  };
}
