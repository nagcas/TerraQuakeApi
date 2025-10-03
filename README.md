# 🌋 TerraQuake API

<div align="center">

[![License](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://github.com/nagcas/TerraQuakeApi/blob/main/LICENSE.md)
[![GitHub Stars](https://img.shields.io/github/stars/nagcas/TerraQuakeApi)](https://github.com/nagcas/TerraQuakeApi/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/nagcas/TerraQuakeApi)](https://github.com/nagcas/TerraQuakeApi/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

A modern, open-source seismic data platform providing real-time earthquake information through a RESTful API and interactive visualization interface.

[Getting Started](#getting-started) • [Frontend Features](#frontend-features) • [API Reference](#api-reference) • [Support the Project](#support-the-project) • [Contributing](#contributing)

</div>

## Overview

TerraQuake is a comprehensive seismic data platform that combines a powerful REST API with an intuitive web interface. It provides researchers, developers, and organizations with easy access to real-time earthquake data, advanced filtering capabilities, and interactive visualizations.

---

## Project Overview

- **Backend (TerraQuake API)** — Node.js + Express REST API to serve earthquake data.
- **Frontend** — React + TailwindCSS interface for visualizing seismic events.
- **Data Source** — INGV (Istituto Nazionale di Geofisica e Vulcanologia) and synthetic demo data.
- **API Access** — Public endpoints for querying earthquakes by time, magnitude, location, and more.

---

## Technologies Used

### Backend

- **Node.js**
- **Express**
- **MongoDB** (planned for persistent data)
- **JWT** (for secure access, future feature)
- **Custom earthquake generator** (for demo/testing)

### Frontend

- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **React Router**
- **Hero sections, maps, charts** (via Leaflet, Chart.js – if added)

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Git

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/nagcas/TerraQuakeApi.git
   cd TerraQuakeApi
   ```
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```
4. Set up environment variables:
   - Copy `backend/.env-example` to `backend/.env` and fill in required values (e.g., database URL, API keys).
   - Copy `frontend/.env-example` to `frontend/.env` if needed.

5. Run the backend:
   ```
   cd backend
   npm run dev
   ```
6. Run the frontend (in a new terminal):
   ```
   cd frontend
   npm run dev
   ```

Visit `http://localhost:5173` for the frontend interface and `http://localhost:5001` for the API endpoints.

---

## API Reference

The TerraQuake API provides various endpoints for querying earthquake data. For detailed usage, examples, and testing, visit the [API Docs](http://localhost:3000/docs) in the running frontend.

## 🌍 Earthquake API Endpoints

All endpoints support **pagination**:  
- `page` *(optional, default: 1)* → Page number  
- `limit` *(optional, default: 50)* → Number of results per page  

| Method | Endpoint                    | Description                                    | Query Parameters                                                                 |
|--------|-----------------------------|------------------------------------------------|----------------------------------------------------------------------------------|
| GET    | `/v1/earthquakes/recent`    | Fetches recent earthquakes from the start of the year to today. | `page`, `limit` |
| GET    | `/v1/earthquakes/today`     | Fetches earthquakes that occurred today.       | `page`, `limit` |
| GET    | `/v1/earthquakes/last-week` | Fetches earthquakes from the last 7 days.      | `page`, `limit` |
| GET    | `/v1/earthquakes/month`     | Fetches earthquakes for a specific month/year. | `year` *(required)*, `month` *(required)*, `page`, `limit` |
| GET    | `/v1/earthquakes/location`  | Fetches earthquakes near a latitude/longitude. | `latitude` *(required)*, `longitude` *(required)*, `radius`, `page`, `limit` |
| GET    | `/v1/earthquakes/region`    | Fetches earthquakes in a specific Italian region. | `region` *(required)*, `page`, `limit` |
| GET    | `/v1/earthquakes/depth`     | Fetches earthquakes at or below a specific depth. | `depth` *(required)*, `page`, `limit` |
| GET    | `/v1/earthquakes/range-time`| Fetches earthquakes within a date range.       | `startdate` *(required)*, `enddate` *(required)*, `page`, `limit` |
| GET    | `/v1/earthquakes/magnitude` | Fetches earthquakes of a specific magnitude or higher. | `mag` *(required)*, `page`, `limit` |
| GET    | `/v1/earthquakes/eventId`   | Fetches details of a specific earthquake by ID. | `eventId` *(required)* |


---

### Example Request

```bash
URL "https://api.terraquakeapi.com/v1/earthquakes/recent?limit=50&page=1"
```

## Example Response

```bash
{
  "success": true,
  "code": 200,
  "status": "OK",
  "message": "Recent seismic events",
  "total": 50,
  "data": [
    {
      "type": "Feature",
      "properties": {
        "eventId": 44278572,
        "originId": 140102761,
        "time": "2025-09-26T19:33:46.440000",
        "author": "SURVEY-INGV",
        "magType": "ML",
        "mag": 1,
        "magAuthor": "--",
        "type": "earthquake",
        "place": "Costa Calabra sud-orientale (Reggio di Calabria)",
        "version": 100,
        "geojson_creationTime": "2025-09-26T20:34:27"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          16.2387,
          37.9982,
          10.5
        ]
      }
    }
  ]
}
```
## Response Fields:

| Field                  | Description                                  |
| ---------------------- | -------------------------------------------- |
| `success`              | Indicates whether the request was successful |
| `code`                 | HTTP status code                             |
| `status`               | Status message                               |
| `message`              | Summary of the response                      |
| `total`                | Total number of events returned              |
| `data`                 | Array of seismic event objects               |
| `properties.eventId`   | Unique event ID                              |
| `properties.time`      | Event timestamp (ISO 8601)                   |
| `properties.mag`       | Magnitude of the earthquake                  |
| `properties.place`     | Location description                         |
| `geometry.coordinates` | `[longitude, latitude, depth]`               |

---

## Frontend Features

- Visualize earthquakes on an interactive map
- Filter events by date
- View statistics in chart format
- Educational UI: earthquake basics and seismic zones (planned)
- Search and filter functionality

---

## Author

Dr. Gianluca Chiaravalloti
Web Developer & Geologist
[LinkedIn]() [Portfolio](https://portfolio-gianluca-phi.vercel.app/)

## Contributing

Contributions are welcome!  
If you’d like to improve TerraQuake API, please fork the repository and open a pull request.  
Whether it’s fixing a bug, improving documentation, or adding a feature — all contributions are appreciated!

Please make sure to follow the [contributing guidelines](CONTRIBUTING.md).

## Community

Join our community on [Discord](https://discord.gg/RDBp8KJB) to connect, share ideas, and collaborate with other contributors.

## Hacktoberfest 2025

This project is participating in Hacktoberfest 2025!  
Contributions count toward the event. Feel free to submit PRs and join us in building TerraQuake API together 🌍

## Credits

### Core Team

- **Dr. Gianluca Chiaravalloti** - Project Lead & Founder
  - Web Developer & Geologist
  - [Portfolio](https://portfolio-gianluca-phi.vercel.app/)

### Key Contributors

- International team of 5 collaborators contributing to:
  - Backend Development
  - Frontend Enhancements
  - Testing & Quality Assurance
  - Documentation
  - Community Support

### Data Sources & Partners

- **INGV** (Istituto Nazionale di Geofisica e Vulcanologia)
  - Primary source of seismic data
  - Technical consultation on seismological aspects

### Technologies & Resources

- **Frontend Technologies**

  - React.js Documentation & Community
  - Tailwind CSS Framework
  - Vite Build Tool
  - OpenStreetMap for geographical data

- **Backend Technologies**
  - Node.js & Express.js Communities
  - MongoDB Documentation & Support
  - JWT Authentication Resources
  - ESLint & StandardJS

### Special Thanks

- Open Source Community
- Early Adopters & Testers
- Bug Reporters & Feature Requesters
- Documentation Contributors

## Support the Project

TerraQuake API is an open-source initiative aimed at making real-time seismic data accessible for developers, researchers, and communities.

If you find this project useful and would like to support its development, consider becoming a sponsor.
Your contribution helps:

Maintain and improve the API

Add new features and documentation

Keep the project open and accessible to everyone

Even a small donation makes a big difference in keeping the project alive and growing.

[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ff69b4?style=flat-square&logo=github)](https://github.com/sponsors/nagcas)

Thank you for supporting open source and helping TerraQuake API reach more people! 🌍
