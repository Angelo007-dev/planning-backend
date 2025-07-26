import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orderheads } from "../orderhead/orderheads";


@Entity()
export class Clients {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    name: string

    @OneToMany(() => Orderheads, (orederhead) => orederhead.clients)
    orderhead: Orderheads[]
}
