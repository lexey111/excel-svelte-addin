<script lang="ts">
	import { currentPage, officeState, userData } from '../../stores';
	import { ConnectionsIcon, TrackingIcon, UserIcon } from '../icons';
</script>

{#if $officeState.isOfficeInitialized && $userData.isAuthorized}
	<div class="header">
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a
			class="menu-item"
			href="#"
			onclick={() => ($currentPage = 'connections')}
			role="button"
			class:active={$currentPage === 'connections'}
		>
			<ConnectionsIcon />
			<span>Connections</span>
		</a>
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a
			class="menu-item"
			href="#"
			onclick={() => ($currentPage = 'tracking')}
			role="button"
			class:active={$currentPage === 'tracking'}
		>
			<TrackingIcon />
			<span>Tracking</span>
		</a>
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a
			class="menu-item"
			href="#"
			onclick={() => ($currentPage = 'profile')}
			role="button"
			class:active={$currentPage === 'profile'}
		>
			<UserIcon />
			<span>Profile</span>
		</a>
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
		border-bottom: 1px solid var(--border-color);
	}

	a.menu-item {
		padding: 0 1em;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		align-content: center;
		justify-content: center;
		transition: var(--default-transition);
		gap: 6px;
		color: #222;
		border-bottom: 2px solid #fff;
		cursor: pointer;

		font-weight: bold;
		text-underline-offset: 4px;

		&:focus {
			outline: none;
			text-decoration: none;
		}

		&:focus-within {
			background: var(--secondary-color);
			color: var(--secondary-contrast-color);
			border-color: var(--secondary-color);
		}

		&:hover {
			background: var(--shade-background);
			color: var(--secondary-contrast-color);
			border-color: var(--shade-background);
			text-decoration: none;
		}

		&.active {
			border-color: var(--accent-color);
		}
	}

	@container (width < 450px) {
		.menu-item {
			span {
				display: none;
			}
		}
	}
</style>
