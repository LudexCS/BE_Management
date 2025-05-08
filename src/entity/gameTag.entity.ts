import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm';

@Entity('game_tag')
export class GameTag {
  @PrimaryColumn({ name: 'game_id', type: 'int' })
  gameId: number;

  @PrimaryColumn({ name: 'tag_id', type: 'int' })
  tagId: number;

  @Column({ type: 'int', default: 2147483647 })
  priority: number;
}