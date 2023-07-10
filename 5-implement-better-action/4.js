let shoppingCart = []
let shoppingCartTotal = 0

// 액션
function addItemToCart(name, price) {
  const item = makeCartItem(name, price)
  shoppingCart = addItem(shoppingCart, item)
  const total = calcTotal(shoppingCart)
  setCartTotalDom(total)
  updateShippingIcons(cart)
  updateTaxDom(total)
}

function updateShippingIcons(cart) {
  const buttons = getBuyBottomsDom()
  for(let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    const item = button.item
    const hasFreeShipping = getsFreeShippingWithItem(cart, item)
    setFreeShippingIcon(button, hasFreeShipping)
  }
}

function setFreeShippingIcon(button, isShown) {
  if(isShown) {
    button.showFreeShippingIcon()
  } else {
    button.hideFreeShippingIcon()
  }
}

function updateTaxDom(total) {
  setTaxDom(calcTax(total))
}

// 계산
function getsFreeShippingWithItem(cart, item) {
  const newCart = addItem(cart, item)
  return getsFreeShipping(newCart)
}

function addItem(cart, item) {
  return addElementLast(cart, item)
}

function makeCartItem(name, price) {
  return {name, price}
}

function calcTotal(cart) {
  let total = 0
  for(let i = 0; i < cart.length; i++) {
    const item = cart[i]
    total += item.price
  }
  return total
}

function getsFreeShipping(cart) {
  return cartTotal(cart) >= 20
}

function calcTax(amount) {
  return amount * 0.10
}

function addElementLast(array, elem) {
  return [...array, elem]
}
