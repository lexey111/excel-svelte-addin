<script lang="ts">
	import type { Source } from '../../../types';

	type Props = {
		source?: Source;
	};

	let { source = $bindable() }: Props = $props();
</script>

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
	</tbody>
</table>
