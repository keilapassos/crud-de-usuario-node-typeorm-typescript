import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, UpdateDateColumn, UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity('users')
export default class User {
    // @PrimaryGeneratedColumn('uuid')
    // uuid!: string;

    // @Column()
    // name!: string;

    // @Column({ unique: true })
    // email!: string;

    // @Column()
    // password!: string;

    // // @BeforeUpdate()
    // @BeforeInsert()
    // hashPassword() {
    //     this.password = bcrypt.hashSync(this.password, 10);
    // }    

    // @Column()
    // isAdm!: boolean;

    // @Column()
    // createdOn!: Date;

    // @BeforeInsert()
    // createHour(){
    //     this.createdOn = new Date();
    // }

    // @BeforeInsert()
    // updateHour(){
    //     this.updatedOn = new Date();
    // }   
    // @BeforeInsert()
    // @UpdateDateColumn()
    // updatedOn!: Date;

    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    // @Column({nullable: true})
    @Column()
    name!: string;

    @Column({ unique: true })
    // @Column()
    email!: string;

    @Column()
    password!: string;

    // @Column({nullable: true})
    @Column()
    isAdm!: boolean;

    // @BeforeInsert()
    // hashPassword() {
    //     this.password = bcrypt.hashSync(this.password, 10);
    // }    

    @Column()
    createdOn!: Date;

    @Column()
    updatedOn!: Date;

    @BeforeInsert()
    createHour(){
        this.createdOn = new Date();
    }

    @BeforeInsert()
    updateHour(){
        this.updatedOn = new Date();
    } 

}

