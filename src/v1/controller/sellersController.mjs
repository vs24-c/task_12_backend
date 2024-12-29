import SellerService from "../models/sellers/SellerService.mjs";

class SellersController {

  static async getSellers(req, res) {
    try {
      const filter = {};
      for (const key in req.query) {
        req.query[key] && (filter[key] = req.query[key]);
      }      
      const sellersList = await SellerService.getSellersList(filter, null,['seller']);
      res.status(200).json({
        sellers: sellersList,
        user: req.user,
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error.message});
    }
  }
  static async addSeller(req, res) {
     if (!req.user) {
       return res.status(403).json({error: 'Access denied'});
      }          
    try {
      const sellerData = req.body;
      await SellerService.addSeller(sellerData);
      res.status(200).json({massege: 'Seller registered successfully'})
    } catch (error) {
      console.log(error.message);
      res.status(500).json({error: error.message});
    }
  }
}

export default SellersController;