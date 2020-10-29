import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import Project from './Project';

@Entity('images')
export default class Image {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Project, project => project.images )
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
