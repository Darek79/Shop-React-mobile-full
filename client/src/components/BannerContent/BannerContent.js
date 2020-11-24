import React, { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from '../Img/Img';
import BlockBtn from '../Button/Button';
import { fetchFiles } from '../../helper/helperFN';
import { v1 } from 'uuid';

import './BannerContent.scss';

export default ({
  bannerBlockerC = 'bannerBlockerS',
  title = 'blocker',
  url,
  slogan = 'Maecenas sed auctor urna',
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      if (
        sessionStorage.length > 0 &&
        sessionStorage.getItem(title).length > 0
      ) {
        console.log(1);
        const nData = JSON.parse(sessionStorage.getItem(title));
        setData(() => nData);
      } else {
        console.log(2);
        fetchFiles(url, setData);
      }
    } catch (error) {
      console.log(3);
      sessionStorage.clear();
      fetchFiles(url, setData);
    }
  }, [url]);
  // useEffect(() => {
  //   console.log(data);
  //   console.log(title);
  //   if (data.length > 0) {
  //     sessionStorage.setItem(title, JSON.stringify(data));
  //   }
  // }, [data, title]);
  return (
    <section className='bannerBlockWrapper'>
      {console.log(data, 'data')}
      {data &&
        data.map((item) => {
          console.log(item);
          return (
            <NavLink
              to={{
                pathname: `/p/${title}/${item.title}/${item.id}`,
                state: { refferer: 'banner' },
              }}
              key={v1()}>
              <Image
                c='main_blockImg'
                s={item.photos[0]}
                small={item.photos[0]}
                medium={item.photos[0]}
                big={item.photos[0]}
                alt={'ss'}
              />
              <p className={bannerBlockerC}>{slogan}</p>
              <BlockBtn txt='kaufen' btnC='bannerBlockerBtn' />
            </NavLink>
          );
        })}
    </section>
  );
};
