import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('resource')
export class Resource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'game_id', type: 'int', nullable: true, default: 0})
    gameId: number;

    @Column({name: 'user_id', type: 'int', nullable: true, default: 0})
    userId: number;

    @Column({name: 'usage_type_id', type: 'int'})
    usageTypeId: number;

    @Column({name: 'allow_derivation', type: 'boolean'})
    allowDerivation: boolean;

    @Column({name: 'additional_condition', type: 'text', nullable: true})
    additionalCondition: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({name: 'download_times', type: 'int', default: 0})
    downloadTimes: number;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'registered_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    registeredAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}