import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import Image from './Image';

@Entity('projects')
export default class Project {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  future_projects: string;

  @OneToMany(() => Image, image => image.project, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'project_id' })
  images: Image[];
}
