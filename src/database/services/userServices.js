import db from "../models";

class UserServices {
  static async getUserById(userId) {
    const res = await db.User.findOne({ where: { userId } });

    if (!res) return null;

    return res;
  }

  /**
   * user sign in.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} username
   * @param {*} password
   * @returns {object} data
   * @memberof UserServices
   */

  static async userSignIn(username, password) {
    const res = await db.User.findOne({
      where: { username, password },
    });

    return res;
  }

  /**
   * user sign up.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} username
   * @param {*} email
   * @param {*} phone
   * @param {*} password
   * @returns {object} data
   * @memberof UserServices
   */
  static async userSignUp(username, email, phone, password) {
    try {
      const request = await db.User.create({
        username: username,
        email: email,
        phone: phone,
        password: password,
      });

      return request;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserServices;
