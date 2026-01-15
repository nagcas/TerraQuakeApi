import express from 'express'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'
import { viewDocsTerraQuakeApi } from '../controllers/docsTerraQuakeApiControlles.js'

const router = express.Router()

// NOTE: Serve the Earthquake API documentation
// This endpoint provides access to the API reference and usage examples.
// It leverages the viewDocsEarthquakes controller to render or return documentation data.
router.get('/', viewDocsTerraQuakeApi({ buildResponse, handleHttpError }))

export default router
