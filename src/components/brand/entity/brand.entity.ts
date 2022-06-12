import { Exclude } from 'class-transformer';
import User from '../../../components/users/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;
  @ManyToOne(() => User, (user: User) => user.id)
  @Exclude()
  user?: User;
}
