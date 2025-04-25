import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('game')
export class Game   {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ name: 'user_id'})
    userId: number;

    @Column({ type: 'int', default: 0 })
    price: number;

    @Column({ name: 'thumnail_url'})
    thumnailUrl: string;

    @Column({ nullable: true })
    description: string;

    @Column({ name: 'origin_or_varient'})
    originOrVariant: string;

    @Column({ type: 'int', default: 0 })
    popularity: number;

    @Column({ type: 'int', default: 0 , name: 'download_times'})
    downloadTimes: number;

    @CreateDateColumn({ type: 'timestamp', name: 'registered_at' })
    registeredAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}