namespace Base {
  // 연습문제1 - Cart를 Item[]이 아닌 Map으로 바꾸면 어떤 함수를 고쳐야 하나요? 직접 고쳐봅시다 p207
  //
  type Cart = Map<number, Item>;
  // 연습문제2 - 시계 할인함수인 getsWatchDiscount를 구현해봅시다 213p
  interface CartItem {
    category: string;
    price: number;
  }

  function calculateTotalWithWatchDiscount(
    cartTotal: number,
    cartItems: CartItem[]
  ): number {
    const watchDiscountPercentage: number = 10;

    if (cartTotal > 100) {
      const watchItem = cartItems.find((item) => item.category === "watch");
      if (watchItem) {
        const originalWatchPrice = watchItem.price;
        const discountAmount =
          originalWatchPrice * (watchDiscountPercentage / 100);
        const discountedWatchPrice = originalWatchPrice - discountAmount;
        return cartTotal - originalWatchPrice + discountedWatchPrice;
      }
    }
    return cartTotal;
  }

  // 연습문제3 - 장바구니에 제품을 담을 때 로그를 남기는 코드 작성해보기 216p

  // 책을 보기 전에 연습문제를 먼저 풀어본 후 책과 비교해보면 좋을 것 같아요.

  // 타입
  type Item = {
    name: string;
    price: number;
  };
  // type Cart = Item[];

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
  const removeByItem = (cart: Cart, name: string): Cart =>
    cart.filter((item) => item.name !== name);
  const calcTotal = (cart: Cart): number =>
    cart.reduce((total, item) => total + item.price, 0);
  const isInCart = (cart: Cart, name: string): boolean =>
    cart.some((item) => item.name === name);
  const addItem = (cart: Cart, item: Item): Cart => [...cart, item];
  const setPriceByName = (cart: Cart, name: string, price: number): Cart =>
    cart.map((item) => (item.name === name ? { ...item, price } : item));

  // 공통 비지니스 로직
  const calcTax = (amount: number): number => amount * TAX_RATE;

  // chapter10 p243
  const multiply = (x: number, y: number): number => {
    return x * y;
  };

  //
  const incrementField = (cart: Cart, name: string, field: string): Cart => {
    const item = cart[name];
    const value = item[field];
    const newValue = value + 1;
    const newItem = objectSet(item, field, newValue);
    const newCart = objectSet(cart, name, newItem);
    return newCart;
  };
}

// 11장 연습문제 1

function withArrayCopy<T>(array: T[], modify: (copy: T[]) => void): T[] {
  const copy = array.slice();
  modify(copy);
  return copy;
}

// push 함수에 적용
function push<T>(array: T[], elem: T): T[] {
  return withArrayCopy(array, copy => {
    copy.push(elem);
  });
}

// drop last 함수
function drop_last<T>(array: T[], elem: T): T[] {
  return withArrayCopy(array, copy => {
    copy.pop();
  });
}

// 함수 drop last 함수
function drop_first<T>(array: T[], elem: T): T[] {
  return withArrayCopy(array, copy => {
    copy.shift();
  });
}

function withObjectCopy<T>(object: T, modify: (copy: T) => void): T {
    const copy = Object.assign({}, object);
    modify(copy);
    return copy;
}

// 연습문제 try/catch
function tryCatch(tryBlock: () => void, catchBlock: (error: any) => void): void {
    try {
        tryBlock();
    } catch (error) {
        catchBlock(error);
    }
}

// 사용 예시
tryCatch(
    () => {
        sendEmail();
    },
    (error) => {
        logToSnapErrors(error);
    }
);


function when(test: boolean, then: () => void): void {
    if (test) {
        then();
    }
}

function IF<T>(test: boolean, then: () => T, ELSE: () => T): T {
    if (test) {
        return then();
    } else {
        return ELSE();
    }
}

function IgnoreErrors<T>(func: (...args: any[]) => T, ...args: any[]): T | null {
    try {
        const result = func(...args);
        return result;
    } catch (error) {
        return null;
    }
}



const makeAdder = (numberToAdd: number) => (number: number) => number + numberToAdd;


interface Customer {
  firstName: string;
  lastName: string;
  address: string;
}

const customers: Customer[] = [
  { firstName: 'John', lastName: 'Doe', address: '123 Main St' },
  { firstName: 'Jane', lastName: 'Smith', address: '456 Elm St' },
];

// const postcards: Customer[] = customers.map(customer => ({
//   firstName: customer.firstName,
//   lastName: customer.lastName,
//   address: customer.address
// }));

const postcards: Customer[] = customers.map(({ firstName, lastName, address }) => ({
  firstName,
  lastName,
  address
}));
