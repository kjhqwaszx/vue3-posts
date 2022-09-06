<template>
	<AppLoading v-if="loading"></AppLoading>
	<AppError v-else-if="error" :message="error.message"></AppError>

	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>{{ post.content }}</p>
		<p class="text-mued">
			{{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
		</p>
		<hr class="my-4" />
		<AppError v-if="removeError" :message="removeError"></AppError>
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button
					class="btn btn-primary"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>삭제</template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { deletePost } from '@/api/posts';
import { ref } from 'vue';
import { useAxios } from '@/composables/useAxios';

const props = defineProps({
	id: {
		type: [String, Number],
	},
});
const router = useRouter();
// const route = useRoute();
// const id = route.params.id;
const removeError = ref(null);
const removeLoading = ref(false);

const { data: post, error, loading } = useAxios(`/posts/${props.id}`);

// const post = reactive({});
// const error = ref(null);
// const loading = ref(false);
// const fetchPost = async () => {
// 	try {
// 		loading.value = true;
// 		const response = await getPostById(props.id);

// 		post.title = response.data.title;
// 		post.content = response.data.content;
// 		post.createdAt = response.data.createdAt;
// 		console.log(JSON.stringify(post));
// 	} catch (err) {
// 		error.value = err.message;
// 	} finally {
// 		loading.value = false;
// 	}
// };

// fetchPost();

const goListPage = () =>
	router.push({
		name: 'PostList',
	});

const goEditPage = () =>
	router.push({
		name: 'PostEdit',
		params: props.id,
	});

const remove = async () => {
	try {
		if (confirm('삭제 하시겠습니까?')) {
			removeLoading.value = true;

			await deletePost(props.id);
			router.push({ name: 'PostList' });
		}
	} catch (err) {
		removeError.value = err.message;
	} finally {
		removeLoading.value = false;
	}
};
</script>

<style lang="scss" scoped></style>
