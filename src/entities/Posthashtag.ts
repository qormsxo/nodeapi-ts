import { Column, Entity, Index, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Posts } from './Posts';
import { Hashtags } from './Hashtags';

@Index('HashtagId', ['hashtagId'], {})
@Entity('posthashtag', { schema: 'nodejs' })
export class Posthashtag extends BaseEntity {
  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @Column('int', { primary: true, name: 'PostId' })
  postId: number;

  @Column('int', { primary: true, name: 'HashtagId' })
  hashtagId: number;

  @ManyToOne(() => Posts, posts => posts.posthashtags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PostId', referencedColumnName: 'id' }])
  post: Posts;

  @ManyToOne(() => Hashtags, hashtags => hashtags.posthashtags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'HashtagId', referencedColumnName: 'id' }])
  hashtag: Hashtags;
}
