<template>
	<div>
		<h2>About View</h2>
		<button class="btn btn-primary" @click="$router.push('/')">
			Home으로 이동
		</button>
		<hr />
		<h2>Store</h2>
		<p>counter: {{ store.counter }}</p>
		<p>double counter: {{ store.doubleCount }}</p>
		<p>double counter Plue One: {{ store.doubleCountPlusOne }}</p>
		<p>counter2: {{ auth.email }}</p>
		<button @click="store.increment()">Click!!</button>
	</div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';
import { useAuthStore } from '@/stores/auth';

// defineStore로 등록한 스토어가 1개일 경우 store변수에 counter 스토어가 할당됨
const store = useCounterStore();
const auth = useAuthStore();

//pinia에서는 state값을 바로 변경할 수 있다.
store.counter += 1;
</script>

<style lang="scss" scoped></style>
