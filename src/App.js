import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Header from "components/Header/Header"
import Navigation from "components/Navigation/Navigation"
import HomePage from "pages/HomePage/HomePage"

import './App.scss'


function App() {
  return (
    <Router>
      
    <div className="app">
        <Header/>
        <Navigation/>
      <Switch>
        <Route exact path='/home' component={HomePage}/>
      </Switch>

    </div>
    </Router>
  )
}

export default App
