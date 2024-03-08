# Tipsy Tourist Lambda

## Introduction

Welcome to the `tipsy-tourist-lambda` project! This repository houses the serverless backend for the Tipsy Tourist project, a comprehensive solution designed to enhance the travel experience for tourists around the globe. Utilising AWS Lambda and Node.js, our application offers a scalable, efficient, and cost-effective backend, ensuring a seamless experience for our users.

## Project Structure

Our project is structured into two main directories, each playing a crucial role in the functionality of the Tipsy Tourist Lambda service:

- `lib/`: Contains core functionality with JavaScript files for attractions (`attractions.js`), geocoding (`geocode.js`), location handling (`locations.js`), and place details retrieval (`placeDetails.js`).
- `routes/`: Hosts route handler files for interfacing with our API endpoints. This includes `attractionsRoute.js`, `geocodeRoute.js`, `getDetailsRoute.js`, and `placesRoute.js`. 

Additionally, the `serverless.yml` file defines the AWS Lambda configuration, detailing our service structure, provider settings, environment variables, and the HTTP API events that trigger our Lambda functions.

## Service Details

- **Service Name**: `tipsy-tourist-lambda`
- **Framework Version**: `3`

### Provider Configuration

- **Name**: AWS
- **Runtime**: Node.js 18.x
- **Stage**: Production (`prod`)
- **Region**: eu-west-2 (London)
- **Environment Variables**: Uses `GOOGLE_MAPS_API_KEY` from environment settings
- **HTTP API**: Configured with CORS enabled

### Lambda Functions

Our service comprises five Lambda functions, each designed to handle specific aspects of the Tipsy Tourist application:

1. **Test Endpoint** (`/test`): A GET request handler for basic service testing.
   - Handler: `index.handler`

2. **Places** (`/places`): Handles POST requests to retrieve place information.
   - Handler: `routes/placesRoute.places`

3. **Attractions** (`/attractions`): Processes POST requests for fetching attractions data.
   - Handler: `routes/attractionsRoute.attractions`

4. **Get Details** (`/get-details`): Manages POST requests to obtain detailed information about a place.
   - Handler: `routes/getDetailsRoute.getDetails`

5. **Geocode** (`/geocode`): Deals with POST requests for geocoding services.
   - Handler: `routes/geocodeRoute.geocode`

## Setup and Deployment

### Prerequisites

- AWS CLI installed and configured with appropriate access rights.
- Node.js (version 18.x or later) installed.
- Serverless Framework (version 3) installed globally.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/HOOLAHAN/tipsy-tourist.git
   ```
2. Navigate to the `tipsy-tourist-lambda` directory:
   ```
   cd tipsy-tourist/tipsy-tourist-lambda
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Configuration

Ensure you have the `GOOGLE_MAPS_API_KEY` set up in your environment variables or in the AWS Lambda console under the Environment Variables section for your Lambda functions.

### Deployment

Deploy your service using the Serverless Framework:
```
serverless deploy --stage prod
```

This command deploys your application to the AWS cloud under the `prod` stage, making your Lambda functions available via the specified HTTP API endpoints.

## Usage

After deployment, your Lambda functions can be invoked via the corresponding HTTP API endpoints:

- Test: `GET /test`
- Places: `POST /places`
- Attractions: `POST /attractions`
- Get Details: `POST /get-details`
- Geocode: `POST /geocode`

Refer to the project documentation for details on the request format and expected responses for each endpoint.