import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, OneToMany, OneToOne, ManyToMany, Relation } from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({name: 'document_type',length: 50})
    documentType: string;

    @Column()
    document: string;

    @Column()
    telephone: string;

    @Column()
    cellphone: string;

    @Column({type: 'varchar' })
    cep: string;

    @Column({ length: 255 })
    email: string;

    @Column({name: 'address_number'})
    addressNumber: string;

    @Column({ nullable: true })
    complement: string;
    
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
}