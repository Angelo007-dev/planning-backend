
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('yarncounts')
export class YarnCounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    description: number;

    @Column({
        default: true
    })
    active: boolean

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}