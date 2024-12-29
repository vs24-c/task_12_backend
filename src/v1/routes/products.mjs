import Controller from "../controller/productsController.mjs";
// import ValidateSchem from "../validate/validateSchem.mjs";
import uploud from "../../../utils/uploudManager.mjs";
import { Router } from "express";


const router = Router();

// router.post('/', Controller.getProductsList);

router.get('/', Controller.getProductsList) 

router.get('/search', Controller.searchProducts);

router.get('/filter-data', Controller.getPaginationController); 

router.get('/add/:id?', Controller.getAddProductForm);

router.post('/sort', Controller.sortProd);

router.post('/add/:id?', uploud.single('imageSrc'), Controller.addProduct);

router.delete('/:id', Controller.deleteProduct)

export default router;
