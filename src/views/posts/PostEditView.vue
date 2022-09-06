<template>
	<AppLoading v-if="loading"></AppLoading>
	<AppError v-else-if="error" :message="error.message"></AppError>

	<div v-else>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError"></AppError>

		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="edit"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDetailPage"
				>
					취소
				</button>

				<button class="btn btn-primary" :disabled="editLoading">
					<template v-if="editLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>수정</template>
				</button>
			</template>
		</PostForm>

		<!-- <AppAlert
			:show="showAlert"
			:message="alertMessage"
			:type="alretType"
		></AppAlert> -->
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/composables/useAxios';

//Composable 함수 선언
const { vAlert, vSuccess } = useAlert();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const editError = ref(null);
const editLoading = ref(false);

const { data: form, error, loading } = useAxios(`/posts/${id}`);

// const form = ref({
// 	title: null,
// 	contnet: null,
// });
// const error = ref(null);
// const loading = ref(false);
// const fetchPost = async () => {
// 	try {
// 		loading.value = true;
// 		const { data } = await getPostById(id);
// 		setForm(data);
// 	} catch (err) {
// 		error.value = err.message;
// 		vAlert('네트워크 오류', 'error');
// 	} finally {
// 		loading.value = false;
// 	}
// };
// const setForm = ({ title, content }) => {
// 	form.value.title = title;
// 	form.value.content = content;
// };

// fetchPost();

const goDetailPage = () => {
	router.push({
		name: 'PostDetail',
		params: { id },
	});
};

const edit = async () => {
	try {
		editLoading.value = true;
		await updatePost(id, { ...form.value });
		vSuccess('수정이 완료되었습니다.');
		router.push({ name: 'PostDetail', params: { id } });
	} catch (err) {
		vAlert(err.message, 'error');
		editError.value = err.message;
	} finally {
		editLoading.value = false;
	}
};
//alert
</script>

<style lang="scss" scoped></style>
