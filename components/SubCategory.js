import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import GroceryConstants from '../constants/GroceryConstants'; 
import CommonStore from '../stores/CommonStore'; 
import CategoryAction from '../actions/CategoryAction';
import Utils from './Utils';
import DataTable from './DataTable';
export default class SubCategory extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createSubCategory = this.createSubCategory.bind(this);
    this._onCategoryChange = this._onCategoryChange.bind(this);
    this._getAllCategory = this._getAllCategory.bind(this);
    this._getAllSubCategories=this._getAllSubCategories.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onEdit = this._onEdit.bind(this);
    this._afterDelete = this._afterDelete.bind(this);
    this._afterUpdate=this._afterUpdate.bind(this);
    this.updateSubCategory = this.updateSubCategory.bind(this);
    this.state ={categories:[],subcategories:[],message:"", categoryId: "1"};
    this.colHeader=["","subCategoryId","subCategoryName","categoryName"];
    this.cAction = new CategoryAction();
    this.init();
  }
  init(){
    let cAction = new CategoryAction();
    cAction.getAllCategory("","getAllCategories");
    cAction.getAllSubCategory("","getAllSubCategories");
  }
  subInit(){
    let cAction = new CategoryAction();
    cAction.getAllSubCategory("","getAllSubCategories");
  }

   handleChange(event) {
    var  val ={};
    val[event.target.id] = event.target.value;
    this.setState(val);
  }
  
  createSubCategory(){
    
    this.cAction.createSubCategory({ "categoryId":this.state.categoryId,"subCategoryName":this.state.subCategoryName},"createSubCategory");
  } 
  updateSubCategory(){
    this.cAction.updateSubCategory({"subCategoryId":this.state.subCategoryId, "categoryId":this.state.categoryId,"subCategoryName":this.state.subCategoryName},"updateSubCategory");
  }
  _onCategoryChange(data){
    this.setState(data);
    this.subInit();
  }
  _getAllCategory(data){
    if(data.data && data.data.length>0){
      this.setState({"categories" : data.data,"categoryId": data.data[0].categoryId});
    }
    
  }
  _getAllSubCategories(data){
    this.setState({"subcategories" : data.data});
  }
  _onDelete(data){
      this.cAction.deleteSubCategory(data,"deleteSubCategory");
  }
  _onEdit(data){
    this.setState(data);
  }
  _afterDelete(data){
    this.setState(data.data);
    this.subInit();
  }
  _afterUpdate(data){
    this.setState(data.data);
    this.subInit();
  }
  componentDidMount() {
    CommonStore.addChangeListener(GroceryConstants.SUBCATEGORY_CREATE,this._onCategoryChange);
    CommonStore.addChangeListener(GroceryConstants.GET_ALL_CATEGORY,this._getAllCategory);
    CommonStore.addChangeListener(GroceryConstants.CATEGORY_SUB_ALL,this._getAllSubCategories);
    CommonStore.addChangeListener(GroceryConstants.SUBCATEGORY_DELETE,this._afterDelete);
    CommonStore.addChangeListener(GroceryConstants.SUBCATEGORY_UPDATE,this._afterUpdate);
  }
  componentWillUnmount() {
    CommonStore.removeChangeListener(GroceryConstants.SUBCATEGORY_CREATE,this._onCategoryChange);
    CommonStore.removeChangeListener(GroceryConstants.GET_ALL_CATEGORY,this._getAllCategory);
    CommonStore.removeChangeListener(GroceryConstants.CATEGORY_SUB_ALL,this._getAllSubCategories);
    CommonStore.removeChangeListener(GroceryConstants.SUBCATEGORY_DELETE,this._afterDelete);
    CommonStore.removeChangeListener(GroceryConstants.SUBCATEGORY_UPDATE,this._afterUpdate);
  }
  getSelectData(selectData){
    let sel = selectData.map(function (sData) {
      return (
         <option value={sData.categoryId} key={sData.key} >{sData.categoryName}</option>
      );
    });
    return sel;
  }
  render(){
    return <div className="container" >
      <div className="panel panel-primary">
        <div className="row">
          <div className="col-lg-2">
            <b> Sub Category </b>
          </div>
          <div className="col-lg-2">
            <b>{this.state.message}</b>
          </div> 
        </div>
      
            <div className="row">
          <div className="col-lg-2">
             Select Category
          </div>
          <div className="col-lg-4">
             <select className="form-control" id="categoryId" name = "categoryId" onChange={this.handleChange}  value={this.state.categoryId} >
                        {this.getSelectData(this.state.categories)}
                </select>
          </div>

            </div>
            <div className="row">
          <div className="col-lg-2">
             Sub Category Name
          </div>
          <div className="col-lg-4">
             <input type="hidden" id="subCategoryId" name="subCategoryId" onChange={this.handleChange} value={this.state.subCategoryId} />
             <input type="text" id="subCategoryName" name="subCategoryName" onChange={this.handleChange} value={this.state.subCategoryName}/>
          </div>

            </div>
            <div className="row">
          <div className="col-lg-2">
            &nbsp;
          </div>
          <div className="col-lg-4">
            <button type="button" className="btn btn-primary" onClick = {this.createSubCategory}>Add Sub Category</button>
             &nbsp;<button type="button" className="btn btn-primary" onClick = {this.updateSubCategory}>Update</button>
          </div>

            </div>
            <div className="row">
            <DataTable dataList={this.state.subcategories}  onDelete={this._onDelete} onEdit={this._onEdit} colHeader={this.colHeader} />
            </div>
            </div>
            </div>

  }
}