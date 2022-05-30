import { Request } from 'express';
import User from '../../components/users/entity/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
