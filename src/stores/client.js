import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', () => {
  const client = ref(JSON.parse(localStorage.getItem("client")) || null)
  const auth = ref(!!localStorage.getItem("auth") || false)
  
  function addClient(obj) {
    client.value=obj
    localStorage.setItem("client", JSON.stringify(obj))
    localStorage.setItem("auth", "true")
    auth.value=true
  }

return { client, auth, addClient }})
