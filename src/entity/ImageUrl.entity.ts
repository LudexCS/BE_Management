import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('game_image_url')
export class ImageUrl {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'game_id '})
    gameId: number;

    @Column()
    url: string;
}