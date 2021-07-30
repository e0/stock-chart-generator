<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { loadTimeseries } from '../../api'
  import Chart from '../../lib/Chart.svelte'
  
  let timeseries

  onMount(async () => {
    timeseries = await loadTimeseries($page.params.symbol)
  });

</script>

{#if timeseries}
  <Chart {timeseries} />
{/if}
