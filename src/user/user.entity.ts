import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', name: 'userName', unique: true, length: 20 })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', name: 'created_dt' })
  createdDt: Date;
}
