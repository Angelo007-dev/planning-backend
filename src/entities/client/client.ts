import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Client {

    @PrimaryColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;
}
