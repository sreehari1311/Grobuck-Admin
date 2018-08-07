import GroceryConstants from '../constants/GroceryConstants.js';
import Utils from '../components/Utils.js';
export default class CategoryAction {
  constructor(){
    this.Utils = new Utils();
  } 
  getProductsByCategory(data,api){
    this.Utils.ajaxPost(data,api,GroceryConstants.PRODUCTS_BY_CATEGORY);
  }
  createCategory(data,api){
    this.Utils.ajaxPost(data,api,GroceryConstants.CREATE_CATEGORY);
  }
  
  updateCategory(data,api){
    this.Utils.ajaxPost(data,api,GroceryConstants.CATEGORY_UPDATE);
  }
  deleteCategory(data,api){
    this.Utils.ajaxPost(data,api,GroceryConstants.CATEGORY_DELETE);
  }
  createSubCategory(data,api){
    this.Utils.ajaxPost(data,api,GroceryConstants.SUBCATEGORY_CREATE);
  }
  deleteSubCategory(data,api){
    this.Utils.ajaxPost(data,api,GroceryConstants.SUBCATEGORY_DELETE);
  }
  updateSubCategory(data,api){
    this.Utils.ajaxPost(data,api,GroceryConstants.SUBCATEGORY_UPDATE);
  }
  getAllCategory(data,api){
    this.Utils.ajaxPost(data,api,GroceryConstants.GET_ALL_CATEGORY);
  }
  getAllSubCategory(data,api){
    this.Utils.ajaxPost(data,api,GroceryConstants.CATEGORY_SUB_ALL);
  }
  getAllSubCategoriesById(data,api){
    this.Utils.ajaxPost(data,api,GroceryConstants.CATEGORY_SUB_ALL);
  }
}