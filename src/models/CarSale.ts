import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import CarSaleImg from './CarSaleImg';

@Entity('carsale')
export default class CarSale {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  phone: string;

  @Column()
  price: string;

  @Column()
  cover: string;

  @OneToMany(() => CarSaleImg, image => image.carsale, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'carsale_id' })
  carSaleImages: CarSaleImg[];
}
