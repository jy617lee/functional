// 데이터
const FREE_SHIPPING_AMOUNT = 20
const TAX_RATE = 0.1
interface Item {
  name: string
  price: number
}

// 계산
const calcTotalPrice = (cart: Item[]): number => 
  cart.reduce((total: number, item: Item) => total + item.price, 0)
const isFreeShipping = (cart: Item[]): boolean => calcTotalPrice(cart) >= FREE_SHIPPING_AMOUNT
const calcTax = (total: number): number => total * TAX_RATE

// 액션
const addItemToCart = (cart: Item[], item: Item): void => {
  cart = [...cart, item]
  const total = calcTotalPrice(cart)
  setCartTotalDom(total)
  updateShippingIcons(cart)
  updateTaxDom(total)
}

const updateShippingIcons = (cart: Item[]): void => {
  const buyButtons = getBuyButtonsDom()
  for(let i = 0; i < buyButtons.length; i++) {
    const button = buyButtons[i]
    showFreeShippingIcon(button, isFreeShipping([...cart, button.item]))
  }
}

// DOM 업데이트
const showFreeShippingIcon = (button: any, isShow: boolean): void => {
  if (isShow) {
    button.showFreeShippingIcon()
  } else { 
    button.hideFreeShippingIcon()
  }
}

const updateTaxDom = (cartTotal: number): void => setTaxDom(calcTax(cartTotal))
const setCartTotalDom = (total: number): void => {}