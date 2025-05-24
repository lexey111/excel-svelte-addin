<div class="loader-container">
	<span class="loader"></span>
</div>

<style>
	.loader-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: inline-block;
		height: 3px;
		width: 100%;
		background: var(--shade-background-darker);
	}

	.loader {
		background-color: var(--accent-color);

		position: absolute;
		bottom: 0;
		top: 0;
		width: 50%;

		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-name: indeterminate-progress-bar;
	}

	@keyframes indeterminate-progress-bar {
		from {
			left: -50%;
		}
		to {
			left: 100%;
		}
	}
</style>
