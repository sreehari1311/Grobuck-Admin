import GroceryConstants from '../constants/GroceryConstants.js';
import Utils from '../components/Utils.js';
export default class ShopAction {
  getAllShops(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.GET_ALL_SHOPS);
  }
  createShop(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.SHOP_CREATE);
  }
  deleteShop(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.SHOP_DELETE);
  }
  updateShop(data,api){
    this.Utils = new Utils();
    this.Utils.ajaxPost(data,api,GroceryConstants.SHOP_UPDATE);
  }
}