import { Router } from "express";
import UserControllers from "../../controllers/userControllers";

const getUserRoute = Router();
const userSignIn = Router();
const userSignUp = Router();

getUserRoute.get('/auth/user/:id', UserControllers.findOneUser);
userSignIn.get('/user/auth/signin/', UserControllers.signIn);
userSignUp.post('/user/auth/signup/', UserControllers.signUp);

module.exports = { getUserRoute, userSignIn, userSignUp };
