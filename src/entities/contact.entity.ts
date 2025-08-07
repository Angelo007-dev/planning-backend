import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentTerm } from "./payment-term.entity";
import { Clients } from "./client/clients";

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    mail: string;

    @Column()
    address_line: string;

    @Column()
    address_line2: string;

    @Column()
    address_line3: string;

    @Column()
    address_line4: string;

    @Column()
    postcode: string;

    @Column()
    country: string;

    @ManyToOne(() => Clients, (client) => client.contacts)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'id'
    })
    client: Clients;

}