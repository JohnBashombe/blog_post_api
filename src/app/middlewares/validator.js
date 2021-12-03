import Joi from "joi";

import Validation from "./validation";

class Validator {
  /**
   * user sign in validator.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof Validator
   */
  static async signin(req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    Validation.joiHandler(req, res, schema, next);
  }

  /**
   * user sign up validator.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof Validator
   */
  static async signup(req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
    });

    Validation.joiHandler(req, res, schema, next);
  }
}

export default Validator;
