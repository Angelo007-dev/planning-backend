import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BankDetails } from "./bank-details.entity";
import { Destinations } from "./destination.entity";
import { Orderheads } from "./orderhead/orderheads";

@Entity('cmt_invoices')
export class CmtInvoices {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    shipment_code: string;

    @Column({ nullable: true })
    to_address: string;

    @Column({ nullable: true })
    flex_contract_number: string;


    @Column({ nullable: true })
    invoice_date?: Date;

    @Column({ nullable: true })
    invoice_number?: number;

    @Column({ nullable: true })
    invoice_amount: number;

    @Column({ nullable: true })
    customer_order_number: string;

    @Column({ nullable: true })
    carton_id: number;

    @Column({ nullable: true })
    gw?: number;

    @Column({ nullable: true })
    nw?: number;

    @Column({ nullable: true })
    cbm?: number;

    @Column({ nullable: true })
    name_forwarder?: string;

    @Column({ nullable: true })
    tracking_number?: number;

    @Column({ nullable: true })
    freight?: string;

    @Column({ nullable: true })
    eta_date?: Date;

    @Column({ nullable: true })
    comment?: string;

    @Column({ nullable: true })
    name_vessel?: string;

    @Column({ nullable: true })
    voyage_number?: string;

    @Column({ nullable: true })
    shipment_mode?: string;

    @Column({ nullable: true })
    mbl?: string;

    @Column({ nullable: true })
    hbl?: string;

    @Column({ nullable: true })
    flight_number?: string;

    @Column({ nullable: true })
    flight_from?: string;

    @Column({ nullable: true })
    flight_date?: Date;

    @Column({ nullable: true })
    mawb1?: string;

    @Column({ nullable: true })
    mawb2?: string;

    @Column({ nullable: true })
    mawb3?: string;

    @Column({ nullable: true })
    hawb?: string;

    @Column({ nullable: true })
    currency_code?: string;

    @Column()
    incoterms: string;

    @Column({
        type: 'decimal',
        nullable: true,
        precision: 8,
        scale: 2
    })
    volume?: number;

    @Column({ nullable: true })
    reference?: string;

    @Column({ nullable: true })
    other_costs_ship?: string;

    @Column({ nullable: true })
    other_costs_air?: string;

    @Column({ nullable: true })
    freight_charges_air?: string;

    @Column({ nullable: true })
    freight_charges_ship?: string;


    @Column({
        type: 'decimal',
        precision: 8,
        scale: 2,
    })
    deposit: number;

    @ManyToOne(() => BankDetails, (bank_details) => bank_details.shipment_advice)
    @JoinColumn({
        name: 'bank_details',
        referencedColumnName: 'id'
    })
    bank_details: BankDetails;

    @Column({ nullable: true })
    po_no: number;

    @Column({ nullable: true })
    brand_name: string;

    @Column({ nullable: true })
    shipment_from: string;

    @Column({ nullable: true })
    shipment_tc1: string;

    @Column({ nullable: true })
    carrier: string;

    @ManyToOne(() => Destinations, (destination) => destination.shipment_advice, {
        nullable: true,
    })
    @JoinColumn({
        name: 'destination',
        //referencedColumnName: 'id'
    })
    destination: Destinations;

    @Column({ nullable: true })
    dom_nr: string;

    @Column({ nullable: true, default: false })
    extra_text: boolean;

    @Column({
        type: 'boolean',
        default: false,
    })
    customer_invoice: boolean;

    @ManyToMany(() => Orderheads)
    @JoinTable({
        name: 'cmt_incoice_line',
        joinColumn: {
            name: 'cmt_invoice_id',
            referencedColumnName: 'id',
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