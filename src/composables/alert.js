// Composable 함수를 만들 때에는 use + '함수명' 으로 네이밍하는것이 보편적이다.

import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

export function useAlert() {
	// 구조분해 할당을 통해 스토어 값을 가져온다.
	// state, getters는 storeToRefs를 하지 않으면 reactive를 잃는다.
	const { alerts } = storeToRefs(useAlertStore());
	//action(메서드)는 바로 구조분해 하여 사용할 수 있다.
	const { vAlert, vSuccess } = useAlertStore();

	//alerts라는 상태나 vSuccess 함수는 컴포넌트에서 호출되고 사용하기 때문에 return을 해주어야 한다.
	return {
		alerts,
		vAlert,
		vSuccess,
	};
}
