import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity('resource_download_url')
export class ResourceDownloadUrl {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'resource_id', type: 'int'})
    resourceId: number;

    @Column({type: 'varchar', length: 255})
    url: string;
}