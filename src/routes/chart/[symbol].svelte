<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { loadChartData } from '../../api'
  import Chart from '../../lib/Chart.svelte'
  import { isValidDate } from '../../util/date'
  import { calculateAdrPct, calculateDollarVol } from '../../util/chartData'
  
  let chartData
  let timeframe

  onMount(async () => {
    const results  = await loadChartData($page.params.symbol)
    timeframe = $page.query.get('timeframe') || 'daily'
    const dateString = $page.query.get('date')
    let timeseries = results.timeseries[timeframe.toLowerCase()]
    if (dateString && isValidDate(dateString)) {
      const chartTimestamp = (new Date(dateString)).getTime()
      timeseries = timeseries.filter(x => x[5] <= chartTimestamp)
      const dailySeries = results.timeseries['daily'].filter(x => x[5] <= chartTimestamp)
      const adrPct = calculateAdrPct(dailySeries)
      const dollarVol = calculateDollarVol(dailySeries)
      chartData = { adrPct, dollarVol, timeseries }

    } else {
      chartData = { ...results, timeseries }
    }

  })

</script>

{#if chartData}
  <Chart {chartData} {timeframe} />
{/if}
