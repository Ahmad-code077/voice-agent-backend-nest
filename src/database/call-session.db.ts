import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { CallStatus } from './enums';
import { Account } from './account.db';

@Entity('call_sessions')
export class CallSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'account_id' })
  accountId: string;

  @Column({ unique: true })
  telnyx_call_id: string;

  @Column()
  from_number: string;

  @Column()
  to_number: string;

  @Column({ type: 'enum', enum: CallStatus })
  status: CallStatus;

  @Column({ type: 'int', nullable: true })
  duration_seconds: number;

  @CreateDateColumn()
  started_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  answered_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  ended_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
