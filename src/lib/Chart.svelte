<script>
  import { onMount } from 'svelte'
  import { toPng } from 'html-to-image'
  import { page } from '$app/stores'
  import { default as options } from '../chart/options'
  import { uploadImage } from '../api'

  export let chartData
  export let timeframe

  let init
  let chart
  let started = false
  let timer

  onMount(async () => {
    ({ init } = (await import("klinecharts/index.blank.js")).default)
  })

  const generateImageIfDone = () => {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      const { adrPct, dollarVol, timeseries } = chartData
      addKeyStats({ adrPct, dollarVol })
      const d = timeseries[timeseries.length - 1][5]
      const dateString = new Date(d).toISOString().slice(0, 10)

      const imageUrl = await toPng(document.getElementById('chart'))
      const img = new Image();
      img.src = imageUrl;
      document.body.appendChild(img);
      document.getElementById('chart').remove()
      await uploadImage($page.params.symbol, timeframe, dateString, imageUrl)
    }, 20)
  }

  const addKeyStats = ({ adrPct, dollarVol }) => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext("2d")
    ctx.font = '14px monospace'
    ctx.fillStyle = '#FFF'
    ctx.fillText(`ADR20: ${adrPct}%`, 525, 20)
    ctx.fillText(`$VOL5: ${dollarVol}`, 525, 40)
  }
  

  $: if (init && chartData && !started) {
    started = true
    chart = init(`chart`, options)

    chart.subscribeAction('drawCandle', generateImageIfDone)
    chart.subscribeAction('drawTechnicalIndicator', generateImageIfDone)

    chart.createTechnicalIndicator("MA", false, { id: "candle_pane" })
    chart.overrideTechnicalIndicator({
      name: "MA",
      calcParams: [10, 20, 50],
    })

    const height = 150
    chart.createTechnicalIndicator("VOL", false, { height })
    chart.overrideTechnicalIndicator({
      name: "VOL",
      calcParams: [20],
    })

    chart.applyNewData(chartData.timeseries.map(([open, high, low, close, volume, timestamp]) =>
      ({ open, high, low, close, volume, timestamp }))
    )
  }
</script>

<div id="chart" />

<style>
  #chart {
    width: 725px;
    height: 850px;
    background: #000;
  }
</style>
