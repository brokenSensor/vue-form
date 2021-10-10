import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../firebase'

export default {
	namespaced: true,
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
				case 'auth/invalid-email':
					error.text = 'Invalid email.'
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
			onAuthStateChanged(auth, (user) => {
				if (user) {
					context.commit('setUser', user)
				} else {
					context.commit('setUser', null)
				}
			})
		},
	},
}
