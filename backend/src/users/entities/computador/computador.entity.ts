import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Periferico } from "../perifericos/perifericos.entity";

@Entity()
export class Computador {

    @PrimaryGeneratedColumn('uuid')
	id: string

    @Column()
    cor: string

    @Column()
    dataFabricacao: Number

    @OneToMany(type => Periferico, periferico => periferico.id)
    perifericos: Periferico


}
