<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
			@update:limit="changeLimit"
		>
		</PostFilter>
		<hr class="my-4" />

		<AppLoading v-if="loading"></AppLoading>
		<AppError v-else-if="error" :message="error.message"></AppError>

		<template v-else-if="!isExist">
			<p class="text-center py-5 text-muted">No Results</p>
		</template>
		<template v-else>
			<AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
				<template v-slot="{ item }">
					<PostItem
						:title="item.title"
						:content="item.content"
						:created-at="item.createdAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
					>
					</PostItem>
				</template>
			</AppGrid>

			<AppPagination
				:current-page="params._page"
				:page-count="pageCount"
				@page="uptPage"
			></AppPagination>
		</template>

		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:createdAt="modalCreatedAt"
			></PostModal>
		</Teleport>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import AppLoading from '@/components/app/AppLoading.vue';
import AppError from '@/components/app/AppError.vue';

import { computed, ref, watchEffect } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';
import { useAxios } from '@/composables/useAxios';

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_limit: 3,
	_page: 1,
	title_like: '',
});

const changeLimit = value => {
	params.value._limit = value;
	params.value._page = 1;
};

// data: posts는 구조분해 할당 해서 받아온 data값을 posts 라는 리액티브 변수로 사용한다는 뜻
const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { params }); // default method는 get이므로 넘기지 않아도 된다.

const isExist = computed(() => posts.value && posts.value.length > 0);
//pagination
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

// const posts = ref([]);
// const error = ref(null);
// const loading = ref(false);
// const totalCount = ref(0);
// const fetchPosts = async () => {
// 	try {
// 		loading.value = true;
// 		const response = await getPosts(params.value);
// 		posts.value = response.data;

// 		//totalCnt는 api 에서 Response Header에 담아준다.
// 		totalCount.value = response.headers['x-total-count'];
// 	} catch (err) {
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}

// 	// getPosts().then( (response)=>
// 	// 	console.log(response.data)
// 	// ).catch(error =>{
// 	// 	console.log(error)
// 	// });
// };
// watchEffect(fetchPosts);

const router = useRouter();

// name 을 갖는 라우터 이동
const goPage = id =>
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});

const uptPage = page => {
	params.value._page = page;
};

//modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');

const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
