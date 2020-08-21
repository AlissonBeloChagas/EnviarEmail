import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('cliente')
export class cliente{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nome', type: 'varchar', length: 100})
    nome: string;

    @Column({name: 'cpf', type: 'varchar', length: 14})
    cpf: string;

    @Column({name: 'rg', type: 'varchar', length: 11})
    rg: string;

    @Column({name: 'email', type: 'varchar', length: 100})
    email: string;

    @Column({name: 'dataNascimento', type: 'date'})
    dataNascimento: Date;
}