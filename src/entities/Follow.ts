import { Column, Entity, Index, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Users } from './Users';

@Index('followerId', ['followerId'], {})
@Entity('follow', { schema: 'nodejs' })
export class Follow extends BaseEntity {
  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('int', { primary: true, name: 'followingId' })
  followingId: number;

  @Column('int', { primary: true, name: 'followerId' })
  followerId: number;

  @ManyToOne(() => Users, users => users.Followers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'followingId', referencedColumnName: 'id' }])
  following: Users;

  @ManyToOne(() => Users, users => users.Followings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'followerId', referencedColumnName: 'id' }])
  follower: Users;
}
