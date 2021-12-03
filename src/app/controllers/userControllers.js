import UserServices from '../../database/services/userServices';
import Response from '../helpers/response';
import CryptPassword from '../helpers/comparePassword';
import Token from '../helpers/jwtAuthentication';

class UserControllers {
  static async findOneUser(req, res) {
    try {
      const userId = req.params.id;
      const response = await UserServices.getUserById(userId);

      if (!response) {
        return Response.error(response, 409, 'user not found');
      }

      res.send({ ...response });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * user sign in.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof UserController
   */
  static async signIn(req, res) {
    const { username, password } = req.body;

    const response = await UserServices.usernameExists(username);

    if (!response) {
      return Response.error(res, 409, 'wrong username or password');
    }

    const match = await CryptPassword.comparePswd(password, response.password);
    if (!match) {
      return Response.error(res, 409, 'wrong username or password');
    }

    const data = {
      userId: response.userId,
      username,
      email: response.email,
      phone: response.phone,
    };

    const dataResponse = {
      ...data,
      token: Token.createToken(data, process.env.PRIVATE_KEY),
    };

    return Response.sucess(res, 200, 'user sign in successfully', dataResponse);
  }

  /**
   * user sign up / check for unique username, email, password.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof UserController
   */
  static async signUp(req, res) {
    const { username, email, phone, password } = req.body;

    const usernameExists = await UserServices.usernameExists(username);
    const emailExists = await UserServices.emailExists(email);
    const phoneExists = await UserServices.phoneExists(phone);

    if (usernameExists)
      return Response.error(res, 409, 'Username taken already');

    if (emailExists) return Response.error(res, 409, 'Email taken already');

    if (phoneExists) return Response.error(res, 409, 'Phone taken already');

    const response = await UserServices.userSignUp(
      username,
      email,
      phone,
      password
    );

    if (!response) {
      return Response.error(res, 409, 'failed to create user');
    }
    const data = {
      userId: response.userId,
      username,
      email,
      phone,
    };

    const dataResponse = {
      ...data,
      token: Token.createToken(data, process.env.PRIVATE_KEY),
    };

    return Response.sucess(
      res,
      201,
      'user signin up successfully',
      dataResponse
    );
  }
}

export default UserControllers;
