<script lang="ts">
	import { Button } from '../../../components';
	import type { Source } from '../../../types';
	import ConnectionDimensions from './ConnectionDimensions.svelte';

	type Props = {
		index: number;
		onShowRemoveModal: (id: string) => void;
		onShowRemoveDimensionModal: (sourceId: string, dimensionId: string) => void;
		onAddDimension: (sourceId: string) => void;
	} & Source;

	let {
		index,
		onShowRemoveModal,
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
	<h4>
		Source #{index + 1}
		<span class="spacer"></span>
		<Button onClick={() => onShowRemoveModal(id)} size="small" variant="secondary" icon="delete">
			Delete source
		</Button>
	</h4>

	<div class="source-content">
		<fieldset>
			<label for={'cellAddress' + id}>Excel cell</label>
			<input type="text" id={'cellAddress' + id} bind:value={cellAddress} placeholder="B52" />
		</fieldset>

		<fieldset>
			<label for={'version' + id}>Version</label>
			<input type="text" id={'version' + id} bind:value={version} placeholder="Version" />
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
			<input type="text" id={'entityName' + id} bind:value={entityName} placeholder="Metric" />
		</fieldset>
	</div>

	<ConnectionDimensions sourceId={id} {locators} {onShowRemoveDimensionModal} {onAddDimension} />
</div>
