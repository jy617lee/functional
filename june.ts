namespace june {
  // 패턴1. 직접구현
  // - 하나의 함수에서 호출하는 다른 함수들이 모두 비슷한 계층에 있어야 한다.
  // - 하나의 함수에서 너무 먼 계층의 함수를 호출하면 안된다.
  // - 같은 계층의 함수는 같은 목적을 가져야 한다
  // - 하나의 함수는 한 계층의 문제만 해결한다
  type Item = {
    name: string;
    price: number;
  };
  type Cart = Item[];

  const freeTieClip = (cart: Cart) => {
    const hasTie = isInCart(cart, "tie");
    const hasTieClip = isInCart(cart, "tie clip");

    if (hasTie && !hasTieClip) {
      addItem(cart, { name: "tie clip", price: 0 });
    }
    return cart;
  };

  // addItem과 같은 계층 - 추가/삭제니까 동일한 추상화 수준을 가진다.
  const removeByItem = (cart: Cart, name: string) =>
    cart.filter((item) => item.name !== name);

  // 연습문제 1 - 굳이 index를 찾지 않아도 괜찮다
  const isInCart = (cart: Cart, name: string) =>
    cart.some((item) => item.name === name);

  // 한 계층으로 묶이는 함수를 불필요하게 계층을 세분화한 것 같다
  // 연습문제 2, 3
  const setPriceByName = (cart: Cart, name: string, price: number) =>
    cart.map((item) => (item.name === name ? { ...item, price } : item));
}
