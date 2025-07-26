import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clients } from "../client/clients";
import { Orderline } from "../orderlines/orderlines";

@Entity()
export class Orderheads {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    Yarncomp: string

    @Column()
    Yarncount: string

    @ManyToOne(() => Clients, (client) => client.orderhead)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'id'
    })
    clients: Clients

    @OneToMany(() => Orderline, (orderline) => orderline.orderhead)
    orderline: Orderline[]



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
