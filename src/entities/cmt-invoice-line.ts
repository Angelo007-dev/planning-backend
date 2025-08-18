
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cmt_invoice_line')
export class CmtInvoiceLine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cmt_invoice_id: string;

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