let shoppingCart = []
let shoppingCartTotal = 0

// 액션
function addItemToCart(name, price) {
  shoppingCart = addItem(shoppingCart, name, price)
  calcCartTotal()
}

function calcCartTotal() {
  shoppingCartTotal = calcTotal(shoppingCart)
  setCartTotalDom()
  updateShippingIcons(shoppingCart)
  updateTaxDom()
}

function updateShippingIcons(cart) {
  const buttons = getBuyBottomsDom()
  for(let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const item = button.item;
    const newCart = addItem(cart, item.name, item.price)
    if (getsFreeShipping(newCart)) {
      button.showFreeShippingIcon()
    } else {
      button.hideFreeShippingIcon()
    }
  }
}

function updateTaxDom() {
  setTaxDom(calcTax(shoppingCartTotal))
}

function addItem(cart, name, price) {
  return [...cart, {name: name, price: price}]
}

// 계산
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
