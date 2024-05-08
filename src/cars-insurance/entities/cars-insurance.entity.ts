import { Max, Min } from "class-validator";
import { Car } from "src/cars/entities/car.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Insurance {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    @Min(8)
    @Max(10)
    policyNumber:string;

    @Column()
    provider:string;

    @Column()
    coverageDetails:string;

    @OneToOne(() => Car, (car) => car.insurance)
    @JoinColumn()
    cars: Car;
}
