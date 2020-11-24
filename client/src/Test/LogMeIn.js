import React, { useRef, useState, useEffect } from 'react';
import AccountPushAble from './../components/PushableContainer/PushableContent';
import LoginsDesc from './../components/PushableContainer/wrapperDiv';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LogMeIn, LogMeInAsGuest } from './Login';
import { emailCheck, verifyFields } from './../helper/helperFN';
import './LogMeIn.scss';
const strokeArrow = { fill: 'none', stroke: '#ffffff', strokeWidth: '2' };

const resetMe = (e) => {
  e.preventDefault();
};
export const CheckoutMain = () => {
  const [emailV, setEmailCheck] = useState(true);
  let history = useHistory();
  // const [resetFieldEmail, SetResetFieldEmail] = useState('');
  // const [resetFieldPass, SetResetFieldPass] = useState('');
  const formRef = useRef(null);
  const email_f = useRef(null);
  const email_g = useRef(null);
  const pass_f = useRef(null);
  const pass_c = useRef(null);

  const loginAccount = () => {
    // SetResetFieldEmail(() => email_f.current.value);
    // SetResetFieldPass(() => pass_f.current.value);
    console.log(email_f.current.value);
    console.log(email_f.current.value.length);
    // console.log(formRef.current.reset());
    console.log(pass_f.current.value);
    console.log(pass_f.current.value.length);
    const checkedEmail = emailCheck(email_f.current.value);
    let fieldsV = verifyFields(
      email_f.current.value.length,
      pass_f.current.value.length
    );
    // console.log(checkedEmail === null, 'ec');
    // console.log(Array.isArray(checkedEmail), 'ecArr');
    console.log(fieldsV, 'ec0');
    console.log(checkedEmail, 'ec1');
    if (checkedEmail === null || fieldsV.length > 0) {
      setEmailCheck(() => false);
      formRef.current.reset();
    } else if (Array.isArray(checkedEmail) && !emailV) {
      setEmailCheck(() => true);
    }
  };
  const createAccount = () => {};
  const proceedGuest = () => {};
  return (
    <section className='checkout_wrapper'>
      <AccountPushAble
        pc_w='pc_w'
        pc_h='pc_h'
        lh={<LoginsDesc txt='Login to Account' cl='pdp_AddInfos_l' />}
        pc_co='pc_co'
        ulC='pdp_pushAbleList'
        pc={{
          a: (
            <LogMeIn
              txt='Login'
              email_f={email_f}
              pass_f={pass_f}
              fn={loginAccount}
              resetMe={formRef}
              emailV={emailV}
              forgotPassword={true}
            />
          ),
        }}
        strokeC={strokeArrow}
      />
      <AccountPushAble
        pc_w='pc_w'
        pc_h='pc_h'
        lh={<LoginsDesc txt='Create a Account' cl='pdp_AddInfos_l' />}
        pc_co='pc_co'
        ulC='pdp_pushAbleList'
        pc={{
          a: (
            <LogMeIn
              create={true}
              txt='Register'
              email_f={email_f}
              pass_f={pass_f}
              pass_c={pass_c}
              fn={createAccount}
              resetMe={formRef}
              emailV={emailV}
            />
          ),
        }}
        strokeC={strokeArrow}
      />
      <AccountPushAble
        pc_w='pc_w'
        pc_h='pc_h'
        lh={<LoginsDesc txt='Checkout as Guest' cl='pdp_AddInfos_l' />}
        pc_co='pc_co'
        ulC='pdp_pushAbleList'
        pc={{
          a: (
            <LogMeInAsGuest
              txt='Proceed'
              email_f={email_f}
              fn={proceedGuest}
              resetMe={formRef}
              emailV={emailV}
              email_g={email_g}
            />
          ),
        }}
        strokeC={strokeArrow}
      />
    </section>
  );
};
const storage = ({ tokenReducer }) => ({
  tokenReducer,
});

//export default connect(storage,)(CheckoutMain)
