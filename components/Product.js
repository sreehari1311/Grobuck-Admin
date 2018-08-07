import React, {Component, PropTypes} from 'react';
import Immutable,{Map} from 'immutable';
import {browserHistory} from 'react-router';
import GroceryConstants from '../constants/GroceryConstants'; 
import CommonStore from '../stores/CommonStore'; 
import ProductAction from '../actions/ProductAction';
import CategoryAction from '../actions/CategoryAction';
import Utils from './Utils';
import DataTable from './DataTable';
export default class Product extends Component{
  constructor(props){
    super(props);
    this.categoryMap = {};
    this.handleChange = this.handleChange.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this._onProductsChange = this._onProductsChange.bind(this);
    this._getAllProducts = this._getAllProducts.bind(this);
    this._afterDelete = this._afterDelete.bind(this);
    this._afterUpdate = this._afterUpdate.bind(this);
    this._onEdit = this._onEdit.bind(this);
    this._getAllSubCategories=this._getAllSubCategories.bind(this);
    this.colHeader = [" ","productId","productName","productDescription","details","warning"];
    this.state ={message:"",productName: "", subcategories:[],categories:[],shops:[],products:[],productDescription: "",smallImage: "",price:0,discount:0};
    this.init(); 
  }
  init(){
    let cAction = new CategoryAction();
    let pAction = new ProductAction();
    pAction.getAllProducts("","getAllProducts");
    cAction.getAllSubCategory("","getAllSubCategories");
  }
  initProducts(){
    let pAction = new ProductAction();
    pAction.getAllProducts("","getAllProducts");
  }
   handleChange(event) {
    var  val ={};
    val[event.target.id] = event.target.value;
    this.setState(val);
  }
  _getAllSubCategories(data){
    if(data.data && data.data.length>0){
      this.categoryMap = {};
      let catData = {};
      data.data.map(function (subCateogry) {
        catData[subCateogry.subCategoryId ]= subCateogry.categoryId;
        console.log(subCateogry.categoryId);
      });
      this.categoryMap = Immutable.Map(catData)
      this.setState({"subcategories" : data.data,subCategoryId:data.data[0].subCategoryId});
    }
    
  }
  createProduct(){
    const pAction = new ProductAction();
    const catId = this.categoryMap.get(String(this.state.subCategoryId));
    let productJSON = {productName: this.state.productName, productDescription: this.state.productDescription, categoryId: catId,subCategoryId:this.state.subCategoryId, smallImage: this.state.smallImage};
    productJSON["productDetails"] = {details:this.state.details,ingrediants:this.state.ingrediants,directions:this.state.ingrediants,directions:this.state.directions,warning:this.state.warning};
    pAction.createProduct(productJSON,"createProduct");

  }
  
