# Backend for ClassConnect Application

## Description

A simple backend to fetch the details of crypto transactions of a user

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Getiing Started](#getting-started)
    - [Cloning](#cloning)
    - [Configuration](#configuration)
    - [Starting the Project](#starting-the-project)
    - [Usage](#usage)


## Technologies Used

- Node.js: As the Runtime for the Project
- Express.js: Frameword to create web-applications
- MongoDB: As a NoSQL Database
- Docker: For Containerizing the application



## Getting Started

### Prerequisites

- Node.js installed
- Docker installed (if want to start through docker image)
- MongoDB database


### Cloning

Clone the Repository

```bash
git clone https://github.com/Deval1807/Crypto-Transactions.git
cd Crypto-Transactions
```


### Configuration

Ensure you have the following environment variables set up in your `.env` file:

```plaintext
PORT=<your-port>
MONGO_URI=<your-URI>
ETHERSCAN_API_TOKEN=<your-api-token>
ETHERSCAN_NORMAL_TRANSACTIONS_URL=https://api.etherscan.io/api
ETH_PRICE_URL=https://api.coingecko.com/api/v3/simple/price
```


### Starting the Project

- You can get started with the project in 2 ways. By simply starting the proj by installing dependencies and by Docker image.

1. Through Docker:

    - Make sure you have your Docker service running
    - Make sure you have set up the `.env` files (see [Configuration](#configuration))
    - Build the image
        ```
        docker-compose build
        ```
    - Run the image
        ```
        docker-compose up
        ```

2. Simple installation: 

    - Install the dependencies:
        ```bash
        npm install
        ```
    - Make sure you have set up the `.env` files (see [Configuration](#configuration))
    - Starting the Service
        - Development Mode
            ```bash
            npm run dev
            ```
        - Production
            - First build the project
            ```bash
            npm run build
            ```
            - Start the server
            ```bash
            npm start
            ```


### Usage

Once the server is running, you can access the API endpoints using a tool like Postman or via your frontend application. 