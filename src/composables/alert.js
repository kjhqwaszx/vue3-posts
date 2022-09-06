// Composable 함수를 만들 때에는 use + '함수명' 으로 네이밍하는것이 보편적이다.

import { ref } from 'vue';

const alerts = ref([]);

export function useAlert() {
	const vAlert = (message, type) => {
		alerts.value.push({ message, type });

		setTimeout(() => {
			alerts.value.shift();
		}, 2000);
	};

	const vSuccess = message => vAlert(message, 'success');

	//alerts라는 상태나 vSuccess 함수는 컴포넌트에서 호출되고 사용하기 때문에 return을 해주어야 한다.
	return {
		alerts,
		vAlert,
		vSuccess,
	};
}
