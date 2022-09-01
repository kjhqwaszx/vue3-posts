import axios from "axios"

function create(baseURL,options){
  const instance = axios.create({
    baseURL,
    ...options
  });
  return instance
}

export const posts = create('http://localhost:5000/posts')

// 다른 url을 사용한다고 하면
// export const 변수명 = create('url주소') 를 export 해주고
// 사용하는 곳에서 import 해서 사용한다.