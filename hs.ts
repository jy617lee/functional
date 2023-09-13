// 직접구현 : Straightforwardimplementation
namespace hs {
  function indexOfItem(cart, name): number | null {
    let index = null;
    cart.map((x, i) => (x.name === name ? (index = i) : null)); // -> name이 여러개 있는 경우 마지막 index를 반환할 것임 unique한 id등으로 하는 것이 좋지 않을까
    return index;
  }

  function isInCart(cart, name): boolean {
    return indexOfItem(cart, name) !== null;
  }

  function setPrice(item, price) {
    const newItem = structuredClone(item);
    newItem.price = price;
    return newItem;
  }

  function setPriceByName(cart, name, price) {
    const newCart = [...cart];
    const index = indexOfItem(newCart, name);
    if (index !== null) {
      const newPriceItem = setPrice(newCart[index], price);
      newCart[index] = newPriceItem;
    }
    return newCart;
  }
}
