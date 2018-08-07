import GroceryConstants from '../constants/GroceryConstants.js';
import Utils from '../components/Utils.js';
export default class ProductAction {
   
  createProduct(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_CREATE);
  }
   
  updateProduct(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_UPDATE);
    
  }
  createProductPrice(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_CREATE);
  }
   
  getAllProducts(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_ALL);
  }
  
  deleteProduct(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_DELETE);
  }
  getProductsByShop(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_BY_SHOP);
  }
  getProductsPriceByShop(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_PRICE_BY_SHOP);
  }
}