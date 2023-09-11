export default async function fetchGroupsData() {
    try {
      const response = await fetch('/db/groupsData.json')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const jsonData = await response.json()
      return jsonData
    } catch (error) {
      return error
    }
  }