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

    @Column({ type: 'int', default: 0 , name: 'download_times'})
    downloadTimes: number;

    @CreateDateColumn({ type: 'timestamp', name: 'registered_at' })
    registeredAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}