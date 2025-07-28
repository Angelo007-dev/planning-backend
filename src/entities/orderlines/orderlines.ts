import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Orderheads } from "../orderhead/orderheads";

@Entity('orderlines')
export class Orderline {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    shipment: string

    @Column()
    request: Date

    @Column({ type: 'varchar', nullable: true })
    style_code: string

    @Column()
    style_description: string

    @Column()
    status: string

    @Column()
    quantity_to_be_shipped: number

    @Column({ type: 'datetime', nullable: true })
    kpa: Date

    @Column({ type: 'varchar', nullable: true })
    factory1: string | null

    @Column({ type: 'varchar', nullable: true })
    factory2: string | null

    @Column()
    machine_type: string

    @Column({
        //name: 'gauge_code'
        type: 'varchar', nullable: true
    })
    gauge_code: number

    @ManyToOne(() => Orderheads, (orederhead) => orederhead.orderline)
    @JoinColumn({
        name: 'orderhead_id',
        referencedColumnName: 'id'
    })
    orderhead: Orderheads

}