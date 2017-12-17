import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/backstage">Backstage</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    )
  }
}

export default Home
