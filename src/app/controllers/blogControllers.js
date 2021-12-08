import BlogServices from '../../database/services/blogServices';
import Response from '../helpers/response';

class BlogControllers {
  /**
   * user create a single post.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof BlogController
   */
  static async createPost(req, res) {
    const { userId, title, description } = req.body;

    const userIdCheck = await BlogServices.checkUserId(userId);
    if (userIdCheck === null) Response.error(res, 404, 'user not found');

    const titleCheck = await BlogServices.checkBlogTitle(title);
    if (titleCheck !== null)
      Response.error(res, 409, 'blog title exists already');

    const descriptionCheck = await BlogServices.checkBlogDescription(
      description
    );
    if (descriptionCheck !== null)
      return Response.error(res, 409, 'description taken already');

    const response = await BlogServices.createBlogPost(
      userId,
      title,
      description
    );

    if (!response) Response.error(res, 400, 'unable to create a post');
    console.log('My Response: ');
    console.log(response);
    return response;
  }
}

export default BlogControllers;
