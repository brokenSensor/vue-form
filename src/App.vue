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
		this.$store.dispatch('loadCurrentUser')
	},
}
</script>

<style lang="scss">
body {
	min-height: 100vh;
}
.page-container__centerd {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	flex-direction: column;
}
</style>
