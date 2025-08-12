import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clients } from "../client/clients";
import { Orderline } from "../orderlines/orderlines";
import { Shipments } from "../shipment_advice.entity";
import { Merchandiser } from "../merchandiser.entity";
import { Currencies } from "../currencies.entity";

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

    @ManyToOne(() => Currencies, (currency) => currency.orderhead)
    @JoinColumn({
        name: 'currency_id',
        referencedColumnName: 'code'
    })
    currencies: Currencies
}
