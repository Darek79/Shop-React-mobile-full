import React, { Fragment, useContext, useReducer, useRef } from 'react';
import { useSpring, animated } from 'react-spring/web';
import { Hamburger } from './Hamburger/hamburger';
import { HeaderBanner } from './HeaderBanner/HeaderBanner';
import { SearchMain } from './Search/SearchMain';
import { AccountIcon } from './Account/Account';
import ShoppingBag from './ShoppingBag/ShoppingBag';
import { LogoMain } from './Logo/LogoMain';
import SearchBar from '../SideBar/SideBar';
import AccountBar from '../SideBar/SideBar';
import LoginStatus from './LoginStatus/LoginStatus';

import { initState, reducer } from '../../reducer/HeaderReducer';

import { DispatchContext } from '../../Context/context';
import { StateContext } from '../../Context/context';

import './header.scss';
import './basketMain.scss';
import './accountMain.scss';
import './searchMain.scss';

export default () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { searchOpen, bannerOpen, accountOpen, bagOpen } = state;

  return (
    <div className='headerMain'>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <Hamburger bannerOpen={bannerOpen} />
          <LogoMain />
          <div className='actionButtons'>
            <ShoppingBag />
            <AccountIcon />
            <SearchMain />
          </div>
          <HeaderBanner bannerOpen={bannerOpen} />
          <SearchBar
            propsAction={searchOpen}
            x={'SEARCH_OPEN'}
            mainBanner={'genericBanner_search'}
            mainBanner_closed={'genericClosed_search'}
            mainBanner_open={'genericOpen_search'}>
            test
          </SearchBar>
          <AccountBar
            propsAction={accountOpen}
            x={'ACCOUNT_OPEN'}
            mainBanner={'genericBanner_account'}
            mainBanner_closed={'genericClosed_account'}
            mainBanner_open={'genericOpen_account'}>
            <LoginStatus />
          </AccountBar>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </div>
  );
};
