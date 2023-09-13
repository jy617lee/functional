// 연습문제 1

function findItemIndex(cart, name) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      return i;
    }
  }
  return null;
}

function isInCart(cart, name) {
  return findItemIndex(cart, name) !== null;
}

function indexOfItem(cart, name) {
  return findItemIndex(cart, name);
}

// 연습문제 2
function setPriceByName(cart, name, price) {
  const cartCopy = [...cart];
  const index = indexOfItem(cartCopy, name);

  if (index !== null) {
    cartCopy[index] = {
      ...cartCopy[index],
      price,
    };
  }
}
