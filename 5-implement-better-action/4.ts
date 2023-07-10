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
  const item = {name, price}
  shoppingCart = addItem(shoppingCart, item)
  const total = calcTotal(shoppingCart)
  setCartTotalDom(total)
  updateShippingIcons(shoppingCart)
  updateTaxDom(total)
}

function updateShippingIcons(cart: Item[]): void {
  getBuyButtonsDom().forEach(button => {
    const hasFreeShipping = getsFreeShippingWithItem(cart, button.item)
    setFreeShippingIcon(button, hasFreeShipping)
  })
}

function setFreeShippingIcon(button: BuyButton, isShown: boolean): void {
  isShown ? button.showFreeShippingIcon() : button.hideFreeShippingIcon()
}

function updateTaxDom(total: number): void {
  setTaxDom(calcTax(total))
}

function setCartTotalDom(total: number): void {}
function setTaxDom(tax: number): void {}
function getBuyButtonsDom(): BuyButton[] {return []}

// 계산
function getsFreeShippingWithItem(cart: Item[], item: Item): boolean {
  return getsFreeShipping(addItem(cart, item))
}

function addItem(cart: Item[], item: Item): Item[] {
  return [...cart, item]
}

function calcTotal(cart: Item[]): number {
  return cart.reduce((total, item) => total + item.price, 0)
}

function getsFreeShipping(cart: Item[]) {
  return calcTotal(cart) >= 20
}

function calcTax(amount: number): number {
  return amount * 0.10
}
