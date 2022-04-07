import React, { Component } from 'react';
import { Route, Redirect,Switch } from 'react-router-dom';
import Movies from './componenets/movies';
import Customers from './componenets/customers';
import Rentals from './componenets/rentals';
import NotFound from './componenets/notFound';
import './App.css';
import NavBar from './componenets/navBar';

class App extends Component {
  render(){
    return (
     <div>
    
        <NavBar></NavBar>
        <main className='container'>
          <Switch>  
            <Route path="/movies" Component={Movies}></Route>
            <Route path="/customers" Component={Customers}></Route>
            <Route path="/rentals" Component={Rentals}></Route>
            <Route path="/notFound" Component={NotFound}></Route> 
            <Redirect from="/" to="/movies"></Redirect>
            <Redirect exact to="notFound"></Redirect>
          </Switch>
        </main>
        
     </div>
      );
  }
}

export default App;
