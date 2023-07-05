// 데이터
const FREE_SHIPPING_AMOUNT = 20

// 계산
const calcTotalPrice = (shoppingCart) => shoppingCart.reduce(
  (total, item) => total + item.price, 0)
const isFreeShipping = (cartTotal, newItem) => cartTotal + newItem.price >= 20
const calculateTax = (shoppingCartTotal) => shoppingCartTotal * 0.1

// 전역변수
let shoppingCart = []
let shoppingCartTotal = 0

// 액션
const addItemToCart = (name, price) => {
  shoppingCart.push({
    name: name,
    price: price
  })
  calcCartTotal()
}

const updateShippingIcons = () => {
  const buyButtons = getBuyButtonsDom()
  for(let i = 0; i < buyButtons.length; i++) {
    const button = buyButtons[i]
    const item = button.item
    if (isFreeShipping) {
      button.showFreeShippingIcon()
    } else { 
      button.hideFreeShippingIcon()
    }
  }
}

const updateTaxDom = () => setTaxDom(calculateTax)

const calcCartTotal = () => {
  shoppingCartTotal = calcTotalPrice(shoppingCart)
  setCartTotalDom()
  updateShippingIcons()
  updateTaxDom()
}