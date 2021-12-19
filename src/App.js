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
import HistoryPage from 'pages/HistoryPage/HistoryPage'
import AdminPage from 'pages/AdminPage/AdminPage'
import Signup from 'pages/AccountPage/Signup'
import ForgotPassword from 'pages/AccountPage/ForgotPassword'
import MessengerCustomerChat from 'react-messenger-customer-chat'
import { connect } from 'react-redux'
import ConfirmBox from 'components/Modal/ConfirmBox'
import UserManagementPage from 'pages/UserManagermentPage/UserManagementPage'


function App({ loading, confirmStatus}) {
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
            <PublicRoute path='/register' component={Signup}/>
            <PublicRoute path='/login' component={Login}/>
            <PublicRoute path='/forgot-password' component={ForgotPassword}/>
            <PrivateRoute path='/admin/:id' component={AdminPage}/>
            <PrivateRoute path='/user-management' component={UserManagementPage}/>
            <Route exact component={NotFound}/>
          </Switch>
        </ScrollToTop>
        <MessengerCustomerChat pageId="107515045102191" appId="399127468622408"/>
        {(loading.comicLoading || loading.newComicLoading || loading.chapterLoading) && <Loading/>}
        <ToTop/>
        {confirmStatus.show && <ConfirmBox/>}
    </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    confirmStatus: state.user.confirmStatus
  }
}

export default connect(mapStateToProps, null)(App)
