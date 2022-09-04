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
    [ 구조분해 할당 ]
      - 원하는 key 값만 받아오는 것을 의미한다. ( 말그대로 객체 구조를 원하는 key: value로 분해해서 할당하는 것)
      - ref({})로 선언한 변수에 해 구조분해 할당을 할 수 있다.
            
           obj = {id:1, title:'vue3', price:100, createdAt:'2022-01-01'}
           const data = ref({})
           
        -> 전부 가져오고 싶을 경우
           data.value = {...obj}    // ...는 객체안의 key, value를 전부 풀어서 넣어준다. 
                                    // 즉, {id:1, title:'vue3', price:100, createdAt:'2022-01-01'} 동일하게 부여된다.
        -> 일부 key:value값만 갖고 싶을 경우
        const setPost = ( {title, price} ) =>{
          data.value.title = title
          data.value.price = price
        }

        setPost(obj)
      

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

<!--
    [ axios ] _ CreateView, DetailView, EditView, ListView
      - Vue에서 사용하는 API 통신 라이브러리 ( promise 객체를 반환한다.)
      - 데이터를 조회해 오는 GET Method
        -> axios.get('url',{
          params:{
            id:1
          }
        })
      
      - 데이터를 수정하는 POST Method
        -> axios.post('url',{
          id:1,
          title: 'vue3'
        })

      - promise 객체를 리턴하기 때문에 .then.catch 로 사용할 수 있지만 async & await 으로 처리한다.

      const fetchPosts = async () => {
        const response = await getPosts()
        
        
        // getPosts().then( (response)=>
        // 	console.log(response.data)
        // ).catch(error =>{
        // 	console.log(error)
        // });
        
      };


    [ 모듈화하기 ] _ api > index.js
      - 반복적으로 사용되는 url주소나, env에 따라 변경되는 url 주소를 관리하기 쉽게 모듈화 시킨다.
      - axios.create() 를 사용하여 instance를 만들어 사용한다. 
    -->

<!-- 
      [ pagination ]
        - ListView 참고
     -->
<!-- 

    [ env에 따른 BaseURL 설정 ]
      - 서버를 실행시키면 vite.config.js파일에서 mode 옵션을 확인한다. (default는 development)
      - mode와 일치하는 .env.모드이름 파일을 읽어 baseURL을 설정한다.
      - 만약 설정한 mode와 일치하는 파일이 없을 경우에는 .env를 읽어 설정한다.
      
      - vite.config.js에서 mode를 production으로 변경해주면 .env.production 파일을 읽는다.
-->

<!-- 
  [ 커스텀 컴포넌트의 v-model && 다중 v-model && :value, @input  ] _ PostList.vue, PostFilter.vue
    - 커스텀 모델은 자식 컴포넌트에서 부모로부터 받은 props 데이터를 핸들링 하기위해 사용한다.
    - 부모 컴포넌트에서 자식 컴포넌트에 v-model="propsData" 로 넘겨주면 자식컴포넌트는
      defineProps 영역에 modelValue를 선언하고(다중 v-model이 아닌 경우), defineEmits 영역에 update:propsData를 선언한다.
    - 주로 input 태그에서 :value부분에 propsData를 사용해 노출하고 @input에 emit을 실행해 값을 핸들링 한다

    - 여러개의 props 내려 줄 경우 다중 v-model을 사용하며 v-model:변수명 ="propsData" 를 사용하고
      자식 컴포넌트에서는 defineProps 영역에 변수명을 선언해 사용한다. 

     <MyComponent.vue> - Child

      <template>
        <input
          type="text"
          :value="foo"
          @input="$emit('update:foo', $event.target.value)"
        />
      </template>

      <script setup>
        definePorps({
          foo1:{
            type: String
          },
          foo2:{
            type: Stinrg
          }
        })
        defineEmits(['update:foo'])
      </script>

      자식 컴포넌트가 부모컴포넌트의 데이터를 v-model로 사용할 경우에 에러가 발생한다.
      자식컴포넌트에서 부모컴포넌트의 값을 핸들링 하려면 부모에서 v-model:foo1="bar1" 내려주고
      자식에서 :value 와 @input으로 사용해야 한다.
      즉, v-model = :value + @input

      + 추가내용( 위와 같은 내용이지만 다시 정리 )
      
      [커스텀 컴포넌트의 v-model] _ PostList.vue && AppModal.vue > 커밋 내용 확인
       - 자식컴포넌트에서 부모로 받은 props 데이터를 핸들링 하기위해서는 커스텀 v-model을 사용해야 한다.
       - 부모 컴포넌트에서 자식 컴포넌트에 v-model을 설정하고 자식 컴포넌트에서는 props로 ModelValue와 emit으로 update:ModelValue를 선언해야 한다.

 -->

<!--
  [ tTransition 컴포넌트 ] _ alert
    - Vue에서는 Transition 이나 Animation을 쉽게 할 수 있도록 도움을 주는 두가지 내장 컴포넌트를 제공한다.
      * <Transition> : 컴포넌트가 DOM에 나타나고 사라질 대 애니메이션을 적용하기 위해 사용한다.
        - 
      * <TransitionGroup>: 컴포넌트가 v-for 목록에 삽입, 제거 또는 이동할 때 사용한다.
    
    
    <Transition>
      - 태그 내 v-if, v-show, <component>를 통한 동적 컴포넌트 때 트리거된다.
      -->

<!-- 
  [ Teleport ] _ PostList.vue (PostModal 컴포넌트)
    - PostModal 은 화면 위에 뜨는 것이기 때문에 계층 구조상 상위에 존재해야 한다.
      하지만, PostList에서 import해서 호출당하기 때문에 계층 상 PostList 하위에 들어가 있다.
      이렇게 된다면 css 등 충돌이 발생 할 수 있어 teleport를 사용해 해결해야 한다.

    -Teleport는 특정 컴포넌트를 지정한 DOM위치로 이동시켜주는 Vue3용 내장 컴포넌트이다.

 -->
/* eslint-enable */
