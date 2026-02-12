import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1770499139170 implements MigrationInterface {
    name = 'InitialSchema1770499139170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "call_sessions" DROP CONSTRAINT "FK_2f5b6169aad67522581958747c8"`);
        await queryRunner.query(`ALTER TABLE "usage_logs" DROP CONSTRAINT "FK_7072c9c85dd4686b9bafb5f1731"`);
        await queryRunner.query(`ALTER TABLE "usage_logs" DROP CONSTRAINT "FK_bec20bda624a6848cc66ffa7fd7"`);
        await queryRunner.query(`ALTER TABLE "password_resets" DROP CONSTRAINT "FK_d95569f623f28a0bf034a55099e"`);
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_9b5f711bc3b50a595a0b8a6eeb4"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "accountId" TO "account_id"`);
        await queryRunner.query(`ALTER TABLE "call_sessions" RENAME COLUMN "accountId" TO "account_id"`);
        await queryRunner.query(`ALTER TABLE "password_resets" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "invites" RENAME COLUMN "accountId" TO "account_id"`);
        await queryRunner.query(`ALTER TABLE "usage_logs" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "usage_logs" DROP COLUMN "callSessionId"`);
        await queryRunner.query(`ALTER TABLE "usage_logs" ADD "account_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usage_logs" ADD "call_session_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "account_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "call_sessions" ALTER COLUMN "account_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "password_resets" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invites" ALTER COLUMN "account_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_17a709b8b6146c491e6615c29d7" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "call_sessions" ADD CONSTRAINT "FK_594c064cc6d4fc2fd1d17e01ea5" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usage_logs" ADD CONSTRAINT "FK_f6498ba36a95124ee0fd0839f91" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usage_logs" ADD CONSTRAINT "FK_0ddc4504354544a2fd1d724b9b4" FOREIGN KEY ("call_session_id") REFERENCES "call_sessions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password_resets" ADD CONSTRAINT "FK_f7a4c3bc48f24df007936d217be" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_3931675ee56833575f4c33cc545" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_3931675ee56833575f4c33cc545"`);
        await queryRunner.query(`ALTER TABLE "password_resets" DROP CONSTRAINT "FK_f7a4c3bc48f24df007936d217be"`);
        await queryRunner.query(`ALTER TABLE "usage_logs" DROP CONSTRAINT "FK_0ddc4504354544a2fd1d724b9b4"`);
        await queryRunner.query(`ALTER TABLE "usage_logs" DROP CONSTRAINT "FK_f6498ba36a95124ee0fd0839f91"`);
        await queryRunner.query(`ALTER TABLE "call_sessions" DROP CONSTRAINT "FK_594c064cc6d4fc2fd1d17e01ea5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_17a709b8b6146c491e6615c29d7"`);
        await queryRunner.query(`ALTER TABLE "invites" ALTER COLUMN "account_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "password_resets" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "call_sessions" ALTER COLUMN "account_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "account_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usage_logs" DROP COLUMN "call_session_id"`);
        await queryRunner.query(`ALTER TABLE "usage_logs" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "usage_logs" ADD "callSessionId" uuid`);
        await queryRunner.query(`ALTER TABLE "usage_logs" ADD "accountId" uuid`);
        await queryRunner.query(`ALTER TABLE "invites" RENAME COLUMN "account_id" TO "accountId"`);
        await queryRunner.query(`ALTER TABLE "password_resets" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "call_sessions" RENAME COLUMN "account_id" TO "accountId"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "account_id" TO "accountId"`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_9b5f711bc3b50a595a0b8a6eeb4" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password_resets" ADD CONSTRAINT "FK_d95569f623f28a0bf034a55099e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usage_logs" ADD CONSTRAINT "FK_bec20bda624a6848cc66ffa7fd7" FOREIGN KEY ("callSessionId") REFERENCES "call_sessions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usage_logs" ADD CONSTRAINT "FK_7072c9c85dd4686b9bafb5f1731" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "call_sessions" ADD CONSTRAINT "FK_2f5b6169aad67522581958747c8" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
