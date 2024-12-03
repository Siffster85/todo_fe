import axios from "axios";

const todoAPI = axios.create({
    baseURL: "https://todo-be-mu.vercel.app:12345/"
})

//"http://localhost:12345/"

export function getLists() {
    return todoAPI.get('/lists')
}

export function getListsById(id: number) {
    return todoAPI.get(`/lists/${id}`).then(({ data }) => {
        return data
    })
}

export function createList(data: object) {
    return todoAPI.post('/lists', data)
}

export function deleteList(id: number){
    return todoAPI.delete(`/lists/${id}`)
}

export function createListItem(data: object) {
    return todoAPI.post('/items', data)
}

export function patchListItem(id: number, data: object){
    return todoAPI.patch(`/items/${id}`, data)
}

export function deleteListItem(id: number){
    return todoAPI.delete(`/items/${id}`)
}