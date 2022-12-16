import { User } from '@/interfaces/users.interface';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Follow } from './Follow';
import { Posts } from './Posts';

@Index('email', ['email'], { unique: true })
@Index('nick', ['nick'], { unique: true })
@Entity('users', { schema: 'nodejs' })
export class Users extends BaseEntity implements User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    unique: true,
    length: 40,
  })
  email: string | null;

  @Column('varchar', { name: 'nick', nullable: true, unique: true, length: 15 })
  nick: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 100 })
  password: string | null;

  @Column('varchar', { name: 'provider', length: 10, default: () => "'local'" })
  provider: string;

  @Column('varchar', { name: 'snsId', nullable: true, length: 30 })
  snsId: string | null;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Follow, follow => follow.following)
  Followers: User[];

  @OneToMany(() => Follow, follow => follow.follower)
  Followings: User[];

  @OneToMany(() => Posts, posts => posts.user)
  posts: Posts[];
}
