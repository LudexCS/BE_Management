import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('resource')
export class Resource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'game_id', type: 'int', nullable: true, default: () => '0' })
    gameId: number;

    @Column({ name: 'user_id', type: 'int', nullable: true, default: () => '0' })
    userId: number;

    @Column({ name: 'seller_ratio', type: 'tinyint', unsigned: true })
    sellerRatio: number;

    @Column({ name: 'creator_ratio', type: 'tinyint', unsigned: true })
    creatorRatio: number;

    @Column({ name: 'allow_derivation', type: 'boolean' })
    allowDerivation: boolean;

    @Column({ name: 'additional_condition', type: 'text', nullable: true })
    additionalCondition: string | null;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({ name: 'download_times', type: 'int', default: () => '0' })
    downloadTimes: number;

    @Column({ name: 'sharer_id', type: 'varchar', length: 255 })
    sharerId: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'registered_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    registeredAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}