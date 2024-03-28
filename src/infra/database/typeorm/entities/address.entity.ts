import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity {
    @PrimaryColumn({ name: 'zip_code_id', type: 'varchar' })
    zipCodeId: string;

    @Column()
    neighborhood: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column({ name: 'public_place' })
    publicPlace: string;

}
