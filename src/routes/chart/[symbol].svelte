<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { loadChartData } from '../../api'
  import Chart from '../../lib/Chart.svelte'
  
  let chartData

  onMount(async () => {
    chartData = await loadChartData($page.params.symbol)
  });

</script>

{#if chartData}
  <Chart {chartData} />
{/if}
