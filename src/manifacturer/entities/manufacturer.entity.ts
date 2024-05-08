import { Car } from "src/cars/entities/car.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manufacturer {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    headquarters: string;

    @OneToMany(() => Car, (car) => car.manufacturer)
    cars: Car[];
  
} // can produce many models of cars 
//but each car is produced by one manufacurer

