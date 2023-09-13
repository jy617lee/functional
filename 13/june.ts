namespace June {
  // p299 연습문제 1
  type Item = {
    readonly id: number;
    readonly name: string;
    readonly price: number;
  };
  type Purchase = {
    readonly id: number;
    readonly item: Item;
    readonly price: number;
    readonly quantity: number;
  };
  type Customer = {
    readonly id: number; // 이유가 있는건 아닌데 평소에 코딩할때 습관적으로 id에 readonly 붙여줬어요 왜냐면 함수형 코딩을 하지 않고 있었기 때문인가봐요 ㅋㅋㅋ
    readonly firstName: string;
    readonly lastName: string;
    readonly address: string;
    readonly numOfPurchases: number;
    readonly purchases: Purchase[];
    readonly totalAmount: number;
  };

  const customers = [] as Customer[];
  const emailCustomers: Pick<Customer, 'firstName' | 'lastName' | 'address'>[] =
    customers.map((customer) => {
      const { firstName, lastName, address } = customer;
      return {
        firstName,
        lastName,
        address,
      };
    });

  // p304
  const isTestUser = (id: number) => id % 3 === 0;
  const testGroup: Customer[] = customers.filter((customer: Customer) =>
    isTestUser(customer.id)
  );
  const nonTestGroup: Customer[] = customers.filter(
    (customer: Customer) => !isTestUser(customer.id)
  );

  // p309
  const sum: number = [1, 2, 3].reduce(
    (acc: number, item: number) => acc + item,
    0
  );
  const multiply: number = [1, 2, 3].reduce(
    (acc: number, item: number) => acc * item,
    1
  );
  const min = (numbers: number[]) =>
    numbers.reduce(
      (currentMin: number, item: number) =>
        currentMin > item ? item : currentMin,
      Number.POSITIVE_INFINITY
      // MAX_VALUE: js가 표현할 수 있는 가장 큰 수
      // MAX_INFINITY: MAX_VALUE를 넘어선 수
      // 의미상으로는 MAX_VALUE가 맞는 것 같아요. 동작은 하겠지만 가장 큰 수를 넘어서서 표현할 수 없는 수를 의미하는 것은 아니니까요
      // 그런데 계산이 아니라 비교를 하는것이라서
      // 맞습니당
      // 그런데 min/max 함수에서 우연히 제대로 동작하는 느낌 (계산하지 않고 비교만해서)
      // Number.POSITIVE_INFINITY > 2 // true
      // Number.POSITIVE_INFINITY: Infinity
      // Number.MAX_VALUE : 1.7976931348623157e+308
    );
  const max = (numbers: number[]) =>
    numbers.reduce(
      (currentMin: number, item: number) =>
        currentMin < item ? item : currentMin,
      Number.NEGATIVE_INFINITY
    );

  // p312
  [].map(() => undefined); // []
  [].filter(() => undefined); // []
  const initialValue = undefined;
  [].reduce(() => undefined, initialValue); // initialValue
  // 4, 5 배열 그대로, 가 아니라 복사본이구나
  // 6 빈배열

  // p314
  // map이 내부적으로 어떻게 구현되었는지 찾아보려고 했는데 실패한듯하다
  // https://github.com/v8/v8/blob/main/src/builtins/array-map.tq
  const map = <T>(array: T[], callback: (item: T) => unknown) => {
    return array.reduce(
      (acc: unknown[], item: T) => [...acc, callback(item)],
      [] as unknown[]
    );
  };

  const filter = <T>(array: T[], callback: (item: T) => boolean) => {
    return array.reduce(
      (acc: T[], item: T) => (callback(item) ? [...acc, item] : acc),
      [] as T[]
    );
  };

  // 체이닝을 안쓰고 풀었네요...
  // 이 책에서 이야기하는 체이닝의 장점이 무엇인가요?
  // 먼저 읽으신분들의 설명부탁
  //
  // 가독성이 좋아진다, 로 이해하면 되나요
  // 재사용성
  // p328 - 총 구매금액 100달러 이상, 구매횟수 2번 이상인 고객 리스트
  // 고객에 맵핑되는 구매내역 리스트가 있을거라고 가정하고
  // 구매내역 리스트를 던지면 total을 구하는 함수를 따로 분리했어요
  const getTotalPurchaseAmount = (purchases: Purchase[]): number =>
    purchases.reduce(
      (total: number, purchase: Purchase) =>
        total + purchase.price * purchase.quantity,
      0
    );
  // 여기서 두 번 필터를 돌까 고민했는데
  // 한번 돌때 둘 다 체크하는게 성능이 더 좋을 것 같아서 이렇게 했습니다
  const bigSpenders = customers.filter(
    (x) => x.numOfPurchases > 2 && getTotalPurchaseAmount(x.purchases) > 100
  );

  // p329 - 평균 구하기
  // 얘는 다들 비슷하게 한것같아요
  const average = (numbers: number[]): number => {
    const total = numbers.reduce(
      (total: number, item: number) => total + item,
      0
    );
    return total / numbers.length;
  };

  // p330 - 모든 고객의 평균 구매액 구하기
  const averagePurchaseTotals = (customers: Customer[]): number =>
    average(customers.map((x) => x.totalAmount));
}
