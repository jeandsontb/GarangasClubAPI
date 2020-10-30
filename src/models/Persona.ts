import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { array } from 'yup';

import PersonaImg from './PersonaImg';

@Entity('personas')
export default class Persona {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  avatar: string;

  @OneToMany(() => PersonaImg, image => image.persona, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'persona_id' })
  personaImages: PersonaImg[];
}
