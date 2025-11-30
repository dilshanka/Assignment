import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryService } from '../../src/telemetry/telemetry.service';
import { getModelToken } from '@nestjs/mongoose';
import { Telemetry } from '../../src/telemetry/schemas/telemetry.schema';
import { Model } from 'mongoose';

// Mock the Redis client if necessary
import { ConfigService } from '@nestjs/config';

describe('TelemetryService', () => {
  let service: TelemetryService;
  let model: Model<Telemetry>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelemetryService,
        {
          provide: getModelToken(Telemetry.name),
          useValue: {
            save: jest.fn().mockResolvedValueOnce(null),  // Mocking the save method
            findOne: jest.fn().mockResolvedValue(null),   // Mocking the findOne method
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mongodb://localhost:27017/telemetry'),
          },
        },
      ],
    }).compile();

    service = module.get<TelemetryService>(TelemetryService);
    model = module.get<Model<Telemetry>>(getModelToken(Telemetry.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save telemetry to MongoDB', async () => {
    const telemetryDTO = {
      deviceId: 'dev-001',
      siteId: 'site-001',
      ts: new Date().toISOString(),
      metrics: { temperature: 55, humidity: 80 },
    };

    // Mock save method on model
    const saveSpy = jest.spyOn(model.prototype, 'save').mockResolvedValueOnce(null);

    await service.saveToMongo(telemetryDTO);

    expect(saveSpy).toHaveBeenCalled();
  });
});
