import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('tag')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ name: 'name_ko', type: 'varchar', length: 255, nullable: true })
    nameKo: string;

    @Column({ name: 'name_choseong', type: 'varchar', length: 255, nullable: true })
    nameChoseong: string;
}