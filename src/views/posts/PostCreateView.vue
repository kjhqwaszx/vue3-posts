<template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
		<form @submit.prevent = "save">
			<div class="mb-3">
				<label for="title" class="form-label">제목</label>
				<input v-model="form.title" type="text" class="form-control" id="title" />
			</div>
			<div class="mb-3">
				<label for="content" class="form-label">내용</label>
				<textarea v-model="form.content"  class="form-control" id="content" rows="3"></textarea>
			</div>
			<div class="pt-4">
				<button type="button" class="btn btn-outline-dark me-2k" @click="goListPage">
					목록
				</button>
				<button class="btn btn-primary">저장</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import {createPost} from '@/api/posts'
const router = useRouter();

const form = ref({
	title:null,
	content:null
})

const goListPage = () =>
	router.push({
		name: 'PostList',
	});
function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [year, month, day].join('-');
}

const save = async () => {
	try{
		await createPost({
				...form.value,
			createAt: formatDate(Date.now())
		})
		router.push({name: 'PostList'})
	}catch(error){
		console.log(error)
	}
	
}
</script>

<style lang="scss" scoped></style>
