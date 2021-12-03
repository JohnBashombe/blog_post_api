import jwt from 'jsonwebtoken';

class Token {
  /**
   * Create a jwt token.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} data
   * @param {*} privateKey
   * @returns {object} token
   * @memberof Token
   */
  static createToken(data, privateKey) {
    return jwt.sign(
      {
        data: data,
      },
      privateKey,
      { expiresIn: 60 * 60 }
    );
  }

  /**
   * Get a jwt token.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} token
   * @param {*} privateKey
   * @returns {object} decoded token
   * @memberof Token
   */
  static getToken(token, privateKey) {
    return jwt.verify(token, privateKey);
  }
}

export default Token;
