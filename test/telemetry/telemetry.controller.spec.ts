import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryController } from '../../src/telemetry/telemetry.controller';
import { TelemetryService } from '../../src/telemetry/telemetry.service';
import { TelemetryModule } from '../../src/telemetry/telemetry.module';

// Mock ConfigService if needed
import { ConfigService } from '@nestjs/config';

describe('TelemetryController', () => {
  let controller: TelemetryController;
  let service: TelemetryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TelemetryModule],  // Import TelemetryModule to provide the controller
      providers: [
        {
          provide: TelemetryService,
          useValue: {
            saveToMongo: jest.fn(),
            saveToRedis: jest.fn(),
            triggerAlert: jest.fn(),
            getFromRedis: jest.fn(),
            getFromMongo: jest.fn(),
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

    controller = module.get<TelemetryController>(TelemetryController);
    service = module.get<TelemetryService>(TelemetryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call saveToMongo method', async () => {
    const telemetryDTO = {
      deviceId: 'dev-001',
      siteId: 'site-001',
      ts: new Date().toISOString(),
      metrics: { temperature: 55, humidity: 80 },
    };

    const saveToMongoSpy = jest.spyOn(service, 'saveToMongo').mockResolvedValueOnce(undefined);

    await controller.ingestTelemetry(telemetryDTO);

    expect(saveToMongoSpy).toHaveBeenCalled();
  });
});
