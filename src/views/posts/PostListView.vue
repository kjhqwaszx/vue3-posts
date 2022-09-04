<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter v-model:title="params.title_like" v-model:limit="params._limit">
		</PostFilter>
		<hr class="my-4" />

		<AppGrid :items="posts">
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
		<PostModal
			v-model="show"
			:title="modalTitle"
			:content="modalContent"
			:createdAt="modalCreatedAt"
		></PostModal>
		<AppPagination
			:current-page="params._page"
			:page-count="pageCount"
			@page="uptPage"
		></AppPagination>

		<template v-if="posts && posts.length > 0">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="posts[0].id"> </PostDetailView>
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import AppPagination from '@/components/AppPagination.vue';
import AppGrid from '@/components/AppGrid.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';

import { computed, ref, watchEffect } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';

const posts = ref([]);

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_limit: 3,
	_page: 1,
	title_like: '',
});

//pagination
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

const fetchPosts = async () => {
	try {
		const response = await getPosts(params.value);
		posts.value = response.data;

		//totalCnt는 api 에서 Response Header에 담아준다.
		totalCount.value = response.headers['x-total-count'];
	} catch (error) {
		console.log(error);
	}

	// getPosts().then( (response)=>
	// 	console.log(response.data)
	// ).catch(error =>{
	// 	console.log(error)
	// });
};
// paging 처리 및 filter, limit변경 감지를 위해 watchEffect 적용
// 콜백함수인 fetchPosts에서 사용하는 값이 변경되면 fetchPosts를 호출한다.
// 페이지 번호를 변경 할 경우 반응형 변수인 params(_page) 가 변경되었기 때문에 fetchPosts가 호출됨
watchEffect(fetchPosts);
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

const uptPage = page => {
	params.value._page = page;
	console.log('## clicked', params.value._page);
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
