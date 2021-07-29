const API_URL = import.meta.env.VITE_API_URL

const loadData = async (symbol) => {
  const response = await fetch(`${API_URL}/${symbol}`)
  return await response.json()
}

export { loadData }
