import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Check
} from 'typeorm';

@Entity('game')
@Check('price >= 0')
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ name: 'title_ko', type: 'varchar', length: 255, nullable: true })
    titleKo: string;

    @Column({ name: 'title_choseong', type: 'varchar', length: 255, nullable: true })
    titleChoseong: string;

    @Column({ name: 'user_id', type: 'int', default: 0 })
    userId: number;

    @Column({ name: 'item_id', type: 'varchar', length: 255 })
    itemId: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ name: 'thumbnail_url', type: 'varchar', length: 255, nullable: false })
    thumbnailUrl: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    key: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'download_times', type: 'int', default: 0 })
    downloadTimes: number;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'registered_at',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    registeredAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}