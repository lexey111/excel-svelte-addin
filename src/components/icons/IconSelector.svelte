<script lang="ts">
	import {
		AddIcon,
		CloseIcon,
		DeleteIcon,
		ChevronLeftIcon,
		ChevronRightIcon,
		LeftArrowIcon,
		RightArrowIcon,
		LocationIcon,
		DimensionIcon,
		DownloadIcon
	} from '../icons';
	import type { Icon } from '../../types';

	type Props = {
		icon?: Icon;
	};

	let { icon }: Props = $props();
</script>

{#if icon === 'delete'}
	<DeleteIcon />
{/if}

{#if icon === 'add'}
	<AddIcon />
{/if}

{#if icon === 'close'}
	<CloseIcon />
{/if}

{#if icon === 'left'}
	<ChevronLeftIcon />
{/if}

{#if icon === 'right'}
	<ChevronRightIcon />
{/if}

{#if icon === 'left-arrow'}
	<LeftArrowIcon />
{/if}

{#if icon === 'right-arrow'}
	<RightArrowIcon />
{/if}

{#if icon === 'location'}
	<LocationIcon />
{/if}

{#if icon === 'dimension'}
	<DimensionIcon />
{/if}

{#if icon === 'download'}
	<DownloadIcon />
{/if}
