import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('game_requirement')
export class GameRequirement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    game_id: number;

    @Column()
    is_minimum: boolean;

    @Column()
    os: string;

    @Column()
    cpu: string;

    @Column()
    gpu: string;

    @Column()
    ram: string;

    @Column()
    storage: string;

    @Column()
    network: string;
}