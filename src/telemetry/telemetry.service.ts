import { Injectable } from '@nestjs/common';
import Redis from 'ioredis'; // Import Redis
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Telemetry } from './schemas/telemetry.schema';
import { TelemetryDTO } from './dto/create-telemetry.dto';

@Injectable()
export class TelemetryService {
  private redisClient: Redis;

  constructor(
    @InjectModel(Telemetry.name) private telemetryModel: Model<Telemetry>,
  ) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    this.redisClient = new Redis(redisUrl);
  }

  async saveToMongo(telemetryDTO: TelemetryDTO): Promise<void> {
    const telemetry = new this.telemetryModel(telemetryDTO);
    await telemetry.save();
  }

  async saveToRedis(deviceId: string, data: object): Promise<void> {
    await this.redisClient.set(`latest:${deviceId}`, JSON.stringify(data));
  }

  async getFromRedis(deviceId: string): Promise<any> {
    const data = await this.redisClient.get(`latest:${deviceId}`);
    return data ? JSON.parse(data) : null;
  }

  async getFromMongo(deviceId: string): Promise<Telemetry | null> {
    return this.telemetryModel.findOne({ deviceId }).sort({ ts: -1 }).exec();
  }

  async triggerAlert(telemetryDTO: TelemetryDTO): Promise<void> {
    const alertData = {
      deviceId: telemetryDTO.deviceId,
      siteId: telemetryDTO.siteId,
      ts: telemetryDTO.ts,
      reason:
        telemetryDTO.metrics.temperature > 50
          ? 'HIGH_TEMPERATURE'
          : 'HIGH_HUMIDITY',
      value:
        telemetryDTO.metrics.temperature > 50
          ? telemetryDTO.metrics.temperature
          : telemetryDTO.metrics.humidity,
    };

    await fetch(
      process.env.ALERT_WEBHOOK_URL || 'https://webhook.site/your-uuid',
      {
        method: 'POST',
        body: JSON.stringify(alertData),
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
