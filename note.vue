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

  const route = useRoute()
  console.log('route.path: ', route.path)   // '/' 출력
  console.log('route.name: ', route.name)  // 'Home' 출력
  
  const router = useRouter()
  const goToAbout = () => router.push('/about')
</script>
/* eslint-enable */