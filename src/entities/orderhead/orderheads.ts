import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clients } from "../client/clients";
import { Orderline } from "../orderlines/orderlines";

@Entity()
export class Orderheads {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    order_id: string

    @Column()
    code: string

    @Column({ type: 'date', nullable: true })
    confirmDate: Date

    @Column({ type: 'varchar', nullable: true })
    Yarncomp: string

    @Column({ type: 'varchar', nullable: true })
    Yarncount: string

    @Column({ type: 'date', nullable: true })
    yarn_eta: Date

    @Column({ type: 'date', nullable: true })
    yarn_etd: Date


    @ManyToOne(() => Clients, (client) => client.orderhead)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'id'
    })
    clients: Clients

    @OneToMany(() => Orderline, (orderline) => orderline.orderhead)
    orderline: Orderline[]
}
