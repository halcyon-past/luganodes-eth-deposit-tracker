# ETH-DEPOSIT-TRACKER

- ARITRO SAHA (21BLC1174)

## Introduction

This is a ETH Deposit Tracker for the Beacon Deposit Contract and is built as a part of SDE Internship Task at luganodes.
Ethereum Deposit Tracker is a full-stack web application designed to monitor and display Ethereum deposits on the Beacon Deposit Contract. The project is divided into two main components: a backend server that tracks Ethereum deposits and stores them in a database, and a frontend web interface that allows users to view and interact with the deposit data.

## Screenshots

![Login](/assets/login.png)
![Table](/assets/Table.png)

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)

## Features
- ```Ethereum Deposit Monitoring:``` Tracks and stores the latest Ethereum deposits related to the Beacon Deposit Contract.
- ```User Authentication:``` Secure login system using JWTs.
- ```Responsive Web Interface:``` Displays deposit data in a user-friendly table format, with features like copy-to-clipboard.
- ```API Integration:``` Fetches deposit data from the Ethereum blockchain using Alchemy's API.
- ```Database Storage:``` Stores deposit data in a MongoDB database for persistent storage.
- ```Docker Support:``` Containerized environment using Docker Compose for easy setup and deployment.

## Project Structure

- ```server/:``` Contains the Node.js server code, which handles API requests, user authentication, and interaction with the Ethereum blockchain.
- ```client/:``` Contains the React.js + Vite code, which handles the user interface and interacts with the backend API.

```
Directory Structure:
└── eth-deposit-tracker
    |
    ├── README.md
    ├── client
    │   ├── .env
    │   ├── .gitignore
    │   ├── Dockerfile
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package.json
    │   ├── public
    │   │   ├── background.jpeg
    │   │   └── vite.svg
    │   ├── src
    │   │   ├── App.jsx
    │   │   ├── components
    │   │   │   ├── DepositTable.jsx
    │   │   │   ├── LogoutButton.jsx
    │   │   │   └── TrackDepositButton.jsx
    │   │   ├── index.css
    │   │   ├── main.jsx
    │   │   └── pages
    │   │       └── LoginPage.jsx
    │   └── vite.config.js
    ├── docker-compose.yml
    └── server
        |
        ├── .env
        ├── .gitignore
        ├── Dockerfile
        ├── config
        │   └── db.js
        ├── controllers
        │   ├── authController.js
        │   └── depositController.js
        ├── models
        │   └── Deposit.js
        ├── package.json
        ├── routes
        │   └── depositRoutes.js
        ├── server.js
        └── utils
            ├── authMiddleware.js
            └── logger.js
```

## Getting Started

### Prerequisites
Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- Docker (optional, for running the application in a containerized environment)

## Installation

1. Clone the repository
    ```
    git clone https://github.com/halcyon-past/luganodes-eth-deposit-tracker.git
    cd luganodes-eth-deposit-tracker
    ```
2. Install Dependencies
    ```
    cd server
    npm install
    cd ../client
    npm install

    ```
3. Set up environment variables:
    Configure the necessary environment variables for both the frontend and backend (see [Environment Variables]() below).

## Environment Variables

### Backend

The server relies on the following environment variables:

- ```MONGO_URI:``` Connection string for MongoDB.
- ```ALCHEMY_API_KEY:``` API key for accessing Ethereum node services via Alchemy.
- ```ACCESS_TOKEN_SECRET:``` Secret key for signing JWT tokens.
- ```PORT:``` Port on which the server will run.

Example .env file:

```
MONGO_URI=mongodb://localhost:27017/eth_deposits
ALCHEMY_API_KEY=your_alchemy_api_key
ACCESS_TOKEN_SECRET=your_jwt_secret
PORT=3000
```

### Frontend

The frontend relies on the following environment variables:

- ```VITE_API_URL:``` The base URL of the backend server's API.

Example .env file:
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application
### Running with Docker
To run the entire application using Docker, ensure you have Docker and Docker Compose installed, then use the following command from the root directory:
```
docker-compose up --build
```
This will start the backend server and frontend application in a containerized environment.

### Running Locally
Backend
1. Navigate to the backend directory:
    ```
    cd server
    ```
2. Start the Backend Server:
    ```
    npm start
    ```
    The server will be available at http://localhost:5000.

Frontend
1. Navigate to the frontend directory:
    ```
    cd client
    ```
2. Start the Frontend Server:
    ```
    npm run dev
    ```
    The application will be available at http://localhost:3000.

## Technologies Used


