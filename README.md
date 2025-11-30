# IoT Telemetry Ingestor

A minimal NestJS application designed to ingest, cache, and analyze IoT telemetry data.

---

##  Description

IoT Telemetry Ingestor stores JSON-based IoT readings in MongoDB Atlas, caches the latest device state using Redis, and triggers webhook alerts when temperature or humidity thresholds are exceeded.

---

##  Features

- **Telemetry Ingestion** – Validates & stores temperature/humidity readings  
- **Real-time Alerts** – Alerts when **temperature > 50°C** or **humidity > 90%**  
- **Redis Caching** – Caches latest device state for fast access  
- **MongoDB Analytics** – Aggregation pipelines for min/max/avg & unique device count  

---

##  Setup & Installation

### **Prerequisites**
- Node.js v18+
- npm
- MongoDB Atlas
- Redis Cloud or Local Redis

### **Install Dependencies**
```bash
npm install
```

---

##  Environment Configuration

Create `.env`:

```bash
cp .env.example .env
```

Fill required values:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/iot_db
REDIS_URL=redis://default:<password>@<host>:<port>
ALERT_WEBHOOK_URL=https://webhook.site/c861c10b-cd77-454b-abe1-963542cc46d3
PORT=3000
```

---

##  Run Application

```bash
npm run start:dev
```

---

##  Tests

```bash
npm run test
npm run test:e2e
```

---

##  Cloud Services Overview

### **MongoDB Atlas**
- Stores telemetry readings  
- Connected via Mongoose  
- Works on free-tier  

### **Redis Cloud**
- Stores latest device cache  
- Uses `ioredis` with secure URL  

### **Webhook Alerts**
- Triggered when thresholds exceed  
- Uses Webhook.site for testing  

---

##  API Quick Testing

### **1. Ingest Data** (Triggers alert — temp 55 > 50)

```bash
curl -X POST http://localhost:3000/api/v1/telemetry \
  -H "Content-Type: application/json" \
  -d '{"deviceId":"dev-001","siteId":"site-A","ts":"2025-09-01T10:00:00.000Z","metrics":{"temperature":55,"humidity":40}}'
```

### **2. Get Latest Device Status (Redis)**

```bash
curl http://localhost:3000/api/v1/devices/dev-001/latest
```

### **3. Get Site Summary (Aggregation)**

```bash
curl "http://localhost:3000/api/v1/sites/site-A/summary?from=2025-09-01T00:00:00.000Z&to=2025-09-02T00:00:00.000Z"
```

---

##  AI Assistance Report (Required for Assignment)

- AI generated initial NestJS boilerplate (modules, controllers, services, DTOs).  
- AI helped build MongoDB aggregation pipelines for `/sites/:siteId/summary`.  
- AI assisted resolving TypeScript strict-mode issues (Redis typing, null checks, error handling).  
- AI created initial unit and E2E test templates and explained mocking strategies.  

---
