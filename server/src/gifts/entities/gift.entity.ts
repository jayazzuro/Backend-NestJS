import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('gifts')
export class Gift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    type: 'text',
    default: '',
  })
  description: string;

  @Column({
    default: 0,
  })
  point: number;

  @Column({
    default: 0,
  })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
