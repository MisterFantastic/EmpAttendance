'use strict';

import React from 'react';

require('styles/my/namespaced/components/EmpList.css');

class EmpListComponent extends React.Component {

  render() {
    return (
      <div className="panel panel-primary">
      <div className="panel-heading">Employee Details List</div>
      <table className="table table-bordered">
        <thead>
            <tr className="headerRow">
                <td>SNO</td>
                <td>EmployeeID</td>
                <td>Name</td>
                <td>Address1</td>
                <td>Address2</td>
                <td>Zip</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr className="danger">
                <td>1</td>
                <td>12345</td>
                <td>John</td>
                <td>Overton Street</td>
                <td></td>
                <td>76132</td>
                <td><a href="#">Edit</a></td>
            </tr>
            <tr className="">
                <td>2</td>
                <td>12346</td>
                <td>Scott</td>
                <td>Oliver Blvd, Samson Street</td>
                <td></td>
                <td>76132</td>
                <td><a href="#">Edit</a></td>
            </tr>
            <tr className="">
                <td>3</td>
                <td>12347</td>
                <td>Raven</td>
                <td>Hulen Street</td>
                <td></td>
                <td>76132</td>
                <td><a href="#">Edit</a></td>
            </tr>
            <tr className="">
                <td>4</td>
                <td>12348</td>
                <td>Marry</td>
                <td>Bellaire Street</td>
                <td></td>
                <td>76132</td>
                <td><a href="#">Edit</a></td>
            </tr>
            <tr className="">
                <td>5</td>
                <td>12349</td>
                <td>Mano</td>
                <td>International Plaza</td>
                <td></td>
                <td>76132</td>
                <td><a href="#">Edit</a></td>
            </tr>
        </tbody>
      </table>
      </div>
    );
  }
}

EmpListComponent.displayName = 'MyNamespacedComponentsEmpListComponent';

// Uncomment properties you need
// NameComponent.propTypes = {};
// NameComponent.defaultProps = {};

export default EmpListComponent;
