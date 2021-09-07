import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classes from './UserEdit.module.scss';
import { updateProfile } from '../../redux/actions';

const UserEdit = ({ error, userData, userUpdate }) => {
  UserEdit.defaultProps = {
    userUpdate: () => {},
    error: {},
    userData: {},
  };

  const schema = yup.object().shape({
    username: yup
      .mixed()
      .test(
        'Password must be empty or has length from 8 to 40 characters',
        (value) => value === '' || (value.length >= 3 && value.length <= 20)
      ),

    email: yup.string().email('Email is invalid'),

    password: yup
      .mixed()
      .test(
        'Password must be empty or has length from 8 to 40 characters',
        (value) => value === '' || (value.length >= 8 && value.length <= 40)
      ),

    image: yup.string().url(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const uuu = userData.username ? userData.username : '';
  const eee = userData.email || '';
  console.log(uuu);
  const [username, setUsername] = useState(uuu);
  const [email, setEmail] = useState(eee);

  useEffect(() => {
    setUsername(uuu);
    setEmail(eee);
  }, [uuu, eee]);

  const updateUsername = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setUsername(value);
  };

  const updateEmail = (event) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
  };

  console.log(username);
  console.log(email);

  const testUpdate = (data) => {
    const obj = {};
    obj.username = username;
    obj.email = email;

    if (data.password !== '') {
      obj.password = data.password;
    }

    if (data.image !== '') {
      obj.image = data.image;
    }
    return userUpdate(obj);
  };

  return (
    <section className={classes.UserEdit}>
      <h5 className={classes['UserEdit--title']}>Edit Profile</h5>

      <form className={classes.Form} onSubmit={handleSubmit(testUpdate)}>
        <div>Username</div>
        <input
          type="text"
          placeholder="Username"
          {...register('username')}
          value={username}
          onChange={updateUsername}
        />
        <span>{errors.username?.message || error.username}</span>

        <div>Email address</div>
        <input type="text" placeholder="Email address" {...register('email')} value={email} onChange={updateEmail} />
        <span>{errors.email?.message || error.email}</span>

        <div>New password</div>
        <input type="password" placeholder="New password" {...register('password')} />
        <span>{errors.password?.message || error.password}</span>

        <div>Avatar image (url)</div>
        <input placeholder="Avatar image" type="url" {...register('image')} />
        <span>{errors.image?.message}</span>

        <button type="submit">Save</button>
      </form>
    </section>
  );
};

UserEdit.propTypes = {
  userUpdate: PropTypes.func,
  error: PropTypes.instanceOf(Object),
  userData: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  const { error, userData } = state.user;

  return { error, userData };
}

function mapDispatchToProps(dispatch) {
  return {
    userUpdate: (user) => dispatch(updateProfile(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
