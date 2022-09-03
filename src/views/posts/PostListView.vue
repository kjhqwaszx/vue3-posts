<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4">
		<form @submit.prevent>
			<div class="row g-3">
				<div class="col">
					<input v-model="params.title_like" type=" text" class="form-control">
				</div>
				<div class="col-3">
					<select class="form-select" v-model="params._limit">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>
		<hr class="my-4" />
		<div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem :title="post.title" :content="post.content" :created-at="post.createdAt" @click="goPage(post.id)">
				</PostItem>
			</div>
		</div>
		<nav class="mt-5" aria-label="Page navigation example">
			<ul class="pagination justify-content-center">
				<li class="page-item">
					<a class="page-link" :class="{disabled: params._page <= 1}" href="#" aria-label="Previous"
						@click.prevent="--params._page">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li v-for="page in pageCount" :key="page" class="page-item" :class="{active: params._page === page}">
					<a class="page-link" href="#" @click.prevent="params._page=page"> {{page}} </a>
				</li>
				<li class="page-item " :class="{disabled: params._page == pageCount}">
					<a class="page-link" href="#" aria-label="Next" @click.prevent="++params._page">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
		<hr class="my-5" />
		<AppCard>
			<PostDetailView id="3"> </PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';

import { computed, ref, watchEffect } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';

const posts = ref([]);

 
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_limit:3,
	_page:1,
	title_like:''
})

//pagination
const totalCount = ref(0)
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit ))

const fetchPosts = async () => {
	try {
		const response = await getPosts(params.value)
		posts.value = response.data

		//totalCnt는 api 에서 Response Header에 담아준다.
		totalCount.value = response.headers['x-total-count']
	} catch (error) {
		console.log(error)
	}

	// getPosts().then( (response)=>
	// 	console.log(response.data)
	// ).catch(error =>{
	// 	console.log(error)
	// });
	
};
// paging 처리를 위해 watchEffect 적용
// 콜백함수인 fetchPosts에서 사용하는 값이 변경되면 fetchPosts를 호출한다.
// 페이지 번호를 변경 할 경우 반응형 변수인 params(_page) 가 변경되었기 때문에 fetchPosts가 호출됨
watchEffect(fetchPosts)
// fetchPosts();

const router = useRouter();
// const goPage = (id) =>router.push(`/posts/${id}`)

// name 을 갖는 라우터 이동
const goPage = id =>
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});


</script>

<style lang="scss" scoped></style>
