<script lang="ts">
	import { Button } from '../../components';
	import { userData, setFakeUser } from '../../stores';
</script>

<div class="login-form full-center">
	<p>
		Tenant: <b>acme2.5</b>
	</p>
	<input type="text" placeholder="Username" disabled={$userData.isFetching} />
	<input type="password" placeholder="Password" disabled={$userData.isFetching} />

	<div class="actions">
		<Button
			onClick={setFakeUser}
			loading={$userData.isFetching}
			disabled={$userData.isFetching}
			noAutosize={true}>Log In</Button
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
		max-width: 300px;
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
