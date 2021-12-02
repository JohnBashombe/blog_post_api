import { getUserRoute, userSignIn, userSignUp } from "./auth/index";

/**
 * @class Routing
 */
class Routing {
  static run(app) {
    app.use(getUserRoute);
    app.use(userSignIn);
    app.use(userSignUp);

    app.get("/", (req, res) => {
      res.status(200).json({ code: 200, message: "Home Page" });
    });

    app.use("*", (req, res) => {
      res.status(404).json({ code: 404, message: "Page Not Found" });
    });
  }
}

export default Routing;
