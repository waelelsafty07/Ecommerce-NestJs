import { Request } from 'express';
import User from 'src/components/users/entity/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
