import productsService from "../models/products/productsService.mjs";
import ProductsService from "../models/products/productsService.mjs";
import { validationResult } from "express-validator";


class ProductsController {
  static async getProductsList(req, res) {
    try { 
            const filter = {};
            for (const key in req.query) {
              req.query[key] && (filter[key] = req.query[key]);
            }
      const productsList = await ProductsService.getList(filter,null, ['sellers']);
      res.status(200).json({
        data: productsList,
        user: req.user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error.message});
    }
  }

  static async getPaginationController(req, res) {    
    try {      
      const { page = 0, limit = 2, sort } = req.query
      const paginRes = await productsService.getPaginatedList({
        page: parseInt(page),
        limit: parseInt(limit),
        sort
      })            
      res.status(200).json(paginRes)
    } catch (error) {
      res.status(500).json({ error: error.message })    }
  }

  static async sortProd(req, res) {    
    try {
      const { sort } = req.body
      const products = await ProductsService.sortProdService({sort})
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json({
        products,
        user: req.user,
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error.message});
    }
  }

  static async searchProducts(req, res) {
    try {
      const products = await ProductsService.searchProductsAllParams( req.query );
      res.status(200).json({
        data: products,
        user: req.user,
      })
    } catch (error) {
      console.log(error.message);
      res.status(500).json({error: error.message});
    }
  }
  static async getAddProductForm(req, res) {
    if (!req.user) {
      return res.status(403).json({error: 'Access denied'});
    }
    try {
      const id = req.params.id;
      let product = null;
      if (id) {
        product = await ProductsService.getById(id);
      }
      res.status(200).json({
        product,
        user: req.user,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({error: error.message});
    }
  }

  static async addProduct(req, res) {
    if (!req.user) {
      return res.status(403).json({error: 'Access denied'});
    }
    try {
      const products = req.body;      
      if (req.file?.buffer) products.imageSrc = req.file.buffer.toString('base64');
      if (req.params.id) {
        await ProductsService.update(req.params.id, products);
      } else {
        await ProductsService.create(products);
      }
      res.status(200).json({message: 'Product registered successfully'});
    } catch (error) {
      console.log(error.message);
      res.status(500).json({error: error.message});
    }
  }

  static async deleteProduct(req, res) {
    if (!req.user) {
      return res.status(403).json({error: 'Access denied'});
    }

    try {
      await ProductsService.delete(req.params.id);
      res.status(200).json({message: 'Product deleted'});
    } catch (error) {
      console.log(error.message);
      res.status(500).json({error: error.message});
    }
  }
}
  
export default ProductsController;