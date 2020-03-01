import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './myTable.scss'

class MyTable extends Component {
  render() {
    return (
      !!this.props.userList.length &&
      <Table className="mt-5" striped bordered responsive>
        <thead>
        <tr>
          <th>#</th>
          <th onClick={()=>this.props.sortTextUserList("firstName")}>
            <div className="d-flex justify-content-between">First Name<i
              className="material-icons">
              keyboard_arrow_down
            </i></div>
          </th>
          <th onClick={()=>this.props.sortTextUserList("lastName")}>
            <div className="d-flex justify-content-between">Last Name<i
              className="material-icons">
              keyboard_arrow_down
            </i></div>
          </th>
          <th onClick={()=>this.props.sortTextUserList("phone")}>
            <div className="d-flex justify-content-between">Phone<i
              className="material-icons">
              keyboard_arrow_down
            </i></div>
          </th>
          <th onClick={()=>this.props.sortTextUserList("gender")}>
            <div className="d-flex justify-content-between">Gender<i
              className="material-icons">
              keyboard_arrow_down
            </i></div>
          </th>
          <th onClick={()=>this.props.sortNumberUserList("age")}>
            <div className="d-flex justify-content-between">Age<i
              className="material-icons">
              keyboard_arrow_down
            </i>
            </div></th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {this.props.userList.map(user => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td><a href={"tel:"+user.phone} className="Blondie">{user.phone}</a></td>
              <td>{user.gender ? "Male" : "Female"}</td>
              <td>{user.age}</td>
              <td className="p-0"><Button onClick={()=>this.props.onDelete(user.id)} className="mt-1" variant='danger' block>Delete</Button></td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    );
  }
}

export default MyTable;
