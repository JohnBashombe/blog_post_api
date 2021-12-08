import userRoute from './auth/index';
import BlogRouter from './blog/index';

/**
 * @class Routing
 */
class Routing {
  static run(app) {
    app.use(userRoute);
    app.use(BlogRouter.createBlog());
    app.use(BlogRouter.fetchBlog());
    app.use(BlogRouter.fetchBlogById());
    app.use(BlogRouter.updateBlogById());
    app.use(BlogRouter.deleteBlogById());

    app.get('/', (req, res) => {
      res.status(200).json({ code: 200, message: 'Home Page' });
    });

    app.use('*', (req, res) => {
      res.status(404).json({ code: 404, message: 'Page Not Found' });
    });
  }
}

export default Routing;
