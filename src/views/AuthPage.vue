<template>
	<b-container class="page-container__centerd">
		<AuthForm :type="type" />
		<p v-if="type === 'login'">
			Don't have an account yet? <b-link to="/auth/register">Register!</b-link>
		</p>
		<p v-else-if="type === 'register'">
			Have an account already? <b-link to="/auth/login">Login!</b-link>
		</p>
	</b-container>
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
		this.$store.commit('setError', null)
	},
}
</script>
<style lang="scss"></style>
