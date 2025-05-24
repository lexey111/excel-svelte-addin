<script lang="ts">
	import { currentPage, officeState, userData } from '../../stores';
</script>

{#if $officeState.isOfficeInitialized && $userData.isAuthorized}
	<div class="header">
		<div class="menu-item" class:active={$currentPage === 'connections'}>
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#" onclick={() => ($currentPage = 'connections')} role="button">Connections</a>
		</div>
		<div class="menu-item" class:active={$currentPage === 'tracking'}>
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#" onclick={() => ($currentPage = 'tracking')} role="button">Tracking</a>
		</div>
		<div class="menu-item" class:active={$currentPage === 'profile'}>
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#" onclick={() => ($currentPage = 'profile')} role="button">Profile</a>
		</div>
	</div>
{/if}

<style>
	.header {
		flex-grow: 0;
		flex-shrink: 0;
		display: flex;
		flex-flow: row nowrap;
		height: 36px;
		align-items: center;
		align-content: center;
		justify-content: center;
		font-size: 0.8rem;
		width: 100%;
		border-bottom: 2px solid var(--primary-color);
	}

	.menu-item {
		padding: 0 1em;
		height: 100%;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		align-content: center;
		justify-content: center;
		transition: var(--default-transition);

		a {
			color: #222;
			font-weight: bold;
		}

		a:hover {
			text-decoration: none;
		}
		a:focus {
			outline: none;
			text-decoration: underline;
		}

		&.active {
			background: var(--primary-color);

			a {
				color: var(--primary-contrast-color);
			}
		}
	}
</style>
