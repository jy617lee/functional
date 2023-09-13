namespace HS {
  interface Item {
    name: string;
    quantity: number;
    size: number;
  }

  // 연습문제
  function multiply(x: number, y: number): number {
    return x * y;
  }

  function cook(x) {}
  function eat(x) {}
  function wash(x) {}
  function dry(x) {}

  const dishes = [];

  const result = dishes.map((x) => {
    const cooked = cook(x);
    return eat(cooked);
  });
}
