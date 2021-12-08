import Token from '../helpers/tokenUtils';
import Response from '../helpers/response';
import UserServices from '../../database/services/userServices';

class Auth {
  static async user(req, res, next) {
    const token = Token.extract(req, res);
    if (!token) {
      return Response.error(res, 401, 'unauthorized token');
    }

    const decoded = Token.decode(res, token);

    if (decoded.payload === undefined) {
      return false;
    }

    const { userId } = decoded.payload;

    const user = await UserServices.getUserById(userId);
    if (!user) {
      return Response.error(res, 401, 'unauthorized token');
    }

    req['currentUser'] = user;

    next();
  }
}

export default Auth;
