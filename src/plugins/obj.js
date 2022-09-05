// 객체로 선언할 경우에는 install() 을 사용해야 한다.
// 파라미터로 Vue 인스턴스인 app과 옵션을 받을 수 있다.

const objPlugins = {
	install(app, options) {
		console.log('objPlugins app: ', app, 'options: ', options); // 인스턴스 정보들을 가져온다.

		//app.component()를 활용해서 전역 컴포넌트 만들기
		//app.config.globalProperties 를 사용해 전역 애플리케이션 이스턴스에 속성을 추가할 수 있다.
		//app.directive 를 사용해 커스텀 티렉티브를 설정할 수 있다.
		//app.provide를 사용해 리소스들을 자식 컴포넌트에서 사용할 수 있도록 해준다.
	},
};

export default objPlugins;
