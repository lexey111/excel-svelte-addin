<script lang="ts">
	type Props = {
		inline?: boolean;
		color?: 'dangerous';
		size?: number;
	};

	let { inline, color, size }: Props = $props();
</script>

<svg
	width={size || 24}
	height={size || 24}
	viewBox="0 0 24 24"
	fill="currentColor"
	xmlns="http://www.w3.org/2000/svg"
	class={'icon' + (inline ? ' inline' : '') + (color === 'dangerous' ? ' dangerous' : '')}
>
	<path
		d="M12 7C12.5523 7 13 7.44772 13 8V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V8C11 7.44772 11.4477 7 12 7Z"
	/>
	<path
		d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
	/>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
	/>
</svg>
