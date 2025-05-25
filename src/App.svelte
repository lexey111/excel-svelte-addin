<script lang="ts">
	import { Footer, Header, InitGuard, LinearLoader, LoginGuard } from './components';
	import ConnectionsData from './data-sources/ConnectionsData.svelte';
	import { LoginPage, ProfilePage, TrackingPage, ConnectionsPage } from './pages';
	import { userData, officeState, currentPage, appState } from './stores';
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
			$currentPage = '_init';
		}

		if ($currentPage !== '_login' && !value.isAuthorized && !value.isFetching) {
			$currentPage = '_login';
		}
	});

	appState.subscribe((value) => {
		if (!value.isBusy && $currentPage === '_init') {
			if (value.connectionsLoaded) {
				if (value.connectionsCount > 0) {
					$currentPage = 'tracking';
				} else {
					$currentPage = 'connections';
				}
			}
		}
	});
</script>

<InitGuard />
<LoginGuard />

{#if $appState.isBusy}
	<LinearLoader global={true} />
{/if}

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
			<p class="wait">
				{#if $appState.isConnectionsLoading}
					Loading connections...
				{:else}
					Initialization...
				{/if}
			</p>
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
		<Footer />
	</div>
</QueryClientProvider>

<style>
	.center-form {
		height: 100%;
		flex-grow: 2;
		align-items: center;
		justify-content: center;
		align-content: center;
	}
</style>
