<script lang="ts">
	import { connections } from '../../../stores';
	import type { Connection } from '../../../types';

	type Props = {
		connection: Connection;
	};

	let { connection = $bindable() }: Props = $props();

	const alreadyExists = $derived(() => {
		return ($connections.data || []).some(
			(c) => c.id !== connection.id && c.name.trim() === connection.name.trim()
		);
	});
</script>

<h3>Connection parameters</h3>

<fieldset>
	<label for="name"><b>Name</b><span class="mandatory-sign">*</span></label>
	<!-- svelte-ignore a11y_autofocus -->
	<div class="input-container">
		<input
			type="text"
			id="name"
			bind:value={connection.name}
			autocomplete="off"
			required
			autofocus
			placeholder="Connection name"
			aria-invalid={!connection.name.trim() || alreadyExists()}
		/>
		{#if alreadyExists()}
			<span class="input-error">A connection with this name already exists</span>
		{/if}
	</div>
</fieldset>

<h4>For Book ans Sheet</h4>

<fieldset>
	<label for="bookName">Book name</label>
	<input type="text" id="bookName" bind:value={connection.bookName} placeholder="Book name" />

	<div class="description">
		You can specify an Excel book name to automatically select this connection. If you leave this
		field blank, you can select the connection manually later.
	</div>
</fieldset>

<fieldset>
	<label for="sheetTitle">Sheet title</label>
	<input type="text" id="sheetTitle" bind:value={connection.sheetTitle} placeholder="Sheet title" />

	<div class="description">
		You can specify the Excel Sheet title to automatically use this connection, with or without the
		book name.
	</div>
</fieldset>

<fieldset>
	<label for="sheetNumber">Sheet number</label>
	<input type="number" id="sheetNumber" bind:value={connection.sheetNumber} placeholder="0" />

	<div class="description">
		Or you can specify an Excel sheet number to automatically use this connection, with a book name
		or without a book name.
	</div>
</fieldset>
