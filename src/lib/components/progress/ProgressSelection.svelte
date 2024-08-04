<script>
	import ProgressBar from './ProgressBar.svelte';
	import { todos } from '../../stores/todoStore';
	import { fade } from 'svelte/transition';

	export let completePercentage = 0;
	export let progressPercentage = 0;

	$: totalCount = $todos.length;
	$: completeCount = $todos.filter((todo) => todo.done).length;
	$: progressCount = $todos.filter((todo) => !todo.done).length;
	$: completePercentage = Math.round((completeCount / totalCount) * 100) || 0;
	$: progressPercentage = Math.round((progressCount / totalCount) * 100) || 0;
</script>

{#if $todos.length}
	<section class="space-y-8" transition:fade>
		<h3 class="text-xl font-bold">Progress</h3>
		<div class="space-y-8">
			<ProgressBar title="In Progress" percentage={progressPercentage} />
			<ProgressBar title="Completed" percentage={completePercentage} />
		</div>
	</section>
{/if}