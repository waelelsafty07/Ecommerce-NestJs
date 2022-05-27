import User from '../../components/users/entity/user.entity';

const mockedUser: User = {
  id: 1,
  email: 'waelismael08@gmail.com',
  name: 'wael',
  password: '$2b$10$RNb8TYMuXqkQkKHWYNbUEuHZffQQ2uIBb9xnmS3aqXc5Zg6vBG5QO',
  address: [
    {
      id: 1,
      street: 'street 1',
      city: 'city 1',
      country: 'country 1',
    },
    {
      id: 2,
      street: 'street 2',
      city: 'city 2',
      country: 'country 2',
    },
  ],
};

export default mockedUser;
