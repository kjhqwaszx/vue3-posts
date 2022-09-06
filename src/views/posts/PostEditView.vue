<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDetailPage"
				>
					취소
				</button>
				<button class="btn btn-primary" @click="edit">수정</button>
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

//Composable 함수 선언
const { vAlert, vSuccess } = useAlert();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const goDetailPage = () => {
	router.push({
		name: 'PostDetail',
		params: { id },
	});
};

const form = ref({
	title: null,
	contnet: null,
});

const fetchPost = async () => {
	try {
		const { data } = await getPostById(id);
		setForm(data);
	} catch (error) {
		console.log(error);
		vAlert('네트워크 오류', 'error');
	}
};
const setForm = ({ title, content }) => {
	form.value.title = title;
	form.value.content = content;
};

fetchPost();

const edit = async () => {
	try {
		await updatePost(id, { ...form.value });
		vSuccess('수정이 완료되었습니다.');
		router.push({ name: 'PostDetail', params: { id } });
	} catch (error) {
		console.log(error);
		vAlert('error.message', 'error');
	}
};
//alert
</script>

<style lang="scss" scoped></style>
