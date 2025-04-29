import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity('game_tag')
export class GameTag {
    @PrimaryColumn()
    game_id: number;

    @PrimaryColumn()
    tag_id: number;

    @ManyToOne(() => Tag)
    @JoinColumn({ name: 'tag_id' })
    tag: Tag;

    @Column({ nullable: true })
    priority: number;
}