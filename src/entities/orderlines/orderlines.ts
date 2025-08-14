import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Orderheads } from "../orderhead/orderheads";
import { Shipments } from "../shipment_advice.entity";

@Entity('orderlines')
export class Orderline {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    order_id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number

    @Column()
    style_code: string

    @Column()
    style_description: string;

    @Column()
    status: string

    @Column()
    quantity_to_be_shipped: number

    @Column()
    quantity_shipped: number

    @Column()
    quantity: number

    @Column('decimal', { precision: 10, scale: 2 })
    sales_price: number

    @Column({ type: 'varchar', nullable: true })
    hs_code: string | null

    /*@OneToMany(() => Shipements, (shipments) => shipments.orderlines)
    shipments: Shipements[]*/

    @ManyToOne(() => Orderheads, (orederhead) => orederhead.orderline)
    @JoinColumn({
        name: 'orderhead_id',
        referencedColumnName: 'id'
    })
    orderhead: Orderheads

}