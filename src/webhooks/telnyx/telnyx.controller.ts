import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { TelnyxService } from './telnyx.service';
import { TelnyxWebhookBodyDto } from './dto/telnyx-webhook.dto';

@Controller('webhooks/telnyx')
export class TelnyxController {
  constructor(private readonly telnyxService: TelnyxService) {}

  @Post()
  @HttpCode(200) // Telnyx expects 200 OK to mark delivery
  async handleWebhook(@Body() body: TelnyxWebhookBodyDto) {
    await this.telnyxService.handleEvent(body);
    return { status: 'ok' };
  }
}
