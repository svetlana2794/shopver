import { createRouter, createWebHistory } from 'vue-router'

import { useClientStore } from "../stores/client.js"

import Start from "../components/Start.vue"
import Catalog from "../components/Catalog.vue"
import Product from "../components/Product.vue"
import Login from "../components/Login.vue"
import Profile from "../components/Profile.vue"
import Bonus from "../components/Bonus.vue"
import Social from "../components/Social.vue"
import Reg from "../components/Reg.vue"
import Cart from "../components/Cart.vue"
import Settings from "../components/Settings.vue"
import Order from "../components/Order.vue"
import OrderData from "../components/OrderData.vue"
import NotFound from "../components/NotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
{
path: "/",
component: Start,
},
{
path: "/catalog",
component: Catalog,
},
{
path: "/catalog/:promo",
component: Catalog,
},
{
path: "/product/:id",
component: Product,
},
{
path: "/social",
component: Social,
},
{
path: "/bonus",
component: Bonus,
},
{
path: "/login",
component: Login,
},
{
path: "/lk",
component: Profile,
beforeEnter: (from, to, next) => {
const store=useClientStore()
if (!store.auth) {
next("/login")
} else {
next()
}
}
},
{
path: "/reg",
component: Reg,
},
{
path: "/cart",
component: Cart,
beforeEnter: (from, to, next) => {
const store=useClientStore()
if (!store.auth) {
next("/login")
} else {
next()
}
}
},
{
path: "/settings",
component: Settings,
beforeEnter: (from, to, next) => {
const store=useClientStore()
if (!store.auth) {
next("/login")
} else {
next()
}
}
},
{
path: "/order",
component: Order,
beforeEnter: (from, to, next) => {
const store=useClientStore()
if (!store.auth) {
next("/login")
} else {
next()
}
}
},
{
path: "/order/:id",
component: OrderData,
beforeEnter: (from, to, next) => {
const store=useClientStore()
if (!store.auth) {
next("/login")
} else {
next()
}
}
},
{
path: "/:pathMatch(.*)*",
component: NotFound,
}
],
})

export default router
