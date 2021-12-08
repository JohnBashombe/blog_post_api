import Router from 'express';
import BlogControllers from '../../controllers/blogControllers';
import asyncHandler from '../../middlewares/asyncHandler';
import BlogValidator from '../../middlewares/blogValidator';

class BlogRouter {
  /**
   * Create blog post Route.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*}
   * @returns {object} response
   * @memberof BlogServices
   */
  static blogCreateRoute() {
    const route = Router();
    route.post(
      '/blog/create',
      BlogValidator.createBlogPost,
      asyncHandler(BlogControllers.createPost)
    );
    return route;
  }
}

export default BlogRouter;
