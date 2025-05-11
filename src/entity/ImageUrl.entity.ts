import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('game_image_url')
export class ImageUrl {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gameId: number;

    @Column()
    url: string;
}