  updateProduct(){
    if(this.state.productId){
      let pAction = new ProductAction();
      let catId = this.categoryMap.get(String(this.state.subCategoryId));
      let productJSON = {productId:this.state.productId,productName: this.state.productName, productDescription: this.state.productDescription, categoryId: catId,subCategoryId:this.state.subCategoryId, smallImage: this.state.smallImage};
      productJSON["productDetails"] = {details:this.state.details,ingrediants:this.state.ingrediants,directions:this.state.ingrediants,directions:this.state.directions,warning:this.state.warning};
      pAction.updateProduct(productJSON,"updateProduct");
     
    }
          
  }
  _onDelete(data){
    let pAction = new ProductAction();  
    pAction.deleteProduct(data,"deleteProduct");
  }
  _afterDelete(data){
    this.setState(data);
    this.initProducts();
  }
  _afterUpdate(data){
    this.setState(data);
    this.initProducts();
  }
  _onEdit(data){
    console.log(data);
     this.setState(data);
  }
  _onProductsChange(data){
    this.setState(data);
    this.initProducts();
  } 

 
  _getAllProducts(data){
    if(data.data && data.data.length>0){
       data.data.forEach(function(element) {
         element["details"] = element.productDetails.details;
         element["warning"] = element.productDetails.warning;
         element["ingrediants"] = element.productDetails.ingrediants;
         element["directions"] = element.productDetails.directions;
       });
       this.setState({"products" : data.data,productCategoryId:data.data[0].productCategoryId,productSubCategoryId:data.data[0].productSubCategoryId});
    }
   
     
  }
   
  
  componentDidMount() {
    CommonStore.addChangeListener(GroceryConstants.PRODUCTS_CREATE,this._onProductsChange);
    CommonStore.addChangeListener(GroceryConstants.PRODUCTS_ALL,this._getAllProducts);
    CommonStore.addChangeListener(GroceryConstants.PRODUCTS_DELETE,this._afterDelete);
    CommonStore.addChangeListener(GroceryConstants.PRODUCTS_UPDATE,this._afterUpdate);
    CommonStore.addChangeListener(GroceryConstants.CATEGORY_SUB_ALL,this._getAllSubCategories);
  }
  componentWillUnmount() {
    CommonStore.removeChangeListener(GroceryConstants.PRODUCTS_CREATE,this._onProductsChange);
    CommonStore.removeChangeListener(GroceryConstants.PRODUCTS_ALL,this._getAllProducts);
    CommonStore.removeChangeListener(GroceryConstants.PRODUCTS_DELETE,this._afterDelete);
    CommonStore.removeChangeListener(GroceryConstants.PRODUCTS_UPDATE,this._afterUpdate);
    CommonStore.removeChangeListener(GroceryConstants.CATEGORY_SUB_ALL,this._getAllSubCategories);
  }
  getSelectData(selectData){
    let sel = selectData.map(function (sData) {
      return (
         <option value={sData.subCategoryId} key={sData.key} >{sData.subCategoryName}</option>
      );
    });
    return sel;
  }
  render(){
    return <div className="container" >
      <div className="panel panel-primary">
        <div className="row">
          <div className="col-lg-2">
            <b> Create Product </b>
          </div>
          <div className="col-lg-2">
            <b>{this.state.message}</b>
          </div> 
        </div>
        <div className="row">
          <div className="col-lg-2">
             Select Sub Category
          </div>
          <div className="col-lg-4">
             <select className="form-control" id="subCategoryId" name = "subCategoryId" onChange={this.handleChange}  value={this.state.subCategoryId} >
              {this.getSelectData(this.state.subcategories)}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Product Name
          </div>
          <div className="col-lg-4">
            <input id="productName" name="productName" onChange={this.handleChange} value={this.state.productName}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Product Description
          </div>
          <div className="col-lg-4">
            <input id="productDescription" name="productDescription" onChange={this.handleChange} value={this.state.productDescription}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            small image
          </div>
          <div className="col-lg-4">
            <input id="smallImage" name="smallImage" onChange={this.handleChange} value={this.state.smallImage}/>
          </div>
        </div>
         <div className="row">
          <div className="col-lg-2">
            Product Details
          </div>
          <div className="col-lg-2">
            <textarea id="details" name="details" onChange={this.handleChange} value={this.state.details}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Ingredients
          </div>
          <div className="col-lg-2">
            <textarea id="ingrediants" name="ingrediants" onChange={this.handleChange} value={this.state.ingrediants}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Directions
          </div>
          <div className="col-lg-2">
            <textarea id="directions" name="directions" onChange={this.handleChange} value={this.state.directions}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Warning
          </div>
          <div className="col-lg-2">
            <textarea id="warning" name="warning" onChange={this.handleChange} value={this.state.warning}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            &nbsp;
          </div>
          <div className="col-lg-4">
            <button type="button" className="btn btn-primary" onClick = {this.createProduct}>Create Product</button>&nbsp;
            <button type="button" className="btn btn-primary" onClick = {this.updateProduct}>Update Product</button>
          </div>
        </div>
        <div className="row">
            <DataTable dataList={this.state.products}  onDelete={this._onDelete} onEdit={this._onEdit} colHeader={this.colHeader} />
          </div>
      </div>
    </div>;
  }
}