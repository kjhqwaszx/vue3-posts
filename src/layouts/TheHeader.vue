<template>
	<header>
		<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
			<div class="container-fluid">
				<router-link class="navbar-brand" to="/">KYOBO CODING</router-link>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto">
						<li class="nav-item">
							<router-link to="/" class="nav-link" active-class="active"
								>Home</router-link
							>
						</li>
						<li class="nav-item">
							<router-link to="/about" class="nav-link" active-class="active"
								>About</router-link
							>
						</li>
						<li class="nav-item">
							<router-link to="/posts" class="nav-link" active-class="active"
								>게시글</router-link
							>
						</li>
						<li class="nav-item">
							<router-link to="/nested" class="nav-link" active-class="active"
								>Nested</router-link
							>
						</li>
						<li class="nav-item">
							<router-link to="/my" class="nav-link" active-class="active"
								>Mypage</router-link
							>
						</li>
					</ul>
					<div class="d-flex" role="search">
						<button class="btn btn-outline-light" type="button" @click="goPage">
							글쓰기
						</button>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goPage = () =>
	router.push({
		name: 'PostCreate',
	});
</script>

<style lang="scss" scoped></style>
