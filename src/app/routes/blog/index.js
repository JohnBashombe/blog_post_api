import Router from 'express';
import BlogControllers from '../../controllers/blogControllers';
import asyncHandler from '../../middlewares/asyncHandler';
import BlogValidator from '../../middlewares/blogValidator';
import Auth from '../../middlewares/authentication';

class BlogRouter {
  /**
   * Create blog post Route.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*}
   * @returns {object} response
   * @memberof BlogRouter
   */
  static createBlog() {
    const route = Router();
    route.post(
      '/blog/create',
      BlogValidator.createBlogPost,
      asyncHandler(Auth.user),
      asyncHandler(BlogControllers.createPost)
    );
    return route;
  }

  /**
   * Fetch blog posts.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*}
   * @returns {object} route
   * @memberof BlogRouter
   */
  static fetchBlog() {
    const route = Router();
    route.get('/blog/posts', asyncHandler(BlogControllers.fetchBlogs));
    return route;
  }

  /**
   * Fetch blog by blogId posts.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*}
   * @returns {object} route
   * @memberof BlogRouter
   */
  static fetchBlogById() {
    const route = Router();
    route.get(
      '/blog/post/:blogId',
      BlogValidator.fetchBlogById,
      asyncHandler(BlogControllers.fetchBlogById)
    );
    return route;
  }

  /**
   * Update blog post by blogId and userId
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*}
   * @returns {object} route
   * @memberof BlogRouter
   */
  static updateBlogById() {
    const route = Router();
    route.put(
      '/blog/post/:blogId',
      BlogValidator.updatePostById,
      asyncHandler(Auth.user),
      asyncHandler(BlogControllers.updateBlogById)
    );
    return route;
  }

  /**
   * Delete blog post by blogId and userId
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*}
   * @returns {object} route
   * @memberof BlogRouter
   */
  static deleteBlogById() {
    const route = Router();
    route.delete(
      '/blog/post/:blogId',
      BlogValidator.deletePostById,
      asyncHandler(Auth.user),
      asyncHandler(BlogControllers.deleteBlogById)
    );
    return route;
  }
}

export default BlogRouter;
