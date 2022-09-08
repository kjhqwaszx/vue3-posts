import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import MyPage from '@/views/MyPage.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		path: '/posts/:id',
		name: 'PostDetail',
		component: PostDetailView,
		// props가 true 일 경우 url: ~/posts/3 로 접근할 경우 PostDetailView컴포넌트에 props데이터로 id가 3으로 넘어간다.
		// 해당컴포넌트에서는 defineProps를 선언해서 사용할 수 있다.
		props: true,

		// 함수형으로 선언
		// props: route => ({ id: parseInt(route.params.id) }),
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
	{
		path: '/nested',
		name: 'nested',
		component: NestedView,
		children: [
			{
				// '/nested'로 들어갔을 때 <router-view/>영역에 랜더링되는 페이지
				path: '',
				name: 'nestedHome',
				component: NestedHomeView,
			},
			{
				path: 'one',
				name: 'nestedOne',
				component: NestedOneView,
			},
			{
				path: 'two',
				name: 'nestedTwo',
				component: NestedTwoView,
			},
		],
	},
	// {
	// 	path: '/my',
	// 	name: 'MyPage',
	// 	component: MyPage,
	// 	beforeEnter: (to, from) => {
	// 		console.log('to: ', to);
	// 		console.log('from: ', from);
	// 		// return false; //  -> 이동을 하지 않는다.
	// 		return { name: 'Home' };
	// 	},
	// },

	// 배열로 규칙 추가 가능
	{
		path: '/my',
		name: 'MyPage',
		component: MyPage,
		beforeEnter: [removeQueryString],
	},
];

function removeQueryString(to) {
	if (Object.keys(to.query).length > 0)
		// 쿼리스트링은 to.query에 들어있고 값이 있다면 Object.keys를 통해 배열로 반환한다.
		return { path: to.path, query: {} };
}

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

//전역가드
// router.beforeEach((to, from) => { // ->  라우터 이동시 무조건 실행된다.
// 	if (to.name === 'MyPage') {
//     console.log('page Changed')
// 		// return false;   // -> 이동을 하지 않는다.
// 		return { name: 'Home' };   // -> home으로 리다이렉션 한다.
// 	}
// });

export default router;
