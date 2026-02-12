# Kafka Microservice

A Node.js microservice demonstrating Kafka Producer and Consumer functionality with idempotency.

## Features
- **Producer Service**: Generates events and publishes them to a Kafka topic.
- **Consumer Service**: Consumes events from the Kafka topic and processes them.
- **Idempotency**: Ensures events are processed only once using an in-memory store.
- **REST API**: Endpoints to generate events and view processed events.
- **Dockerized**: Fully containerized setup with Zookeeper and Kafka.

## Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) (v18+)

## Setup & Running

1.  **Clone the repository** (if applicable) and navigate to the project directory:
    ```bash
    cd d:/gpp/week10/week10_F3/app
    ```

2.  **Start the services using Docker Compose**:
    ```bash
    docker-compose up -d --build
    ```
    This will start Zookeeper, Kafka, and the App Service.

3.  **Verify the services are running**:
    ```bash
    docker-compose ps
    ```

## API Usage

The service runs on `http://localhost:3000`.

### 1. Health Check
- **Endpoint**: `GET /health`
- **Response**: `{ "status": "UP" }`

### 2. Generate Event
- **Endpoint**: `POST /events/generate`
- **Body**:
    ```json
    {
        "eventType": "USER_ACTION",
        "payload": {
            "action": "click",
            "page": "home"
        }
    }
    ```
- **Response**: `{ "message": "Event generated successfully", "eventId": "..." }`

### 3. Get Processed Events
- **Endpoint**: `GET /events/processed`
- **Response**: List of processed events.

## Testing

### Unit Tests
To run the local unit tests (requires Node.js installed locally):
```bash
npm install
npm test
```

### End-to-End Verification
A script is provided to verify the entire flow:
```bash
node verify-e2e.js
```

## Project Structure
- `src/app.js`: Application entry point.
- `src/config/kafka.js`: Kafka client configuration.
- `src/controllers/events.js`: API request handlers.
- `src/routes/events.js`: API route definitions.
- `src/services/consumer.js`: Kafka consumer logic.
- `src/services/producer.js`: Kafka producer logic.
- `src/store/memoryStore.js`: In-memory data store.
