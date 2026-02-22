import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CallsModule } from './calls/calls.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelnyxController } from './webhooks/telnyx/telnyx.controller';
import { TelnyxModule } from './webhooks/telnyx/telnyx.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: false,
      migrations: ['dist/database/migrations/*.js'],
      migrationsRun: false,
    }),
    TelnyxModule,
    AuthModule,
    UsersModule,
    CallsModule,
    IntegrationsModule,
    HealthModule,
  ],
  controllers: [AppController, TelnyxController],
  providers: [AppService],
})
export class AppModule {}
