import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut } from '../../redux/actions';
import classes from './Header.module.scss';
import user from './user.jpg';

const Header = ({ userData, logout }) => {
  Header.defaultProps = {
    userData: {},
    logout: () => {},
  };

  const notAuth = !userData.token ? (
    <div>
      <Link to="/sign-in" className={classes['Header--link']}>
        Sign In
      </Link>
      <Link to="/sign-up" className={classes['Header--link']}>
        Sign Up
      </Link>
    </div>
  ) : null;

  const userLogo = !userData.image ? user : userData.image;

  const auth = userData.token ? (
    <div>
      <Link to="/create-article" className={classes['Header--create-article']}>
        Creacte article
      </Link>
      <span> {userData.username} </span>
      <Link to="/user-edit">
        <img src={userLogo} className={classes['Header--user-logo']} alt="user" />
      </Link>
      <Link to="/" className={classes['Header--link']} onClick={logout}>
        Log Out
      </Link>
    </div>
  ) : null;

  return (
    <section className={classes.Header}>
      <Link to="/" className={classes['Header--logo']}>
        Realworld Blog
      </Link>
      {notAuth}
      {auth}
    </section>
  );
};

Header.propTypes = {
  userData: PropTypes.instanceOf(Object),
  logout: PropTypes.func,
};

function mapStateToProps(state) {
  const { userData } = state.user;
  return { userData };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
