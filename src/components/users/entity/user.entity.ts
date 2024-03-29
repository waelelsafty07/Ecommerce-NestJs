import { Exclude } from 'class-transformer';
import { Category } from '../../categories/entity/category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Address from '../../addresses/entity/address.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;
  @OneToMany(() => Address, (address: Address) => address.user, {
    eager: true,
    cascade: true,
  })
  address: Address[];
  @OneToMany(() => Category, (category: Category) => category.user)
  categories?: Category[];
}

export default User;
