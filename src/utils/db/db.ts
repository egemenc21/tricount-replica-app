export default async function fetchEmptyCurrencyData() {
  try {
    const response = await fetch('/db/currency.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    return error
  }
}
