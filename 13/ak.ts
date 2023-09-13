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

  // max() and maxKey()
  function max<T>(values: T[]): T | undefined {
    return maxKey(values, x => x)
  }

  function maxKey<T, K>(values: T[], f: (v: T): K): T | undefined {
    const i = argmax(values.map(f))
    return i === undefined ? undefined : values(i)
  }

  function argmax<T>(values: T[]): number | undefined {
    if(values.length === 0) return undefined
    let result = 0
    for(let i = 1; i < values.length; i++) {
      if(values[result] < values[i]) result = i
    }
    return result
  }

  // shoesAndSocksInventory()
  type Product = {
    type: string
    numberInInventory: number
  }

  function shoesAndSocksInventory(products: Product[]): number {
    return products
      .filter(p => p.type === 'shoes' || p.type === 'socks')
      .map(p => p.numberInInventory)
      .reduce((a, b) => a + b)
  }

  // pluck
  function pluck<T, K extends keyof T>(array: T[], field: K): T[K][] {
    return array.map(a => a[field])
  }

  // concat?
  const allPurchases = [[1,2], [3,4]].flat()

  // roster
  const evaluations = [
    {name: "A", position: "catcher", score: 25},
    {name: "B", position: "pitcher", score: 24},
    {name: "C", position: "pitcher", score: 20},
    {name: "D", position: "catcher", score: 22},
  ]
  let roaster = evaluations.reduce((acc, b) > acc[b.position] ? acc : {...acc, [b.position]: b.name})

  // recommendations and scores
  declare function recommendPosition(name: string): string
  declare function scorePlayer(name: string, position: string): number
  
  const names = ["John", "Harry", "Jane"]
  const recomms = names.map(name => ({ name, position: recommendPosition(name) }))
  const scoredRecomms = recomms.map(r => ({ ...r, score: scorePlayer(r.name, r.position) }))

  // 몽땅 엮기
  names
    // add position
    .map(name => ({ name, position: recommendPosition(name) }))
    // add score
    .map(r => ({ ...r, score: scorePlayer(r.name, r.position) }))
    // descending by score
    .sort((a, b) => b.score - a.score)
    // roaster
    .reduce((a, b) => a[b.position] ? a : {...a, [b.position]: b.name}, {})

  // 전자책 원서에 오타? `evaluations` 아니고 `evaluationsDescending`이 맞음:
  //     var roster = reduce(evaluations, {}, function(roster, eval) { ... })

  // 이 책에서 구현한 moving average는 엄청나게 비효율적.
  // - 배열 크기 n, 윈도 너비 m에 대하여 O(n*m)
  // - 최적 알고리즘은 O(n)
  function movavr(data: number[], w: number): number[] {
    const avgs = []
    // initial
    for (let i = 0; i < w - 1; i++) avgs.push(data[i])
    // optimal move, without nested loop
    for (let i = w - 1; i < data.length; i++) avgs.push(avgs.at(-1)! + (data[i] - data[i - w + 1]) / w)
    return avgs
  }
}
