import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Orderhead {
    @PrimaryColumn()
    id: number;

    oreder_id: string
}
