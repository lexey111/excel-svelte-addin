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
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.5303 11.1161C16.0185 11.6043 16.0185 12.3957 15.5303 12.8839L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z"
		fill="#0F1729"
	/>
</svg>
