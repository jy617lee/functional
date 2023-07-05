// 데이터
const FREE_SHIPPING_AMOUNT = 20
const TAX_RATE = 0.1
interface Item {
  name: string
  price: number
}

// 전역변수
let shoppingCart: Item[] = []
let shoppingCartTotal: number = 0

// 계산
const calcTotalPrice = (cart: Item[]): number => 
  cart.reduce((total: number, item: Item) => total + item.price, 0)
const isFreeShipping = (total: number, newItem: Item): boolean => 
  total + newItem.price >= FREE_SHIPPING_AMOUNT
const calculateTax = (total: number, taxRate: number): number => total * taxRate
const addItem = (cart: Item[], item: Item) => [...cart, item]

// 액션
const addItemToCart = (item: Item) => {
  shoppingCart.push(item)
  calcCartTotal()
}

const updateShippingIcons = () => {
  const buyButtons = getBuyButtonsDom()
  for(let i = 0; i < buyButtons.length; i++) {
    const button = buyButtons[i]
    if (isFreeShipping(shoppingCartTotal, button.item)) {
      button.showFreeShippingIcon()
    } else { 
      button.hideFreeShippingIcon()
    }
  }
}

const updateTaxDom = () => setTaxDom(calculateTax(shoppingCartTotal, TAX_RATE))

const calcCartTotal = () => {
  shoppingCartTotal = calcTotalPrice(shoppingCart)
  setCartTotalDom()
  updateShippingIcons()
  updateTaxDom()
}