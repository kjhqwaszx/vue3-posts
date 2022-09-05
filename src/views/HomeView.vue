<template>
	<div>
		<h2>Home View</h2>
		<button class="btn btn-primary" @click="goToAbout()">
			About 으로 이동
		</button>
	</div>
	<hr class="my-4" />
	<AppGrid :items="items" v-slot="{ item }">
		<AppCard>{{ item }}</AppCard>
	</AppGrid>

	<hr class="my-4" />
	<!-- template로 접근 시 아래와 같이 사용 -->
	<h2>{{ $person.name }}</h2>
</template>

<script>
// main.js에서 선언한 person 플러그인은 자식 인스턴스들에서 사용 할 수 있는데
// 인스턴스는 setup() 이후에 생성되므로 created 에서 사용하는 것.
export default {
	created() {
		console.log(this.$person.name);
		// this.$person.say();
	},
};
</script>

<script setup>
import { useRouter } from 'vue-router';
import { inject, ref } from 'vue';

const router = useRouter();
const goToAbout = () => router.push('/about');
const items = ref(['사과', '딸기', '포도', '바나나']);

//인스턴스가 생성되기 전인 setup 영역에서 이용하기 위해서는 provide로 주입해놔야 한다.(person.js에서)
const person = inject(['person']);
console.log('person.name: ', person.name);
// person.say();
</script>
