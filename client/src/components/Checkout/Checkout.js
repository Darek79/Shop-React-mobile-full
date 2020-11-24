import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Arrow } from './../../components/PushableContainer/arrow';
import {
  resToken,
  checkJWT,
  verifyToken,
} from './../../redux/actions/fetchJWT';
import { emailCheck, verifyFields } from './../../helper/helperFN';
import { useHistory, useLocation } from 'react-router-dom';

import './Checkout.scss';

const Checkout = ({
  descTxt,
  passConfirm = false,
  isLogin = false,
  isGuest = false,
  createAcc = true,
  submitBtn,
  tokenReducer,
  resToken,
  checkJWT,
  verifyToken,
  path,
  shouldBeOpen = false,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(shouldBeOpen);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [err, setErr] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPassConfirm] = useState('');

  useEffect(() => {
    console.log('init');
    // setShouldSubmit(() => false);
    console.log(shouldSubmit);
    // if (shouldSubmit) {
    //   shouldSubmit(() => false);
    // }
    console.log(!shouldSubmit && tokenReducer.data);
    console.log(!shouldSubmit, tokenReducer.data);
    console.log(tokenReducer);
    if (!shouldSubmit && tokenReducer.data) {
      const obj = JSON.stringify({ token: tokenReducer.data });
      checkJWT('signin/verify', obj, verifyToken);
    }
  }, []);
  useEffect(() => {
    if (shouldSubmit) {
      console.log('SHOULD SUBMIT');
      const serverObject = JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      });
      console.log(serverObject);
      checkJWT(path, serverObject, resToken);
    }
  }, [shouldSubmit]);

  useEffect(() => {
    console.log(location, 'xxx');
    // if (tokenReducer.data) {
    //   checkJWT(
    //     'signin/verify',
    //     JSON.stringify({ token: tokenReducer.data }, verifyToken)
    //   );
    //   history.push('/checkout/summary');
    // }
    if (
      tokenReducer.status === 'guest' ||
      (tokenReducer.status === 'ok' && location.pathname === '/login')
    ) {
      history.push('/member');
    }
    if (
      tokenReducer.status === 'guest' ||
      (tokenReducer.status === 'ok' && location.pathname === '/checkout')
    ) {
      history.push('/checkout/summary');
    }
    if (
      (shouldSubmit && tokenReducer.status === 'error') ||
      tokenReducer.status === 'fail'
    ) {
      console.log('show Error');
      setErr(() => true);
      setEmail(() => '');
      setName(() => '');
      console.log(tokenReducer, 'tokenReducer');
    }
  }, [tokenReducer]);
  const openCon = () => {
    setOpen((p) => !p);
  };
  const setEmailTxt = (e) => {
    const { value } = e.target;
    setEmail(() => value);
  };
  const setPassTxt = (e) => {
    const { value } = e.target;
    setPass(() => value);
  };
  const setPassConfirmTxt = (e) => {
    const { value } = e.target;
    setPassConfirm(() => value);
  };
  const setNameTxt = (e) => {
    const { value } = e.target;
    setName(() => value);
  };
  const submitMe = (e) => {
    e.preventDefault();
    const verifiedEmail = emailCheck(email);
    // if (verifiedEmail && isGuest) {
    //   setShouldSubmit(() => true);
    //   return;
    // }
    console.log((verifiedEmail && password.length > 0) || isGuest);
    console.log(verifiedEmail, password.length > 0, isGuest);
    if ((verifiedEmail && password.length > 0) || isGuest) {
      setShouldSubmit(() => true);
      if (err) {
        setErr(() => false);
        setShouldSubmit(() => false);
      }
    } else {
      setErr(() => true);
    }
  };
  const submitMeConfirm = (e) => {
    e.preventDefault();
    console.log('CLICK2');
    const verifiedEmail = emailCheck(email);
    if (verifiedEmail && password.length > 0 && password === passwordConfirm) {
      setShouldSubmit(() => true);
      if (err) {
        setErr(() => false);
      }
    } else {
      console.log('error');
      setErr(() => true);
    }
  };
  return (
    <section className='login_con_wrapper'>
      <div className='login_desc' onClick={openCon}>
        <p className='login_desc_txt'>{descTxt}</p>
        <Arrow
          clSvg='login_desc_arrow'
          strokeC={{ fill: 'none', stroke: '#f2f2f2', strokeWidth: '2' }}
        />
      </div>
      {open ? (
        <form className='login_form'>
          {err ? (
            <p className='login_err_p'>One of the fields below is incorrect</p>
          ) : undefined}
          {(open && passConfirm) || isGuest ? (
            <Fragment>
              <p className='login_form_label login_form_input_adj'>Name:</p>
              <input
                className='login_form_input'
                value={name}
                type='text'
                onChange={(e) => setNameTxt(e)}
              />
            </Fragment>
          ) : undefined}
          <p className='login_form_label login_form_input_top'>Email:</p>
          <input
            className='login_form_input'
            value={email}
            type='text'
            onChange={(e) => setEmailTxt(e)}
          />
          {isLogin ? (
            <Fragment>
              <p className='login_form_label login_form_input_adj'>Password:</p>
              <input
                className='login_form_input '
                value={password}
                type='password'
                onChange={(e) => setPassTxt(e)}
              />
            </Fragment>
          ) : undefined}

          {open && passConfirm ? (
            <Fragment>
              <p className='login_form_label login_form_input_adj'>
                Password Confirm:
              </p>
              <input
                className='login_form_input'
                value={passwordConfirm}
                type='password'
                onChange={(e) => setPassConfirmTxt(e)}
              />
            </Fragment>
          ) : undefined}
          <div className='login_form_submitWrapper'>
            <input
              className='login_form_submitBtn'
              value={submitBtn}
              type='submit'
              onClick={(e) => submitMe(e)}
            />
            {open && isLogin && !createAcc ? (
              <p className='login_form_forgot'>forgot password</p>
            ) : undefined}
          </div>
        </form>
      ) : undefined}
    </section>
  );
};

const storage = ({ tokenReducer }) => ({
  tokenReducer,
});

export default connect(storage, { checkJWT, resToken, verifyToken })(Checkout);
// (shouldSubmit && tokenReducer.status === 'guest') ||
// tokenReducer.status === 'ok'
