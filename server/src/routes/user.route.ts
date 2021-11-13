import UserController from '@controller/user.controller';
import express from 'express';
const UserRouter = express.Router();

UserRouter.post('/sign-up', UserController.signUp);
UserRouter.post('/sign-in',UserController.signIn);

export default UserRouter;