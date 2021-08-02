const API_URL = import.meta.env.VITE_API_URL

const loadChartData = async (symbol) => {
  const response = await fetch(`${API_URL}/chart-data/${symbol}`)
  return await response.json()
}

const uploadImage = async (symbol, image) => {
  const options = { method: 'POST', body: new URLSearchParams({ image }) }
  const response = await fetch(`${API_URL}/images/${symbol}`, options)
}

export { loadChartData, uploadImage }
