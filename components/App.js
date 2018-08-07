import React, {Component, PropTypes} from 'react';
import { Router, Route, Link,IndexRoute,browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Product from './Product';
import SubCategory from './SubCategory';
import AssignPrice from './AssignPrice';
import Index from './Index';
import Brand from './Brand';
import Shop from './Shop';
import Category from './Category';
window.addEventListener("load", function(){
ReactDOM.render((
  <Router  history={browserHistory}>
      <Route name="app" path="/" component={Index}>
          <IndexRoute component={Product} />
          <Route name="products" path="products" component={Product} />
          <Route name="category" path="category" component={Category} />
          <Route name="subcategory" path="subcategory" component={SubCategory} />
          <Route name="assignPrice" path="assignPrice" component={AssignPrice} />
          <Route name="brand" path="brand" component={Brand} />
          <Route name="shop" path="shop" component={Shop} />
      </Route>
  </Router>
  ),document.getElementById('content'));

});