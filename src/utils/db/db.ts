export default async function fetchEmptyCurrencyData(url:string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    return error
  }
}
