import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelemetryModule } from './telemetry/telemetry.module';

@Module({
  imports: [
    (() => {
      console.log('MONGO_URI:', process.env.MONGO_URI);

      return MongooseModule.forRoot(
        process.env.MONGO_URI || 'mongodb://localhost:27017/telemetry',
      );
    })(),

    TelemetryModule,
  ],
})
export class AppModule {}
