import db from '../models';

class UserServices {
  static async getUserById(userId) {
    const result = await db.User.findOne({ raw: true, where: { userId } });

    if (!result) {
      return null;
    }

    return result;
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
    const result = await db.User.create({
      username: username,
      email: email,
      phone: phone,
      password: password,
    });
    if (!result) return null;
    return result;
  }

  /**
   * user username exists.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} username
   * @returns {object} data
   * @memberof UserServices
   */
  static async usernameExists(username) {
    const result = await db.User.findOne({
      raw: true,
      where: { username },
    });
    if (!result) return null;
    return result;
  }

  /**
   * user email exists.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} email
   * @returns {object} data
   * @memberof UserServices
   */
  static async emailExists(email) {
    const result = await db.User.findOne({ raw: true, where: { email } });
    if (!result) return null;
    return result;
  }

  /**
   * phone exists.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} phone
   * @returns {object} data
   * @memberof UserServices
   */
  static async phoneExists(phone) {
    const result = await db.User.findOne({ raw: true, where: { phone } });
    if (!result) return null;
    return result;
  }
}

export default UserServices;
