import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CallSession } from '../database/call-session.db';
import { Account } from '../database/account.db';
import { CallStatus } from '../database/enums';
import { TelnyxWebhookPayloadDto } from 'src/webhooks/telnyx/dto/telnyx-webhook.dto';

@Injectable()
export class CallSessionService {
  private readonly logger = new Logger(CallSessionService.name);

  constructor(
    @InjectRepository(CallSession)
    private readonly callSessionRepo: Repository<CallSession>,
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async handleCallInitiated(data: TelnyxWebhookPayloadDto) {
    const account = await this.accountRepo.findOneBy({ phone_number: data.to });
    if (!account) {
      this.logger.warn(`Account not found for number ${data.to}`);
      return;
    }

    const call = this.callSessionRepo.create({
      telnyx_call_id: data.call_control_id,
      from_number: data.from,
      to_number: data.to,
      status: CallStatus.INITIATED,
      account,
      started_at: new Date(data.occurred_at),
    });

    await this.callSessionRepo.save(call);
    this.logger.log(`Call session created: ${call.telnyx_call_id}`);
  }

  async handleCallAnswered(data: TelnyxWebhookPayloadDto) {
    const call = await this.callSessionRepo.findOneBy({
      telnyx_call_id: data.call_control_id,
    });
    if (!call || call.status !== CallStatus.INITIATED) return;

    call.status = CallStatus.ACTIVE;
    call.answered_at = new Date(data.occurred_at);
    await this.callSessionRepo.save(call);

    this.logger.log(`Call answered: ${call.telnyx_call_id}`);
  }

  async handleCallHangup(data: TelnyxWebhookPayloadDto) {
    const call = await this.callSessionRepo.findOneBy({
      telnyx_call_id: data.call_control_id,
    });
    if (!call || call.status !== CallStatus.ACTIVE) return;

    call.status = CallStatus.COMPLETED;
    call.ended_at = data.end_time
      ? new Date(data.end_time)
      : new Date(data.occurred_at);
    call.duration_seconds = Math.floor(
      (call.ended_at.getTime() - call.started_at.getTime()) / 1000,
    );

    await this.callSessionRepo.save(call);
    this.logger.log(`Call completed: ${call.telnyx_call_id}`);
  }
}
