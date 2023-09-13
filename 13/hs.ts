namespace HS {
  interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    purchase: { item: any; price: number }[];
    purchase2: number[];
  }
  const customers: Customer[] = [];

  const customersData = customers.map((customer) => {
    const { firstName, lastName, address, ..._ } = customer;
    return { firstName, lastName, address };
  });

  const testGroup = customers.filter((x) => x.id % 3 === 0);
  const nonTestGroup = customers.filter((x) => x.id % 3 !== 0);

  const sum = (numbers: number[]): number =>
    numbers.reduce((acc, cur) => acc + cur, 0);

  const product = (numbers: number[]): number =>
    numbers.reduce((acc, cur) => acc * cur, 1);

  const min = (numbers: number[]): number =>
    numbers.reduce((acc, cur) => (acc > cur ? cur : acc), Number.MAX_VALUE);

  const max = (numbers: number[]): number =>
    numbers.reduce((acc, cur) => (acc < cur ? cur : acc), Number.MIN_VALUE);

  function map(array: any[], func) {
    array.reduce((acc, cur) => [...acc, func(cur)], []);
  }

  function filter(array: any[], func) {
    array.reduce((acc, cur) => (func(cur) ? [...acc, cur] : acc), []);
  }

  // 13장 함수형 도구 체이닝
  const maxKey = (array, init, func) =>
    array.reduce((acc, cur) => (func(acc) > func(cur) ? acc : cur), init);

  // 큰손(big spender) 정의 --> 고래
  // 1. 구매 금액이 최소 100달러를 넘는다. -> 총? 1회 당?
  // 2. 두 번 이상 구매함
  const bigSpenders = (customers: Customer[]): Customer[] => {
    const MIN_VALUE = 100;

    const totalPriceOfCustomer = (c: Customer) =>
      c.purchase.reduce((acc, cur) => acc + cur.price, 0);

    // 굳이...
    const isBigPurchase = (number) => number >= MIN_VALUE;

    return customers.filter(
      (x) => isBigPurchase(totalPriceOfCustomer(x)) && x.purchase.length >= 2
    );
  };

  // 숫자 배열 평균값
  const average = (numbers: number[]): number => sum(numbers) / numbers.length;

  // 각 고객 구매액 평균
  // purchase: { item: any; price: number }[];
  const averageTotalPurchase = (customers: Customer[]): number[] => {
    const averageOfPurchases = (c) => {};
    return customers.map((c) => averageOfPurchases(c));
  };
}
