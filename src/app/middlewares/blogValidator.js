import Joi from 'joi';
import Validation from './validation';

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
      title: Joi.string().required(),
      description: Joi.string().required(),
    });

    Validation.joiHandlerBody(req, res, schema, next);
  }
  /**
   * Fetch Blog by Id
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof BlogValidator
   */
  static async fetchBlogById(req, res, next) {
    const schema = Joi.object().keys({
      blogId: Joi.number().required(),
    });

    Validation.joiHandlerParams(req, res, schema, next);
  }

  /**
   * Update blog by blog_id
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof BlogValidator
   */
  static async updatePostById(req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
    });

    await Validation.joiHandlerBody(req, res, schema, next);
  }

  /**
   * Delete blog by blog_id
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof BlogValidator
   */
  static async deletePostById(req, res, next) {
    const schema = Joi.object().keys({
      blogId: Joi.number().required(),
    });

    await Validation.joiHandlerParams(req, res, schema, next);
  }
}

export default BlogValidator;
