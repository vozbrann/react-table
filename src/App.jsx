import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from './components/UserForm';
import Container from 'react-bootstrap/Container';
import MyTable from './components/MyTable';

import './app.scss'

import {getUserList, setUserList} from './utils/localStorage'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: getUserList() || [],
    }
  }

  onSubmit = (user) => {
    this.setState((prevState) => {
      const newList = [user, ...prevState.userList];
      setUserList(newList);
      return {userList: newList};
    });
  };

  onDelete = (id) => {
    this.setState((prevState) => {
      const newList = prevState.userList.filter(user => user.id !== id);
      setUserList(newList);
      return {userList: newList};
    });
  };

  sortTextUserList = (sortField) => {
    this.setState((prevState) => {
      let userList = prevState.userList;
      userList.sort((a, b) => ('' + a[sortField]).localeCompare(b[sortField]));
      return {userList};
    });
  };

  sortNumberUserList = (sortField) => {
    this.setState((prevState) => {
      let userList = prevState.userList;
      userList.sort((a, b) => a[sortField] - b[sortField]);
      return {userList};
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="text-center mb-5">User form</h1>
        <Container fluid="lg">
          <UserForm onSubmit={this.onSubmit}/>
          <MyTable
            sortTextUserList={this.sortTextUserList}
            sortNumberUserList={this.sortNumberUserList}
            onDelete={this.onDelete}
            userList={this.state.userList}/>
        </Container>
      </div>
    );
  }
}

export default App;
