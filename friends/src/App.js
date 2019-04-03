import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import FriendsList from './components/FriendsList';
import FriendsForm from './components/FriendsForm';

import { BrowserRouter as  Route} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    this.getFriends();
  }

  getFriends() {
    axios
    .get(`http://localhost:5000/friends`)
    .then(response => {
      this.setState({ friends: response.data })
    })
    .catch(error => {
      console.error(error)
    });
  }

   // example edit function with put request
   editFriend = (id) => {
    const updatedFriendObj = {
    name: this.state.name,
    age: this.state.age,
    email: this.state.email
    }
    axios.put(`http://localhost:5000/friends/${id}`, updatedFriendObj)
    .then(response => {
    this.setState({
        friends: response.data
    })
    })
    .catch((err) => console.log(err))
}

    //  example delete function with delete request
    deleteFriend = (id) => {
        axios.delete(`http://localhost:5000/friends/${id}`)
        .then(response => {
        this.setState({
            friends: response.data
        })
        }) 
        .catch((err) => console.log(err))
    }

  render() {
    return (
      <div className="App">
        <Route path="/" render={props => <FriendsList {...props} deleteFriend={this.deleteFriend} editFriend={this.editFriend} friendslist={this.state.friends} />} />
        <Route path="/" render={props => <FriendsForm {...props} getFriends={this.getFriends}/> } />
      </div>
    );
  }
}

export default App;
