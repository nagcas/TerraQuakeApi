# 🌍 TerraQuake API Documentation

[![API Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://api.terraquakeapi.com)
[![Status](https://img.shields.io/badge/status-active-success.svg)](https://api.terraquakeapi.com/status)

The **TerraQuake API** provides programmatic access to global seismic event data. Query earthquakes by time, location, magnitude, depth, and specific event IDs. All responses are paginated and returned in JSON format.

---

## 📑 Table of Contents

1. [Getting Started](#getting-started)
   - [Base URL](#base-url)
   - [Authentication](#authentication)
   - [Rate Limits](#rate-limits)
2. [Common Parameters](#common-parameters)
3. [Response Format](#response-format)
4. [API Endpoints](#api-endpoints)
   - [Time-Based Queries](#1-time-based-queries)
   - [Location-Based Queries](#2-location-based-queries)
   - [Property-Based Queries](#3-property-based-queries)
   - [Event-Based Queries](#4-event-based-queries)
5. [Error Handling](#error-handling)
6. [Code Examples](#code-examples)
7. [Data Field Reference](#data-field-reference)

---

## Getting Started

### Base URL

All API requests should be made to:

```
https://api.terraquakeapi.com
```

### Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

> **Note**: Authentication may be required in future versions. Check back for updates.

### Rate Limits

The API implements a **fixed window rate limiting** strategy to ensure fair usage:

- **Limit**: 100 requests per second per IP address
- **Window**: 1 second (1000ms)
- **Strategy**: Fixed window counter that resets after each time window

**How it works:**
- Each IP address gets a fresh request counter at the start of each 1-second window
- Once you exceed 100 requests in a single second, further requests are blocked until the window resets
- The counter automatically resets at the start of the next second

#### Rate Limit Headers

Every API response includes these headers to help you manage your request rate:

| Header | Description | Example |
|--------|-------------|---------|
| `X-RateLimit-Limit` | Maximum requests allowed per window | `100` |
| `X-RateLimit-Remaining` | Requests remaining in current window | `45` |
| `X-RateLimit-Reset` | Unix timestamp (seconds) when the limit resets | `1696348801` |
| `Retry-After` | Seconds to wait before retrying (only on 429 errors) | `1` |

#### Best Practices

To avoid hitting rate limits:

1. **Implement client-side caching** - Cache responses locally to reduce repeated requests
2. **Use pagination wisely** - Request only the data you need with appropriate `limit` values
3. **Space out requests** - Avoid sending bursts of requests in rapid succession
4. **Monitor headers** - Check `X-RateLimit-Remaining` to know how many requests you have left
5. **Handle 429 errors** - Respect the `Retry-After` header and wait before retrying

---

## Common Parameters

These parameters are available across most endpoints:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number for pagination (starts at 1) |
| `limit` | integer | `50` | Number of results per page (max: 1000) |

**Example usage:**
```
?page=2&limit=100
```

[↑ Back to top](#-table-of-contents)

---

## Response Format

All API responses follow this standard JSON structure:

```json
{
  "success": true,
  "code": 200,
  "status": "OK",
  "message": "Human-readable description",
  "total": 150,
  "page": 1,
  "limit": 50,
  "data": [...]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` if request succeeded, `false` otherwise |
| `code` | integer | HTTP status code (200, 400, 404, 500, etc.) |
| `status` | string | HTTP status message (OK, Bad Request, etc.) |
| `message` | string | Human-readable description of the response |
| `total` | integer | Total number of results matching the query |
| `page` | integer | Current page number (if paginated) |
| `limit` | integer | Results per page (if paginated) |
| `data` | array | Array of earthquake event objects (see [Data Field Reference](#data-field-reference)) |

[↑ Back to top](#-table-of-contents)

---

## API Endpoints

### 1.Time-Based Queries

Retrieve earthquakes based on temporal filters.

#### Get Recent Earthquakes

Fetches earthquakes from January 1st of the current year up to today.

- **Endpoint**: `GET /v1/earthquakes/recent`
- **Parameters**: [Common parameters](#common-parameters)
- **Use case**: Monitor all seismic activity for the current year

**Example Request:**
```bash
curl "https://api.terraquakeapi.com/v1/earthquakes/recent?limit=100&page=1"
```

**Example Response:**
```json
{
  "success": true,
  "code": 200,
  "status": "OK",
  "message": "Recent seismic events from 2025",
  "total": 3456,
  "page": 1,
  "limit": 100,
  "data": [...]
}
```

---

#### Get Today's Earthquakes

Fetches all earthquakes that occurred on the current calendar day (UTC timezone).

- **Endpoint**: `GET /v1/earthquakes/today`
- **Parameters**: [Common parameters](#common-parameters)
- **Use case**: Daily monitoring and real-time alerts

**Example Request:**
```bash
curl "https://api.terraquakeapi.com/v1/earthquakes/today"
```

---

#### Get Last Week's Earthquakes

Fetches earthquakes from the last 7 days (including today).

- **Endpoint**: `GET /v1/earthquakes/last-week`
- **Parameters**: [Common parameters](#common-parameters)
- **Use case**: Weekly summaries and trend analysis

**Example Request:**
```bash
curl "https://api.terraquakeapi.com/v1/earthquakes/last-week?limit=200"
```

---

#### Get Earthquakes by Month

Fetches all earthquakes that occurred during a specific month and year.

- **Endpoint**: `GET /v1/earthquakes/month`
- **Required Parameters**:
  - `year` (integer): 4-digit year (e.g., `2025`)
  - `month` (integer): Month number from 1–12 (1 = January, 12 = December)
- **Optional Parameters**: [Common parameters](#common-parameters)
- **Use case**: Historical analysis and monthly reports

**Example Request:**
```bash
curl "https://api.terraquakeapi.com/v1/earthquakes/month?year=2025&month=9&page=1&limit=50"
```

**Validation:**
- `year`: Must be a valid 4-digit year
- `month`: Must be between 1 and 12
- Returns 400 error if parameters are invalid

---

#### Get Earthquakes by Date Range

Fetches earthquakes within a custom date range (inclusive).

- **Endpoint**: `GET /v1/earthquakes/range-time`
- **Required Parameters**:
  - `startdate` (string): Start date in `YYYY-MM-DD` format
  - `enddate` (string): End date in `YYYY-MM-DD` format
- **Optional Parameters**: [Common parameters](#common-parameters)
- **Use case**: Custom reports and specific incident investigations

**Example Request:**
```bash
curl "https://api.terraquakeapi.com/v1/earthquakes/range-time?startdate=2025-09-01&enddate=2025-09-30"
```

**Important Notes:**
- Maximum date range: 365 days
- `enddate` must be equal to or after `startdate`
- Dates are interpreted in UTC timezone
- Returns 400 error if date format is invalid or range exceeds limit

[↑ Back to Time-Based Queries](#1--time-based-queries) | [↑ Back to top](#-table-of-contents)

---

### 2. Location-Based Queries

Retrieve earthquakes using geographic filters.

#### Get Earthquakes Near Coordinates

Fetches earthquakes within a specified radius of given coordinates.

- **Endpoint**: `GET /v1/earthquakes/location`
- **Required Parameters**:
  - `latitude` (float): Latitude in decimal degrees (-90 to 90)
  - `longitude` (float): Longitude in decimal degrees (-180 to 180)
- **Optional Parameters**:
  - `radius` (float): Search radius in kilometers (default: `100` km, max: `20000` km)
  - [Common parameters](#common-parameters)
- **Use case**: Find earthquakes near a specific city, landmark, or point of interest

**Example Request:**
```bash
# Earthquakes within 500km of Tokyo
curl "https://api.terraquakeapi.com/v1/earthquakes/location?latitude=35.6762&longitude=139.6503&radius=500"
```

**Calculation Method:**
- Uses great-circle distance (Haversine formula)
- Results ordered by distance (nearest first)

---

#### Get Earthquakes by Region

Fetches earthquakes within a specific Italian administrative region.

- **Endpoint**: `GET /v1/earthquakes/region`
- **Required Parameters**:
  - `region` (string): Italian region name (see [supported regions](#supported-italian-regions))
- **Optional Parameters**: [Common parameters](#common-parameters)
- **Use case**: Regional monitoring for Italian seismic zones

**Example Request:**
```bash
curl "https://api.terraquakeapi.com/v1/earthquakes/region?region=Calabria"
```

##### Supported Italian Regions

- Abruzzo, Basilicata, Calabria, Campania, Emilia-Romagna
- Friuli-Venezia Giulia, Lazio, Liguria, Lombardia, Marche
- Molise, Piemonte, Puglia, Sardegna, Sicilia
- Toscana, Trentino-Alto Adige, Umbria, Valle d'Aosta, Veneto

**Note:** Region names are case-insensitive. Hyphens and spaces should be preserved.

[↑ Back to Location-Based Queries](#2--location-based-queries) | [↑ Back to top](#-table-of-contents)

---

### 3.Property-Based Queries

Retrieve earthquakes filtered by physical characteristics.

#### Get Earthquakes by Depth

Fetches earthquakes at or below a specified depth threshold.

- **Endpoint**: `GET /v1/earthquakes/depth`
- **Required Parameters**:
  - `depth` (float): Maximum depth in kilometers (must be positive)
- **Optional Parameters**: [Common parameters](#common-parameters)
- **Use case**: Study shallow vs deep earthquakes, analyze crustal vs subduction zone events

**Example Request:**
```bash
# Shallow earthquakes (≤10km deep)
curl "https://api.terraquakeapi.com/v1/earthquakes/depth?depth=10"
```

**Depth Classification:**
- Shallow: 0–70 km
- Intermediate: 70–300 km
- Deep: 300–700 km

---

#### Get Earthquakes by Magnitude

Fetches earthquakes with magnitude equal to or greater than the specified value.

- **Endpoint**: `GET /v1/earthquakes/magnitude`
- **Required Parameters**:
  - `mag` (float): Minimum magnitude threshold (typically 0.0–10.0)
- **Optional Parameters**: [Common parameters](#common-parameters)
- **Use case**: Filter for significant earthquakes, analyze major seismic events

**Example Request:**
```bash
# Major earthquakes (magnitude 5.0+)
curl "https://api.terraquakeapi.com/v1/earthquakes/magnitude?mag=5.0&limit=100"
```

**Magnitude Reference:**
- **Micro**: < 2.0 (not usually felt)
- **Minor**: 2.0–3.9 (often felt, rarely causes damage)
- **Light**: 4.0–4.9 (noticeable shaking, minor damage)
- **Moderate**: 5.0–5.9 (can cause damage to buildings)
- **Strong**: 6.0–6.9 (destructive in populated areas)
- **Major**: 7.0–7.9 (serious damage over large areas)
- **Great**: 8.0+ (can cause catastrophic damage)

[↑ Back to Property-Based Queries](#3--property-based-queries) | [↑ Back to top](#-table-of-contents)

---

### 4. Event-Based Queries

Retrieve detailed information about specific earthquakes.

#### Get Earthquake by Event ID

Fetches complete details for a single earthquake using its unique identifier.

- **Endpoint**: `GET /v1/earthquakes/eventId`
- **Required Parameters**:
  - `eventId` (integer): Unique earthquake event identifier
- **Use case**: Retrieve full details for a specific event, deep-dive analysis

**Example Request:**
```bash
curl "https://api.terraquakeapi.com/v1/earthquakes/eventId?eventId=44278572"
```

**Example Response:**
```json
{
  "success": true,
  "code": 200,
  "status": "OK",
  "message": "Event details retrieved",
  "total": 1,
  "data": [
    {
      "type": "Feature",
      "properties": {
        "eventId": 44278572,
        "originId": 140102761,
        "time": "2025-09-26T19:33:46.440000",
        "author": "SURVEY-INGV",
        "magType": "ML",
        "mag": 1.0,
        "place": "Costa Calabra sud-orientale (Reggio di Calabria)",
        "lastUpdate": "2025-09-26T19:35:12.000000"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [16.2387, 37.9982, 10.5]
      }
    }
  ]
}
```

**Note:** Returns 404 error if `eventId` does not exist.

[↑ Back to Event-Based Queries](#4--event-based-queries) | [↑ Back to top](#-table-of-contents)

---

## Error Handling

The API uses standard HTTP status codes and returns error details in JSON format.

### HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request succeeded |
| 400 | Bad Request | Invalid parameters or malformed request |
| 404 | Not Found | Resource or event not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error occurred |
| 503 | Service Unavailable | API temporarily unavailable |

### Error Response Format

```json
{
  "success": false,
  "code": 400,
  "status": "Bad Request",
  "message": "Invalid date format. Expected YYYY-MM-DD",
  "errors": [
    {
      "field": "startdate",
      "message": "Date must be in YYYY-MM-DD format"
    }
  ]
}
```

### Common Errors

**Invalid Date Format**
```json
{
  "success": false,
  "code": 400,
  "message": "Invalid date format. Expected YYYY-MM-DD"
}
```

**Missing Required Parameter**
```json
{
  "success": false,
  "code": 400,
  "message": "Missing required parameter: eventId"
}
```

**Event Not Found**
```json
{
  "success": false,
  "code": 404,
  "message": "Event with ID 99999999 not found"
}
```

**Rate Limit Exceeded**
```json
{
  "success": false,
  "code": 429,
  "message": "Rate limit exceeded. Try again in 60 seconds"
}
```

[↑ Back to top](#-table-of-contents)

---

## Code Examples

### JavaScript (Fetch API)

```javascript
// Get recent earthquakes
async function getRecentEarthquakes() {
  const response = await fetch(
    'https://api.terraquakeapi.com/v1/earthquakes/recent?limit=10'
  );
  const data = await response.json();
  
  if (data.success) {
    console.log(`Found ${data.total} earthquakes`);
    data.data.forEach(quake => {
      console.log(`${quake.properties.mag} - ${quake.properties.place}`);
    });
  }
}
```

### Python (requests)

```python
import requests

# Get earthquakes above magnitude 5.0
url = "https://api.terraquakeapi.com/v1/earthquakes/magnitude"
params = {"mag": 5.0, "limit": 50}

response = requests.get(url, params=params)
data = response.json()

if data['success']:
    print(f"Found {data['total']} major earthquakes")
    for quake in data['data']:
        props = quake['properties']
        print(f"{props['mag']} - {props['place']} - {props['time']}")
```

### cURL

```bash
# Get earthquakes near coordinates
curl -X GET "https://api.terraquakeapi.com/v1/earthquakes/location?\
latitude=35.6762&\
longitude=139.6503&\
radius=500&\
limit=20"
```

### Node.js (axios)

```javascript
const axios = require('axios');

// Get earthquakes by date range
async function getEarthquakesByDateRange(startDate, endDate) {
  try {
    const response = await axios.get(
      'https://api.terraquakeapi.com/v1/earthquakes/range-time',
      {
        params: {
          startdate: startDate,
          enddate: endDate,
          limit: 100
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response.data);
  }
}

getEarthquakesByDateRange('2025-09-01', '2025-09-30');
```

[↑ Back to top](#-table-of-contents)

---

## Data Field Reference

### Earthquake Event Object

Each earthquake in the `data` array follows the GeoJSON Feature format:

```json
{
  "type": "Feature",
  "properties": { ... },
  "geometry": { ... }
}
```

### Properties Object

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `eventId` | integer | Unique event identifier | `44278572` |
| `originId` | integer | Origin/source identifier | `140102761` |
| `time` | string | Event timestamp (ISO 8601 format, UTC) | `"2025-09-26T19:33:46.440000"` |
| `author` | string | Reporting agency/organization | `"SURVEY-INGV"` |
| `magType` | string | Magnitude scale type (ML, Mw, Mb, etc.) | `"ML"` |
| `mag` | float | Earthquake magnitude | `5.4` |
| `place` | string | Human-readable location description | `"Costa Calabra sud-orientale"` |
| `lastUpdate` | string | Last modification timestamp (ISO 8601) | `"2025-09-26T19:35:12.000000"` |

### Magnitude Types

- **ML** (Local Magnitude): Richter scale, best for nearby earthquakes
- **Mw** (Moment Magnitude): Most accurate for large earthquakes
- **Mb** (Body Wave Magnitude): Based on body waves
- **Ms** (Surface Wave Magnitude): Based on surface waves

### Geometry Object

GeoJSON Point geometry with 3D coordinates:

```json
{
  "type": "Point",
  "coordinates": [longitude, latitude, depth]
}
```

| Index | Field | Type | Description | Range |
|-------|-------|------|-------------|-------|
| 0 | Longitude | float | East-west position | -180 to 180 |
| 1 | Latitude | float | North-south position | -90 to 90 |
| 2 | Depth | float | Depth below surface (km) | 0 to 700+ |

**Example:**
```json
"coordinates": [16.2387, 37.9982, 10.5]
```
- Longitude: 16.2387° E
- Latitude: 37.9982° N
- Depth: 10.5 km below surface

[↑ Back to top](#-table-of-contents)

---

## Support & Feedback

- **Issues & Bugs**: [GitHub Issues](https://github.com/nagcas/TerraQuakeApi/issues)
- **Feature Requests**: [Submit here](https://github.com/nagcas/TerraQuakeApi/discussions)
- **Dr. Gianluca Chiaravalloti** - Project Lead & Founder
  - Web Developer & Geologist
  - [Portfolio](https://portfolio-gianluca-phi.vercel.app/)

---


**Last Updated**: October 2025 | **API Version**: 1.0

[↑ Back to top](#-table-of-contents)
