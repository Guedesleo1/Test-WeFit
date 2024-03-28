import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity {
    @PrimaryColumn({ name: 'cep_id', type: 'varchar' })
    cepId: string;

    @Column()
    neighborhood: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column({ name: 'public_place' })
    publicPlace: string;

}
