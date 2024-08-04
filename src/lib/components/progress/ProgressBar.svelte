<script>
	export let title;
	export let percentage;
	$: completeClass = title === 'Completed' ? 'bg-success' : 'bg-info';
</script>

<div class="space-y-5">
	<div class="flex justify-between">
		<p>{title}</p>
		<p>{percentage}%</p>
	</div>

	<div class="h-3 w-full overflow-hidden rounded-full bg-base-200">
		<div
			class="{completeClass} h-3 rounded-full transition-all duration-500 ease-out"
			style="width: {percentage}%"
		/>
	</div>
</div>