# Ethereum Deposit Tracker - Server

This directory contains the backend server for the Ethereum Deposit Tracker application. The server is responsible for tracking ETH deposits on the Beacon Deposit Contract, storing them in a MongoDB database, and providing an API for the frontend to access the deposit information.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequistes](#prerequisites)
    - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)

## Features

- ```Track Ethereum Deposits:``` -> Continuously monitor the latest Ethereum deposits related to the Beacon Deposit Contract.
- ```REST API:``` -> Expose a RESTful API to retrieve deposit data.
- ```JWT Authentication:``` -> Secure login functionality using JSON Web Tokens (JWT).
- ```MongoDB Integration:``` -> Store and manage deposit data using MongoDB.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- ```Node.js``` (v14 or later)
- ```MongoDB``` (for database)
- ```Docker``` (optional, for running in a containerized environment)

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/halcyon-past/luganodes-eth-deposit-tracker.git
    cd server
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Set up environment variables:
    Create a .env file in the root of the project and configure the necessary [environment variables](#environment-variables) (see Environment Variables below).

4. Run the server:
    ```
    npm start
    ```
    The server will start on the port specified in the .env file.

### Running With Docker

If you prefer to run the server using Docker, follow these steps:

1. Build the Docker Image
    ```
    docker build -t eth-deposit-tracker-server .
    ```

2. Run the Docker Container
    ```
    docker run -d -p 3000:3000 --env-file .env eth-deposit-tracker-server
    ```

## Environment Variables

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

## Endpoints

### Authentication
- POST ```/login```
    - Request: ```{ "username": "your_username" }```
    - Response: ```{ "token": "your_jwt_token" }```
    - Create a JWT Token against for Authenticated Access to the server

### Deposits
- GET ```/api/deposits```
    - Response: ```{ "deposits": [...] }```
    - Get a list of all the deposits stored in the mongoDB

- POST ```/api/deposits```
    - Request 
        ```
        {
        "blockNumber": "12345",
        "blockTimestamp": "2025-09-10T13:37:56Z",
        "fee": "0.19",
        "hash": "0x123abc...",
        "pubkey": "0xabc123..."
        }
        ```
    - Response: ```{ "deposits": [...] }```
    - Add a deposit to the database

- POST ```/api/deposits/track```
    - Response ```{"success": true,"deposits": [...]}```
    - Header ```Authorization: Bearer JWT_TOKEN```
    - Needs Authorization so the JWT got from the login should be passed in the header
    - Track all the latest blocks in the blockchain and store thenm in the database

## Technologies Used
- Node.js: JavaScript runtime for building the backend.
- Express.js: Web framework for handling routes and middleware.
- MongoDB: NoSQL database for storing Ethereum deposit data.
- Mongoose: ODM for MongoDB to manage database operations.
- Alchemy: To get the latest data about the beacon deposit contract.
- Axios: Promise-based HTTP client for making requests.
- jsonwebtoken: Library for creating and verifying JWTs.
- dotenv: Module for loading environment variables.

## Troubleshooting

- Error: secretOrPrivateKey must have a value:

    - Ensure that the ACCESS_TOKEN_SECRET is set in your environment variables.

- MongoDB Connection Errors:

    - Verify that the MONGO_URI is correct and that MongoDB is running.






