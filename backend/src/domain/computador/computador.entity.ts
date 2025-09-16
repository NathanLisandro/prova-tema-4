import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Periferico } from "../perifericos/perifericos.entity";

@Entity()
export class Computador {

    @PrimaryGeneratedColumn('uuid')
	id: string

    @Column()
    nome: string

    @Column()
    cor: string

    @Column()
    dataFabricacao: number

    @OneToMany(() => Periferico, periferico => periferico.computador, { cascade: true })
    perifericos: Periferico[]

}
