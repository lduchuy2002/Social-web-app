import UserController from '@controller/user.controller';
import authorizeToken from '@middleware/authorizeToken.middleware';

import express from 'express';
const UserRouter = express.Router();

UserRouter.post('/sign-up', UserController.signUp);
UserRouter.post('/sign-in',UserController.signIn);
UserRouter.get('/verify-account/:token',UserController.verifyEmail)
UserRouter.get('/me',authorizeToken,UserController.getUserProfile)

export default UserRouter;