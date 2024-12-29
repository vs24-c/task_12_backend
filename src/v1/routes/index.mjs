import express from "express";
import mainRouter from './mains.mjs';
import prodRouter from './products.mjs';
import userRouter from './user.mjs';
import authRouter from "./auth.mjs";
import sellerRouter from "./sellers.mjs";

const router = express.Router()

router.use('/mains', mainRouter);
router.use('/products', prodRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter)
router.use('/sellers', sellerRouter)

export default router;
