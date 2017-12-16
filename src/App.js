import React from 'react'
import './App.css'
import Backstage from './views/backstage'
import Home from './views/home'
import Login from './views/login'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Route exact path="/" component={Home}/>
            <Route path="/backstage" component={Backstage}/>
            <Route path="/login" component={Login}/>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
