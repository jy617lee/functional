namespace Base {
  // 타입
  type Item = {
    readonly name: string;
    readonly price: number;
    readonly number: number;
    readonly shipping: number;
    readonly tax: number;
  }

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
    [name]: { name, price, number: 1, shipping: 0, tax: 0 },
  });

  const removeItem = (cart: Cart, name: string): Cart => {
    const { [name]: _, ...result } = cart;
    return result;
  };

  function setFieldByName<F extends keyof Item>(
    cart: Cart,
    name: string,
    field: F,
    value: Item[F]
  ): Cart {
    return {
      ...cart,
      [name]: { ...cart[name], [field]: value },
    };
  }

  const isInCart = (cart: Cart, name: string): boolean =>
    cart[name] !== undefined;

  const calcTotal = (cart: Cart): number =>
    Object.entries(cart).reduce((total, [_, { price }]) => total + price, 0);

  // 공통 비지니스 로직
  const calcTax = (amount: number): number => amount * TAX_RATE;

  // 밥...
  type Food = {
    kind: "Food"
  }
  type Dish = {
    kind: "Dish"
  }

  const foods: Food[] = []
  const dishes: Dish[] = []

  foods.forEach(f => {cook(f); eat(f)})
  forEach(foods, f => {cook(f); eat(f)})

  dishes.forEach(d => {wash(d); dry(d); putAway(d)})
  forEach(dishes, d => {wash(d); dry(d); putAway(d)})

  function cook(food: Food): void {}
  function eat(food: Food): void {}
  function wash(dish: Dish): void {}
  function dry(dish: Dish): void {}
  function putAway(dish: Dish): void {}

  function forEach<T>(array: T[], f: (item: T) => void): void {
    for(let i = 0; i < array.length; i++) {
      f(array[i])
    }
  }
}
