import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clients } from "./client/clients";

@Entity('paymentterms')
export class PaymentTerm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    discount: number;

    /*@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;*/

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @OneToMany(() => Clients, (client) => client.paymentterm)
    clients: Clients[]
}
