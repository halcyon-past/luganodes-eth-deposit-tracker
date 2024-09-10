# Ethereum Deposit Tracker - Frontend

This directory contains the frontend application for the Ethereum Deposit Tracker. The frontend is a web interface that allows users to view and interact with Ethereum deposit data retrieved from the backend server.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)

## Features

- ```User Authentication:``` Secure login functionality using JWTs.
- ```View Ethereum Deposits:``` Display a table of the latest Ethereum deposits related to the Beacon Deposit Contract.
- ```Copy to Clipboard:``` Allow users to copy long deposit values with a single click.
- ```Responsive Design:``` Optimized for both desktop and mobile viewing.
- ```Minimalistic UI:``` Clean and user-friendly interface.

## Getting Started

### Prerequisites
Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- ```Docker``` (optional, for running in a containerized environment)

### Installation
1. Clone the repository
    ```
    git clone https://github.com/halcyon-past/luganodes-eth-deposit-tracker.git
    cd luganodes-eth-deposit-tracker/client
    ```
2. Install Dependencies
    ```
    npm install
    ```
3. Set up environment variables:
    Create a .env file in the root of the project and configure the necessary [environment variables](#environment-variables) (see Environment Variables below).

4. Run the server:
    ```
    npm run dev
    ```
    The application will be available at ```http://localhost:5173/```

### Running With Docker

If you prefer to run the server using Docker, follow these steps:

1. Build the Docker Image
    ```
    docker build -t eth-deposit-tracker-frontend .
    ```

2. Run the Docker Container
    ```
    docker run -d -p 5173:5173 --env-file .env eth-deposit-tracker-frontend
    ```

## Environment Variables
The frontend relies on the following environment variables:

- ```VITE_API_URL:``` The base URL of the backend server's API.

Example .env file:
```
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

In the project directory, you can run:

- npm run start: Runs the app in development mode. Open http://localhost:5173 to view it in the browser.
- npm run build: Builds the app for production to the build folder.

## Technologies Used
- React.js: Frontend library for building user interfaces.
- Vite: For Build and Deployment.
- Axios: Promise-based HTTP client for making API requests.
- React Router: Library for routing within the application.

