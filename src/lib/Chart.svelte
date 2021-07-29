<script>
  import { onMount } from 'svelte'
  import { default as options } from '../chart/options'

  export let timeseries

  let init
  let chart

  onMount(async () => {
    ({ init } = (await import("klinecharts/index.blank.js")).default)
  })

  $: if (timeseries && init) {
    chart = init(`chart`, options)

    chart.createTechnicalIndicator("MA", false, { id: "candle_pane" })
    chart.overrideTechnicalIndicator({
      name: "MA",
      calcParams: [10, 20, 50],
    })

    const height = 100
    chart.createTechnicalIndicator("VOL", false, { height })
    chart.overrideTechnicalIndicator({
      name: "VOL",
      calcParams: [20],
    })

    chart.applyNewData(timeseries.map(([open, high, low, close, volume, timestamp]) =>
      ({ open, high, low, close, volume, timestamp }))
    )

  }
</script>

<div id="chart" />

<style>
  #chart {
    width: 725px;
    height: 500px;
  }
</style>
