import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('game_image_url')
export class ImageUrl {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    game_id: number;

    @Column()
    url: string;
}