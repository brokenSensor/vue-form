import Vue from 'vue'
import Vuex from 'vuex'
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth'
import { app } from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		error: null,
	},
	getters: {
		parsedError(state) {
			const error = state.error
			if (!error) return null
			switch (error.code) {
				case 'auth/wrong-password':
					error.text = 'Wrong password.'
					break

				case 'auth/user-not-found':
					error.text = 'User not found.'
					break

				default:
					error.text = 'Something went wrong. Please try again.'
					break
			}

			return error
		},
	},
	mutations: {
		setUser(state, user) {
			state.user = user
		},
		setError(state, error) {
			state.error = error
		},
	},
	actions: {
		register(context, { email, password }) {
			const auth = getAuth(app)

			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user

					context.commit('setUser', user)
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message

					context.commit('setError', { code: errorCode, message: errorMessage })
				})
		},
		login(context, { email, password }) {
			const auth = getAuth(app)

			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user

					context.commit('setUser', user)
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message

					context.commit('setError', { code: errorCode, message: errorMessage })
				})
		},
		logout(context) {
			const auth = getAuth(app)
			signOut(auth)
				.then(() => {
					context.commit('setUser', null)
				})
				.catch((error) => {
					context.commit('setError', error)
				})
			context.commit('setUser', null)
		},
		loadCurrentUser(context) {
			const auth = getAuth(app)
			onAuthStateChanged(auth, (user) => {
				if (user) {
					context.commit('setUser', user)
				} else {
					context.commit('setUser', null)
				}
			})
		},
	},
	modules: {},
})
