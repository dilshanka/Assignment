<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

IoT Telemetry Ingestor

A minimal NestJS application for ingesting, caching, and analyzing IoT telemetry data. This project accepts JSON readings, stores them in MongoDB Atlas, caches the latest reading in Redis, and triggers a webhook alert if thresholds are exceeded.

📋 Features

Ingest API: Validates and stores telemetry data (Temperature/Humidity).

Real-time Alerts: Triggers a webhook alert if temperature > 50 or humidity > 90.

Caching Strategy: Uses Redis to cache the "latest" device state for instant retrieval.

Analytics: Uses MongoDB Aggregation Pipeline for site summaries (min, max, avg, unique devices).

🚀 Setup & Installation

1. Prerequisites

Node.js (v18 or later)

npm (Node Package Manager)

2. Install Dependencies

npm install


3. Environment Configuration

Create a .env file in the root directory. You can copy the structure from .env.example:

cp .env.example .env


Required Variables:

# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/iot_db?retryWrites=true&w=majority

# Redis Connection (Local or Cloud)
# Example: redis://default:<password>@<endpoint>:<port>
REDIS_URL=redis://localhost:6379

# Webhook for Alerts
# Generate a unique URL at [https://webhook.site/](https://webhook.site/)
ALERT_WEBHOOK_URL=[https://webhook.site/YOUR-UNIQUE-UUID](https://webhook.site/YOUR-UNIQUE-UUID)

# App Config
PORT=3000


4. Running the Application

# Development mode
npm run start:dev


5. Running Tests

# Unit tests
npm run test

# End-to-End (E2E) tests
npm run test:e2e


🔗 Cloud Services & Architecture Notes

MongoDB Atlas

This project uses a free MongoDB Atlas (M0) cluster for persistent storage.

Connection: Standard Node.js driver via Mongoose.

Access: Network access is configured to allow connections from the application IP.

Redis Cloud

Redis is hosted via Redis Cloud (Free Tier) to meet the caching requirement without requiring local installation.

Connection: Authenticated via ioredis using the secure connection string in .env.

Webhook Alerts

Alerts for high temperature/humidity are sent to a unique testing URL.

Service: Webhook.site

My Unique URL: https://webhook.site/<YOUR-UUID-HERE> (Replace this with your actual URL or leave as placeholder)

Trigger: Alerts are sent when temp > 50 or humidity > 90.

🧪 Quick Verification

You can test the API using standard curl or Postman.

1. Ingest Data (Happy Path)
This should trigger an alert because Temperature (55) > 50.

curl -X POST http://localhost:3000/api/v1/telemetry \
  -H "Content-Type: application/json" \
  -d '{"deviceId":"dev-001","siteId":"site-A","ts":"2025-09-01T10:00:00.000Z","metrics":{"temperature":55,"humidity":40}}'


2. Get Latest Device Status (Cache Hit)
Fetches the data immediately from Redis.

curl http://localhost:3000/api/v1/devices/dev-001/latest


3. Get Site Summary (Aggregation)
Calculates averages and counts unique devices for a specific date range.

curl "http://localhost:3000/api/v1/sites/site-A/summary?from=2025-09-01T00:00:00.000Z&to=2025-09-02T00:00:00.000Z"


🤖 AI Usage Report

As per the assignment guidelines, here is how AI assistance was utilized in this project:

Code Scaffolding: I used AI to generate the initial NestJS boilerplate (Module, Controller, Service, DTOs) to accelerate the setup phase. I reviewed the generated code to ensure it matched the required file structure.

Aggregation Logic: I used AI to construct the MongoDB Aggregation Pipeline for the /sites/:siteId/summary endpoint, specifically for correctly calculating averages and counting unique devices using $group and $addToSet.

Debugging & Typing: I leveraged AI to resolve TypeScript strict mode errors, specifically regarding ioredis configuration (getOrThrow usage) and null-checks for the alert logic variables.

Cross-Platform Verification: I used AI to convert standard curl commands into Windows PowerShell syntax (Invoke-RestMethod) to verify the API endpoints locally without needing external tools.

Test Generation: Due to limited experience with testing frameworks, I utilized AI to generate the initial Unit and E2E test suites and explain