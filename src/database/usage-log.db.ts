import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Account } from './account.db';
import { CallSession } from './call-session.db';

@Entity('usage_logs')
export class UsageLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'account_id' })
  accountId: string;

  @ManyToOne(() => CallSession, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'call_session_id' })
  call_session: CallSession;

  @Column({ name: 'call_session_id', nullable: true })
  callSessionId: string;

  @Column()
  credits_used: number;

  @Column()
  reason: string;

  @CreateDateColumn()
  created_at: Date;
}
