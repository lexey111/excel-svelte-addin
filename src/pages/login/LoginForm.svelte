<script lang="ts">
	import Button from '../../components/shared/Button.svelte';
	import { userData, setFakeUser } from '../../stores';
</script>

<div class="login-form full-center">
	<h3>Please log in</h3>
	<input type="text" placeholder="Username" disabled={$userData.isFetching} />
	<input type="password" placeholder="Password" disabled={$userData.isFetching} />

	<div class="actions">
		<Button onClick={setFakeUser} loading={$userData.isFetching} disabled={$userData.isFetching}
			>Log In</Button
		>
	</div>
</div>

<style>
	.login-form {
		display: flex;
		flex-flow: column wrap;
		align-items: flex-start;

		gap: 6px;
		width: 350px;
		min-width: 350px;
	}

	input {
		max-width: 100%;
		min-width: 200px;
	}

	.actions {
		margin-top: 1em;
		display: flex;
		flex-flow: row wrap;
		gap: 6px;
	}

	@container (width < 400px) {
		.login-form {
			width: calc(100% - 2em);
			min-width: 200px;
		}
		input {
			min-width: 150px;
		}
	}
</style>
