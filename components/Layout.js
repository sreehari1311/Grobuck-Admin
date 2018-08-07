import React, {Component, PropTypes} from 'react';
import {browserHistory,Link} from 'react-router';
export default class  Layout extends Component{

  constructor(props){
    super(props);
  }
 
  render(){

    return (
      <section id="intro"  >
        <div  >
            <div className="row">
                
            </div>
            <div className="row">
              {this.props.children}
            </div>
        </div>
      </section>
      );
  }

}