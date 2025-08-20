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

    @ManyToOne(() => Clients)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'id'
    })

    client: Clients;

    @Column({
        unique: true,
        name: 'shipment_code',
    })
    shipmentCode: string;

    @Column({
        name: 'invoice_type'
    })
    invoiceType: string;

    @Column({
        name: 'to_address',
        nullable: true
    })
    toAddress: string;

    @Column({ nullable: true })
    flex_contract_number: string;


    @Column({
        name: 'invoice_date',
        nullable: true
    })
    invoiceDate?: Date;

    @Column({
        name: 'invoice_number',
        nullable: true
    })
    invoiceNumber?: number;

    @Column({
        name: 'invoice_amount',
        nullable: true
    })
    invoiceAmount: number;

    @Column({ nullable: true })
    customer_order_number: string;

    @Column({
        name: 'carton_id',
        nullable: true
    })
    cartons: number;

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

    @Column({
        name: 'freight',
        nullable: true
    })
    orderCosts?: string;

    @Column({ nullable: true })
    eta_date?: Date;

    @Column({ nullable: true })
    comment?: string;

    @Column({
        name: 'name_vessel',
        nullable: true
    })
    nameVessel?: string;

    @Column({
        name: 'voyage_number',
        nullable: true
    })
    voyageNumber?: string;

    @Column({
        name: 'shipment_mode',
        nullable: true
    })
    shipmentMode?: string;

    @Column({
        name: 'shipment_seal1',
        nullable: true
    })
    seal1?: string;

    @Column({ nullable: true })
    mbl?: string;

    @Column({ nullable: true })
    hbl?: string;

    @Column({
        name: 'flight_number',
        nullable: true
    })
    flightNumber?: string;

    @Column({
        name: 'flight_from',
        nullable: true
    })
    flightFrom?: string;

    @Column({
        name: 'flight_date',
        nullable: true
    })
    flightDate?: Date;

    @Column({ nullable: true })
    mawb1?: string;

    @Column({ nullable: true })
    mawb2?: string;

    @Column({ nullable: true })
    mawb3?: string;

    @Column({ nullable: true })
    hawb?: string;

    @Column({
        name: 'currency_code',
        nullable: true
    })
    currencyCode?: string;

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

    @Column({
        name: 'other_costs_ship',
        nullable: true
    })
    otherCostsShip?: string;

    @Column({
        name: 'other_costs_air',
        nullable: true
    })
    otherCostsAir?: string;

    @Column({
        name: 'freight_charges_air',
        nullable: true
    })
    freightChargesAir?: string;

    @Column({
        name: 'freight_charges_ship',
        nullable: true
    })
    freightChargeShip?: string;


    @Column({
        type: 'decimal',
        precision: 8,
        scale: 2,
    })
    deposit: number;

    @ManyToOne(() => BankDetails, (bankDetails) => bankDetails.shipment_advice)
    @JoinColumn({
        name: 'bank_details',
        referencedColumnName: 'id'
    })
    bank_details: BankDetails;

    @Column({
        name: 'po_no',
        nullable: true
    })
    poNumber: number;

    @Column({
        name: 'brand_name',
        nullable: true
    })
    brandName: string;

    @Column({
        name: 'shipment_from',
        nullable: true
    })
    shipmentFrom: string;

    @Column({
        name: 'shipment_tc1',
        nullable: true
    }) tc1: string;

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

    @Column({
        name: 'dom_nr',
        nullable: true
    })
    domiciliationNumber: string;

    @Column({
        name: 'extra_text',
        nullable: true
    })
    extraText: boolean;

    @Column({
        name: 'additional_text',
        type: 'boolean',
        default: false
    })
    additionalText: boolean;

    @Column({
        name: 'customer_invoice',
        default: false,
    })
    customerInvoice: boolean;

    @ManyToMany(() => Orderheads)
    @JoinTable({
        name: 'shipments',
        joinColumn: {
            name: 'shipment_code',
            referencedColumnName: 'shipmentCode',
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