import request from 'supertest';  // Correct default import
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('TelemetryController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/telemetry (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/telemetry')
      .send({ 
        deviceId: 'dev-001', 
        siteId: 'site-001', 
        ts: new Date().toISOString(), 
        metrics: { temperature: 55, humidity: 80 } 
      })
      .expect(201);
  });

  it('/api/v1/devices/dev-001/latest (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/devices/dev-001/latest')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
