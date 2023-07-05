// 데이터
const FREE_SHIPPING_AMOUNT = 20
interface Item {
  name: string
  price: number
}

// 전역변수
let shoppingCart: Item[] = []
let shoppingCartTotal: number = 0

// 계산
const calcTotalPrice = (shoppingCart: Item[]): number => shoppingCart.reduce(
  (total, item) => total + item.price, 0)
const isFreeShipping = (cartTotal: number, newItem: Item): boolean => cartTotal + newItem.price >= 20
const calculateTax = (shoppingCartTotal: number): number => shoppingCartTotal * 0.1



// 액션
const addItemToCart = (name: string, price: number) => {
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
    if (isFreeShipping(shoppingCartTotal, button.item)) {
      button.showFreeShippingIcon()
    } else { 
      button.hideFreeShippingIcon()
    }
  }
}

const updateTaxDom = () => setTaxDom(calculateTax(shoppingCartTotal))

const calcCartTotal = () => {
  shoppingCartTotal = calcTotalPrice(shoppingCart)
  setCartTotalDom()
  updateShippingIcons()
  updateTaxDom()
}