<template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
		<AppError v-if="error" :message="error"></AppError>
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="save"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-dark me-2k"
					@click="goListPage"
				>
					목록
				</button>

				<button class="btn btn-primary" :disabled="loading">
					<template v-if="loading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>저장</template>
				</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

//사용할 Composable 함수 선언
const { vAlert, vSuccess } = useAlert();

const router = useRouter();
const loading = ref(false);
const error = ref(null);

const form = ref({
	title: null,
	content: null,
});

const goListPage = () =>
	router.push({
		name: 'PostList',
	});

const save = async () => {
	try {
		loading.value = true;
		await createPost({
			...form.value,
			createdAt: Date.now(),
		});
		router.push({ name: 'PostList' });
		vSuccess('등록이 완료되었습니다.');
	} catch (err) {
		vAlert(err.message);
		error.value = err.message;
		console.log(error.value);
	} finally {
		loading.value = false;
	}
};

//alert
</script>

<style lang="scss" scoped></style>
