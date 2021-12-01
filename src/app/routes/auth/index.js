import { Router } from 'express';
import UserControllers from '../../controllers/userControllers';

const userRoute = Router();

userRoute.get('/auth/user/:id', UserControllers.findOneUser);

export default userRoute;
