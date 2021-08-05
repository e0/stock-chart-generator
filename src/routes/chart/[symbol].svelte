<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { loadChartData } from '../../api'
  import Chart from '../../lib/Chart.svelte'
  
  let chartData
  let timeframe

  onMount(async () => {
    const results  = await loadChartData($page.params.symbol)
    timeframe = $page.query.get('timeframe') || 'daily'

    chartData = {
      ...results,
      timeseries: results.timeseries[timeframe.toLowerCase()]
    }
  })

</script>

{#if chartData}
  <Chart {chartData} {timeframe} />
{/if}
