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

// 전역변수
let shoppingCart: Item[] = []

// 액션
const addItemToCart = (item: Item) => {
  shoppingCart.push(item)
  const total = calcTotalPrice(shoppingCart)
  setCartTotalDom(total)
  updateShippingIcons(shoppingCart)
  updateTaxDom(total)
}

const updateShippingIcons = (cart: Item[]) => {
  const buyButtons = getBuyButtonsDom()
  for(let i = 0; i < buyButtons.length; i++) {
    const button = buyButtons[i]
    showFreeShippingIcon(button, isFreeShipping([...cart, button.item]))
  }
}

// DOM 업데이트
const showFreeShippingIcon = (button: any, isShow: boolean) => {
  if (isShow) {
    button.showFreeShippingIcon()
  } else { 
    button.hideFreeShippingIcon()
  }
}

const updateTaxDom = (cartTotal: number) => setTaxDom(calcTax(cartTotal))
const setCartTotalDom = (total: number) => {}

