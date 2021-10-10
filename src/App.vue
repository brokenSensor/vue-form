<template>
	<div>
		<Navbar />
		<router-view />
	</div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
	components: { Navbar },
	mounted() {
		this.$store.dispatch('auth/loadCurrentUser')
	},
}
</script>

<style lang="scss"></style>
