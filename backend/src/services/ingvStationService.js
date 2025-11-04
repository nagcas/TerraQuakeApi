import axios from 'axios'
import dotenv from 'dotenv'
import xml2js from 'xml2js'

// Load environment variables from .env file
dotenv.config()

/**
 * Fetches seismic stations from INGV FDSN web service.
 * @param {Object} options - Options for the API request
 * @param {string} options.network - Network code to filter stations (default: 'IV' for Italian network)
 * @param {string} options.format - Response format, 'xml' by default
 * @returns {Array} Array of station objects retrieved from INGV
 */
export async function fetchINGVStations ({ baseUrl, network = 'IV', format = 'xml' } = {}) {
  try {
    // Construct the full API URL with query parameters
    const url = `${baseUrl}?network=${network}&level=station&format=${format}`

    // Make HTTP GET request to INGV API
    const resp = await axios.get(url)

    // If the response is XML (as string), parse it into JSON
    if (typeof resp.data === 'string') {
      const parser = new xml2js.Parser({ explicitArray: false })
      const parsed = await parser.parseStringPromise(resp.data)

      // Extract networks from the parsed XML
      const networks = parsed?.FDSNStationXML?.Network
      if (!networks) return [] // Return empty array if no networks found

      // Ensure networks is always an array, even if only one network
      const netArray = Array.isArray(networks) ? networks : [networks]

      // Flatten all stations from all networks into a single array
      const stations = netArray.flatMap(n => n.Station || [])

      // Return the array of station objects
      return stations
    }

    // Return empty array if data is not a string (unexpected format)
    return []
  } catch (error) {
    // Log any errors to the console for debugging
    console.error('Error fetching INGV stations:', error.message)

    // Return empty array on error to prevent application crash
    return []
  }
}
