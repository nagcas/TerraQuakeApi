import { docsTerraQuakeApi } from '../utils/docsTerraQuakeApi.js'

/** NOTE: viewDocsEarthquakes
 * This controller handles requests for viewing the Earthquake API documentation.
 * It builds a structured response containing available documentation data.
 * If an error occurs during processing, it is handled gracefully using handleHttpError.
 */
export const viewDocsTerraQuakeApi = ({
  buildResponse,
  handleHttpError
}) => {
  return async (req, res) => {
    try {
      // Send a successful response containing the documentation data
      return res.status(200).json(
        buildResponse(
          req,
          'TerraQuake API Documentation retrieved successfully',
          docsTerraQuakeApi,
          null,
          {}
        )
      )
    } catch (error) {
      // Log error to the server console
      console.error(error.message)
      // Handle unexpected errors gracefully
      handleHttpError(res, 'An internal server error occurred.', 500)
    }
  }
}
