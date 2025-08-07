import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orderheads } from "./orderhead/orderheads";
import { Orderline } from "./orderlines/orderlines";
import { ShipementsTable } from "./shipments.entity";
import { BankDetails } from "./bank-details.entity";
import { Clients } from "./client/clients";
import { Destinations } from "./destination.entity";

@Entity('shipment_advices')
export class Shipments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shipment_code: string;

    @Column()
    invoice_type: string;

    @Column()
    incoterms: string;

    @Column()
    deposit: number;


    @Column()
    additional_text: boolean;

    @Column()
    customer_invoice: boolean;

    @ManyToOne(() => BankDetails, (bank_details) => bank_details.shipment_advice, {
        nullable: true,
    })
    @JoinColumn({
        name: 'bank_details',
        referencedColumnName: 'id'
    })
    bank_details: BankDetails;

    @ManyToOne(() => Destinations, (destination) => destination.shipment_advice, {
        nullable: true,
    })
    @JoinColumn({
        name: 'destination',
        referencedColumnName: 'id'
    })
    destination: Destinations;

    @ManyToMany(() => Orderheads)
    @JoinTable({
        name: 'shipments',
        joinColumn: {
            name: 'shipment_code',
            referencedColumnName: 'shipment_code',
        },
        inverseJoinColumn: {
            name: 'orderhead_id',
            referencedColumnName: 'id',
        },
    })
    orderheads: Orderheads[]


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}