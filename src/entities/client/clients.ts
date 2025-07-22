import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Orderheads } from "../orderhead/orderheads";


@Entity()
export class Clients {

    @PrimaryColumn()
    id: number

    @Column()
    code: string

    @Column()
    name: string

    @OneToMany(() => Orderheads, (orederhead) => orederhead.clients)
    orederhead: Orderheads[]
}
