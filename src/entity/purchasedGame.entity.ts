import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn
} from 'typeorm';
import { Account } from './account.entity';
import { Game } from './game.entity';

@Entity('purchased_game')
export class PurchasedGame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'game_id' })
    gameId: number;

    @Column({ name: 'price_paid', type: 'decimal', precision: 10, scale: 2 })
    pricePaid: string;

    @Column({ name: 'is_nft_issued', type: 'tinyint', width: 1, default: false })
    isNftIssued: boolean;

    @Column({ name: "purchase_id", type: "varchar", length: 255 })
    purchaseId: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'purchased_at',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    purchasedAt: Date;

    // Relations
    @Column({ name: 'user_id' })
    user: Account;

    @Column({ name: 'game_id' })
    game: Game;
}