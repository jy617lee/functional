type Item = {
  name: string
  price: number
}

type BuyButton = {
  item: Item
  showFreeShippingIcon: () => void
  hideFreeShippingIcon: () => void
}

// 액션
function addItemToCart(cart: Item[], item: Item): Item[] {
  const newCart = addItem(cart, item)
  const newTotal = calcTotal(newCart)
  const newTax = calcTax(newTotal)

  setCartTotalDom(newTotal)
  updateShippingIcons(newCart)
  setTaxDom(newTax)

  return newCart
}

function updateShippingIcons(cart: Item[]): void {
  getBuyButtonsDom().forEach(button => {
    const hasFreeShipping = getsFreeShipping(addItem(cart, button.item))
    setFreeShippingIcon(button, hasFreeShipping)
  })
}

function setFreeShippingIcon(button: BuyButton, isShown: boolean): void {
  isShown ? button.showFreeShippingIcon() : button.hideFreeShippingIcon()
}

function setCartTotalDom(total: number): void {}
function setTaxDom(tax: number): void {}
function getBuyButtonsDom(): BuyButton[] {return []}

// 계산
function getsFreeShipping(cart: Item[]) {
  return calcTotal(cart) >= 20
}

function addItem(cart: Item[], item: Item): Item[] {
  return [...cart, item]
}

function calcTotal(cart: Item[]): number {
  return cart.reduce((total, item) => total + item.price, 0)
}

function calcTax(amount: number): number {
  return amount * 0.10
}
