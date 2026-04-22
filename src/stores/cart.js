import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cart = reactive(JSON.parse(localStorage.getItem("cart")) || [])

  const sumCart = computed(() => {
let sum=0
cart.forEach((elem) => {
sum+=elem.price*elem.quantity
})
return sum
})

  function addCart(elem) {
    cart.push(elem)
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  function removeProduct(id) {
    let index=cart.findIndex(elem => elem.id==id)
    cart.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  return { cart, sumCart, addCart, removeProduct }
})
