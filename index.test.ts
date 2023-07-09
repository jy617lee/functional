import { assertEquals } from "https://deno.land/std@0.193.0/testing/asserts.ts"

import { init, type Cart, calcCartTotal, calcTax, isFreeShippingEligible, type Product, calcFreeShippingEligibilities } from "./index.ts"

const { addToCart, removeFromCart, clearCart } = init([], cart => cart)

Deno.test("장바구니에 상품 담기", () => {
  const cart0 = addToCart([], { name: 'a', price: 5 })
  const cart1 = addToCart(cart0, { name: 'b', price: 10 })

  assertEquals(cart0, [{ name: 'a', price: 5 }])
  assertEquals(cart1, [{ name: 'a', price: 5 }, { name: 'b', price: 10 }])
})

Deno.test("장바구니에서 상품 빼기", () => {
  const cart0: Cart = [{ name: 'a', price: 5 }, { name: 'b', price: 10 }]
  const cart1 = removeFromCart(cart0, { name: 'b', price: 10 })
  const cart2 = removeFromCart(cart1, { name: 'a', price: 5 })

  assertEquals(cart1, [{ name: 'a', price: 5 }])
  assertEquals(cart2, [])
})

Deno.test("장바구니 비우기", () => {
  assertEquals(clearCart([{ name: 'a', price: 5 }, { name: 'b', price: 10 }]), [])
})

Deno.test("장바구니에 담긴 상품 가격의 총합 계산", () => {
  assertEquals(calcCartTotal([]), 0)
  assertEquals(calcCartTotal([{ name: 'a', price: 5 }, { name: 'b', price: 10 }]), 15)
})

Deno.test("세금 계산", () => {
  assertEquals(calcTax(0), 0.0)
  assertEquals(calcTax(15), 1.5)
})

Deno.test("배송료 무료 표시 계산 (개별 상품)", () => {
  assertEquals(isFreeShippingEligible(15, { name: 'a', price: 4 }), false, '15 + 4 < 20')
  assertEquals(isFreeShippingEligible(15, { name: 'a', price: 5 }), true, '15 + 5 >= 20')
})

Deno.test("배송료 무료 표시 계산 (전체 상품)", () => {
  const allProducts: Product[] = [
    { name: 'a', price: 4 },
    { name: 'b', price: 5 },
    { name: 'c', price: 6 },
  ]
  const actual = calcFreeShippingEligibilities(15, allProducts)
  const expected = [
    { name: 'a', price: 4, freeShippingEligible: false },
    { name: 'b', price: 5, freeShippingEligible: true },
    { name: 'c', price: 6, freeShippingEligible: true },
  ]
  assertEquals(actual, expected)
})
