import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/actions';
import CardList from '../cardList';
import Header from '../header';
import Article from '../article';
import SignIn from '../signIn';
import SignUp from '../signUp';
import UserEdit from '../userEdit';
import classes from './App.module.scss';

const App = ({ getUser }) => {
  App.defaultProps = {
    getUser: () => {},
  };

  useEffect(() => {
    getUser();
  });

  return (
    <BrowserRouter>
      <Header />
      <div className={classes.App}>
        <Route path="/" exact component={CardList} />
        <Route path="/article/:slug" component={Article} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/user-edit" component={UserEdit} />
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  getUser: PropTypes.func,
};

function mapStateToProps(state) {
  const { articles } = state;
  return articles;
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(getProfile()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
