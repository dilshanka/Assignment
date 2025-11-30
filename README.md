IoT Telemetry Ingestor
<p align="center"> <a href="https://nestjs.com" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a> </p> <p align="center"> A progressive <a href="https://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications. </p> <p align="center"> <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a> <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a> <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a> <a href="https://circleci.com/gh/nestjs/nest"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a> <a href="https://discord.gg/G7Qnnhy"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord" /></a> <a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers" /></a> <a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors" /></a> </p>
Description

IoT Telemetry Ingestor is a minimal NestJS application designed to ingest, cache, and analyze IoT telemetry data. It stores JSON-based readings in MongoDB Atlas, caches the latest device state using Redis, and triggers webhook alerts when thresholds are exceeded.

Features

Telemetry Ingestion: Validates and stores temperature/humidity readings.

Real-time Alerts: Triggered when temperature > 50°C or humidity > 90.

Redis Caching: Stores the latest device state for fast retrieval.

MongoDB Analytics: Provides site summaries (min, max, avg, unique devices) using aggregation pipelines.

Setup & Installation
1. Prerequisites

Node.js v18+

npm

MongoDB Atlas

Redis Cloud or local Redis

2. Install Dependencies
npm install

3. Environment Configuration

Create a .env file:

cp .env.example .env


Fill in values:

MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/iot_db
REDIS_URL=redis://default:<password>@<host>:<port>
ALERT_WEBHOOK_URL=https://webhook.site/c861c10b-cd77-454b-abe1-963542cc46d3
PORT=3000

4. Run Application
npm run start:dev

5. Tests
npm run test
npm run test:e2e

Cloud Services Overview
MongoDB Atlas

Stores telemetry readings.

Connected using Mongoose.

Works on free-tier clusters.

Redis Cloud

Caches latest device state.

Connected using ioredis and secure Redis URL.

Webhook Alerts

Alerts sent when temperature/humidity thresholds are exceeded.

Uses Webhook.site for testing.

API Quick Testing
1. Ingest Data (Triggers alert because temp=55 > 50)
curl -X POST http://localhost:3000/api/v1/telemetry \
  -H "Content-Type: application/json" \
  -d '{"deviceId":"dev-001","siteId":"site-A","ts":"2025-09-01T10:00:00.000Z","metrics":{"temperature":55,"humidity":40}}'

2. Get Latest Device Status (Redis)
curl http://localhost:3000/api/v1/devices/dev-001/latest

3. Get Site Summary (Aggregation)
curl "http://localhost:3000/api/v1/sites/site-A/summary?from=2025-09-01T00:00:00.000Z&to=2025-09-02T00:00:00.000Z"

AI Assistance Report (Required for Assignment)

1. AI was used to generate the initial NestJS boilerplate (modules, controllers, services, DTOs), which was then manually reviewed and adjusted.

2. AI assisted in crafting the MongoDB aggregation pipeline used in /sites/:siteId/summary, including statistical operators and unique device counting.

3. AI helped resolve TypeScript strict-mode issues such as Redis typing, null-checks, and error handling.

4. AI generated initial unit and E2E test templates and explained the mocking strategy for Redis and MongoDB.