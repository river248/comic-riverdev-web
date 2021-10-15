import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Header from "components/Header/Header"
import Navigation from "components/Navigation/Navigation"
import HomePage from "pages/HomePage/HomePage"
import ToTop from "components/ToTop/ToTop"
import Footer from "components/Footer/Footer"
import DetailPage from "pages/DetailPage/DetailPage"

import './App.scss'

function App() {
  return (
    <Router>
      
    <div className="app">
        <Header/>
        <Navigation/>
      <Switch>
        <Route path='/home' component={HomePage}/>
        <Route path='/detail' component={DetailPage}/>
      </Switch>
        <ToTop/>
        <Footer/>
    </div>
    </Router>
  )
}

export default App
