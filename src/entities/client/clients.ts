import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orderheads } from "../orderhead/orderheads";
import { PaymentTerm } from "../payment-term.entity";
import { Country } from "../country.entity";
import { Contact } from "../contact.entity";
import { Destinations } from "../destination.entity";


@Entity()
export class Clients {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    address1: string;

    @Column()
    address2: string;

    @Column()
    address3: string;

    @Column()
    address4: string;

    @Column()
    city: string;

    @Column()
    postcode: string;

    @Column()
    county: string;

    @Column()
    name: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @OneToMany(() => Orderheads, (orederhead) => orederhead.clients)
    orderhead: Orderheads[];

    @ManyToOne(() => PaymentTerm, (paymentterm) => paymentterm.clients)
    @JoinColumn({
        name: 'paymentterm_id',
        referencedColumnName: 'id'
    })
    paymentterm: PaymentTerm;

    @ManyToOne(() => Country, (country) => country.clients)
    @JoinColumn({
        name: 'country_id',
        referencedColumnName: 'id'
    })
    country: Country;

    @OneToMany(() => Contact, (contact) => contact.client)
    contacts: Contact[];

    @OneToMany(() => Destinations, (destination) => destination.client)
    destinations: Destinations[];

}