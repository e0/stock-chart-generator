const formatNumber = (n) => {
  const num = Number(n)

  return Math.abs(num) >= 1.0e12
    ? (num / 1.0e12).toFixed(2) + ' T'
    : Math.abs(num) >= 1.0e9
    ? (num / 1.0e9).toFixed(2) + ' B'
    : Math.abs(num) >= 1.0e6
    ? (num / 1.0e6).toFixed(2) + ' M'
    : Math.abs(num) >= 1.0e3
    ? (num / 1.0e3).toFixed(2) + ' K'
    : num.toFixed(2)
}

// const dailyData = [o, h, l, c, v, t]
const calculateAdrPct = (chartData) => {
  const candles = chartData.slice(chartData.length - 20, chartData.length)
  const adr = candles.reduce((total, d) => total + d[1] / d[2], 0) / 20 - 1
  return parseFloat((100 * adr).toFixed(2))
}

const calculateDollarVol = (chartData) => {
  const candles = chartData.slice(chartData.length - 5, chartData.length)
  const dollar = candles.reduce((total, d) => total + d[3], 0) / 5
  const vol = candles.reduce((total, d) => total + d[4], 0) / 5
  return formatNumber(dollar * vol)
}

export { calculateAdrPct, calculateDollarVol }
