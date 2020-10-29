import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import Persona from './Persona';

@Entity('photopersonas')
export default class PersonaImg {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Persona, persona => persona.personaImages)
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;
}
