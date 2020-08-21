import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm";

@Entity('produto')
export class produto{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nome', type: 'varchar', length: 100})
    nome: string;

    @Column({name: 'descricao', type: 'varchar', length: 250})
    descricao: string;

    @Column({name: 'preco', type: 'decimal'})
    preco: number;

    @Column({name: 'precoPromocao', type: 'decimal'})
    precoPromocao: number;
}