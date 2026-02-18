import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallSession } from 'src/database/call-session.db';
import { TelnyxController } from './telnyx.controller';
import { TelnyxService } from './telnyx.service';
import { Account } from 'src/database/account.db';

@Module({
  imports: [TypeOrmModule.forFeature([CallSession, Account])],
  controllers: [TelnyxController],
  providers: [TelnyxService],
  exports: [TelnyxService], // optional if you want to use the service elsewhere
})
export class TelnyxModule {}
