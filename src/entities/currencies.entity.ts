import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orderheads } from "./orderhead/orderheads";

@Entity('currencies')
export class Currencies {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    description: string;

    @Column()
    active: boolean

    @OneToMany(() => Orderheads, (orderhead) => orderhead.currencies)
    orderhead: Orderheads[]
}