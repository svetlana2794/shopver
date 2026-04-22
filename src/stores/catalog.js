import { ref, reactive } from "vue"

import { defineStore } from "pinia"

export const useCatalogStore=defineStore("catalog", () => {
const catalog=ref(null)
const start=ref(0)
const end=ref(6)
const page=ref(1)
const size=ref(0)
const address=ref("https://shopver.vercel.app/api/catalog")
const filter=ref("")

function nextPage() {
start.value+=6
end.value+=6
page.value=end.value==size.value ? page.value : ++page.value
}

function prevPage() {
start.value-=6
end.value-=6
page.value=start.value==0 ? 1 : --page.value
}

function startPage() {
start.value=0
end.value=6
page.value=1
}

function endPage() {
start.value=size.value-6
end.value=size.value
page.value=Math.floor(size.value/6)
}

return { catalog, start, end, page, size, address, filter, nextPage, prevPage, startPage, endPage }
})
