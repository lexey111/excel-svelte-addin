<script lang="ts">
	import { Footer, Header, InitGuard, LoginGuard, Spinner } from './components';
	import ConnectionsData from './data-sources/ConnectionsData.svelte';
	import { LoginPage, ProfilePage, TrackingPage, ConnectionsPage } from './pages';
	import { userData, officeState, currentPage } from './stores';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient();

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

<QueryClientProvider client={queryClient}>
	{#if $officeState.isOfficeInitialized && $userData.isAuthorized}
		<ConnectionsData />
	{/if}

	<div
		class="app-content"
		class:center-form={$currentPage === '_init' || $currentPage === '_login'}
	>
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
</QueryClientProvider>
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
