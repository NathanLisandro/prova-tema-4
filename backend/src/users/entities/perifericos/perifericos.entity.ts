import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Periferico{
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    nome: string

}