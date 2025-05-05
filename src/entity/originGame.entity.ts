import {
  Entity,
  PrimaryColumn
} from 'typeorm';

@Entity('origin_game')
export class OriginGame {
  @PrimaryColumn({ name: 'game_id', type: 'int' })
  gameId: number;

  @PrimaryColumn({ name: 'origin_game_id', type: 'int' })
  originGameId: number;
}