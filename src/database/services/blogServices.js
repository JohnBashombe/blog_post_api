import db from '../models/index';

class BlogServices {
  /**
   * Check for userId.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} userId
   * @returns {object} response
   * @memberof BlogServices
   */
  static async checkUserId(userId) {
    const response = await db.User.findOne({ where: { userId } });
    if (!response) return null;
    return response;
  }
  /**
   * Check blog title.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} title
   * @returns {object} response
   * @memberof BlogServices
   */
  static async checkBlogTitle(title) {
    const response = await db.Blog.findOne({ where: { title } });
    if (!response) return null;
    return response;
  }
  /**
   * Check blog description.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} description
   * @returns {object} response
   * @memberof BlogServices
   */
  static async checkBlogDescription(description) {
    const response = await db.Blog.findOne({ where: { description } });
    if (!response) return null;
    return response;
  }

  /**
   * Create blog post.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} userId
   * @param {*} title
   * @param {*} description
   * @returns {object} response
   * @memberof BlogServices
   */
  static async createBlogPost(userId, title, description) {
    const response = await db.Blog.create({
      userId: userId,
      title: title,
      description: description,
    });
    if (!response) return null;
    return response;
  }
}

export default BlogServices;
