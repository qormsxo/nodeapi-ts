import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Posthashtag } from './Posthashtag';

@Index('title', ['title'], { unique: true })
@Entity('hashtags', { schema: 'nodejs' })
export class Hashtags extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', unique: true, length: 15 })
  title: string;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Posthashtag, posthashtag => posthashtag.hashtag)
  posthashtags: Posthashtag[];
}
