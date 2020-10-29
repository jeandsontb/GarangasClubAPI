import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('historic')
export default class Historic {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;
}
