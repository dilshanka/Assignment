import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Telemetry extends Document {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  siteId: string;

  @Prop({ required: true })
  ts: Date;

  @Prop({
    type: Object,
    required: true,
  })
  metrics: {
    temperature: number;
    humidity: number;
  };
}

export const TelemetrySchema = SchemaFactory.createForClass(Telemetry);
