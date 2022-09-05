// person 객체를 전역에 등록하는 경우
// 선언 후 main.js에 등록해야 사용 가능하다.

export default {
	install(app, options) {
		const person = {
			...options,
			say() {
				alert(this.name);
			},
		};
		app.config.globalProperties.$person = person;
		// 인스턴스가 생성된 이후 사용할 수 있는 글로벌 프로퍼티를  인스턴스가 생성되기 전인 <script setup> 영역에서 사용하기 위해서는
		// provide를 통해 주입해야한다. ( 사용하는 곳에서는 inject로 받아 사용한다.)
		app.provide('person', person);
	},
};
