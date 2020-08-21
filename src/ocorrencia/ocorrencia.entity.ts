import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("ocorrencia")
export class ocorrencia{
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ name: 'IsEnviado'})
    IsEnviado: boolean;

    @Column({ name: 'dataEvento'})
    dataEvento: Date;

    @Column({name: 'descricao', type: 'varchar', length: 100})
    descricao: string;
}