import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'login' })
export class LoginEntity {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: string;

    @Column({ name: 'name', length: 100, nullable: false })
    name: string;

    @Column({ name: 'email', length: 100, nullable: false, unique: true })
    email: string;

    @Column({ name: 'password', length: 250, nullable: false })
    password: string;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;
}
