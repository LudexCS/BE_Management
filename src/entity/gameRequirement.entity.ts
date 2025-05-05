import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity('game_requirement')
export class GameRequirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'game_id', type: 'int' })
  gameId: number;

  @Column({ name: 'is_minimum', type: 'boolean' })
  isMinimum: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  os: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cpu: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  gpu: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ram: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  storage: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  network: string | null;
}