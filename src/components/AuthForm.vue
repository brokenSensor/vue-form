<template>
	<b-form class="form" @submit.prevent="onSubmit">
		<h4 class="form__title">{{ type === 'login' ? 'Login' : 'Register' }}</h4>
		<b-alert v-if="Error" show variant="danger">{{ Error.text }}</b-alert>
		<b-form-group
			:validated="isValidEmail"
			class="form__group"
			label="Email address:"
			label-for="email"
		>
			<b-form-input
				class="form__input"
				v-model="email"
				id="email"
				placeholder="Enter your email"
				type="email"
			></b-form-input>
		</b-form-group>
		<b-form-group
			:validated="PasswordStrength === 2"
			class="form__group"
			label="Password:"
			label-for="password"
		>
			<b-form-input
				:class="
					'form__input ' + `${type === 'register' && PasswordStrengthClass}`
				"
				v-model="password"
				id="password"
				placeholder="Enter your password"
				type="password"
			></b-form-input>
		</b-form-group>
		<b-btn
			:disabled="!isValidEmail || PasswordStrength <= 0"
			type="submit"
			class="form__btn"
			>{{ type === 'login' ? 'Login' : 'Register' }}</b-btn
		>
	</b-form>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: '',
		}
	},
	props: ['type'],
	computed: {
		isValidEmail() {
			const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

			if (this.email.match(emailRegex)) {
				return true
			}
			return false
		},
		PasswordStrength() {
			const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
			const mediumPasswordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/

			if (this.password.match(strongPasswordRegex)) {
				return 2
			} else if (this.password.match(mediumPasswordRegex)) {
				return 1
			} else {
				return 0
			}
		},
		PasswordStrengthClass() {
			return this.PasswordStrength === 0
				? 'form__input__not-valid'
				: this.PasswordStrength === 1
				? 'form__input__medium-valid'
				: ''
		},
		Error() {
			return this.$store.getters['auth/parsedError']
		},
		user() {
			return this.$store.state.auth.user
		},
	},
	methods: {
		onSubmit() {
			this.$store.dispatch(`auth/${this.$props.type}`, {
				email: this.email,
				password: this.password,
			})
		},
	},
}
</script>

<style scoped lang="scss">
.form {
	border: 1px solid purple;
	border-radius: 1vw;
	padding: 2vw;
}
.form__group {
	margin-bottom: 1vh;
}
.form__input {
	margin-top: 1vh;
}
.form__input__medium-valid {
	&:focus {
		border-color: rgb(255, 165, 0);
		box-shadow: 0 0 0 0.25rem rgba(255, 165, 0, 0.25);
	}
}
.form__input__not-valid {
	&:focus {
		border-color: rgb(255, 0, 0);
		box-shadow: 0 0 0 0.25rem rgba(255, 0, 0, 0.25);
	}
}
.form__btn {
	margin-top: 1vh;
	width: 100%;
}
</style>
