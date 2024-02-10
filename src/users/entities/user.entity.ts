/* eslint-disable prettier/prettier */
import { Roles } from 'src/Utility/common/user-Roles-enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique :true})
  email: string;

  @Column({select: false})
  password: string;

  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  roles: Roles[];
  @CreateDateColumn()
  createdAt : Timestamp;
  @UpdateDateColumn()
  UpdatedAt : Timestamp;
  
  
}
