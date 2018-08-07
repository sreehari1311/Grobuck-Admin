import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import GroceryConstants from '../constants/GroceryConstants'; 
import CommonStore from '../stores/CommonStore'; 
import ProductAction from '../actions/ProductAction';
import ShopAction from '../actions/ShopAction';
import Utils from './Utils';
import DataTable from './DataTable';
export default class Shop extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onEdit = this._onEdit.bind(this);
    this._afterDelete = this._afterDelete.bind(this);
    this._afterUpdate = this._afterUpdate.bind(this);
    this._onShopssChange = this._onShopssChange.bind(this);
    this._onCreate = this._onCreate.bind(this);
    this._afterUpdate = this._afterUpdate.bind(this);
    this.createShop = this.createShop.bind(this);
    this.updateShop = this.updateShop.bind(this);
    this.colHeader= ["","shopId","shopName","shopAddress","pin"];
    this.state ={message:"",shops:[]};
    this.init();
  }
  init(){
    let sAction = new ShopAction();
    sAction.getAllShops("","getAllShops");
  }
     handleChange(event) {
    var  val ={};
    val[event.target.id] = event.target.value;
    console.log(val);
    this.setState(val);
  }
  createShop(){
    let sAction = new ShopAction();
    sAction.createShop({shopName:this.state.shopName,shopAddress:this.state.shopAddress,pin:this.state.pin,smallImage:this.state.smallImage,largeImage:this.state.largeImage},"createShop");
  }
   
  updateShop(){
    let sAction = new ShopAction();
    sAction.updateShop({shopId:this.state.shopId,shopName:this.state.shopName,shopAddress:this.state.shopAddress,pin:this.state.pin,smallImage:this.state.smallImage,largeImage:this.state.largeImage},"updateShop");

  }
  _onDelete(data){
   let sAction = new ShopAction();
   console.log("onDelete");
   console.log({shopId:this.state.shopId});
    sAction.deleteShop(data,"deleteShop");
     
  }
  _onEdit(data){
    console.log(data);
    this.setState(data);
  }
  _afterDelete(data){
    this.setState(data.data);
    this.init();
     console.log(data);
  }
  _afterUpdate(data){
    this.setState(data.data);
    this.init();
  }
  _onShopssChange(data){
    this.setState({"shops":data.data});
  }
  _onCreate(data){
    this.setState(data);
    this.init();
  }
  componentDidMount() {
    CommonStore.addChangeListener(GroceryConstants.GET_ALL_SHOPS,this._onShopssChange);
    CommonStore.addChangeListener(GroceryConstants.SHOP_CREATE,this._onCreate);
    CommonStore.addChangeListener(GroceryConstants.SHOP_DELETE,this._afterDelete);
    CommonStore.addChangeListener(GroceryConstants.SHOP_UPDATE,this._afterUpdate);
     
  }
  componentWillUnmount() {
    CommonStore.removeChangeListener(GroceryConstants.GET_ALL_SHOPS,this._onShopssChange);
    CommonStore.removeChangeListener(GroceryConstants.SHOP_CREATE,this._onCreate);
    CommonStore.removeChangeListener(GroceryConstants.SHOP_DELETE,this._afterDelete);
    CommonStore.removeChangeListener(GroceryConstants.SHOP_UPDATE,this._afterUpdate);
  }
  render(){
    console.log(this.state.productId);
    return <div className="container" >
      <div className="panel panel-primary">
        <div className="row">
          <div className="col-lg-2">
            <b>Shop</b>
          </div>
          <div className="col-lg-2">
            <b>{this.state.message}</b>
          </div> 
        </div>
        <div className="row">
          <div className="col-lg-2">
            Shop Name
          </div>
          <div className="col-lg-2">
            <input type="hidden" id="shopId" name="shopId" onChange={this.handleChange} value={this.state.shopId} />
            <input type="text" id="shopName" name="shopName" onChange={this.handleChange} value={this.state.shopName} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Shop Address
          </div>
          <div className="col-lg-2">
            <input type="text" id="shopAddress" name="shopAddress" onChange={this.handleChange} value={this.state.shopAddress} />
          </div>
        </div>
         <div className="row">
          <div className="col-lg-2">
            Pin
          </div>
          <div className="col-lg-2">
            <input type="text" id="pin" name="pin" onChange={this.handleChange} value={this.state.pin} />
          </div>
        </div>
         <div className="row">
          <div className="col-lg-2">
            Small Image
          </div>
          <div className="col-lg-2">
            <input type="text" id="smallImage" name="smallImage" onChange={this.handleChange} value={this.state.smallImage} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Large Image
          </div>
          <div className="col-lg-2">
            <input type="text" id="largeImage" name="largeImage" onChange={this.handleChange} value={this.state.largeImage} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            &nbsp;
          </div>

          <div className="col-lg-4">
            <button type="button" className="btn btn-primary" onClick = {this.createShop}>Create Shop</button>&nbsp;
            <button type="button" className="btn btn-primary" onClick = {this.updateShop}>Update Shop</button>
            
          </div>
        </div>
        <div className="row">
          <DataTable dataList={this.state.shops}  onDelete={this._onDelete} onEdit={this._onEdit} colHeader={this.colHeader} />
        </div>
      </div>
        
    </div>;

  }
}