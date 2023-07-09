// Types
export type Product = {
    readonly name: string
    readonly price: number
}
export type DisplayedProduct = Product & {
    readonly freeShippingEligible: boolean
}
export type Cart = Readonly<Product[]>

// Data
const TAX_RATE = 0.1
const FREE_SHIPPING_THRESHOLD = 20
const ALL_PRODUCTS: Readonly<Product[]> = [
    { name: 'apple', price: 5 },
    { name: 'banana', price: 15 },
    { name: 'carrot', price: 10 },
]

// Entrypoint
const main = () => {
    const { addToCart, removeFromCart, clearCart } = init(ALL_PRODUCTS, updateDOM)

    let cart: Cart = []
    cart = addToCart(cart, ALL_PRODUCTS[0])
    cart = removeFromCart(cart, ALL_PRODUCTS[0])
    cart = clearCart(cart)
}

// Calculations
export const init = (allProducts: Readonly<Product[]>, onChange: (cart: Cart, allProducts: Readonly<Product[]>) => Cart) => {
    const addToCart = (cart: Cart, product: Product): Cart => onChange([...cart, product], allProducts)
    const removeFromCart = (cart: Cart, product: Product): Cart => onChange(cart.filter(p => product.name !== p.name), allProducts)
    const clearCart = (_cart: Cart): Cart => onChange([], allProducts)
    return { addToCart, removeFromCart, clearCart }
}
export const calcCartTotal = (cart: Cart): number => cart.reduce((acc, item) => acc + item.price, 0)
export const calcTax = (amount: number): number => amount * TAX_RATE
export const calcFreeShippingEligibilities = (cartTotal: number, allProducts: Readonly<Product[]>): Readonly<DisplayedProduct[]> => {
    return allProducts.map(p => ({ ...p, freeShippingEligible: isFreeShippingEligible(cartTotal, p) }))
}
export const isFreeShippingEligible = (cartTotal: number, product: Product): boolean => cartTotal + product.price >= FREE_SHIPPING_THRESHOLD

// Actions
const updateDOM = (cart: Cart, allProducts: Readonly<Product[]>): Cart => {
    const cartTotal = calcCartTotal(cart)
    updateCartTotalDOM(cartTotal)
    updateTaxDOM(calcTax(cartTotal))
    updateDisplayedProductsDOM(calcFreeShippingEligibilities(cartTotal, allProducts))
    return cart
}
const updateCartTotalDOM = (cartTotal: number) => console.log(`Cart total: ${cartTotal}`)
const updateTaxDOM = (tax: number) => console.log(`Tax: ${tax}`)
const updateDisplayedProductsDOM = (products: Readonly<DisplayedProduct[]>) => console.table(products)

import.meta.main && main()
