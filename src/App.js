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
import CategoriesPage from "pages/CategoriesPage/CategoriesPage"
import ScrollToTop from "utils/ScrollToTop"
import ReadingPage from "pages/ReadingPage/ReadingPage"
import './App.scss'
import Login from "pages/AccountPage/Login"

function App() {

  return (
    <Router>
      
    <div className="app">
        <Header/>
        <Navigation/>
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/home' component={HomePage}/>
            <Route path='/home/detail-comic/:id' component={DetailPage}/>
            <Route path='/home/reading' component={ReadingPage}/>
            <Route path='/category' component={CategoriesPage}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </ScrollToTop>
        <ToTop/>
        <Footer/>
    </div>
    </Router>
  )
}

export default App
