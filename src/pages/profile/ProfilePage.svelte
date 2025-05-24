<script lang="ts">
	import { Button } from '../../components';
	import { logout, userData } from '../../stores';
</script>

<div class="app-page">
	<h2>Welcome, {$userData.user?.name}!</h2>

	{#if $userData.user?.name !== $userData.user?.email}
		<p>Your email is {$userData.user?.email}.</p>
	{/if}

	<div class="actions">
		<Button
			onClick={logout}
			loading={$userData.isFetching}
			disabled={$userData.isFetching}
			variant="dangerous">Log out</Button
		>
	</div>
</div>

<style>
	.actions {
		margin-top: 2em;
	}
</style>
