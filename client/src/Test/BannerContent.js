import React, { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from './../components/Img/Img';
import BlockBtn from './../components/Button/Button';
import { fetchFiles } from '../helper/helperFN';
import { v1 } from 'uuid';
const p = [
  {
    artcategory: 'sneaker',
    brand: 'Nike',
    category: 'women',
    description: 'Nike Sportswear',
    details: 'Sichtbare Max Air Polsterung in der Mittelsohle',
    folder: 'newFall2020',
    id: '7d9001d0-fd1d-11ea-a7a8-6380abbed196',
    photos: [
      '/newFall2020/7d8cf490-fd1d-11ea-a7a8-6380abbed196-nikes1b.png',
      '/newFall2020/7d8e5420-fd1d-11ea-a7a8-6380abbed196-nikes2b.png',
      '/newFall2020/7d9001d0-fd1d-11ea-a7a8-6380abbed196-nikes3b.png',
    ],
    price: 145.95,
    rating: 0,
    size: ['XS', 'S', 'M', 'L', 'XL'],
    subcategory: 'shoe',
    title: 'AIR MAX 90 NRG UNISEX',
  },
];

import './BannerContent.scss';

export default ({
  bannerBlockerC = 'bannerBlockerS',
  title = 'blocker',
  url,
  prod = p,
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
  useEffect(() => {
    console.log(data);
    console.log(title);
    if (data.length > 0) {
      sessionStorage.setItem(title, JSON.stringify(data));
    }
  }, [data, title]);
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
              }}>
              <Image
                key={v1()}
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
