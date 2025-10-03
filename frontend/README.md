# 🌋 TerraQuake API

<div align="center">

[![License](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://github.com/nagcas/TerraQuakeApi/blob/main/LICENSE.md)
[![GitHub Stars](https://img.shields.io/github/stars/nagcas/TerraQuakeApi)](https://github.com/nagcas/TerraQuakeApi/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/nagcas/TerraQuakeApi)](https://github.com/nagcas/TerraQuakeApi/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/nagcas/TerraQuakeApi/blob/main/CONTRIBUTING.md)

A developer-friendly REST API for exploring seismic events across Italy and beyond. Built with Express.js and MongoDB, this API provides structured access to real-time earthquake data, making it perfect for researchers, developers, and applications focused on seismic monitoring and analysis.

 [Features](#features) • [Installation](#installation) • [API Reference](#api) • [Technologies](#technologies) • [Contributing](#contributing)

</div>

## Features & Tech Stack

### Core Features

- Real-time earthquake data access with filtering capabilities
- Advanced query parameters for time ranges, locations, and magnitudes
- Comprehensive statistics and aggregated data endpoints
- Demo data generation for testing and development
- User authentication and authorization (JWT)
- Secure password handling and reset functionality
- Cross-origin resource sharing (CORS) support
### Tech Stack

- **React 19** – Modern frontend library for building UI components.
- **Vite** – Next-gen frontend tooling for fast development and builds.
- **Tailwind CSS 4** – Utility-first CSS framework for styling.
- **ESLint** – Linting and code quality enforcement.

---

## Installation

1. **Clone the repo**:

```bash
git clone https://github.com/nagcas/TerraQuakeApi.git
cd frontend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start development server:**

```bash
npm run dev
```

4. **Build for production:**

```bash
npm run build
```

5. **Preview production build:**

```bash
npm run preview
```

## Project Structure

```bash
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── index.html
```

## Linting

To check code quality:

```bash
npm run lint
```

## API

This frontend consumes data from the TerraQuake API. Make sure the backend is running and accessible before launching the frontend.

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

### Technologies

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