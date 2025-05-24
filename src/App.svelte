<script lang="ts">
	import { Footer, Header, InitGuard, LoginGuard, Spinner } from './components';
	import ConnectionsPage from './pages/connections/ConnectionsPage.svelte';
	import LoginPage from './pages/login/LoginPage.svelte';
	import ProfilePage from './pages/profile/ProfilePage.svelte';
	import TrackingPage from './pages/tracking/TrackingPage.svelte';
	import { userData, officeState, currentPage } from './stores';

	officeState.subscribe((value) => {
		if (value.isOfficeInitialized) {
			$currentPage = '_login';
		} else {
			$currentPage = '_init';
		}
	});

	userData.subscribe((value) => {
		if (!$officeState.isOfficeInitialized) {
			return;
		}

		if ($currentPage === '_login' && value.isAuthorized && !value.isFetching) {
			$currentPage = 'connections';
		}

		if ($currentPage !== '_login' && !value.isAuthorized && !value.isFetching) {
			$currentPage = '_login';
		}
	});
</script>

<InitGuard />
<LoginGuard />

<div class="app-content" class:center-form={$currentPage === '_init' || $currentPage === '_login'}>
	<Header />

	{#if $currentPage === '_init'}
		<Spinner message="Initialization..." />
	{/if}

	{#if $currentPage === '_login'}
		<LoginPage />
	{/if}

	{#if $currentPage === 'profile'}
		<ProfilePage />
	{/if}

	{#if $currentPage === 'connections'}
		<ConnectionsPage />
	{/if}

	{#if $currentPage === 'tracking'}
		<TrackingPage />
	{/if}
</div>

<Footer />

<style>
	.center-form {
		height: 100%;
		flex-grow: 2;
		align-items: center;
		justify-content: center;
		align-content: center;
	}
</style>
