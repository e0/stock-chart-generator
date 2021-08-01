<script>
  import { onMount } from 'svelte'
  import { toPng } from 'html-to-image'
  import { page } from '$app/stores'
  import { default as options } from '../chart/options'
  import { uploadImage } from '../api'

  export let timeseries

  let init
  let chart
  let candlesDrawn = 0
  let technicalIndicatorsDrawn = 0
  let started = false
  let done = false

  onMount(async () => {
    ({ init } = (await import("klinecharts/index.blank.js")).default)
  })

  const generateImageIfDone = () => {
    if (done) {
      return 
    }

    const finishedDrawing =
      (
        candlesDrawn / 2 === timeseries.length
        && technicalIndicatorsDrawn / 10 === timeseries.length
      ) || (
        candlesDrawn  === timeseries.length
        && technicalIndicatorsDrawn / 5 === timeseries.length
      )

    if (!finishedDrawing) {
      return
    }
    done = true

    setTimeout(async () => {
      const imageUrl = await toPng(document.getElementById('chart'))
      const img = new Image();
      img.src = imageUrl;
      document.body.appendChild(img);
      document.getElementById('chart').remove()
      await uploadImage($page.params.symbol, imageUrl)
    })
  }
  

  $: if (init && timeseries && !started) {
    started = true
    chart = init(`chart`, options)

    chart.subscribeAction('drawCandle', () => {
      candlesDrawn++
      generateImageIfDone()
    })

    chart.subscribeAction('drawTechnicalIndicator', () => {
      technicalIndicatorsDrawn++
      generateImageIfDone()
    })


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

    chart.applyNewData(timeseries.map(([open, high, low, close, volume, timestamp]) =>
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
