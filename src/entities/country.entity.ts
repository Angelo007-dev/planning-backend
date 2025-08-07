
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clients } from "./client/clients";

@Entity('countries')
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    description: string;

    /*@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createda_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;*/

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @OneToMany(() => Clients, (client) => client.country)
    clients: Clients[];

}