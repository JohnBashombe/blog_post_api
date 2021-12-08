import Joi from 'joi';
import Validation from './validation/index';

class BlogValidator {
  /**
   * Create Blog Post Validator
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof BlogValidator
   */
  static async createBlogPost(req, res, next) {
    const schema = Joi.object().keys({
      userId: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
    });

    Validation.joiHandler(req, res, schema, next);
  }
}

export default BlogValidator;
