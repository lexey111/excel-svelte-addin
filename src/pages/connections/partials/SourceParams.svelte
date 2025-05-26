<script lang="ts">
	import { Spinner } from '../../../components';
	import type { Source } from '../../../types';

	type Props = {
		source?: Source;
	};

	let { source = $bindable() }: Props = $props();
</script>

{#if source}
	<table class="pairs-table">
		<tbody>
			<tr>
				<td>Excel Cell</td>
				<td>{source?.cellAddress}</td>
			</tr>
			<tr>
				<td>Version</td>
				<td>{source?.version}</td>
			</tr>
			<tr>
				<td>Entity type</td>
				<td>{source?.entityType}</td>
			</tr>
			<tr>
				<td>Entity Name</td>
				<td>{source?.entityName}</td>
			</tr>
			<tr>
				<td>Dimensions</td>
				<td
					>{(source?.locators || [])
						.map((locator) => locator.name + '=' + locator.value)
						.join(', ')}</td
				>
			</tr>
			{#if source?.isBusy}
				<tr>
					<td>State</td>
					<td><Spinner message="Loading data..." /></td>
				</tr>
			{/if}

			{#if source?.lastUpdated}
				<tr>
					<td>Last Updated</td>
					<td>{source.lastUpdated}</td>
				</tr>
			{/if}
			{#if source?.lastValue}
				<tr>
					<td>Last Value</td>
					<td>{source.lastValue}</td>
				</tr>
			{/if}
		</tbody>
	</table>
{/if}
