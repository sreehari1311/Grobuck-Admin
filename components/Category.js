import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import GroceryConstants from '../constants/GroceryConstants'; 
import CommonStore from '../stores/CommonStore'; 
import CategoryAction from '../actions/CategoryAction';
import Utils from './Utils';
import DataTable from './DataTable';
export default class CreateCategory extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._getAllCategory = this._getAllCategory.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onEdit = this._onEdit.bind(this);
    this._afterDelete = this._afterDelete.bind(this);
    this._afterUpdate = this._afterUpdate.bind(this);
    this.state ={categories:[],message:"", categoryId: "1"};
    this.colHeader= ["","categoryId","categoryName"];
    this.cAction = new CategoryAction();
    this.init();
  }
  init(){
   this.cAction.getAllCategory("","getAllCategories");
  }

   handleChange(event) {
    var  val ={};
    val[event.target.id] = event.target.value;
    this.setState(val);
  }
  createCategory(){
    this.cAction.createCategory({categoryName: this.state.categoryName},"createCategory");

  }
  updateCategory(){

     this.cAction.updateCategory({categoryId:this.state.categoryId,categoryName: this.state.categoryName},"updateCategory");
  }
  _onDelete(data){
     this.cAction.deleteCategory(data,"deleteCategory");
  }
  _onEdit(data){
    console.log(data);
    this.setState(data);
  }
  
  _onDataChange(data){
    this.setState(data);
    this.init();
  }
  _getAllCategory(data){
    this.setState({"categories" : data.data});
  }
  _afterDelete(data){
    this.setState(data.data);
    this.init();
  }
  _afterUpdate(data){
    this.setState(data.data);
    this.init();
  }
  componentDidMount() {
    CommonStore.addChangeListener(GroceryConstants.CREATE_CATEGORY,this._onDataChange);
    CommonStore.addChangeListener(GroceryConstants.GET_ALL_CATEGORY,this._getAllCategory);
    CommonStore.addChangeListener(GroceryConstants.CATEGORY_DELETE,this._afterDelete);
    CommonStore.addChangeListener(GroceryConstants.CATEGORY_UPDATE,this._afterUpdate);
  }
  componentWillUnmount() {
    CommonStore.removeChangeListener(GroceryConstants.CREATE_CATEGORY,this._onDataChange);
    CommonStore.removeChangeListener(GroceryConstants.GET_ALL_CATEGORY,this._getAllCategory);
    CommonStore.removeChangeListener(GroceryConstants.CATEGORY_DELETE,this._afterDelete);
    CommonStore.removeChangeListener(GroceryConstants.CATEGORY_UPDATE,this._afterUpdate);
  }
  render(){
    return <div className="container" >
      <div className="panel panel-primary">
        <div className="row">
          <div className="col-lg-2">
            <b> Category </b>
          </div>
          <div className="col-lg-2">
            <b>{this.state.message}</b>
          </div> 
        </div>
         
        <div className="row">
          <div className="col-lg-2">
            Category Name
          </div>
          <div className="col-lg-2">
            <input type="hidden" id="categoryId" name="categoryId" onChange={this.handleChange} value={this.state.categoryId} />
            <input type="text" id="categoryName" name="categoryName" onChange={this.handleChange} value={this.state.categoryName} />
          </div>
          </div>
           
             <div className="row">
          <div className="col-lg-2">
            &nbsp;
          </div>
          <div className="col-lg-4">
            <button type="button" className="btn btn-primary" onClick = {this.createCategory}>Create</button>
            &nbsp;<button type="button" className="btn btn-primary" onClick = {this.updateCategory}>Update</button>
          </div>

            </div>
            <div className="row">
                <DataTable dataList={this.state.categories}  onDelete={this._onDelete} onEdit={this._onEdit} colHeader={this.colHeader} />
             </div>
            </div>
            </div>

  }
}