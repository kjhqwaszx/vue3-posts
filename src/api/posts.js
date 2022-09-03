//axios
import { posts } from './index.js';

export function getPosts(params) {
	return posts.get('/', { params });
}

// 파라미터(id) 타입이 String일 경우 바로 사용가능
export function getPostById(id) {
	// id값이 Number로 들어오더라도 String 값으로 처리한다.
	return posts.get(`/${id}`);
}

export function createPost(data) {
	return posts.post('', data);
}

export function updatePost(id, data) {
	// id값이 Number로 들어오더라도 String 값으로 처리한다.
	return posts.put(id, data);
}

export function deletePost(id) {
	// id값이 Number로 들어오더라도 String 값으로 처리한다.
	return posts.delete(id);
}
