import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Orderheads } from "../orderhead/orderheads";

@Entity('orderline')
export class Orderline {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    style_code: string

    @Column()
    style_description: string

    @Column()
    status: string

    @Column()
    quantity: number

    @Column({ type: 'varchar', nullable: true })
    factory1: string | null

    @Column({ type: 'varchar', nullable: true })
    factory2: string | null

    @Column()
    machine_type: string

    @Column({
        //name: 'gauge_code'
    })
    gauge_code: number

    @ManyToOne(() => Orderheads, (orederhead) => orederhead.orderline)
    @JoinColumn({
        name: 'orderhead_id',
        referencedColumnName: 'id'
    })
    orderhead: Orderheads

}