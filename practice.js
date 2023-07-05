const updateShippingIcons = () => {
  const buyButtons = getBuyButtonsDom()
  for(let i = 0; i < buyButtons.length; i++) {
    const button = buyButton[i]
    const item = button.item
    if (item.price + shoppingCartTotal >= 20) {
      button.showFreeShippingIcon()
    }else { }
  }
}