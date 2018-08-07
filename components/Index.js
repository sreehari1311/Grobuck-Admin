import React, {Component, PropTypes} from 'react';
import Layout from './Layout';
export default class Index extends Component{

  constructor(props){
    super(props);
    this.setId = this.setId.bind(this);
    this.state ={"shopId":1,logo:"Lulu_Logo.png"};
  }
   
  setId(id){
    let logo = (id == 1)?"Lulu_Logo.png":"walmart.jpg";
    console.log(id);
    this.setState({shopId:id,logo:logo});

  }
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       shopId: this.state.shopId
     })
    );
    return (
      <div>
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
    <div className="container">
        <div className="navbar-header page-scroll">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">GroBuck</a>
        </div>
        <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav">
            <li>
              <a className="page-scroll" href="shop">Shops</a>
            </li>
            <li>
              <a className="page-scroll" href="category">Category</a>
            </li>
            <li>
              <a className="page-scroll" href="subcategory">Sub Category</a>
            </li>
            
            <li>
              <a className="page-scroll" href="brand">Brand</a>
            </li>
            <li>
              <a className="page-scroll" href="products">Products</a>
            </li>
            <li>
              <a className="page-scroll" href="assignPrice">Product Price</a>
            </li>
          </ul>
        </div>
     </div>
     <div className="col-sm-3 col-md-3 " style={{marginLeft:"130px"}}>
         
     </div>
     <div className="col-sm-3 col-md-3 ">
    <form className="navbar-form" role="search">
      
    </form>

    </div>
      
       
    </nav>
    <br />
    <br />
    
      <Layout user={userid}>
        {childrenWithProps}
      </Layout>
    </div>
    );
  }
};
module.exports = Index;