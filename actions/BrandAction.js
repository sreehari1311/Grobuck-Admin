import GroceryConstants from '../constants/GroceryConstants.js';
import Utils from '../components/Utils.js';
export default class BrandAction {
  createBrand(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.BRANDS_CREATE);
  }
  getAllBrands(data,api){
     this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.BRANDS_GET_ALL);
  }
  deleteBrand(data,api){
     this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.BRANDS_DELETE);
  }
  updateBrand(data,api){
     this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.BRANDS_UPDATE);
  }
}