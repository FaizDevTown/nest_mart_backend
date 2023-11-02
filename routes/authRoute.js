import express from 'express';
import { loginController, registerController } from '../Controllers/authController.js'


// router object 
const router  = express.Router();

// routing 
// regitser {method post}
router.post("/register",registerController)
router.post("/login",loginController)



export default router;
