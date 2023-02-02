import { Router } from "express";
import UserControllers from "../../controllers/userControllers";
import asyncHandler from "../../middlewares/asyncHandler";
import Validator from "../../middlewares/authValidator";

const userRoute = Router();

userRoute.get(
  "/user/auth/signin",
  Validator.signin,
  asyncHandler(UserControllers.signIn)
);
userRoute.post(
  "/user/auth/signup",
  Validator.signup,
  asyncHandler(UserControllers.signUp)
);

export default userRoute;
