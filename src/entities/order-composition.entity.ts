import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm';
//import { CompositionDetailEntity } from './compositiondetail.entity';
import { Orderheads } from './orderhead/orderheads';

@Entity('ordercomposition')
export class OrderCompositionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    yarnCompo: string;

    @Column()
    yarnCount: string;

    @Column()
    type: string;

    /* @OneToMany(
         () => CompositionDetailEntity,
         (compositionDetail) => compositionDetail.composition,
     )
     compositionDetails: CompositionDetailEntity[];
 */
    @ManyToOne(() => Orderheads)
    @JoinColumn({ name: 'order_id' })
    order_id: Orderheads;

    @CreateDateColumn()
    @Column({ select: false })
    created_at: Date;

    @UpdateDateColumn()
    @Column({ select: false })
    updated_at: Date;
}
