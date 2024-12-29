import Product from "./productsModel.mjs";
import CRUDManager from "../CRUDManager.mjs";

class ProductsServece extends CRUDManager {
  constructor() {
    super(Product);
  }

  async getList(filter ={}, projection = null, populateFields = [] ) {
    try {
      const products = await super.getList(filter,null,populateFields);
      return products;
    } catch (error) {
      console.log('Error in getList Product');
      return [];
    }
  }

  async getPaginatedList({ page = 0, limit = 2, sort }) {
    try {
      const skip = page * limit;

      // const sortOption =
      //   sort && sort !== 'null' ? { price: sort === 'asc' || 'data-asc' ? 1 : -1 } : {};
      const sortMapp = {
        asc: { price: 1 },
        desc: { price: -1 },
        'data-asc': { createdAd: 1 },
        'data-desc': { createdAd: -1 },
      };
      const sortOption = sort && sort !== 'null' ? sortMapp[sort] || {} : {};

      const result = await Product.find()
        .populate('sellers')
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .exec();
      
      const totalDocuments = await Product.countDocuments();
      return {
        data: result.map((doc) => doc.toObject()),
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        currentPage: page,
      };
    } catch (error) {
      throw new Error('Error retrieving paginated data: ' + error.message);
    }
  }

  async searchProductsAllParams(data) {
    try {
      const { brands, sellers, minPrice, maxPrice } = data
      
      let products = await Product.find().populate('sellers')    
       if (brands) {
      const brandList = brands.split(',');
      products = products.filter(product => brandList.includes(product.brand));
    }
      if (sellers) {
      const sellerList = sellers.split(',');
      products = products.filter(product => sellerList.includes(product.sellers.seller));
    }
    if (minPrice) {
      products = products.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      products = products.filter(product => product.price <= parseFloat(maxPrice));
    }

      return products.length > 0 ? products : [];
      
    } catch (error) {
      console.error(error);
    }
  }
}


export default new ProductsServece(Product)