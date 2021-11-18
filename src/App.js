import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Header from 'components/Header/Header'
import Navigation from 'components/Navigation/Navigation'
import HomePage from 'pages/HomePage/HomePage'
import ToTop from 'components/ToTop/ToTop'
import Footer from 'components/Footer/Footer'
import DetailPage from 'pages/DetailPage/DetailPage'
import CategoriesPage from 'pages/CategoriesPage/CategoriesPage'
import ScrollToTop from 'utils/ScrollToTop'
import ReadingPage from 'pages/ReadingPage/ReadingPage'
import Login from 'pages/AccountPage/Login'
import NotFound from 'pages/NotFound/NotFound'
import './App.scss'
import UserPage from 'pages/UserPage/UserPage'
import PrivateRoute from 'utils/PrivateRoute'
import PublicRoute from 'utils/PublicRoute'
import Loading from 'components/Loading/Loading'
import { useSelector } from 'react-redux'
import HistoryPage from 'pages/HistoryPage/HistoryPage'
import AdminPage from 'pages/AdminPage/AdminPage'

function App() {

  const loading = useSelector(state => state.loading)

  return (
    <Router>
      
    <div className='app'>
        <Header/>
        <Navigation/>
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/home' component={HomePage}/>
            <Route path='/home/detail-comic/:id' component={DetailPage}/>
            <Route path='/home/reading' component={ReadingPage}/>
            <Route path='/category' component={CategoriesPage}/>
            <PrivateRoute path='/user' component={UserPage}/>
            <PrivateRoute path='/history/:id' component={HistoryPage}/>
            <PublicRoute path='/login' component={Login}/>
            <PrivateRoute path='/admin/:id' component={AdminPage}/>
            <Route exact component={NotFound}/>
          </Switch>
        </ScrollToTop>
        {(loading.comicLoading || loading.newComicLoading || loading.chapterLoading) && <Loading/>}
        <ToTop/>
        <Footer/>
    </div>
    </Router>
  )
}

export default App
