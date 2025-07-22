import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clients } from "../client/clients";
import { Orderlines } from "../orderlines/orderlines";

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

    @ManyToOne(() => Clients, (client) => client.orederhead)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'id'
    })
    clients: Clients

    @OneToMany(() => Orderlines, (orderlines) => orderlines.orderhead)
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'orderhead_id'
    })
    orderlines: Orderlines[]



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
