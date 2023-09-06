namespace Roro {
  // 연습문제1 - Cart를 Item[]이 아닌 Map으로 바꾸면 어떤 함수를 고쳐야 하나요? 직접 고쳐봅시다 p207
  // 연습문제2 - 시계 할인함수인 getsWatchDiscount를 구현해봅시다 213p
  // 연습문제3 - 장바구니에 제품을 담을 때 로그를 남기는 코드 작성해보기 216p

  // 책을 보기 전에 연습문제를 먼저 풀어본 후 책과 비교해보면 좋을 것 같아요.

  // 타입
  type Item = {
    name: string;
    price: number;
  };
  // type Cart = Item[];

  type Cart = Map<string, Item>;

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

  const getsWatchDiscount = (cart: Cart): boolean => {
    const total = calcTotal(cart);
    const isWatchInCart = isInCart(cart, "watch");
    return isWatchInCart && total >= 100;
  };

  // 장바구니 기본로직
  const removeByItem = (cart: Cart, name: string): Cart => {
    const newCart = structuredClone(cart);
    delete newCart[name];
    return newCart;
  };
  const calcTotal = (cart: Cart): number =>
    Object.values(cart).reduce(
      (total: number, item: Item) => total + item.price,
      0
    );
  const isInCart = (cart: Cart, name: string): boolean =>
    Object[name] !== undefined;
  const addItem = (cart: Cart, item: Item): Cart => {
    const newCart = structuredClone(cart);
    const newItem = structuredClone(item);
    newCart[item.name] = newItem;
    // log(`add ${item.name} with price ${item.price}`);
    return newCart;
  };


  const setPriceByName = (cart: Cart, name: string, price: number): Cart => {
    const newCart = structuredClone(cart);
    newCart[name].price = price;
    newCart[name].name = name;
    return newCart;
  };

  // 공통 비지니스 로직
  const calcTax = (amount: number): number => amount * TAX_RATE;

  // 로깅 유틸리티
  const log = (message: string): void => {
    console.log({
      message,
      timestamp: new Date(),
    });
  };

  function withArrayCopy<T>(array: Array<T>, modify: Function) {
    const copy = array.slice();
    modify(copy);
    return copy;
  }

  // 연습문제 1
  function arraySet<T>(array: Array<T>, idx: number, value: T) {
    return withArrayCopy(array, (copy: Array<T>) => {
      copy[idx] = value;
    })
  }

  function push<T>(array: Array<T>, value: T) {
    return withArrayCopy(array, (copy: Array<T>) => {
      copy.push(value);
    })
  }

  function dropLast<T>(array: Array<T>) {
    return withArrayCopy(array, (copy: Array<T>) => {
      copy.pop();
    })
  }

  function dropFirst<T>(array: Array<T>) {
    return withArrayCopy(array, (copy: Array<T>) => {
      copy.shift();
    })
  }

  // 연습문제 2

  function withObjectCopy<T>(obj: T, modify: Function) {
    const copy = structuredClone(obj);
    modify(copy);
    return copy;
  }

  function objectSet(obj: Object, key: string, value: any) {
    return withObjectCopy(obj, (copy: Object) => {
      copy[key] = value;
    })
  }

  function objectDelete(obj: Object, key: string) {
    return withObjectCopy(obj, (copy: Object) => {
      delete copy[key];
    })
  }

  // 연습문제 3
  function tryCatch(task: Function, handler: Function) {
    try {
      return task();
    } catch (error) {
      return handler(error);
    }
  }

  // 연습문제 4
  function originalFunction() {
    const cart = new Map<string, Item>();
    if(isInCart(cart, "shoes")) {
      return setPriceByName(cart, "shoes", 0);
    }
  }

  function when(condition: boolean, task: Function) {
    if(condition) {
      return task();
    }
  }

  function modifiedFunction() {
    const cart = new Map<string, Item>();
    when(isInCart(cart, "shoes"), () => {
      return setPriceByName(cart, "shoes", 0);
    })
  }

  // 연습문제 5

  function IF (condition: boolean, taskOnTrue: Function, taskOnFalse: Function) {
    if(condition) {
      return taskOnTrue();
    } else {
      return taskOnFalse();
    }
  }
  function originalFunction2() {
    const array = []
    IF(array.length === 0, () => {
      console.log("array is empty");
    }, () => {
      console.log("array is not empty");
    })
  }

  // 연습문제 6

  function wrapIgnoreErrors(task: Function): (a, b, c) => any {
    return (a, b, c) => {
      try {
        return task(a, b, c);
      } catch (error) {
        return null
      }
    }
  }

  // 연습문제 7
  function makeAdder(n: number): (x: number) => number {
    return (x) => n + x
  }

  // 12장 연습문제 1

  interface Costumer {
    firstName: string;
    lastName: string;
    address: string;
  }
  function exercise1() {

    const costumers: Costumer[] = []

    return costumers.map((costumer: Costumer) => {
      return {
        ...costumer,
      }
    })
  }


}
