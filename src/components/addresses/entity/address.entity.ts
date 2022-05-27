import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../../users/entity/user.entity';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @ManyToOne(() => User, (user: User) => user.id)
  @Exclude()
  user?: User;
}

export default Address;
