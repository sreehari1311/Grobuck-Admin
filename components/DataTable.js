"use strict";
var FixedDataTable = require('fixed-data-table');
var React = require('react');

const {Table, Column, Cell} = FixedDataTable;
const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

const DelCell = ({rowIndex, data, col,onDelete,onEdit, ...props}) => (
  <Cell {...props}>
    <a href="#" onClick={(event) =>{onEdit(data.getObjectAt(rowIndex))}}>
          <span className="glyphicon glyphicon-edit"></span>
    </a>&nbsp;&nbsp;
    <a href="#" onClick ={(event) =>{onDelete(data.getObjectAt(rowIndex))}} ><span className="glyphicon glyphicon-trash"></span></a>
  </Cell>
);
class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;

  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data[this._indexMap[index]];
  }
   
}

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this._defaultSortIndexes = [];
    this._dataList =  this.props.dataList;
    this.colHeader = this.props.colHeader;
    console.log(this._dataList);
    var size = this._dataList.length;
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    this.state = {
      filteredDataList: new DataListWrapper(this._defaultSortIndexes, this._dataList)
    };
    console.log("State");
    console.log(this.state.filteredDataList);
    this._onFilterChange = this._onFilterChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentWillReceiveProps(newProps){
    this._dataList =  newProps.dataList;
    this._defaultSortIndexes = [];
    var size = this._dataList.length;
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    this.setState(
      {filteredDataList: new DataListWrapper(this._defaultSortIndexes, this._dataList)}
      );
  }
  onDelete(data){
     this.props.onDelete(data);
     
  }
  onEdit(data){
     this.props.onEdit(data);
     
  }
  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: new DataListWrapper(this._defaultSortIndexes,this._dataList),
      });
    }

    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.length;
    var filteredIndexes = [];

    var size = this._dataList.length;
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var item = this._dataList[index];
       
          console.log(item["productParentName"]);
         for(var i=0;i<this.colHeader.length;i++){
         if (item[this.colHeader[i]] != null &&  String(item[this.colHeader[i]]).toLowerCase().indexOf(filterBy) !== -1) {
            if(!filteredIndexes.includes(index))
                filteredIndexes.push(index);
          
      }
    }
    }



     

    this.setState({
      filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
    });
  }

  render() {
    let filteredDataList = this.state.filteredDataList;
    let onDelete = this.onDelete;
    let onEdit = this.onEdit;
    return (
      <div>
        <input
          onChange={this._onFilterChange}
          placeholder="Filter by Any"
        />
        <br />
        <Table
          rowHeight={50}
          rowsCount={filteredDataList.getSize()}
          headerHeight={50}
          width={1000}
          height={500}
          {...this.props}>

          {this.colHeader.map(function(v, i){
            console.log(v+":::"+i);
            if(i === 0){
              console.log("Zero condition");
              return <Column
            header={<Cell>{v}</Cell>}
            cell={<DelCell data={filteredDataList} onDelete={onDelete} onEdit={onEdit} col={v} />}
            width={100}
            isResizeable={true}
            flexGrow={50}
          />
            }else{
          var colms = <Column
            header={<Cell>{v}</Cell>}
            cell={<TextCell data={filteredDataList} col={v} />}
            width={100}
            isResizeable={true}
            flexGrow={50}
          />
           
           return colms;
         }
           })}
        </Table>
      </div>
    );
  }
}

module.exports = DataTable;