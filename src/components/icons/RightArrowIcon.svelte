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
		d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H16.5858L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z"
	/>
</svg>
