import express from "express";
import { authLoginController, authRegisterController, currentUserController } from "../controllers/authController.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router()

//REGISTER
router.post('/register',authRegisterController)

//LOGIN
router.post('/login',authLoginController)

//GET CURRENT USER
router.get('/current-user',userAuth,currentUserController)


export default router