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
    quantity: number

    @Column()
    factory1: string

    @Column()
    factory2: string

    @Column()
    machine_type: string

    @Column({
        name: 'gauge_code'
    })
    needle: number

    @ManyToOne(() => Orderheads, (orederhead) => orederhead.orderline)
    @JoinColumn({
        name: 'orderhead_id',
        referencedColumnName: 'id'
    })
    orderhead: Orderheads

}