import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('link_movie')
export default class Event {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;
}
