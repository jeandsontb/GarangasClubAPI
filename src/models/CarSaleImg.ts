import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import CarSale from './CarSale';

@Entity('carsale_image')
export default class CarSaleImg {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => CarSale, carsale => carsale.carSaleImages)
  @JoinColumn({ name: 'carsale_id' })
  carsale: CarSale;
}
