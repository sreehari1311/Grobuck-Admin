import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import GroceryConstants from '../constants/GroceryConstants'; 
import CommonStore from '../stores/CommonStore'; 
import ProductAction from '../actions/ProductAction';
import BrandAction from '../actions/BrandAction';
import Utils from './Utils';
import DataTable from './DataTable';
export default class Brand extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createBrand = this.createBrand.bind(this);
    this._onBrandsChange = this._onBrandsChange.bind(this);
    this._onBrandAll = this._onBrandAll.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onEdit = this._onEdit.bind(this);
    this._afterDelete = this._afterDelete.bind(this);
    this.updateBrand = this.updateBrand.bind(this);
    this._afterUpdate = this._afterUpdate.bind(this);
    this.colHeader= ["","brandId","brandName","brandIcon"];
    this.state ={message:"",brands:[]};
    this.init();
  }
  init(){
    let bAction = new BrandAction();
    bAction.getAllBrands("","getAllBrands");
  }
  createBrand(){
    let bAction = new BrandAction();
    bAction.createBrand({brandName:this.state.brandName,brandIcon:this.state.brandIcon},"createBrand");

  }
  updateBrand(){
    if(this.state.brandId){
      let bAction = new BrandAction();
      bAction.updateBrand({brandName:this.state.brandName,brandIcon:this.state.brandIcon,brandId:this.state.brandId},"updateBrand");
      
    }
          
  }
   handleChange(event) {
    var  val ={};
    val[event.target.id] = event.target.value;
    console.log(val);
    this.setState(val);
  }
  _onBrandsChange(data){
    this.setState(data);
    this.init();
  }
  _onBrandAll(data){
    this.setState({brands: data.data});
  }
  _onDelete(data){
    let bAction = new BrandAction();
    bAction.deleteBrand(data,"deleteBrand");
     
  }
  _onEdit(data){
    this.setState(data);
    console.log(data);
  }
  _afterDelete(data){
    this.setState(data);
    this.init();
  }
  _afterUpdate(data){
    this.setState(data);
    this.init();
  }
  componentDidMount() {
    CommonStore.addChangeListener(GroceryConstants.BRANDS_CREATE,this._onBrandsChange);
    CommonStore.addChangeListener(GroceryConstants.BRANDS_GET_ALL,this._onBrandAll);
    CommonStore.addChangeListener(GroceryConstants.BRANDS_DELETE,this._afterDelete);
    CommonStore.addChangeListener(GroceryConstants.BRANDS_UPDATE,this._afterUpdate);
  }
  componentWillUnmount() {
    CommonStore.removeChangeListener(GroceryConstants.BRANDS_CREATE,this._onBrandsChange);
    CommonStore.removeChangeListener(GroceryConstants.BRANDS_GET_ALL,this._onBrandAll);
    CommonStore.removeChangeListener(GroceryConstants.BRANDS_DELETE,this._afterDelete);
    CommonStore.removeChangeListener(GroceryConstants.BRANDS_UPDATE,this._afterUpdate);
  }
  render(){
    console.log(this.state.productId);
    return <div className="container" >
      <div className="panel panel-primary">
        <div className="row">
          <div className="col-lg-2">
            <b>Brand</b>
          </div>
          <div className="col-lg-2">
            <b>{this.state.message}</b>
          </div> 
        </div>
        <div className="row">
          <div className="col-lg-2">
            Brand Name
          </div>
          <div className="col-lg-2">
            <input type="hidden" id="brandId" name="brandId" onChange={this.handleChange} value={this.state.brandId} />
            <input type="text" id="brandName" name="brandName" onChange={this.handleChange} value={this.state.brandName} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            Brand Icon
          </div>
          <div className="col-lg-2">
            <input type="text" id="brandIcon" name="brandIcon" onChange={this.handleChange} value={this.state.brandIcon}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            &nbsp;
          </div>

          <div className="col-lg-4">
            <button type="button" className="btn btn-primary" onClick = {this.createBrand}>Create Brand</button>&nbsp;
            <button type="button" className="btn btn-primary" onClick = {this.updateBrand}>Update Brand</button>
            
          </div>
        </div>
        <div className="row">
          <DataTable dataList={this.state.brands}  onDelete={this._onDelete} onEdit={this._onEdit} colHeader={this.colHeader} />
        </div>
      </div>
        
    </div>;

  }
}