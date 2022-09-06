<template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
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
				<button class="btn btn-primary">저장</button>
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

const form = ref({
	title: null,
	content: null,
});

const goListPage = () =>
	router.push({
		name: 'PostList',
	});

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

const save = async () => {
	try {
		await createPost({
			...form.value,
			createdAt: formatDate(Date.now()),
		});
		router.push({ name: 'PostList' });
		vSuccess('등록이 완료되었습니다.');
	} catch (error) {
		vAlert(error.message);
	}
};

//alert
</script>

<style lang="scss" scoped></style>
