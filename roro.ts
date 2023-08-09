namespace roro {
  function isInCart(cart, name) {
    return indexOfItem(cart, name) !== null;
  }
  function indexOfItem(cart, name) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === name) {
        return i;
      }
    }
    return null;
  }

  function setPriceByName(cart, name, price) {
    const cartCopy = structuredClone(cart);
    const index = indexOfItem(cartCopy, name);

    if (index !== null) {
      return arraySet(cart, index, setPrice(cart[index], price));
    }

    return cartCopy;
  }

  function setPrice(cartItem, price) {
    const cartItemCopy = structuredClone(cartItem);
    cartItemCopy.price = price;
    return cartItemCopy;
  }

  function arraySet(array, index, value) {
    const copy = structuredClone(array);
    copy[index] = value;
    return copy;
  }
}
