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
		d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3165 19.0976 14.6834 19.0976 14.2929 18.7071L8.46963 12.8839C7.98148 12.3957 7.98148 11.6043 8.46963 11.1161L14.2929 5.29289C14.6834 4.90237 15.3165 4.90237 15.7071 5.29289Z"
		fill="#0F1729"
	/>
</svg>
