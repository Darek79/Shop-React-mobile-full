import React, { Fragment, useEffect, useState, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { SmallProd } from './../../components/productTemplate/productTemplatePartials';
import { Image } from './../../components/Img/Img';
import { isMobile, fetchFilesPagination } from './../../helper/helperFN';
import { v1 } from 'uuid';

import './CategoryPage.scss';

export default () => {
  let { category } = useParams();

  const prodHeight = useRef(null);
  const pag = useRef(1);
  const [prods, setProds] = useState([]);
  const [addedProds, getNewProds] = useState(1);
  useEffect(() => {
    try {
      if (isMobile()) {
        console.log('here');
        fetchFilesPagination(
          `http://localhost:3000/api/prods?pa=${addedProds}&li=2&ca=${category.toLowerCase()}`,
          setProds
        );
      }
    } catch (error) {
      //redirect to upps page
    }
  }, [category, addedProds]);

  useEffect(() => {
    console.log('runs');
    window.addEventListener('scroll', wasClicked);

    return () => {
      console.log('clear');
      return window.removeEventListener('scroll', wasClicked);
    };
  }, [addedProds]);

  const wasClicked = (e) => {
    let y = prodHeight.current.getBoundingClientRect();
    let c =
      Math.abs(y.y) +
      window.innerHeight -
      Math.floor(y.height * 3 * pag.current);
    console.log('calc', Math.abs(c));
    if (Math.abs(c) < 150) {
      getNewProds((p) => p + 1);
      pag.current += 1;
    }
  };

  return (
    <section className='cat_wrapper'>
      <p className='cat_title'>{category}</p>
      <div className='cat_categorys'>
        {isMobile ? <div>mobile</div> : <div>desktop</div>}
      </div>
      <div className='cat_items'>
        {prods &&
          prods.map((p, i) => {
            return (
              <Fragment key={v1()}>
                <NavLink
                  to={{
                    pathname: `/p/${category.toLowerCase()}/${p.title}/${p.id}`,
                    state: { referrer: 'category' },
                  }}
                  key={v1()}>
                  <div className='cat_prod' ref={i === 0 ? prodHeight : null}>
                    <Image
                      c='cat_image'
                      a='test'
                      s={
                        typeof p.photos[0] === 'string' && p.photos[0]
                          ? p.photos[0]
                          : 'https://via.placeholder.com/300x300/b48f00.png'
                      }
                      small={
                        typeof p.photos[0] === 'string' && p.photos[0]
                          ? p.photos[0]
                          : 'https://via.placeholder.com/300x300/b48f00.png'
                      }
                      medium={
                        typeof p.photos[0] === 'string' && p.photos[0]
                          ? p.photos[0]
                          : 'https://via.placeholder.com/300x300/b48f00.png'
                      }
                      big={
                        typeof p.photos[0] === 'string' && p.photos[0]
                          ? p.photos[0]
                          : 'https://via.placeholder.com/300x300/b48f00.png'
                      }
                    />
                    <SmallProd
                      prodCd='cat_desc'
                      c={p && p.description}
                      t={p && p.title}
                      p={p && p.price}
                      idPrize='cat_desc_price'
                    />
                  </div>
                </NavLink>
                <div className='cat_prod' key={v1()}>
                  <Image
                    c='cat_image'
                    a='test'
                    s={'https://via.placeholder.com/500x800/b38f00.png'}
                    small={'https://via.placeholder.com/500x800/b38f00.png'}
                    medium={'https://via.placeholder.com/500x800/b38f00.png'}
                    big={'https://via.placeholder.com/500x800/b38f00.png'}
                  />
                  <SmallProd
                    prodCd='cat_desc'
                    c={'description'}
                    t={'title'}
                    p={100}
                    idPrize='cat_desc_price'
                  />
                </div>
                <div className='cat_prod' key={v1()}>
                  <Image
                    c='cat_image'
                    a='test'
                    s={'https://via.placeholder.com/500x800/b38f00.png'}
                    small={'https://via.placeholder.com/500x800/b38f00.png'}
                    medium={'https://via.placeholder.com/500x800/b38f00.png'}
                    big={'https://via.placeholder.com/500x800/b38f00.png'}
                  />
                  <SmallProd
                    prodCd='cat_desc'
                    c={'description'}
                    t={'title'}
                    p={100}
                    idPrize='cat_desc_price'
                  />
                </div>
              </Fragment>
            );
          })}
      </div>
    </section>
  );
};
