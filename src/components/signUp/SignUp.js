import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classes from './SignUp.module.scss';
import { userPostFetch } from '../../redux/actions';

const SignUp = ({ registration, error }) => {
  SignUp.defaultProps = {
    registration: () => {},
    error: {},
  };

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'не меньше 3 символов')
      .max(20, 'не больше 20 символов'),

    email: yup.string().required('Email is required').email('Email is invalid'),

    password: yup
      .string()
      .required('Password is required')
      .min(8, 'не меньше 8 символов')
      .max(40, 'не больше 40 символов'),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: yup.bool().oneOf([true], 'Accept Ts & Cs is required'),
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
    <section className={classes.SignUp}>
      <h5 className={classes['SignUp--title']}>Create new account</h5>

      <form className={classes.Form} onSubmit={handleSubmit(registration)}>
        <div>Username</div>
        <input type="text" placeholder="Username" {...register('username')} />
        <span>{errors.username?.message || error.username}</span>

        <div>Email address</div>
        <input type="text" placeholder="Email address" {...register('email')} />
        <span>{errors.email?.message || error.email}</span>

        <div>Password</div>
        <input type="password" placeholder="Password" {...register('password')} />
        <span>{errors.password?.message || error.password}</span>

        <div>Repeat Password</div>
        <input type="password" placeholder="Repeat Password" {...register('confirmPassword')} />
        <span>{errors.confirmPassword?.message || error.password}</span>

        <input type="checkbox" id="checkbox" {...register('acceptTerms')} />
        <label htmlFor="checkbox">I agree to the processing of my personal information</label>
        <span>{errors.acceptTerms?.message}</span>

        <button type="submit">Login</button>
      </form>
      <span className={classes['SignUp--have-account']}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </span>
    </section>
  );
};

SignUp.propTypes = {
  registration: PropTypes.func,
  error: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  const { error } = state.user;

  return { error };
}

function mapDispatchToProps(dispatch) {
  return {
    registration: (user) => dispatch(userPostFetch(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
