import express from 'express';

const authRouter = express.Router();

import {getLoginPage, getSignupPage, postLoginPage, postLogout, postSignupPage} from '../controller/auth.controller.js'

authRouter.get('/login', getLoginPage);
authRouter.post('/login', postLoginPage)
authRouter.get('/signup', getSignupPage)
authRouter.post('/signup', postSignupPage)
authRouter.post('/logout', postLogout);



export default authRouter;