import { Exclude } from "class-transformer";
import { IsString, Length } from "class-validator";
import { Car } from "src/cars/entities/car.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({
        unique: true
    })
    email:string;

    @Exclude()
    @Column({nullable: true})
    password: string;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column("text", {
        array: true,
        default: [],
        nullable: true,
    })
    refreshToken: string[];

    @OneToMany(() => Car, (car) => car.user)
    @JoinColumn({name: "id", referencedColumnName: "userId"})
    cars: Car[];

}