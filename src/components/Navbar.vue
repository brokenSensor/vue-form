<template>
	<b-navbar fixed="top" type="dark" class="navbar">
		<b-navbar-brand class="navbar__brand" to="/">Vue Form</b-navbar-brand>
		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<b-collapse class="navbar__collapseble" id="nav-collapse" is-nav>
			<b-navbar-nav>
				<b-nav-item-dropdown v-if="user">
					<template #button-content>
						<a>{{ user.email }}</a>
					</template>
					<b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
				</b-nav-item-dropdown>
				<b-nav-item v-else to="/auth/login">Login</b-nav-item>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	computed: {
		user() {
			return this.$store.state.user
		},
	},
	methods: {
		logout() {
			this.$store.dispatch('logout')
		},
	},
}
</script>

<style lang="scss" scoped>
.navbar {
	background-color: green;
}

.navbar__brand {
	margin: 0 0 0 10vw;
}
.navbar__collapseble {
	justify-content: right;
	margin-right: 10vw;
}
</style>
