import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Arrow } from '../components/PushableContainer/arrow';
import { resToken, checkJWT } from './../redux/actions/fetchJWT';
import { emailCheck, verifyFields } from './../helper/helperFN';

// import './Checkout.scss';

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
  path,
}) => {
  const [open, setOpen] = useState(false);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [err, setErr] = useState(false);
  const openCon = () => {
    setOpen((p) => !p);
  };
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPassConfirm] = useState('');

  useEffect(() => {
    if (shouldSubmit) {
      const serverObject = JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      });
      checkJWT(path, serverObject, resToken);
    }
  }, [shouldSubmit]);
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
    if (verifiedEmail && isGuest) {
      setShouldSubmit(() => true);
      return;
    }
    if (verifiedEmail && password.length > 0) {
      setShouldSubmit(() => true);
      if (err) {
        setErr(() => false);
      }
    } else {
      setErr(() => true);
    }
  };
  const submitMeConfirm = (e) => {
    e.preventDefault();
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
      {console.log(tokenReducer)}
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
              onClick={
                !passConfirm ? (e) => submitMe(e) : (e) => submitMeConfirm(e)
              }
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

export default connect(storage, { checkJWT, resToken })(Checkout);
