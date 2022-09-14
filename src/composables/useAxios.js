import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

// 대부분 get 메서드를 호출하기 때문에 default값으로 method: 'get'을 설정해준다.
const defaultConfig = {
	method: 'get',
};

// config값은 구조분해 하여 사용할 예정인데, undefined가 들어오면 빈 객체 생성
export const useAxios = (url, config = {}) => {
	// 여러 컴포넌트에서 중복으로 사용하던 상태 선언
	const response = ref(null);
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	// 외부에서 호출할때 넘겨주는 값이며 성공했을때, 실패했을때 실행할 함수를 정의하기 위해 사용된다.
	// 함수를 객체로 담아 전달한다. ( PostCreate, PostEdit에서 담아줌)

	const execute = () => {
		data.value = null;
		error.value = null;
		loading.value = true;

		// config안에 들어있는 params 는 ref형 변수기 때문에 prams.value 값을 사용해야 한다.
		// 따라서 unref함수를 통해 일반 변수로 넣어주어야 한다.

		axios(unref(url), {
			// 중복된 속성은 defaultconfig 다음 config 값으로 덮어씌워진다.
			// post method를 요청 할 경우 외부에서 넘겨준 config값에 들어있는 post로 설정된다.
			...defaultConfig,
			...config,
			params: unref(config.params),
		})
			.then(res => {
				//외부에서 response header값을 사용하는 경우가 있으므로 전체 response도 반환해준다. ( ex. total Count)
				response.value = res;
				data.value = res.data;
			})
			.catch(err => {
				error.value = err;
			})
			.finally(() => {
				loading.value = false;
			});
	};

	if (isRef(config.params) || isRef(url)) {
		// 외부에서 전달하는 params가 변경될 때마다 이를 감지하고 api를 다시 호출한다. ( 페이징, 검색 필터링 등...)
		// params가 변경될때마다 재조회가 필요한 경우
		watchEffect(execute);
	} else {
		// 전달하는 params가 일반 변수이면 한번만 실행해 준다.
		// 단순 조회용이며 params가 변경됨에 따라 반응 할 필요가 없는 경우
		execute();
	}

	//외부에서 사용가능하도록 return
	return {
		response,
		data,
		error,
		loading,
	};
};
