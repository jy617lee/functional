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
const calculateTax = (total: number): number => total * TAX_RATE

// 액션
const addItemToCart = (cart: Item[], item: Item) => {
  cart.push(item)
  const total = calcTotalPrice(cart)
  setCartTotalDom(total)
  updateShippingIcons(cart)
  updateTaxDom(total)
}

const updateShippingIcons = (cart: Item[]) => {
  const buyButtons = getBuyButtonsDom()
  for(let i = 0; i < buyButtons.length; i++) {
    const button = buyButtons[i]
    const newCart = [...cart, item]
    if (isFreeShipping(newCart)) {
      button.showFreeShippingIcon()
    } else { 
      button.hideFreeShippingIcon()
    }
  }
}

const updateTaxDom = (cartTotal: number) => setTaxDom(calculateTax(cartTotal))
const setCartTotalDom = (total: number) => {}