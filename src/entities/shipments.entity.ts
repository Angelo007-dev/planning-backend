
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orderline } from "./orderlines/orderlines";
import { Orderheads } from "./orderhead/orderheads";
import { Shipments } from "./shipment_advice.entity";

@Entity('shipments')
export class ShipementsTable {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shipment_code: string;

    @Column()
    orderhead_id: number;

    @Column()
    orderline_id: number;

    @Column()
    shipped: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}