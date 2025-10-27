/** NOTE: viewDocsEarthquakes
 * This controller handles requests for viewing the Earthquake API documentation.
 * It builds a structured response containing available documentation data.
 * If an error occurs during processing, it is handled gracefully using handleHttpError.
 */
export const viewDocsEarthquakes = ({
  buildResponse,
  handleHttpError
}) => {
  return async (req, res) => {
    try {
      const docsEarthquakes = {}

      // Send a successful response containing the documentation data
      return res.status(200).json(
        buildResponse(req, 'Earthquake API Documentation retrieved successfully', docsEarthquakes, null, {})

      )
    } catch (error) {
      console.error(error.message)
      handleHttpError(res, 'An internal server error occurred.', 500)
    }
  }
}
