import UserController from '../controller/userControler.mjs';
import { Router } from 'express';
import ValidateUsSchem from "../../../validate/validateUser.mjs";

const router = Router();  

router.get('/', UserController.usersList)

export default router