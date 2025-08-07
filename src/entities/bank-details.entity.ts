import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PaymentTerm } from "./payment-term.entity";
import { Clients } from "./client/clients";
import { Shipments } from "./shipment_advice.entity";


@Entity('bankdetails')
export class BankDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    currency: string;

    @Column()
    name: string;

    @Column()
    full_name: string;

    @Column()
    iban: string;

    @Column()
    bic: string;

    @Column()
    address1: string;

    @Column()
    address2: string;

    @Column()
    address3: string;

    @Column()
    address4: string;

    @OneToMany(() => Shipments, (shipment_advice) => shipment_advice.bank_details)
    shipment_advice: Shipments[]

}