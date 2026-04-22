import { ref } from "vue"

export async function useFetchPost(url, body) {
const answer=ref(null)
const error=ref(null)

try {
let response=await fetch(url, {
method: "POST",
headers: {
"Content-Type": "application/json;charset=utf-8"
},
body: JSON.stringify(body)
})
if (response.ok) {
answer.value=await response.json()
}
if (response.status==401) {
error.value="Неправильный логин или пароль"
}
} catch {
error.value="Неизвестная ошибка"
}

return { answer, error }
}
