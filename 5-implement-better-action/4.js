// let shoppingCart = [];
// let shoppingCartTotal = 0;

// // 액션
// function addItemToCart(name, price) {
//   shoppingCart = calcTotal(shoppingCart, name, price);
//   setCartTotalDom();
//   updateShippingIcons();
//   updateTaxDom();
// }

// function updateShippingIcons() {
//   const buttons = getBuyBottomsDom();
//   for(let i = 0; i < buttons.length; i++) {
//     const button = buttons[i];
//     const item = button.item;
//     if (getsFreeShipping(shippingCartTotal, item.price)) {
//       button.showFreeShippingIcon()
//     } else {
//       button.hideFreeShippingIcon()
//     }
//   }
// }

// function updateTaxDom() {
//   setTaxDom(calcTax(shoppingCartTotal))
// }

// function addItem(cart, name, price) {
//   return [...cart].push({
//     name: name,
//     price: price
//   })
// }

// // 계산
// function calcTotal(cart) {
//   let total = 0
//   for(let i = 0; i < cart.length; i++) {
//     const item = cart[i]
//     total += item.price
//   }
//   return total
// }

// function getsFreeShipping(total, itemPrice) {
//   return itemPrice + total >= 20
// }

// function calcTax(amount) {
//   return amount * 0.10
// }
