import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('game_requirement')
export class GameRequirement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    game_id: number;

    @Column()
    type: string;

    @Column({ nullable: true })
    spec_min_value: string;

    @Column({ nullable: true })
    spec_rec_value: string;
}