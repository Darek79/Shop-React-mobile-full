import React, { useContext } from 'react';
import { v1 } from 'uuid';
import { NavLink } from 'react-router-dom';
import { DispatchContext } from './../../../Context/context';

import './bannerListItems.scss';

export const HeaderBannerList = ({
  action='BANNER_OPEN',
  list,
  bannerList = 'bannerList',
  bannerListItem = 'bannerListItem',
}) => {
  const dispatch = useContext(DispatchContext);
  const closeBanner = () => {
    dispatch({ type: action });
  };
  return (
    <ul className={bannerList}>
      {list &&
        list.map((liItem, i) => (
          <NavLink
            key={v1()}
            className={bannerListItem}
            to={`/c/${liItem}`}
            onClick={closeBanner}>
            <li>{liItem}</li>
          </NavLink>
        ))}
    </ul>
  );
};

{
  /* <ul className={bannerList}>
{list.map((liItem, i) => (
  <NavLink key={v1()} className={bannerListItem} to={`/c/${litem}`}>
    <li>{liItem}</li>
  </NavLink>
))}
</ul> */
}
