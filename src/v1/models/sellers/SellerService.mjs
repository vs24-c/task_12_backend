import Seller from "./SellerModel.mjs";
import CRUDManager from "../CRUDManager.mjs";

class SellerService extends CRUDManager {
  constructor() {
    super(Seller);
  }

  async getSellersList(filter = {}, projection = null, populateFields = []) {
    try {;      
      const res = await super.getList(filter, null, populateFields);
      return res;
    } catch (error) {
      return [];
    }
  }

  async addSeller(data) {
    try {
      const seller = await super.create(data);
      return seller;
    } catch (error) {
      return [];
    }
  }
}

export default new SellerService(Seller)