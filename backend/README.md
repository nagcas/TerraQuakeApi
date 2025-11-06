# TerraQuake API

<div align="center">

[![License](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://github.com/nagcas/TerraQuakeApi/blob/main/LICENSE.md)
[![GitHub Stars](https://img.shields.io/github/stars/nagcas/TerraQuakeApi)](https://github.com/nagcas/TerraQuakeApi/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/nagcas/TerraQuakeApi)](https://github.com/nagcas/TerraQuakeApi/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

A modern, open-source seismic data platform providing real-time earthquake information through a RESTful API and interactive visualization interface.

[Getting Started](#overview) • [Features](#project-overview) • [API Reference](#api-features) • [Use Cases](#frontend-features) • [Contributing](#contributing)


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

## API Features
## 🌍 Earthquake API — Endpoints Overview

All endpoints support **pagination**:  
- `page` *(optional, default: 1)* → Page number  
- `limit` *(optional, default: 50)* → Number of results per page  

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/v1/earthquakes/recent` | Fetches recent earthquakes from the beginning of the year to today, sorted from most recent to least recent. | `page`, `limit` |
| GET | `/v1/earthquakes/today` | Fetches all earthquakes that occurred today (00:00 UTC → now). | `page`, `limit` |
| GET | `/v1/earthquakes/last-week` | Fetches earthquakes from the last 7 days. | `page`, `limit` |
| GET | `/v1/earthquakes/month` | Fetches earthquakes for a specific month and year. | `year` *(required)*, `month` *(required)*, `page`, `limit` |
| GET | `/v1/earthquakes/location` | Fetches earthquakes near a latitude/longitude with optional search radius. | `latitude` *(required)*, `longitude` *(required)*, `radius`, `page`, `limit` |
| GET | `/v1/earthquakes/region` | Fetches earthquakes in a specific Italian region. | `region` *(required)*, `page`, `limit` |
| GET | `/v1/earthquakes/depth` | Fetches earthquakes at or below a specific depth (km). | `depth` *(required)*, `page`, `limit` |
| GET | `/v1/earthquakes/range-time` | Fetches earthquakes within a custom date range. | `startdate` *(required)*, `enddate` *(required)*, `page`, `limit` |
| GET | `/v1/earthquakes/magnitude` | Fetches earthquakes of a specific magnitude or higher. | `mag` *(required)*, `page`, `limit` |
| GET | `/v1/earthquakes/eventId` | Fetches details of a specific earthquake by its unique event ID. | `eventId` *(required)* |

---

## 📊 Statistics API — Endpoints Overview

⚠️ **Note:** These endpoints are currently **not yet available** (coming soon).

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/v1/stats/global` | Provides **global seismic statistics**, including total earthquakes, strongest event, and average magnitude. | – |
| GET | `/v1/stats/region` | Provides **regional seismic statistics** for a specific region. Useful for frequency and magnitude distribution. | `region` *(required)* |
| GET | `/v1/stats/yearly` | Provides **yearly earthquake statistics**, including total count, monthly distribution, and magnitude analysis. | `year` *(required)* |
| GET | `/v1/stats/heatmap` | Provides **geospatial earthquake data** for **heatmap visualization** (coordinates + magnitudes). | – |

---

## 🌐 Seismic Stations API — Endpoints Overview

⚠️ **Note:** These endpoints are currently **not yet available** (coming soon).

| Method | Endpoint | Description | Query / Path Parameters |
|--------|----------|-------------|------------------------|
| GET | `/v1/stations/` | Retrieves the **list of all active seismic stations** with details such as station code, location, and operational status. | – |
| GET | `/v1/stations` | Retrieves a **specific seismic station** by code. | `code` *(required)* |
| GET | `/v1/stations/geojson` | Provides **all seismic stations in GeoJSON format**, optimized for mapping applications. | – |
| GET | `/v1/stations/status/open` | Lists all **currently active (open) seismic stations**. | – |
| GET | `/v1/stations/status/closed` | Lists all **currently inactive (closed) seismic stations**. | – |
| GET | `/v1/stations/statistics` | Provides **network statistics** of seismic stations: total count, active vs inactive, distribution per network/region. | – |

---

## 🗺️ Map & GeoJSON API — Endpoints Overview

⚠️ **Note:** These endpoints are currently **not yet available** (coming soon).

| Method | Endpoint | Description | Query / Path Parameters |
|--------|----------|-------------|------------------------|
| GET | `/v1/earthquakes/markers` | Returns **map-ready coordinates of earthquakes** in GeoJSON format, including location, magnitude, and depth. Optimized for mapping libraries like **Leaflet** or **Mapbox**. | – |
| GET | `/v1/earthquakes/geojson` | Retrieves **all earthquakes** in **GeoJSON format**, enabling integration with geographic visualization tools. | – |
| GET | `/v1/earthquakes/cluster` | Provides **clustered earthquake data** for efficient rendering on maps, reducing visual clutter on large datasets. | – |

---

## 🎯 Demo & Fake Data API — Endpoints Overview

⚠️ **Note:** These endpoints are primarily for **testing and demo purposes** and are currently **not yet available in production**.

| Method | Endpoint | Description | Query / Path Parameters |
|--------|----------|-------------|------------------------|
| GET | `/v1/demo/fake-earthquake` | Simulates a seismic event for testing purposes. Useful to validate frontend UI components, charts, or maps without using real earthquake data. | – |
| GET | `/v1/demo/fake-data` | Returns a set of **example JSON data**, useful for exercises, training, or frontend testing. Provides mock earthquake-like information in a consistent structure. | – |
| DELETE | `/v1/demo/fake-data` | Deletes a specific mock data entry, identified by its unique `?id`. Useful for testing CRUD operations. | `?id` — ID of the fake dataset entry |
| GET | `/v1/demo/fake-statistics` | Returns **mock statistics data**, such as totals, averages, or distributions. Designed for testing dashboards, charts, and other visualizations. | – |

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
[Linkedin]() [Portfolio](https://portfolio-gianluca-phi.vercel.app/)

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

[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ff69b4?style=flat-square&logo=github)](https://www.paypal.com/paypalme/magcas)

Thank you for supporting open source and helping TerraQuake API reach more people! 🌍
