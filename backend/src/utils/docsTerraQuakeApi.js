export const docsTerraQuakeApi = {
  meta: {
    name: 'TerraQuake API',
    version: 'v1',
    license: 'MIT',
    openSource: true
  },

  description: {
    tagline:
      'A modern, open-source seismic data platform providing real-time earthquake information through a RESTful API and interactive visualization interface.',
    overview:
      'TerraQuake is a comprehensive seismic data platform that combines a powerful REST API with an intuitive web interface. It provides developers, researchers, and organizations with easy access to real-time earthquake data, advanced filtering capabilities, and interactive visualizations.'
  },

  navigation: [
    'Getting Started',
    'Frontend Features',
    'API Reference',
    'Support the Project',
    'Contributing'
  ],

  projectOverview: {
    backend:
      'Node.js + Express REST API designed to serve real-time and historical earthquake data.',
    frontend:
      'React + TailwindCSS web interface for visualizing seismic events.',
    dataSource: [
      'INGV (Istituto Nazionale di Geofisica e Vulcanologia)',
      'Synthetic demo data'
    ],
    apiAccess:
      'Public REST endpoints for querying earthquakes by time, magnitude, depth, region, and location.'
  },

  technologies: {
    backend: [
      'Node.js',
      'Express',
      'MongoDB (planned)',
      'JWT (planned)',
      'Custom earthquake generator (demo/testing)'
    ],
    frontend: [
      'React 19',
      'Vite',
      'Tailwind CSS 4',
      'React Router',
      'OpenStreetMap (maps)',
      'Chart.js (charts)'
    ]
  },

  gettingStarted: {
    prerequisites: [
      'Node.js v18+',
      'Git'
    ],
    installation: [
      'git clone https://github.com/nagcas/TerraQuakeApi.git',
      'cd TerraQuakeApi',
      'cd backend && npm install',
      'cd ../frontend && npm install'
    ],
    environment: [
      'Copy backend/.env-example to backend/.env',
      'Copy frontend/.env-example to frontend/.env (if needed)'
    ],
    run: {
      backend: 'npm run dev (port 5001)',
      frontend: 'npm run dev (port 5173)'
    }
  },

  pagination: {
    page: {
      optional: true,
      default: 1,
      description: 'Page number'
    },
    limit: {
      optional: true,
      default: 50,
      description: 'Number of results per page'
    }
  },

  apiReference: {
    earthquakes: [
      {
        method: 'GET',
        path: '/v1/earthquakes/recent',
        description:
          'Fetches recent earthquakes from the start of the year to today.',
        query: ['page', 'limit']
      },
      {
        method: 'GET',
        path: '/v1/earthquakes/today',
        description:
          'Fetches earthquakes that occurred today.',
        query: ['page', 'limit']
      },
      {
        method: 'GET',
        path: '/v1/earthquakes/last-week',
        description:
          'Fetches earthquakes from the last 7 days.',
        query: ['page', 'limit']
      },
      {
        method: 'GET',
        path: '/v1/earthquakes/month',
        description:
          'Fetches earthquakes for a specific month and year.',
        query: ['year', 'month', 'page', 'limit']
      },
      {
        method: 'GET',
        path: '/v1/earthquakes/location',
        description:
          'Fetches earthquakes near a latitude/longitude.',
        query: ['latitude', 'longitude', 'radius', 'page', 'limit']
      },
      {
        method: 'GET',
        path: '/v1/earthquakes/region',
        description:
          'Fetches earthquakes in a specific Italian region.',
        query: ['region', 'page', 'limit']
      },
      {
        method: 'GET',
        path: '/v1/earthquakes/depth',
        description:
          'Fetches earthquakes at or below a specific depth.',
        query: ['depth', 'page', 'limit']
      },
      {
        method: 'GET',
        path: '/v1/earthquakes/range-time',
        description:
          'Fetches earthquakes within a date range.',
        query: ['startdate', 'enddate', 'page', 'limit']
      },
      {
        method: 'GET',
        path: '/v1/earthquakes/magnitude',
        description:
          'Fetches earthquakes of a specific magnitude or higher.',
        query: ['mag', 'page', 'limit']
      },
      {
        method: 'GET',
        path: '/v1/earthquakes/eventId',
        description:
          'Fetches details of a specific earthquake by ID.',
        query: ['eventId']
      }
    ],

    stations: {
      status: 'available',
      endpoints: [
        '/v1/stations',
        '/v1/stations/code',
        '/v1/stations/geojson',
        '/v1/stations/status/open',
        '/v1/stations/status/closed',
        '/v1/stations/statistics'
      ]
    }
  },

  frontendFeatures: [
    'Interactive earthquake map',
    'Date and magnitude filtering',
    'Statistics and charts',
    'Educational seismic content (planned)',
    'Search and advanced filters'
  ],

  author: {
    name: 'Dr. Gianluca Chiaravalloti',
    role: 'Web Developer & Geologist',
    linkedin: 'https://www.linkedin.com/in/gianluca-chiaravalloti-5694081a2/',
    portfolio: 'https://portfolio-gianluca-phi.vercel.app/',
    github: 'https://github.com/nagcas'
  },

  contributing: {
    message:
      'Contributions are welcome. Fork the repository and open a pull request.',
    prWelcome: true
  },

  community: {
    discord:
      'Join our Discord community to collaborate, share ideas, and discuss seismic data.'
  }
}
