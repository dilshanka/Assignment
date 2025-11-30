import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelemetryController } from './telemetry.controller';
import { TelemetryService } from './telemetry.service';
import { Telemetry, TelemetrySchema } from './schemas/telemetry.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO_URI');

        console.log('MONGO_URI:', mongoUri);

        if (!mongoUri) {
          throw new Error('MONGO_URI environment variable is not defined');
        }

        return {
          uri: mongoUri,
        };
      },
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([
      { name: Telemetry.name, schema: TelemetrySchema },
    ]),
  ],
  controllers: [TelemetryController],
  providers: [TelemetryService],
})
export class TelemetryModule {}
