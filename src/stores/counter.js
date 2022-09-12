import { defineStore } from 'pinia';

// 스토어 변수명은 use + 스토어명으로 작성하는 편이다.
// 스토어의 옵션은 크게 state, getters, actions가 있다.
// <문법>
// export const useCounterStore = defineStore('스토어id', {옵션} );

export const useCounterStore = defineStore('counter', {
	//store의 data 역할로 return 을 해주는 형식이다.
	state: () => ({
		counter: 1,
	}),
	// store의 computed 역할. 파라미터로 state를 받는다.
	// 기존의 doubleCount를 접근하기 위해서는 this를 사용해야 하지만 arrow func를 이용하면 접근이 불가하기 때문에
	// 일반 함수로 만들어 사용한다.
	getters: {
		doubleCount: state => state.counter * 2,
		doubleCountPlusOne() {
			return this.doubleCount + 1;
		},
	},
	//store의 method 역할, 함수를 정의 할 때에는 Arrow Function 을 사용하지 않는다.
	// Arrow Func를 사용하게되면 this 접근이 불가능하다.
	actions: {
		increment() {
			this.counter++;
		},
	},
});
