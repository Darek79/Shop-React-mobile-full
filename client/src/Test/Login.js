import React, { Fragment, useRef } from 'react';
import { NavLink } from 'react-router-dom';

export const LogMeIn = ({
  create,
  fn,
  email_f,
  pass_f,
  pass_c,
  txt,
  emailV,
  fieldResetEmail,
  fieldResetPass,
  chgEmail,
  resetMe,
  forgotPassword,
}) => (
  <form ref={resetMe}>
    <section className='login_field'>
      <div
        type='email'
        className={`login_field_desc ${!emailV ? 'login_field_error' : ''}`}>
        {emailV ? 'Email:' : 'Provide a valid Email'}
      </div>
      <input
        className='login_field_email'
        data-pl='Email Adress'
        ref={email_f}
        spellCheck='off'></input>
    </section>
    <section className='login_field'>
      <div className={`login_field_desc ${!emailV ? 'login_field_error' : ''}`}>
        {emailV ? 'Password:' : 'Provide a valid Password'}
      </div>
      <input
        className='login_field_pass'
        data-pl='Password'
        ref={pass_f}
        type='password'
        spellCheck='off'></input>
    </section>
    {create ? (
      <section className='login_field'>
        <div
          className={`login_field_desc ${!emailV ? 'login_field_error' : ''}`}>
          {emailV ? 'Password Confirm:' : 'Please enter a valid Email'}
        </div>
        <input
          spellCheck='off'
          className='login_field_passC'
          data-pl='Password Confirm'
          ref={pass_c}></input>
      </section>
    ) : undefined}
    <section className='login_field_btn'>
      <button className='login_confirm' type='button' onClick={fn}>
        {txt}
      </button>
      {forgotPassword ? (
        <NavLink
          className='login_forgot'
          to={{ pathname: '/forgot_password', state: { refferer: 'login' } }}>
          forgot my password
        </NavLink>
      ) : undefined}
    </section>
  </form>
);
export const LogMeInAsGuest = ({ fn, txt, email_g, emailV }) => (
  <Fragment>
    <section className='login_field'>
      <div className={`login_field_desc ${!emailV ? 'login_field_error' : ''}`}>
        {emailV ? 'Email:' : 'Please enter a valid Email'}
      </div>
      <input
        type='text'
        contentEditable='true'
        className='login_field_email'
        data-pl='Email Adress'
        ref={email_g}
        spellCheck='off'></input>
    </section>
    <button className='login_confirm' type='button' onClick={fn}>
      {txt}
    </button>
  </Fragment>
);
