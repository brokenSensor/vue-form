<template>
	<b-row class="auth-page" align-content="center">
		<b-col class="auth-page__col" offset-md="4" md="4" sm="12">
			<AuthForm :type="type" />
			<p class="auth-page__text" v-if="type === 'login'">
				Don't have an account yet?
				<b-link class="auth-page__link" to="/auth/register">Register!</b-link>
			</p>
			<p class="auth-page__text" v-else-if="type === 'register'">
				Have an account already?
				<b-link class="auth-page__link" to="/auth/login">Login!</b-link>
			</p>
		</b-col>
	</b-row>
</template>
<script>
import AuthForm from '../components/AuthForm.vue'
export default {
	components: { AuthForm },
	computed: {
		type() {
			return this.$route.params.type
		},
	},
	updated() {
		this.$store.commit('auth/setError', null)
	},
}
</script>
<style lang="scss">
.auth-page {
	min-height: 100vh;
	margin: 0;
}
.auth-page__text {
	text-align: center;
}
</style>
