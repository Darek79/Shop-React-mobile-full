import React, { useEffect, useState, useRef, useContext } from 'react';
import { connect } from 'react-redux';
import LinkButton from './../../Button/LinkButton';
import { logout, checkJWT, verifyToken } from '../../../redux/actions/fetchJWT';
import { NavLink } from 'react-router-dom';

import './LoginStatus.scss';

const LoginStatus = ({ tokenReducer, logout, checkJWT, verifyToken }) => {
  const [myName, setMyName] = useState('');
  const refName = useRef(null);
  useEffect(() => {
    if (tokenReducer.name !== undefined) {
      const nameArr = tokenReducer.name.split(' ');
      console.log(nameArr);
      setMyName(
        () => `${nameArr[0][0].toUpperCase()}${nameArr[1][0].toUpperCase()}`
      );
    }
  }, [tokenReducer]);

  useEffect(() => {
    const obj = JSON.stringify({ token: tokenReducer.data });
    checkJWT('signin/verify', obj, verifyToken, logout);
  }, []);
  const logmeOut = () => {
    logout();
  };
  return (
    <section className='loginStatus_wrapper'>
      {tokenReducer.name !== undefined ? (
        <div data-name={myName} className='loginStatus_msg'>{`${
          tokenReducer && tokenReducer.name
        }`}</div>
      ) : (
        <NavLink
          to={{
            pathname: '/login',
            state: { refferer: window.location.pathname },
          }}
          className='loginStatus_status'>
          Login or Sign up
        </NavLink>
      )}
      <section className='loginStatus_logoutBtn_wrapper'>
        <div className='loginStatus_logoutBtn' onClick={logmeOut}>
          Logout
        </div>
        {tokenReducer.name ? (
          <NavLink
            to={{
              pathname: '/member',
              state: { refferer: window.location.pathname },
            }}
            className='loginStatus_logoutBtn'>
            Member Area
          </NavLink>
        ) : undefined}
      </section>
    </section>
  );
};

const storage = ({ tokenReducer }) => ({
  tokenReducer,
});

export default connect(storage, { logout, checkJWT, verifyToken })(LoginStatus);
