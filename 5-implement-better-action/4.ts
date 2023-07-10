type Item = {
  name: string
  price: number
}

type BuyButton = {
  item: Item
  showFreeShippingIcon: () => void
  hideFreeShippingIcon: () => void
}

let shoppingCart: Item[] = []
let shoppingCartTotal = 0

// 액션
function addItemToCart(name: string, price: number): void {
  const item = makeCartItem(name, price)
  shoppingCart = addItem(shoppingCart, item)
  const total = calcTotal(shoppingCart)
  setCartTotalDom(total)
  updateShippingIcons(shoppingCart)
  updateTaxDom(total)
}

function updateShippingIcons(cart: Item[]): void {
  const buttons = getBuyButtonsDom()
  for(let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    const item = button.item
    const hasFreeShipping = getsFreeShippingWithItem(cart, item)
    setFreeShippingIcon(button, hasFreeShipping)
  }
}

function setFreeShippingIcon(button: BuyButton, isShown: boolean): void {
  if(isShown) {
    button.showFreeShippingIcon()
  } else {
    button.hideFreeShippingIcon()
  }
}

function updateTaxDom(total: number): void {
  setTaxDom(calcTax(total))
}

function setCartTotalDom(total: number): void {}
function setTaxDom(tax: number): void {}
function getBuyButtonsDom(): BuyButton[] {return []}

// 계산
function getsFreeShippingWithItem(cart: Item[], item: Item): boolean {
  const newCart = addItem(cart, item)
  return getsFreeShipping(newCart)
}

function addItem(cart: Item[], item: Item): Item[] {
  return addElementLast(cart, item)
}

function makeCartItem(name: string, price: number): Item {
  return {name, price}
}

function calcTotal(cart: Item[]): number {
  let total = 0
  for(let i = 0; i < cart.length; i++) {
    const item = cart[i]
    total += item.price
  }
  return total
}

function getsFreeShipping(cart: Item[]) {
  return calcTotal(cart) >= 20
}

function calcTax(amount: number): number {
  return amount * 0.10
}

function addElementLast<T>(array: T[], elem: T): T[] {
  return [...array, elem]
}
