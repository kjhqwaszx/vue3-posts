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
		children:[
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
		]
	},
	
];

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

export default router;
