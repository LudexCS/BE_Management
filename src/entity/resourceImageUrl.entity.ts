import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity('resource_image_url')
export class ResourceImageUrl {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'resource_id', type: 'int'})
    resourceId: number;

    @Column({type: 'varchar', length: 255})
    url: string;

    @Column({ type: 'varchar', length: 255 })
    key: string;
}