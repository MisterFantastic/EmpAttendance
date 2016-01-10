require('normalize.css');
require('styles/App.css');

import React,{PropTypes} from 'react';
import EmpListComponent from 'components/my/namespaced/components/EmpListComponent.js';
import EmpSearch from 'components/my/namespaced/components/EmpSearch.js'
// let yeomanImage = require('../images/yeoman.png');
// <img src={yeomanImage} alt="Yeoman Generator" />
        
class AppComponent extends React.Component {
  render() {
      const {EmployeeSearch}=this.props;
    return (  
      <div className="index">
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">Employee Management</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" className="divider"></li>
                                <li className="dropdown-header">Nav header</li>
                                <li><a href="#">Separated link</a></li>
                                <li><a href="#">One more separated link</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="active"><a href="./">Default <span className="sr-only">(current)</span></a></li>
                        <li><a href="../navbar-static-top/">Static top</a></li>
                        <li><a href="../navbar-fixed-top/">Fixed top</a></li>
                    </ul>
                </div>
            </div>
      </nav>
       <div class="jumbotron">
        <h1>Employee Attendance Manager</h1>
        <p>This is a simple demo explaining React with bootstrap</p>
        </div>
        <EmpSearch onAddClick={text=>dispatchSearchEmployee(text)}/>
        <EmpListComponent />
      </div>
      
    );
  }
}

AppComponent.defaultProps = {
    EmployeeSearch:PropTypes.oneOf([
       'EMP_SEARCH' 
    ])
};

export default AppComponent;
