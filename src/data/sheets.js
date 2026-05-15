const CSV_URL = import.meta.env.VITE_SHEETS_CSV_URL

const HEADERS = [
  'state', 'type', 'region', 'veg_name', 'veg_style', 'veg_note',
  'meat_name', 'meat_style', 'story', 'source_label', 'source_url',
  'status', 'contributor', 'last_updated',
]

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

function parseCSV(text) {
  const lines = text.trim().split('\n')
  return lines
    .slice(1) // skip header row
    .map(line => {
      const values = parseCSVLine(line)
      return HEADERS.reduce((obj, key, i) => {
        obj[key] = values[i] ?? ''
        return obj
      }, {})
    })
    .filter(row => row.state)
}

export async function fetchFoodData() {
  if (!CSV_URL) throw new Error('VITE_SHEETS_CSV_URL is not set')
  const res = await fetch(CSV_URL)
  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`)
  const text = await res.text()
  return parseCSV(text)
}
