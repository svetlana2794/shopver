import { ref } from 'vue'
import { defineStore } from 'pinia'

export async function useFetch(url) {
  const answer = ref(null)
  const error = ref(null)

  try {
   let response=await fetch(url, {
	headers: {
		Origin: "https://shopnode.vercel.app"
	}
	})
   answer.value=await response.json()
  } catch {
   error.value="Неизвестная ошибка"
  }

  return { answer, error }
}
