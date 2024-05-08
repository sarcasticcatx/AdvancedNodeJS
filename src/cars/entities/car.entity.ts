import { Insurance } from "src/cars-insurance/entities/cars-insurance.entity";
import { Manufacturer } from "src/manifacturer/entities/manufacturer.entity";
import { User } from "src/users/entitities/users.entitie";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    make: string;
  
    @Column()
    model: string;
  
    @Column()
    year: number;

    @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.cars)
    @JoinColumn()
    manufacturer: Manufacturer;

    @ManyToOne(() => User, (user) => user.cars)
    @JoinColumn({name: "üserId"})
    user: User;

    @OneToOne(() => Insurance, (insurance) => insurance.cars)
    insurance: Insurance;

}//one to one here and one to one in insurance i many to one






