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
    const isWatchInCart = isInCart(cart, 'watch');
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
    });
  }

  function push<T>(array: Array<T>, value: T) {
    return withArrayCopy(array, (copy: Array<T>) => {
      copy.push(value);
    });
  }

  function dropLast<T>(array: Array<T>) {
    return withArrayCopy(array, (copy: Array<T>) => {
      copy.pop();
    });
  }

  function dropFirst<T>(array: Array<T>) {
    return withArrayCopy(array, (copy: Array<T>) => {
      copy.shift();
    });
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
    });
  }

  function objectDelete(obj: Object, key: string) {
    return withObjectCopy(obj, (copy: Object) => {
      delete copy[key];
    });
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
    if (isInCart(cart, 'shoes')) {
      return setPriceByName(cart, 'shoes', 0);
    }
  }

  function when(condition: boolean, task: Function) {
    if (condition) {
      return task();
    }
  }

  function modifiedFunction() {
    const cart = new Map<string, Item>();
    when(isInCart(cart, 'shoes'), () => {
      return setPriceByName(cart, 'shoes', 0);
    });
  }

  // 연습문제 5

  function IF(condition: boolean, taskOnTrue: Function, taskOnFalse: Function) {
    if (condition) {
      return taskOnTrue();
    } else {
      return taskOnFalse();
    }
  }
  function originalFunction2() {
    const array = [];
    IF(
      array.length === 0,
      () => {
        console.log('array is empty');
      },
      () => {
        console.log('array is not empty');
      }
    );
  }

  // 연습문제 6

  function wrapIgnoreErrors(task: Function): (a, b, c) => any {
    return (a, b, c) => {
      try {
        return task(a, b, c);
      } catch (error) {
        return null;
      }
    };
  }

  // 연습문제 7
  function makeAdder(n: number): (x: number) => number {
    return (x) => n + x;
  }

  // 12장 연습문제 1

  interface Purchase {
    item: string;
    price: number;
  }

  interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    purchases: Purchase[];
  }

  interface Product {
    type: string;
    numberInInventory: number;
  }

  function exercise1() {
    const customers: Customer[] = [];

    return customers.map(
      (
        costumer: Customer
      ): {
        firstName: string;
        lastName: string;
        address: string;
      } => {
        return {
          ...costumer,
        };
      }
    );
  }

  // function exercise2() {
  //   const customers: Customer[] = [];

  //   return customers.map((costumer: Customer): Pick<Customer, 'firstName' | 'lastName' | 'address'> => {
  //     return {
  //       ...costumer,
  //     };
  //   });
  // }

  // 12장 연습문제 2

  function exercise2() {
    const customers: Customer[] = [];

    function isTestUser(customer: Customer): boolean {
      return customer.id % 3 === 0;
    }

    const testGroup = customers.filter(isTestUser);

    const nonTestGroup = customers.filter((customer: Customer) => {
      return !isTestUser(customer);
    });
  }

  function reduce<T>(
    array: Array<T>,
    init: T,
    reducer: (acc: T, item: T) => T
  ): T {
    let acc = init;
    array.forEach((item) => {
      acc = reducer(acc, item);
    });
    return acc;
  }

  function exercise3() {
    function sum(numbers: number[]): number {
      return reduce(numbers, 0, (acc, item) => acc + item);
    }

    function product(numbers: number[]): number {
      return reduce(numbers, 1, (acc, item) => acc * item);
    }

    function min(numbers: number[]): number {
      return reduce(numbers, Infinity, (acc, item) => {
        return acc < item ? acc : item;
      });
    }
    function max(numbers: number[]): number {
      return reduce(numbers, -Infinity, (acc, item) => {
        return acc > item ? acc : item;
      });
    }
  }

  function exercise4() {
    // map 함수에 빈 배열을 넘기면 어떤 값이 반환될까요?
    // []
    // filter 함수에 빈 배열을 넘기면 어떤 값이 반환될까요?
    // []
    // reduce 함수에 빈 배열을 넘기면 어떤 값이 반환될까요?
    // init 값
    // map 함수에 인자를 그대로 반환하는 함수를 넘기면 어떤 값이 반환될까요?
    // 넣었던 array와 같은 array 반환
    // filter 함수에 항상 true를 반환하는 함수를 넘기면 어떤 값이 반환될까요?
    // 넣었던 array와 같은 array 반환
    // filter 함수에 항상 false를 반환하는 함수를 넘기면 어떤 값이 반환될까요?
    // []
  }

  function exercise5() {
    function mapUsingReduce<T>(array: Array<T>, mapper: Function) {
      return array.reduce((acc: Array<T>, item: T) => {
        return [...acc, mapper(item)];
      }, []);
    }

    function filterUsingReduce<T>(array: Array<T>, predicate: Function) {
      return array.reduce((acc: Array<T>, item: T) => {
        return predicate(item) ? [...acc, item] : acc;
      }, []);
    }
  }
  // 13장 체이닝
  // maxKey가 더 범용성이 좋으므로 maxKey로 max를 만들 수 있음
  function maxKey<T>(array: Array<T>, init: T, key: Function): T {
    return array.reduce((acc: T, item: T) => {
      return key(acc) > key(item) ? acc : item;
    }, init);
  }

  function max(array: Array<number>, init: number): number {
    return maxKey(array, init, (item) => {
      return item;
    });
  }
  // max -> maxKey -> reduce -> callback
  // maxKey가 더 일반적임 max가 maxKey를 호출하여 사용

  function bigSpenders(customers: Array<Customer>) {
    return customers
      .filter(isOver100PurchaseCustomer)
      .filter(isOverTwicePurchaseCustomer);
  }

  function isOverTotalAmount(customer: Customer, total: number) {
    return (
      customer.purchases.reduce((acc: number, item: Purchase) => {
        return acc + item.price;
      }, 0) > total
    );
  }
  function isOver100PurchaseCustomer(customer: Customer) {
    return (
      customer.purchases.reduce((acc: number, item: Purchase) => {
        return acc + item.price;
      }, 0) > 100
    );
  }

  function isOverTwicePurchaseCustomer(customer: Customer) {
    return customer.purchases.length > 2;
  }

  function average(numbers: Array<number>): number {
    return (
      numbers.reduce((acc: number, item: number) => {
        return acc + item;
      }, 0) / numbers.length
    );
  }

  function averagePurchaseTotals(customers: Array<Customer>): number {
    return average(
      customers.map((customer: Customer) => {
        return customer.purchases.reduce((acc: number, item: Purchase) => {
          return acc + item.price;
        }, 0);
      })
    );
  }

  function range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function shoesAndSocksInventory(products: Product[]): number {
    return products
      .filter((product: Product) => {
        return product.type === 'shoes' || product.type === 'socks';
      })
      .reduce((acc: number, item: Product) => {
        return acc + item.numberInInventory;
      }, 0);
  }

  type IndexType = string | number;

  function pluck<T>(array: Array<T>, key: IndexType) {
    return array.map((item: T) => {
      return item[key];
    });
  }

  function concat<T>(array1: Array<T>, array2: Array<T>) {
    return [...array1, ...array2];
  }

  function frequenciesBy<T>(array: Array<T>, f: (item: T) => T) {
    return array.reduce((acc: Map<T, number>, item: T) => {
      const key = f(item);
      const currentCount = acc.get(key) || 0;
      return acc.set(key, currentCount + 1);
    }, new Map<T, number>());
  }

  function groupBy<T>(array: Array<T>, f: (item: T) => T) {
    return array.reduce((acc: Map<T, T[]>, item: T) => {
      const key = f(item);
      const currentItems = acc.get(key) || [];
      return acc.set(key, [...currentItems, item]);
    }, new Map<T, T[]>());
  }

  type Player = {
    name: string;
    position: string;
    score: number;
  };
  function problem348() {
    const evaluations: Player[] = [
      { name: 'Jane', position: 'catcher', score: 25 },
      { name: 'Alice', position: 'pitcher', score: 23 },
      { name: 'Bob', position: 'pitcher', score: 20 },
    ];
    const roster = evaluations.reduce(
      (roster: Map<string, string>, player: Player) => {
        if (roster[player.position] === undefined) {
          roster.set(player.position, player.name);
        }
        return roster;
      },
      new Map<string, string>()
    );
  }

  function recommendPosition(playerName: string) {
    return 'pitcher';
  }
  function scorePlayer(name: string, position: string) {
    return 10;
  }
  function problem349() {
    const employeeNames = ['Jane', 'Alice', 'Bob'];
    const recommendations = employeeNames.map((name: string) => {
      return {
        name: name,
        position: recommendPosition(name),
      };
    });
  }
  function problem350() {
    const recommendations = [
      { name: 'Jane', position: 'pitcher' },
      { name: 'Alice', position: 'catcher' },
      { name: 'Bob', position: 'pitcher' },
    ];
    const evaluations = recommendations.map((recommendation) => {
      return {
        ...recommendation,
        score: scorePlayer(recommendation.name, recommendation.position),
      };
    });
  }

  function problem351() {
    const employeeNames = ['Jane', 'Alice', 'Bob'];
    const recommendations = employeeNames.map((name: string) => {
      return {
        name: name,
        position: recommendPosition(name),
      };
    });
    const evaluations = recommendations.map((recommendation) => {
      return {
        ...recommendation,
        score: scorePlayer(recommendation.name, recommendation.position),
      };
    });
    const gradeAscending = evaluations.sort((a, b) => {
      return a.score - b.score;
    });

    const gradeDescending = gradeAscending.reverse();

    const roster = evaluations.reduce(
      (roster: Map<string, string>, player: Player) => {
        if (roster[player.position] === undefined) {
          roster.set(player.position, player.name);
        }
        return roster;
      },
      new Map<string, string>()
    );
  }
}
