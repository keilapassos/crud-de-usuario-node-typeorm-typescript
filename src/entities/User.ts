import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export default class User {

    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    isAdm!: boolean;    

    @Column()
    password!: string;

    @CreateDateColumn()
    createdOn!: Date;

    @UpdateDateColumn()
    updatedOn!: Date;
}

