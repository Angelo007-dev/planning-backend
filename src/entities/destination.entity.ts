import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clients } from "./client/clients";
import { Shipments } from "./shipment_advice.entity";

@Entity('destinations')
export class Destinations {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address1: string;

    @Column()
    address2: string;

    @Column()
    address3: string;

    @Column()
    address4: string;

    @Column()
    postcode: string;

    @Column()
    city: string;

    @Column()
    county: string;

    @OneToMany(() => Shipments, (shipment_advice) => shipment_advice.destination)
    shipment_advice: Shipments[]

}