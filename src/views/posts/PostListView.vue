<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					:title="post.title"
					:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				>
				</PostItem>
			</div>
		</div>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { ref } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';

const posts = ref([]);
const fetchPosts = () => {
	posts.value = getPosts();
};
fetchPosts();

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
