<script lang="ts">
	import type { Source } from '../../../types';
	import ConnectionDimensions from './ConnectionDimensions.svelte';

	type Props = {
		onShowRemoveDimensionModal: (sourceId: string, dimensionId: string) => void;
		onAddDimension: (sourceId: string) => void;
	} & Source;

	let {
		onShowRemoveDimensionModal,
		onAddDimension,
		id,
		version = $bindable(),
		entityName = $bindable(),
		entityType = $bindable(),
		cellAddress = $bindable(),
		locators = $bindable()
	}: Props = $props();
</script>

<div class="source">
	<div class="source-content">
		<fieldset>
			<label for={'cellAddress' + id}>Excel cell</label>
			<!-- svelte-ignore a11y_autofocus -->
			<input
				type="text"
				id={'cellAddress' + id}
				bind:value={cellAddress}
				placeholder="B52"
				required
				autofocus
				aria-invalid={!cellAddress.trim()}
			/>
		</fieldset>

		<fieldset>
			<label for={'version' + id}>Version</label>
			<input
				type="text"
				id={'version' + id}
				bind:value={version}
				placeholder="Version"
				required
				aria-invalid={!version.trim()}
			/>
		</fieldset>

		<fieldset>
			<label for={'entityType' + id}>Entity type</label>
			<select name="entityType" id={'entityType' + id} bind:value={entityType}>
				<option value="metric">Metric</option>
				<option value="list">List</option>
				<option value="report">Report</option>
			</select>
		</fieldset>

		<fieldset>
			<label for={'entityName' + id}>Entity Name</label>
			<input
				type="text"
				id={'entityName' + id}
				bind:value={entityName}
				placeholder="Metric"
				required
				aria-invalid={!entityName.trim()}
			/>
		</fieldset>
	</div>

	<ConnectionDimensions sourceId={id} {locators} {onShowRemoveDimensionModal} {onAddDimension} />
</div>

<style>
	.source {
		container-type: size;
		margin: 0 auto;
		width: var(--content-clamp);
	}
</style>
