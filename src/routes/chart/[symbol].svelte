<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { loadData } from '../../api'
  import Chart from '../../lib/Chart.svelte'
  
  let timeseries

  onMount(async () => {
    timeseries = await loadData($page.params.symbol)
  });

</script>

{#if timeseries}
  <Chart {timeseries} />
{/if}
