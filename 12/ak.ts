namespace Base {
  // 타입
  type Item = {
    readonly name: string;
    readonly price: number;
    readonly number: number;
    readonly shipping: number;
    readonly tax: number;
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
    isInCart(cart, 'watch') && calcTotal(cart) > WATCH_DISCOUNT_THRESHOLD;

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
    kind: 'Food';
  };
  type Dish = {
    kind: 'Dish';
  };

  const foods: Food[] = [];
  const dishes: Dish[] = [];

  foods.forEach((f) => {
    cook(f);
    eat(f);
  });
  forEach(foods, (f) => {
    cook(f);
    eat(f);
  });

  dishes.forEach((d) => {
    wash(d);
    dry(d);
    putAway(d);
  });
  forEach(dishes, (d) => {
    wash(d);
    dry(d);
    putAway(d);
  });

  function cook(food: Food): void {}
  function eat(food: Food): void {}
  function wash(dish: Dish): void {}
  function dry(dish: Dish): void {}
  function putAway(dish: Dish): void {}

  function forEach<T>(array: T[], f: (item: T) => void): void {
    for (let i = 0; i < array.length; i++) {
      f(array[i]);
    }
  }

  // withArrayCopy()
  function withArrayCopy<T>(array: T[], operation: (array: T[]) => void): T[] {
    const copy = [...array];
    operation(copy);
    return copy;
  }

  // const mod = [...arr, value]
  function push<T>(array: T[], value: T): T[] {
    return withArrayCopy(array, (array) => array.push(value));
  }

  // const mod = arr.slice(0, arr.length - 1)
  function drop<T>(array: T[]): T[] {
    return withArrayCopy(array, (array) => array.pop());
  }

  // const mod = arr.slice(1)
  function shift<T>(array: T[]): T[] {
    return withArrayCopy(array, (array) => array.shift());
  }

  // withObjectCopy()
  function withObjectCopy<T>(obj: T, operation: (obj: T) => void): T {
    const copy = { ...obj };
    operation(copy);
    return copy;
  }

  function objectSet<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
    return withObjectCopy(obj, (obj) => (obj[key] = value));
  }

  function objectDelete<T, K extends keyof T>(obj: T, key: K): Omit<T, K> {
    return withObjectCopy(obj, (obj) => delete obj[key]);
  }

  // tryCatch
  function tryCatch<F extends () => R, R, E>(
    tryer: F,
    catcher: (e: E) => R
  ): R {
    try {
      return tryer();
    } catch (e) {
      return catcher(e);
    }
  }
  tryCatch(
    () => parseInt('1'),
    () => NaN
  );

  // when, then, otherwise
  function when<T>(test: boolean, then: () => T, otherwise: () => T): T {
    return test ? then() : otherwise();
  }
  when(
    true,
    () => 'YES',
    () => 'NO'
  );

  // withLogging
  function withLogging(f: () => unknown): void {
    try {
      f();
    } catch (e) {
      console.log(e);
    }
  }
  function someFunction(s: string): void {}

  withLogging(() => someFunction('hello'));

  // 맘에 안든다 ㅜㅜㅜㅜ
  function wrapLogging<A, R>(f: (arg: A) => R): (arg: A) => void {
    return (arg) => {
      try {
        f(arg);
      } catch (e) {
        console.log(e);
      }
    };
  }
  const loggingUpper = wrapLogging(() => {});

  // June
  // // 연습문제 6
  // const wrapIgnoreError = <F extends (args: A) => R, A, R>(func: F): (args: A) => R | null => {
  //   return (args: A): R | null => {
  //     try {
  //       return func(args)
  //     } catch (error) {
  //       return null
  //     }
  //   }
  // }

  // // 연습문제 7 왜 내꺼만 안보여
  // const makeAddr = (valueToAdd: number) => (input: number) => input + valueToAdd
  // const increment = makeAddr(1)
  // const plus10 = makeAddr(10)
  // increment(10) // 11
  // plus10(10) // 20
}
