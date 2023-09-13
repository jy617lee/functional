namespace Jin {
  type Cart = Item[];

  type Item = {
    name: string;
    price: number;
  };

  // 연습문제 1
  function isInCart(cart: Cart, name: string) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === name) {
        return true;
      }
    }
    return false;;
  }
  function indexOfItem(cart: Cart, name: string) {
    fot (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            return i;
        }
    }
    return null;
  }

  // 연습문제 2
  function setPriceByName() {}
  function indexOfItem() {}

  //연습문제 3
  function setPriceByName() {}
  function arraySet() {}
}
