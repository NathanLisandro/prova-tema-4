import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Computador } from "../computador/computador.entity";

@Entity()
export class Periferico{
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    nome: string

    @ManyToOne(() => Computador, computador => computador.perifericos, { onDelete: 'CASCADE' })
    computador: Computador

}