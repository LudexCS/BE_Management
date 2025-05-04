import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('game')
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ name: 'user_id', type: 'int', nullable: true, default: 0 })
    userId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price: number;

    @Column({ name: 'thumnail_url', type: 'varchar', length: 255 })
    thumnailUrl: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ type: 'int', default: 0, name: 'download_times' })
    downloadTimes: number;

    @CreateDateColumn({ type: 'timestamp', name: 'registered_at' })
    registeredAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
