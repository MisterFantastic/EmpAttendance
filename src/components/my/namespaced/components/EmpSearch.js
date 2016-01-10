'use strict';

import React,{PropTypes} from 'react';

class EmpSearch extends React.Component{
    handleClick(e){
        const node=this.refs.input;
        const text=node.value.trim();
        this.props.onAddClick(text);
    }
  
    render(){
        return (<div className="panel panel-primary">
      <div className="panel-heading">Employee Search</div>
             <table>
                <tr>
                    <td>
                        <input type="text" placeholder="First Name" ref="input"/>
                    </td>
                    <td>    
                        <button className="btn btn-primary" onClick={e=>this.handleClick(e)}>Search</button>
                    </td>
                </tr>
             </table>
        </div>);
    }
}

EmpSearch.propTypes={
    onAddClick: PropTypes.func.isRequired
}

export default EmpSearch;