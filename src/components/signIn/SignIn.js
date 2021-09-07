import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classes from './SignIn.module.scss';
import { userAuthFetch } from '../../redux/actions';

const SignIn = ({ authentication, authError }) => {
  SignIn.defaultProps = {
    authentication: () => {},
    authError: '',
  };

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid'),

    password: yup
      .string()
      .required('Password is required')
      .min(8, 'не меньше 8 символов')
      .max(40, 'не больше 40 символов'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  return (
    <section className={classes.SignIn}>
      <h5 className={classes['SignIn--title']}>Вход</h5>
      <h5 className={classes['SignIn--auth-error']}>{authError}</h5>
      <form className={classes.Form} onSubmit={handleSubmit(authentication)}>
        <div>Email address</div>
        <input type="email" placeholder="Email address" {...register('email')} />
        <span>{errors.email?.message}</span>

        <div>Password</div>
        <input type="password" placeholder="Password" {...register('password')} />
        <span>{errors.password?.message}</span>

        <button type="submit">Login</button>
      </form>
      <span className={classes['SignIn--have-account']}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </span>
    </section>
  );
};

SignIn.propTypes = {
  authentication: PropTypes.func,
  authError: PropTypes.string,
};

function mapStateToProps(state) {
  const { authError } = state.user;

  return { authError };
}

function mapDispatchToProps(dispatch) {
  return {
    authentication: (user) => dispatch(userAuthFetch(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
