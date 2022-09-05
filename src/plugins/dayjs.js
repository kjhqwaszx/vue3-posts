// dayjs 라이브러리를 플러그인 형태로 만들어 사용

import dayjs from 'dayjs';

export default {
	install(app) {
		app.config.globalProperties.$dayjs = dayjs;
		app.provide('dayjs', dayjs);
	},
};
