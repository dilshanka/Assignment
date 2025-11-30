import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { TelemetryDTO } from './dto/create-telemetry.dto';
import { IsString, IsNotEmpty } from 'class-validator';

@Controller('api/v1')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post('telemetry')
  async ingestTelemetry(@Body() telemetryDTO: TelemetryDTO): Promise<void> {
    await this.telemetryService.saveToMongo(telemetryDTO);
    await this.telemetryService.saveToRedis(
      telemetryDTO.deviceId,
      telemetryDTO,
    );

    if (
      telemetryDTO.metrics.temperature > 50 ||
      telemetryDTO.metrics.humidity > 90
    ) {
      await this.telemetryService.triggerAlert(telemetryDTO);
    }
  }

  @Get('devices/:deviceId/latest')
  async getLatestTelemetry(@Param('deviceId') deviceId: string) {
    let telemetry = await this.telemetryService.getFromRedis(deviceId);

    if (!telemetry) {
      // Fallback to MongoDB if not found in Redis
      telemetry = await this.telemetryService.getFromMongo(deviceId);
    }

    return telemetry;
  }
}
