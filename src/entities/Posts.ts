import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posthashtag } from './Posthashtag';
import { Users } from './Users';

@Index('UserId', ['userId'], {})
@Entity('posts', { schema: 'nodejs' })
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'content', length: 140 })
  content: string;

  @Column('varchar', { name: 'img', nullable: true, length: 200 })
  img: string | null;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('int', { name: 'UserId', nullable: true })
  userId: number | null;

  @OneToMany(() => Posthashtag, posthashtag => posthashtag.post)
  posthashtags: Posthashtag[];

  @ManyToOne(() => Users, users => users.posts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  user: Users;
}
