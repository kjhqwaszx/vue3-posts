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
  [ 라우터 이동 ( router.push ] _ PostListView.vue
    - 라우터 이동 시 history항목에 기록한다. 뒤로가기를 했을경우 스택으로 빠짐 
  
  -> router/index.js 파일에서

  // path로 접근
  router.push(`/postDetail/1`)

  // name으로 접근 ( name이 설정되어 있어야 한다.)
  router.push({ name: 'postDetail', params: { id: '1' } })

  // 쿼리와 함께 사용, 결과적으로 /register?plan=private가 됩니다.
  router.push({ path: '/register', query: { plan: 'private' } })

  [ 라우터 이동 (router.replace) ] _ NestedView.vue 에서의 이동
    - 라우터 이동 시 history 항목에 추가하지 않는다.
    - router.push({path:'/home', replace:true})
      router.replace({path:'/home'})
-->

<!-- 
  [ 404 Not Found 처리]
    - router > index.js 에
     {
        path: '/:pathMatch(.*)*', 
        name: 'NotFound',
        component: NotFoundView,
      }
    를 추가하고 컴포넌트를 만들어준다.

 -->

<!-- 
  [ 중첩된 라우터 ( Nested )] _ router > index.js 에서 nested 보기

    - 헤더를 고정하고 하단에 <router-view></router-view>를 넣어 컴포넌트를 변경해주게 되는데
      특정 컴포넌트에서는 일정 부분을 고정하고 아래 부분만 다른 컴포넌트로 변경하고 싶을때
      <router-view></router-view>를 넣어 변경할 수 있다. 이것을 중첩된 라우터라고 부른다.
    
    - 이 경우에 router > index.js 에서 children 속성으로 넣어주면 된다.
    - children 속성 중 path: ''인 부분은 부모로 들어왔을 때 <router-view/> 에 랜더링 되는 컴포넌트이다.  

    [동적 라우팅 파라미터를 props로 전달하기 ]
     1. props속성을 boolean으로 선언할 경우
      - router > index.js 에서 props:true로 설정
      path:'/주소/:id' 에서 id로 전달되는 파라미터를 해당 컴포넌트에 propsdata로 전달할 수 있다.

      {
        path: '/posts/:id',
        name: 'PostDetail',
        component: PostDetailView,
        //props가 true 일 경우 url: ~/posts/3 로 접근할 경우 PostDetailView컴포넌트에 props데이터로 id가 3으로 넘어간다.
        props: true
      },
         -> 해당 컴포넌트에서는 defindProps를 해주어야 한다.

    2. props 속성을 함수로 선언할 경우
     - 파라미터 여러개를 전달할 수 있다.
     - router > index.js 에서 

     props: (route) => ({          // route를 전달해야 한다.
        id:parseInt(route.params.id),
        key: route.params.value,
        ...
      })

 -->

 <!-- 
  [ router history Mode ]
    - Vue에서는 크게 history mode, hash mode를 사용하고 둘의 차이는 
    화면 이동 시 url에 '#'이 붙는지 안붙는지 차이이다.
    - npm run build를 통해 dist 배포 파일을 만들면 하나의 index.html, js, css, bootstrap 파일이 생성되는데
    index.html 파일을 보게된다면 <body>태그에 <div id="#app"></div>만 붙어있는걸 확인할 수 있다.
    #app 부분에는 js파일에 있는 내용들이 마운트 되면서 화면이 랜더링 되는 것인데
    이처럼 하나의 페이지에서 보여지는 것이 SPA(Single Page Application) 이다.
    
    - hashMode를 사용할 경우 검색엔진 최적화에 단점이 있다.

    - SSR(Server Side Rendering): 서버에서 화면에 보여질 페이지를 만들어 내려주는 것
                                   화면 이동 시 깜빡인다.

    - CSR(Client Side Rendering): 기존의 Vue와 같이 js에서 화면을 마운트 시켜주는 방식. 

    * 운영서버에 배포를 할 때에는 dist폴더 내에 index.html 파일을 배포하게되는데
     

  -->

/* eslint-enable */
