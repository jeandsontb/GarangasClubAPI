import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export default class Event {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: string;
}
