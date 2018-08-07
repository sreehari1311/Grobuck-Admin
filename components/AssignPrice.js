import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import GroceryConstants from '../constants/GroceryConstants'; 
import CommonStore from '../stores/CommonStore'; 
import ProductAction from '../actions/ProductAction';
import CategoryAction from '../actions/CategoryAction';
import ShopAction from '../actions/ShopAction';
import Utils from './Utils';
import DataTable from './DataTable';
export default class AssignPrice extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createProductPrice = this.createProductPrice.bind(this);
    this._onProductsChange = this._onProductsChange.bind(this);
    this._getAllCategory = this._getAllCategory.bind(this);
    this._getAllShops = this._getAllShops.bind(this);
    this._getAllProducts = this._getAllProducts.bind(this);
    this._getAllProductsByShop = this._getAllProductsByShop.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onEdit = this._onEdit.bind(this);
    this.getProductsByCategory=this.getProductsByCategory.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.getProductsByShop = this.getProductsByShop.bind(this);
    this.handleShopChange = this.handleShopChange.bind(this);
    this.state ={message:"",productName: "",productshops:[], categories:[],parentProducts:[],shops:[],products:[],productDescription: "", smallImage: "",price:0,discount:0,weight:0,unit:"kg",stock:1};
    this.colHeader=["","productId","productName","price","discount"];
    this.init();
  }
  init(){
    let cAction = new CategoryAction();
    let pAction = new ProductAction();
    let sAction = new ShopAction();
    cAction.getAllCategory("","getAllCategories");
     sAction.getAllShops("","getAllShops");
    
  }

   handleChange(event) {
    var  val ={};
    val[event.target.id] = event.target.value;
    this.setState(val);
  }
  handleCategoryChange(event) {
    this.handleChange(event);
    this.setState({products:[]});
    this.getProductsByCategory(event.target.value);
  }
  handleShopChange(event) {
    this.handleChange(event);
    this.setState({productshops:[]});
    this.getProductsByShop(event.target.value);
  }
  
  createProductPrice(){
    console.log(this.state);
    let pAction = new ProductAction();  
    pAction.createProductPrice({productId: this.state.productId,shopId:this.state.shopId, price: this.state.price,discount: this.state.discount},"createProductPrice");
  }
  _onProductsChange(data){
    this.setState(data);
    let cAction = new CategoryAction();
    cAction.getProductsByCategory({shopId:this.state.shopId,"categoryId":this.state.productCategoryId},"getProductsByCategory");
  }
  _getAllCategory(data){
     if(data.data && data.data.length > 0){
      this.setState({"categories" : data.data,"categoryId":data.data[0].categoryId});
      let cAction = new CategoryAction();
      cAction.getProductsByCategory({"categoryId":data.data[0].categoryId},"getProductsByCategoryId");
     }
  }
   
  _getAllProductsByShop(data){
    this.setState({productshops:data.data});
  }
  _getAllShops(data){
    if(data.data && data.data.length > 0){
      this.setState({"shops" : data.data,"shopId":data.data[0].shopId});
      this.getProductsByShop(data.data[0].shopId);
    }
  }

  _getAllProducts(data){
    if(data.data && data.data.length > 0){
      console.log(data.data);
      this.setState({"products" : data.data,"productId":data.data[0].productId,"price":data.data[0].price,"discount":data.data[0].discount});

    }
    
  }
  _onDelete(data){
       
  }
  _onEdit(data){
    this.setState(data);
  }
  getProductsByShop(shopId){
    let pAction = new ProductAction();
    pAction.getProductsPriceByShop({shopId:shopId},"getProductPriceByShop");
  }
  getProductsByCategory(catId){
   
    let cAction = new CategoryAction();
    cAction.getProductsByCategory({"categoryId":catId},"getProductsByCategoryId");
  }
  
  getSelectData(selectData){
    let sel = selectData.map(function (sData) {
      return (
         <option value={sData.categoryId} key={sData.categoryId} >{sData.categoryName}</option>
      );
    });
    return sel;
  }
  getShopsSelectData(selectData){
    let sel = selectData.map(function (sData) {
      return (
         <option value={sData.shopId} key={sData.shopId} >{sData.shopName}</option>
      );
    });
    return sel;
  }
   getProductsSelectData(selectData){
     
    let sel = selectData.map(function (sData) {
      return (
         <option value={sData.productId} key={sData.productId} >{sData.productName}</option>
      );
    });
    return sel;
  }
  componentDidMount() {
    CommonStore.addChangeListener(GroceryConstants.PRODUCTS_CREATE,this._onProductsChange);
    CommonStore.addChangeListener(GroceryConstants.GET_ALL_CATEGORY,this._getAllCategory);
    CommonStore.addChangeListener(GroceryConstants.GET_ALL_SHOPS,this._getAllShops);
    CommonStore.addChangeListener(GroceryConstants.PRODUCTS_BY_CATEGORY,this._getAllProducts);
    CommonStore.addChangeListener(GroceryConstants.PRODUCTS_PRICE_BY_SHOP,this._getAllProductsByShop);
    
  }
  componentWillUnmount() {
    CommonStore.removeChangeListener(GroceryConstants.PRODUCTS_CREATE,this._onProductsChange);
    CommonStore.removeChangeListener(GroceryConstants.GET_ALL_CATEGORY,this._getAllCategory);
    CommonStore.removeChangeListener(GroceryConstants.GET_ALL_SHOPS,this._getAllShops);
    CommonStore.removeChangeListener(GroceryConstants.PRODUCTS_BY_CATEGORY,this._getAllProducts);
    CommonStore.removeChangeListener(GroceryConstants.PRODUCTS_PRICE_BY_SHOP,this._getAllProductsByShop);
    
  }
  render(){
    console.log(this.state.productId);
    return <div className="container" >
      <div className="panel panel-primary">
        <div className="row">
          <div className="col-lg-2">
            <b> Product Price </b>
          </div>
          <div className="col-lg-2">
            <b>{this.state.message}</b>
          </div> 
        </div>
        <div className="row">
          <div className="col-lg-2">
            Shop
          </div>
          <div className="col-lg-4">
            <select className="form-control" id="shopId" name = "shopId" onChange={this.handleShopChange}  value={this.state.shopId} >
              {this.getShopsSelectData(this.state.shops)}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Select Product Category
          </div>
          <div className="col-lg-4">
            <select className="form-control" id="productCategoryId" name = "productCategoryId" onChange={this.handleCategoryChange}  value={this.state.productCategoryId} >
              {this.getSelectData(this.state.categories)}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Select Product
          </div>
          <div className="col-lg-4">
            <select className="form-control" id="productId" name = "productId" onChange={this.handleChange}  value={this.state.productId} >
              {this.getProductsSelectData(this.state.products)}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Weight
          </div>
          <div className="col-lg-2">
            <input type="text" id="weight" name="weight" onChange={this.handleChange} value={this.state.weight}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Unit
          </div>
          <div className="col-lg-2">
            <input type="text" id="unit" name="unit" onChange={this.handleChange} value={this.state.unit}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Price
          </div>
          <div className="col-lg-2">
            <input type="text" id="price" name="price" onChange={this.handleChange} value={this.state.price}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Discount
          </div>
          <div className="col-lg-2">
            <input type="text" id="discount" name="discount" onChange={this.handleChange} value={this.state.discount}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Stock
          </div>
          <div className="col-lg-2">
            <input type="text" id="stock" name="stock" onChange={this.handleChange} value={this.state.stock}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            &nbsp;
          </div>
          <div className="col-lg-4">
            <button type="button" className="btn btn-primary" onClick = {this.createProductPrice}>Add Price</button>
          </div>
        </div>
        <div className="row">
            <DataTable dataList={this.state.productshops}  onDelete={this._onDelete} onEdit={this._onEdit} colHeader={this.colHeader} />
          </div>
      </div>
    </div>;

  }
}