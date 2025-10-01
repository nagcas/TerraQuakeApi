	const handleFilterChange = (e) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const endpoints = [
	{
		title: 'historical-significant',
		description: `
Retrieve significant historical earthquakes (magnitude >= 6) in Italy since 1900. Useful for research and risk analysis.`,
		query: '?mag=6&startdate=1900-01-01&region=Italy&limit=100',
		example: '/v1/earthquakes?mag=6&startdate=1900-01-01&region=Italy&limit=100',
		method: 'GET',
		moreInfo: [
			'Provides context for seismic risk and historical trends.',
			'Returned fields: magnitude, location, depth, time, eventId.',
			'Tip: Use for educational and scientific analysis.'
		]
	},
	{
		title: 'tsunami-potential',
		description: `
List earthquakes with depth < 50km and magnitude >= 7, which may have tsunami potential.`,
		query: '?mag=7&depth=50&tsunamiRisk=true&limit=10',
		example: '/v1/earthquakes?mag=7&depth=50&tsunamiRisk=true&limit=10',
		method: 'GET',
		moreInfo: [
			'Highlights events with possible tsunami risk.',
			'Returned fields: magnitude, location, depth, time, tsunamiRisk.',
			'Tip: Use for coastal safety planning.'
		]
	},
	{
		title: 'aftershocks',
		description: `
Retrieve aftershocks following a major event by eventId. Useful for monitoring ongoing seismic sequences.`,
		query: '?mainEventId=44085192&type=aftershock&limit=50',
		example: '/v1/earthquakes?mainEventId=44085192&type=aftershock&limit=50',
		method: 'GET',
		moreInfo: [
			'Tracks seismic activity after a major earthquake.',
			'Returned fields: magnitude, location, depth, time, parentEventId.',
			'Tip: Use for emergency response and scientific study.'
		]
	},
	{
		title: 'foreshocks',
		description: `
List foreshocks detected before a major event by eventId. Useful for pattern analysis and early warning research.`,
		query: '?mainEventId=44085192&type=foreshock&limit=20',
		example: '/v1/earthquakes?mainEventId=44085192&type=foreshock&limit=20',
		method: 'GET',
		moreInfo: [
			'Identifies precursor events before a major earthquake.',
			'Returned fields: magnitude, location, depth, time, parentEventId.',
			'Tip: Use for predictive modeling and risk assessment.'
		]
	},
	{
		title: 'recent-major',
		description: `
This endpoint retrieves all major seismic events (magnitude >= 5) from the last 30 days. Useful for tracking significant earthquakes and their impact in the region.`,
		query: '?mag=5&startdate=2025-09-01&enddate=2025-10-01&limit=20',
		example: '/v1/earthquakes?mag=5&startdate=2025-09-01&enddate=2025-10-01&limit=20',
		method: 'GET',
		moreInfo: [
			'Focuses on high-impact events for emergency response.',
			'Returned fields: magnitude, location, depth, time, eventId.',
			'Tip: Use for alerting and rapid assessment.'
		]
	},
	{
		title: 'felt-reports',
		description: `
This endpoint lists earthquakes that have associated felt reports from the public, indicating which events were experienced by people.`,
		query: '?felt=true&limit=50',
		example: '/v1/earthquakes?felt=true&limit=50',
		method: 'GET',
		moreInfo: [
			'Highlights events with human impact.',
			'Returned fields: magnitude, location, depth, time, feltReports.',
			'Tip: Useful for community engagement and risk communication.'
		]
	},
		{
			title: "today",
			description: `
	This endpoint retrieves all seismic events that occurred today (from 00:00 UTC to the current time) from the TerraQuake API. It allows users to monitor real-time seismic activity and provides a daily overview of ongoing earthquakes. The response includes detailed information such as magnitude, location, depth, event time, and coordinates.`,
			query: '?limit=50&page=1',
			example: '/v1/earthquakes/today?limit=50&page=1',
			method: 'GET',
			moreInfo: [
				'Ideal for real-time monitoring and alerting systems.',
				'Returned fields: magnitude, location, depth, event time, coordinates.',
				'Tip: Combine with push notifications for daily updates.'
			]
		},
		{
			title: 'last-week',
			description: `
	This endpoint retrieves all seismic events that occurred in the last 7 days from the TerraQuake API.
	It allows users to monitor and analyze recent seismic activity over the past week, providing insights into short-term trends and regional patterns.`,
			query: '?limit=50&page=1',
			example: '/v1/earthquakes/last-week?limit=50&page=1',
			method: 'GET',
			moreInfo: [
				'Analyze short-term seismic trends and regional patterns.',
				'Returned fields: magnitude, location, depth, time.',
				'Tip: Useful for weekly reports and visualizations.'
			]
		},
		{
			title: 'month',
			description: `
	This endpoint retrieves all seismic events that occurred during a specific month and year from the TerraQuake API.
	It allows users to explore historical earthquake data for a given period. The response includes detailed event information such as magnitude, location, depth, and timestamp.`,
			query: '?year=2025&month=03&limit=50&page=1',
			example: '/v1/earthquakes/month?year=2025&month=03&limit=50&page=1',
			method: 'GET',
			moreInfo: [
				'Explore historical earthquake data for research or analysis.',
				'Returned fields: magnitude, location, depth, timestamp.',
				'Tip: Specify year/month for custom queries.'
			]
		},
		{
			title: 'location',
			description: `
	This endpoint fetches seismic events close to a given geographical location, defined by latitude and longitude, with an optional search radius. It retrieves earthquakes that occurred from the beginning of the year up to the current date, allowing users to filter recent events based on their proximity to a specific point of interest.`,
			query: '?latitude=40.835459&longitude=14.117358&radius=50&limit=50&page=1',
			example: '/v1/earthquakes/location?latitude=40.835459&longitude=14.117358&radius=50&limit=50&page=1',
			method: 'GET',
			moreInfo: [
				'Filter earthquakes near a specific point of interest.',
				'Returned fields: magnitude, location, depth, time, coordinates.',
				'Tip: Adjust radius for broader/narrower search.'
			]
		},
		{
			title: 'region',
			description: `
	This endpoint retrieves all seismic events that occurred within a specific Italian region from the TerraQuake API, 
	from the start of the current year up to today. It allows users to filter earthquakes by regional boundaries 
	for localized seismic analysis. The response includes key data such as magnitude, location, depth, and time.`,
			query: '?region=Campania&limit=50&page=1',
			example: '/v1/earthquakes/region?region=Campania&limit=50&page1',
			method: 'GET',
			moreInfo: [
				'Analyze seismic activity within a region for local safety planning.',
				'Returned fields: magnitude, location, depth, time.',
				'Tip: Use for regional dashboards and alerts.'
			]
		},
		{
			title: 'depth',
			description: `
	This endpoint retrieves all seismic events that occurred at a specific focal depth, measured in kilometers, 
	from the TerraQuake API, from the start of the current year up to today. 
	It allows users to analyze earthquakes based on their depth, which can help assess their potential surface impact.`,
			query: '?depth=10&limit=50&page=1',
			example: '/v1/earthquakes/depth?depth=10&limit=50&page=1',
			method: 'GET',
			moreInfo: [
				'Study earthquakes by their depth to assess surface impact.',
				'Returned fields: magnitude, location, depth, time.',
				'Tip: Shallow earthquakes often cause more surface damage.'
			]
		},
		{
			title: 'range-time',
			description: `
	This endpoint retrieves all seismic events that occurred within a specific time range, using a custom start and end date.
	It allows users to query historical earthquake data over any desired period, making it ideal for research, reports, or time-based visualizations.`,
			query: '?startdate=2025-01-01&enddate=2025-03-30&limit=50&page=1',
			example:
				'/v1/earthquakes/range-time?startdate=2025-01-01&enddate=2025-03-30&limit=50&page=1',
			method: 'GET',
			moreInfo: [
				'Query earthquakes over any custom time range for research or reporting.',
				'Returned fields: magnitude, location, depth, time.',
				'Tip: Use for time-based visualizations and analysis.'
			]
		},
		{
			title: 'magnitude',
			description: `
	This endpoint retrieves all seismic events that have a specific or greater magnitude from the TerraQuake API, 
	from the start of the current year up to today. 
	It is useful for filtering earthquakes based on their strength and analyzing seismic intensity patterns over time or across regions.`,
			query: '?mag=1&limit=50&page=1',
			example: '/v1/earthquakes/magnitude?mag=1&limit=50&page=1',
			method: 'GET',
			moreInfo: [
				'Filter and analyze earthquakes by their strength.',
				'Returned fields: magnitude, location, depth, time.',
				'Tip: Use for intensity-based studies and risk assessment.'
			]
		},
		{
			title: 'eventId',
			description: `
		This endpoint retrieves a specific seismic event by its unique event ID from the TerraQuake API.
		It allows users to access detailed information about a single earthquake event, including magnitude, location, depth, and precise timestamp.`,
			query: "?eventId=44085192",
			example: "/v1/earthquakes/eventId?eventId=44085192",
			method: "GET",
			moreInfo: [
				'Get detailed info about a specific earthquake event.',
				'Returned fields: magnitude, location, depth, timestamp, eventId.',
				'Tip: Use eventId for referencing or sharing specific events.'
			]
		},
		{
			title: 'advanced-filters',
			description: `
		This endpoint demonstrates how to use multiple filters in a single query. You can combine parameters such as magnitude, region, depth, and time range to get highly specific results. For example, you can filter for earthquakes with magnitude >= 4 OR in a specific region, or combine AND/OR logic for flexible queries.`,
			query: '?mag=4&region=Campania&depth=10&startdate=2025-01-01&enddate=2025-03-30&limit=50&page=1',
			example: '/v1/earthquakes?mag=4&region=Campania&depth=10&startdate=2025-01-01&enddate=2025-03-30&limit=50&page=1',
			method: 'GET',
			moreInfo: [
				'Combine multiple filters for advanced queries (e.g., magnitude, region, depth, time range).',
				'Returned fields: all standard earthquake data fields.',
				'Tip: Use AND/OR logic in your backend or client to process results as needed.',
				'Example: /v1/earthquakes?mag=4&region=Campania OR /v1/earthquakes?depth=10&region=Sicilia',
				'Flexible filtering helps build custom dashboards and reports.'
			]
		}
	];
						{/* Tabs */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
							{endpoints.map((ep) => (
								<button
									key={ep.title}
									onClick={() => {
										setActiveTab(ep.title);
										setResponseData(null);
									}}
									className={`py-2 px-4 rounded-full font-semibold transition-colors ${activeTab === ep.title ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white cursor-pointer" : "bg-white/10 hover:bg-pink-500 text-white cursor-pointer"}`}
									aria-label='Select endpoint for test preview'
								>
									{ep.title}
								</button>
							))}
						</div>

						{/* Content */}
				{endpoints.map((ep) =>
					activeTab === ep.title ? (
						<div key={ep.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
							<h2 className="text-md font-semibold text-purple-400 mb-2">
								<div className="flex flex-col gap-4">
									<span>
										{ep.method} {ep.title}
									</span>
									<span className="overflow-auto whitespace-pre">
										URL: {BACKEND_URL}{ep.example}
									</span>
								</div>
							</h2>
							<p className="text-gray-300 mt-4 mb-4 whitespace-pre-wrap">{ep.description}</p>

							<div className="mb-4">
								<p className="text-white font-medium mb-4">Query Parameters:</p>
								<pre className="bg-white/10 text-gray-300 rounded-md p-3 overflow-auto whitespace-pre">{ep.query}</pre>
							</div>

							<div className="mb-4">
								<p className="text-white font-medium">Example:</p>
								<pre className="bg-black/30 text-green-400 text-sm rounded-md p-4 overflow-auto whitespace-pre">
		{`fetch('${BACKEND_URL}${ep.example}')`}
								</pre>
							</div>

							<div className="mb-6 flex gap-4 items-center">
								<button onClick={() => handleTest(ep.example)} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:scale-105 transform transition duration-300 cursor-pointer"
									aria-label='Button to preview test endpoint'>
									Test this endpoint
								</button>
								<button onClick={() => handleToggleMore(ep.title)} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:scale-105 transform transition duration-300 cursor-pointer">
									{showMore[ep.title] ? 'Hide More Info' : 'More Information'}
								</button>
							</div>

							{showMore[ep.title] && (
								<div className="bg-black/20 border border-purple-700 rounded-lg p-4 mb-4">
									<h3 className="text-lg font-bold text-purple-300 mb-2">More Information</h3>
									<ul className="list-disc list-inside text-gray-200 space-y-2">
										{ep.moreInfo.map((info, idx) => (
											<li key={idx}>{info}</li>
										))}
									</ul>
								</div>
							)}

							{loading && (
								<p className="text-yellow-400 mb-4 flex items-center gap-2"><ImSpinner9 className="spinner" /> Loading...</p>
							)}

							{responseData && (
								<div className="bg-black/40 rounded-lg p-4 text-sm text-yellow-400 max-h-[400px] overflow-auto">
									<pre>{JSON.stringify(responseData, null, 2)}</pre>
								</div>
							)}
						</div>
					) : null
				)}
