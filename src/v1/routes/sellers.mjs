import Controller from "../controller/sellersController.mjs";
import { Router } from "express";

const router = Router();

router.post('/add', Controller.addSeller)

router.get('/', Controller.getSellers)

export default router