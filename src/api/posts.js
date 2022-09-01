//axios
import {posts} from "./index.js"

export function getPosts(params) {
	return posts.get('/', { params })
}

// export function getPostById(id) {
// 	return posts.get(`/${id}`)
// }

// 파라미터(id) 타입이 String일 경우 바로 사용가능
export function getPostById(id) {
	return posts.get(id)
}

export function createPost(data){
	return posts.post('', data)
}

// export function updatePost(id, data) {
// 	return posts.put(`/${id}`, data)
// }
export function updatePost(id, data) {
	return posts.put(id, data)
}

// export function deletePost(id) {
// 	return posts.delete(`/${id}`)
// }
export function deletePost(id) {
	return posts.delete(id)
}
