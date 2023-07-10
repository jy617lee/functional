// 데이터
const FREE_SHIPPING_AMOUNT = 20
const TAX_RATE = 0.1
type Cart = Item[]
type Item = {
  readonly name: string
  readonly price: number
}

// 계산
const calcTotalPrice = (cart: Cart): number => 
  cart.reduce((total: number, item: Item) => total + item.price, 0)
const isFreeShipping = (cart: Cart): boolean => calcTotalPrice(cart) >= FREE_SHIPPING_AMOUNT
const calcTax = (total: number): number => total * TAX_RATE

// 액션
const addItemToCart = (cart: Cart, item: Item): void => {
  cart = [...cart, item]
  const total = calcTotalPrice(cart)
  const tax = calcTax(total)
  setCartTotalDom(total)
  updateShippingIcons(cart)
  setTaxDom(tax)
}

const updateShippingIcons = (cart: Cart): void => {
  const buyButtons = getBuyButtonsDom()
  buyButtons.forEach(button => showFreeShippingIcon(button, isFreeShipping([...cart, button.item])))
}

// DOM 업데이트
const showFreeShippingIcon = (button: any, isShow: boolean): void => {
  isShow ? button.showFreeShippingIcon() : button.hideFreeShippingIcon()
}

const setCartTotalDom = (total: number): void => {}
const setTaxDom = (tax: number): void => {}