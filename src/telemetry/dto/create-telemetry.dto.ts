import { IsString, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Metrics {
  @IsNotEmpty()
  temperature: number;

  @IsNotEmpty()
  humidity: number;
}

export class TelemetryDTO {
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  siteId: string;

  @IsString()
  @IsNotEmpty()
  ts: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Metrics)
  metrics: Metrics;
}
