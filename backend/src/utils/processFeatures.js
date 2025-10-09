// NOTE: Processes an array of features from INGV responses
// Applies sorting, field selection (projection), and pagination
// features: array of feature objects
// query: query parameters (e.g., sort, fields, page, limit)
// opts: optional settings for sorting and field filtering
export function processFeatures (features, query, opts = {}) {
  const {
    defaultSort = '-time', // default sort order if none provided
    sortWhitelist = ['time', 'magnitude', 'depth'], // allowed sort fields
    fieldWhitelist // if undefined, allow all fields
  } = opts

  // 1) Sort features based on query.sort or defaultSort
  const sortParam = query.sort || defaultSort
  const sortKeys = sortParam
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  // Filter sort keys to allow only whitelisted fields
  const safeSortKeys = sortKeys.filter((k) => {
    const key = k.replace(/^-/, '') // remove possible '-' prefix
    return !sortWhitelist || sortWhitelist.includes(key)
  })

  // Helper: map special sort keys to actual feature properties
  const getValue = (f, key) => {
    switch (key) {
      case 'time':
        return f.properties?.time // epoch time in ms
      case 'magnitude':
      case 'mag':
        return f.properties?.mag
      case 'depth':
        return f.geometry?.coordinates?.[2] // depth in km
      default:
        return f.properties?.[key]
    }
  }

  // Sort features array according to safeSortKeys
  const sorted = [...features].sort((a, b) => {
    for (const k of safeSortKeys) {
      const desc = k.startsWith('-') // descending if prefix is '-'
      const key = desc ? k.slice(1) : k
      const av = getValue(a, key)
      const bv = getValue(b, key)

      if (av === bv) continue
      if (av == null) return 1
      if (bv == null) return -1
      return (av > bv ? 1 : -1) * (desc ? -1 : 1)
    }
    return 0
  })

  // 2) Field projection (select only requested fields)
  let projected = sorted
  if (query.fields) {
    const requested = query.fields
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const safe = fieldWhitelist
      ? requested.filter((f) => fieldWhitelist.includes(f))
      : requested

    projected = sorted.map((f) => {
      const out = {}
      for (const field of safe) {
        switch (field) {
          case 'time':
            out.time = f.properties?.time
            break
          case 'magnitude':
            out.magnitude = f.properties?.mag
            break
          case 'depth':
            out.depth = f.geometry?.coordinates?.[2]
            break
          case 'place':
            out.place = f.properties?.place
            break
          case 'coordinates':
            out.coordinates = f.geometry?.coordinates
            break
          default:
            out[field] = f.properties?.[field]
            break
        }
      }
      return out
    })
  }

  // 3) Pagination
  const totalItems = projected.length
  const page = Math.max(Number.isNaN(parseInt(query.page, 10)) ? 1 : parseInt(query.page, 10), 1)
  const limitReq = Math.max(Number.isNaN(parseInt(query.limit, 10)) ? 50 : parseInt(query.limit, 10), 1)
  const limit = Math.min(limitReq, 100) // maximum cap for limit
  const totalPages = Math.ceil(totalItems / limit)
  const currentPage = Math.min(page, totalPages === 0 ? 1 : totalPages)
  const start = (currentPage - 1) * limit
  const slice = projected.slice(start, start + limit)

  return {
    page: currentPage, // current page number
    limit, // number of items per page
    totalPages, // total number of pages
    items: slice, // paginated array of items
    totalFetched: totalItems, // total items after filtering/projection
    hasMore: currentPage < totalPages // whether more pages exist
  }
}
