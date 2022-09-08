import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		email: 'jaehan@kyobo.com',
		pw: '#$!^!@#$@#$!#$',
	}),

	getters: {
		getEmail: state => state.email,
		getPw: state => state.pw,
	},

	actions: {
		initEmail() {
			this.email = '';
		},
		initPw() {
			this.pw = '';
		},
	},
});
