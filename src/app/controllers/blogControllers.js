import BlogServices from "../../database/services/blogServices";
import UserServices from "../../database/services/userServices";
import Response from "../helpers/response";

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
    const { userId } = req["currentUser"];

    const { title, description } = req.body;

    const userIdCheck = await BlogServices.checkUserId(userId);
    if (userIdCheck === null) {
      return Response.error(res, 404, "user not found");
    }

    const titleCheck = await BlogServices.checkBlogTitle(title);
    if (titleCheck !== null) {
      return Response.error(res, 409, "blog title exists already");
    }

    const descriptionCheck = await BlogServices.checkBlogDescription(
      description
    );
    if (descriptionCheck !== null) {
      return Response.error(res, 409, "description taken already");
    }

    const response = await BlogServices.createBlogPost(
      userId,
      title,
      description
    );

    if (!response) {
      Response.error(res, 400, "unable to create a post");
    }

    const { blogId, createdAt } = response;

    return Response.success(res, 201, "blog created", {
      blogId,
      userId,
      title,
      description,
      createdAt,
    });
  }

  /**
   * fetch all blogs.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof BlogController
   */
  static async fetchBlogs(req, res) {
    const response = await BlogServices.fetchBlogs();
    if (!response) {
      return Response.error(res, 404, "no blog found");
    }
    return Response.success(res, 200, "blog lists", response);
  }
  /**
   * fetch blog by ID.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof BlogController
   */
  static async fetchBlogById(req, res) {
    const response = await BlogServices.fetchBlogById(
      parseInt(req.params.blogId)
    );

    if (!response) {
      return Response.error(res, 404, "blog not found");
    }

    const { blogId, userId, title, description, createdAt, updatedAt } =
      response;

    const getUser = await UserServices.getUserById(userId);
    if (!getUser) {
      return Response.error(res, 404, "error occured");
    }

    const { username } = getUser;

    return Response.success(res, 200, "Blog Details", {
      blogId,
      userId,
      title,
      description,
      createdAt,
      updatedAt,
      User: {
        username,
      },
    });
  }

  /**
   * Update blog by blogId and userId.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof BlogController
   */
  static async updateBlogById(req, res) {
    const { blogId } = req.params;
    const { userId } = req["currentUser"];
    const { title, description } = req.body;

    if (!userId) {
      return Response.error(res, 400, "update failed");
    }

    const blogResponse = await BlogServices.fetchBlogById(parseInt(blogId));
    if (!blogResponse) {
      return Response.error(res, 400, "update failed");
    }

    const titleCheck = await BlogServices.checkBlogTitle(title);
    if (titleCheck !== null) {
      return Response.error(res, 409, "blog title taken");
    }

    const descriptionCheck = await BlogServices.checkBlogDescription(
      description
    );
    if (descriptionCheck !== null) {
      return Response.error(res, 409, "description taken");
    }

    const response = await BlogServices.updateBlogById(
      userId,
      blogResponse.blogId,
      title,
      description
    );

    if (!response) {
      return Response.error(res, 400, "update failed");
    }

    const data = await BlogServices.fetchBlogById(blogResponse.blogId);

    return Response.success(res, 200, "updated", {
      blogId: data.blogId,
      userId: data.userId,
      title: data.title,
      description: data.description,
      updatedAt: data.updatedAt,
    });
  }

  /**
   * Delete blog by blogId and userId.
   * @author Ntavigwa Bashombe JB
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof BlogController
   */
  static async deleteBlogById(req, res) {
    const { userId } = req["currentUser"];
    const { blogId } = req.params;

    const getBlogById = await BlogServices.fetchBlogById(blogId);

    if (!getBlogById) {
      return Response.error(res, 400, "an error ocurred");
    }

    const response = await BlogServices.deleteBlogById(blogId, userId);

    if (!response) {
      return Response.error(res, 400, "unable to delete");
    }

    return Response.success(res, 200, "deleted", {
      id: getBlogById.id,
      userId: getBlogById.userId,
      title: getBlogById.title,
      description: getBlogById.description,
    });
  }
}

export default BlogControllers;
