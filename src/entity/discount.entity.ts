import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("discount")
export class Discount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "game_id", type: "int"})
    gameId: number;

    @Column({ name: "user_id", type: "int", nullable: true })
    userId: number | null;

    @Column({ name: "discount_rate", type: "tinyint" })
    discountRate: number;

    @Column({
        name: "discount_price",
        type: "decimal",
        precision: 10,
        scale: 2,
    })
    discountPrice: string;

    @Column({ name: "starts_at", type: "datetime" })
    startsAt: Date;

    @Column({ name: "ends_at", type: "datetime" })
    endsAt: Date;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}