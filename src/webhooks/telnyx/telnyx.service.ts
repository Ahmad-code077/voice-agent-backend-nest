import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TelnyxWebhookBodyDto,
  TelnyxEventType,
} from './dto/telnyx-webhook.dto';
import { CallSession } from 'src/database/call-session.db';
import { CallStatus } from 'src/database/enums';

@Injectable()
export class TelnyxService {
  constructor(
    @InjectRepository(CallSession)
    private readonly callSessionRepo: Repository<CallSession>,
  ) {}

  async handleEvent(body: TelnyxWebhookBodyDto) {
    const { event_type, payload } = body;
    const { call_session_id, occurred_at, end_time } = payload;

    console.log(`body that received ${JSON.stringify(payload)}`);

    const session = await this.callSessionRepo.findOne({
      where: { telnyx_call_id: call_session_id },
    });

    if (!session) {
      console.warn(`CallSession not found for id ${call_session_id}`);
      return;
    }

    switch (event_type) {
      case TelnyxEventType.INITIATED:
        session.status = CallStatus.INITIATED;
        break;
      case TelnyxEventType.ANSWERED:
        session.status = CallStatus.ACTIVE;
        session.answered_at = new Date(occurred_at);
        break;
      case TelnyxEventType.HANGUP:
        session.status = CallStatus.COMPLETED;
        session.ended_at = end_time
          ? new Date(end_time)
          : new Date(occurred_at);
        break;
      default:
        console.warn(
          `Unhandled Telnyx event type: ${event_type ? event_type : 'unknown'}`,
        );
    }

    const res = await this.callSessionRepo.save(session);
    console.log(`Saved session with result: ${JSON.stringify(res)}`);
  }
}
