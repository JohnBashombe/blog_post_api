import jwt from 'jsonwebtoken';
import Response from './response';

require('dotenv').config();

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
  static generate(payload) {
    let isValidPayload = true;
    if (typeof payload === 'number' || payload === null) {
      isValidPayload = false;
    }

    return isValidPayload
      ? jwt.sign(
          {
            payload,
          },
          process.env.PRIVATE_KEY,
          { expiresIn: 60 * 60 }
        )
      : null;
  }

  /**
   * Get a jwt token.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} token
   * @returns {object} decoded token
   * @memberof Token
   */
  static decode(res, token) {
    try {
      return jwt.verify(token, process.env.PRIVATE_KEY);
    } catch (error) {
      return Response.error(res, 401, 'Token Expired');
    }
  }

  /**
   * Extract a jwt token.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} extract token
   * @memberof Token
   */
  static extract(req, res) {
    const { authorization = '' } = req.headers;
    const token = authorization.slice(7);

    return token;
  }
}

export default Token;
