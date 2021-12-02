import UserServices from "../../database/services/userServices";

class UserControllers {
  static async findOneUser(req, res) {
    try {
      const userId = req.params.id;
      const response = await UserServices.getUserById(userId);

      if (!response) {
        res.send("Not user");
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
    try {
      const username = req.body.username;
      const password = req.body.password;

      const response = await UserServices.userSignIn(username, password);

      if (!response) {
        return res
          .status(res.statusCode)
          .json({ status: res.statusCode, error: "user not found" });
      }

      return res.status(res.statusCode).json({
        status: res.statusCode,
        message: "user sign in successfully",
        data: response.dataValues,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * user sign up.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof UserController
   */
  static async signUp(req, res) {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const phone = req.body.phone;
      const password = req.body.password;

      const request = await UserServices.userSignUp(
        username,
        email,
        phone,
        password
      );

      if (!request) {
        res
          .status(res.status)
          .json({ status: res.statusCode, error: "failed to create user" });
      }

      return res.status(res.statusCode).json({
        status: res.statusCode,
        message: "user sign up successfully",
        data: request.dataValues,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserControllers;
