/* eslint-disable */
<!-- 
  [ 파일 구조 ]
    - vies: page단위 화면들 저장
    - components: 재사용할 컴포넌트 저장
-->

<!-- 
  [ router & route ]
    - router는 페이지 이동을 가능하게 하는 객체, route는 현재 페이지 정보를 갖는 객체 
    
    < route >
      - <template>에서 라우터 정보에 접근하려면 $route를 사용하면된다.
        -> {{$route.path}}
      - <script setup> 안에서 라우터 정보를 접근하려면 useRoute() 함수를 사용하면된다.
    < router >
      - <template> 내에서 라우터 이동 시 @click = "$router.push('/about')"
      - <script setup>에서 라우터 이동 시 useRouter()  사용

-->
<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
console.log('route.path: ', route.path); // '/' 출력
console.log('route.name: ', route.name); // 'Home' 출력

const router = useRouter();
const goToAbout = () => router.push('/about');
</script>

<!-- 
  [ 동적 라우팅 ]
    - url에 파라미터를 포함해서 전달할 수 있다.
      -> router/index.js 파일에서 path 부분에 :파라미터 명 으로 접근하거나
      -> url뒤에 ?파라미터 명으로 접근이 가능하다.
   
    1.  < router/index.js >
    {
      path: '/posts/:id',
      component: PostDetailView
    } 
     이렇게 설정한 후  http://127.0.0.1:5173/posts/test 로 접근하면
     {{$route.params }}   -> {"id": "test"} 출력된다.

    2. http://127.0.0.1:5173/posts/test?key=value 접근할 경우
    {{$route.query}} ->  { "key": "value" }가 출력된다.
    -->

<!--  
  [ 라우터 이동 ] _ PostListView.vue
   -> router/index.js 파일에서

  // path로 접근
  router.push(`/postDetail/1`)

  // name으로 접근 ( name이 설정되어 있어야 한다.)
  router.push({ name: 'postDetail', params: { id: '1' } })

  // 쿼리와 함께 사용, 결과적으로 /register?plan=private가 됩니다.
  router.push({ path: '/register', query: { plan: 'private' } })
-->

/* eslint-enable */
