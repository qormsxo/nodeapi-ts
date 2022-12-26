import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users';

@Index('UserId', ['userId'], {})
@Entity('domains', { schema: 'nodejs' })
export class Domains {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'host', length: 80 })
  host: string;

  @Column('enum', { name: 'type', enum: ['free', 'premium'] })
  type: 'free' | 'premium';

  @Column('varchar', { name: 'clientSecret', length: 36 })
  clientSecret: string;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @Column('int', { name: 'UserId', nullable: true })
  userId: number | null;

  @ManyToOne(() => Users, users => users.domains, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  user: Users;
}
