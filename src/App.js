import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import Home from './components/views/Home'
import PrivateRoute from './components/auth/PrivateRoute'
import TextEditor from './components/views/TextEditor'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <div className="row ml-5 mb-5" style={{borderBottom: 'solid black 1px'}}>
            <Link className="nav-link " to='/'>Koti</Link>
            <Link className="nav-link" to='/editor'>Tekstieditori</Link>
          </div>
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <PrivateRoute path='/editor' component={TextEditor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
