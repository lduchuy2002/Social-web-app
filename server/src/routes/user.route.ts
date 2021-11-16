import UserController from '@controller/user.controller';
import express from 'express';
const UserRouter = express.Router();

UserRouter.post('/sign-up', UserController.signUp);
UserRouter.post('/sign-in',UserController.signIn);
UserRouter.get('/verify-account/:token',UserController.verifyEmail)

export default UserRouter;