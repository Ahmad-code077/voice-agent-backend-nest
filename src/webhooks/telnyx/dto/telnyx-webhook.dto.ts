import {
  IsString,
  IsOptional,
  IsEnum,
  IsISO8601,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TelnyxEventType {
  INITIATED = 'call.initiated',
  ANSWERED = 'call.answered',
  HANGUP = 'call.hangup',
}

export class TelnyxWebhookPayloadDto {
  @ApiProperty({
    description: 'Telnyx call session ID',
    example: 'aeb5639a-87dd-11f0-af54-02420a1f0b69',
  })
  @IsString()
  call_session_id: string;

  @ApiProperty({ description: 'Caller phone number', example: '+12182950349' })
  @IsString()
  from: string;

  @ApiProperty({
    description: 'Receiver phone number',
    example: '+48661133089',
  })
  @IsString()
  to: string;

  @ApiProperty({
    description: 'Event timestamp',
    example: '2025-09-02T09:17:43.976123Z',
  })
  @IsISO8601()
  occurred_at: string;

  @ApiPropertyOptional({
    description: 'Call start time',
    example: '2025-09-02T09:17:44.596122Z',
  })
  @IsOptional()
  @IsISO8601()
  start_time?: string;

  @ApiPropertyOptional({
    description: 'Call end time',
    example: '2025-09-02T09:18:06.396120Z',
  })
  @IsOptional()
  @IsISO8601()
  end_time?: string;

  @ApiPropertyOptional({
    description: 'Tags or labels attached to call',
    example: ['single', 'dual'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Call state / direction / connection ID etc.',
    example: 'bridging',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    description: 'Direction of the call',
    example: 'outgoing',
  })
  @IsOptional()
  @IsString()
  direction?: string;

  @ApiPropertyOptional({
    description: 'Call control ID from Telnyx',
    example: 'v3:RzaeMnE9ebpGCCfKdbNOC_2nU4JJNFMo3rBCpFhCDphE1yP4-2K8UQ',
  })
  @IsOptional()
  @IsString()
  call_control_id?: string;

  @ApiPropertyOptional({
    description: 'Call leg ID from Telnyx',
    example: 'aebb45bc-87dd-11f0-9d4e-02420a1f0b69',
  })
  @IsOptional()
  @IsString()
  call_leg_id?: string;

  @ApiPropertyOptional({ description: 'Client state, if any', example: null })
  @IsOptional()
  @IsString()
  client_state?: string;
}

export class TelnyxWebhookBodyDto {
  @ApiProperty({
    enum: TelnyxEventType,
    description: 'Top-level event type from Telnyx',
    example: TelnyxEventType.INITIATED,
  })
  @IsEnum(TelnyxEventType)
  event_type: TelnyxEventType;

  @ApiProperty({
    type: TelnyxWebhookPayloadDto,
    description: 'Payload details for the call',
  })
  payload: TelnyxWebhookPayloadDto;

  @ApiPropertyOptional({
    description: 'Timestamp when webhook was created',
    example: '2025-09-02T09:17:44.019242Z',
  })
  @IsOptional()
  @IsISO8601()
  created_at?: string;

  @ApiPropertyOptional({ description: 'Webhook record type', example: 'event' })
  @IsOptional()
  @IsString()
  record_type?: string;

  @ApiPropertyOptional({
    description: 'Webhook unique ID',
    example: '52c959b6-f6a0-4ccc-ad1f-b76fba2efc6d',
  })
  @IsOptional()
  @IsString()
  webhook_id?: string;
}
