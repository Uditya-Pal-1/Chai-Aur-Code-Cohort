export async function submitRequest(endpoint, data) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error || `Request failed with status ${response.status}.`)
  }

  return result
}
