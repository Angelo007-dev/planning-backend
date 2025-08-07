import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clients } from "../client/clients";
import { Orderline } from "../orderlines/orderlines";
import { Shipments } from "../shipment_advice.entity";
import { Merchandiser } from "../merchandiser.entity";

@Entity()
export class Orderheads {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    confirmdate: Date

    @Column()
    Yarncomp: string

    @Column()
    Yarncount: string

    @Column()
    invoice_code: string;

    @Column()
    currency_id: string

    @Column()
    yarn_eta: Date

    @Column()
    yarn_etd: Date

    @Column()
    orderstatus: string


    @ManyToOne(() => Clients, (client) => client.orderhead)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'id'
    })
    clients: Clients

    @ManyToOne(() => Merchandiser, (merchandiser) => merchandiser.orderhead)
    @JoinColumn({
        name: 'merchant_id',
        referencedColumnName: 'code'
    })
    merchandiser: Merchandiser

    @OneToMany(() => Orderline, (orderline) => orderline.orderhead)
    orderline: Orderline[]


    /* @ManyToMany(() => Shipments)
     @JoinTable({
         name: 'shipments',
         joinColumn: {
             name: 'orderhead_id',
             referencedColumnName: 'id'
         }, inverseJoinColumn: {
             name: 'shipment_code',
             referencedColumnName: 'shipment_code'
         }
     })
     shipments: Shipments[]*/

    /*@OneToMany(() => Shipements, (shipments) => shipments.orderheads)
    shipments: Shipements[]*/

    /*@ManyToOne(() => ClientsEntity, (clients) => clients.id)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'id'
    })
    client: ClientsEntity

    @OneToMany(() => OrderlinesEntity, (orderlines) => orderlines.orderhead)
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'orderhead_id'
    })
    orderlines: OrderlinesEntity*/
}
