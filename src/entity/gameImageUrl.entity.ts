import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity('game_image_url')
export class GameImageUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'game_id', type: 'int' })
  gameId: number;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 255 })
  key: string;
}