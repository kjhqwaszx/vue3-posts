<template>
	<AppModal v-model="show" title="게시글">
		<tempalte #default>
			<div class="row g-3">
				<div class="col-3">제목</div>
				<div class="col-9">{{ title }}</div>
				<div class="col-3">내용</div>
				<div class="col-9">{{ content }}</div>
				<div class="col-3">등록일</div>
				<div class="col-9">
					{{ $dayjs(createdAt).format('YYYY.MM.DD HH:mm:ss') }}
				</div>
			</div>
		</tempalte>
		<template #actions>
			<button
				type="button"
				@click="closeModal"
				class="btn btn-secondary"
				data-bs-dismiss="modal"
			>
				닫기
			</button>
		</template>
	</AppModal>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	modelValue: Boolean,
	title: String,
	content: String,
	createdAt: [String, Number],
});
const emit = defineEmits(['update:modelValue']);

const show = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		// show 가 변경될 경우 이벤트를 올린다.
		emit('update:modelValue', value);
	},
});

const closeModal = () => {
	show.value = false;
};
</script>

<style lang="scss" scoped></style>
