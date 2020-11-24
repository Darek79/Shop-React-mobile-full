import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { showOneProd } from './../../redux/filters/filterHelpers';
import { SmallProd } from '../productTemplate/productTemplatePartials';
import { Swiper } from '../Swiper/swiper';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { ShowSizes } from './showAvailableSizes';
import { AddToBasketMobile } from './addToBasket';
import { FavButton } from './favButton';
import { PDPDescription } from './description';
import { PushableMain } from './../PushableContainer/PushableMain';
import { addItemToCart, added } from './../../redux/actions/basketActions';
import {
  refreshStore,
  filterProd,
  fetchFiles,
  debounceClick,
  checkLocalS,
} from './../../helper/helperFN';
// import { resetBasket } from '../../redux/actions/basketActions';

import './productMain.scss';

const aphotos = [
  'https://via.placeholder.com/500X800/ff0000.png',
  'https://via.placeholder.com/500X800/b3b300.png',
  'https://via.placeholder.com/500X800/994d00.png',
  'https://via.placeholder.com/500X800/ff0000.png',
  'https://via.placeholder.com/500X800/b3b300.png',
  'https://via.placeholder.com/500X800/ff0000.png',
];

const ProductCom = ({ match, addItemToCart, added, resetBasket }) => {
  const history = useHistory();
  console.log(history, match, 'H');
  // const sameURL = refreshStore(useLocation);
  const [data, setData] = useState([{}]);

  // const [data, setData] = useState(null);
  const { id, title } = useParams();
  const sizePicked = useRef(null);
  const [size, setSize] = useState(true);
  const timeRef = useRef([]);
  useEffect(() => {
    try {
      if (
        history.location.state.referrer === 'swiperProd' ||
        history.location.state.referrer === 'banner' ||
        history.location.state.referrer === 'category'
      ) {
        fetchFiles(`http://localhost:3000/api/prods?id=${id}`, setData);
        return;
      }
      if (
        sessionStorage.length > 0 &&
        sessionStorage.getItem(title).length > 0
      ) {
        console.log(1);
        const nData = JSON.parse(sessionStorage.getItem(title));
        const fData = filterProd(nData, id);
        setData(() => fData);
      } else {
        console.log(2);
        fetchFiles(`http://localhost:3000/api/prods?id=${id}`, setData);
      }
    } catch (error) {
      console.log(error);
      console.log(3);
      history.push('/');
      // REDIRECT TO UUPS SORRY WITH HOMEPAGE BUTTON
    }
  }, []);
  const pickSize = (e) => {
    sizePicked.current = e.target.getAttribute('data-size');
    setSize(true);
    if (typeof sizePicked.current === 'number') {
    }
    console.log(typeof sizePicked.current);
  };
  const addmeToCart = () => {
    if (sizePicked.current === null) {
      setSize(false);
      console.log('no size');
      return;
    }
    if (debounceClick(Date.now())) {
      addItemToCart({
        id,
        price: data[0].price,
        val: data[0].price,
        size: sizePicked.current,
        title: data[0].title,
        desc: data[0].description,
        photo: data[0].photos[0],
        qty: 1,
      });
      added({ show: true });
    }
  };
  return (
    <section className='prodPageWrapper'>
      {console.log(data && data[0].category)}
      <SmallProd
        c={data && data[0].description}
        t={data && data[0].title}
        p={data && data[0].price}
        prodCd='prodPageDesc'
        idTitle={'pdp_title'}
        idDesc={'pdp_desc'}
        idPrize={'pdp_price'}
      />
      <Swiper data={data && data} photos={data && data[0].photos} />
      <ShowSizes
        fn={pickSize}
        r={sizePicked}
        size={data && data[0].size}
        s={size}
      />
      <AddToBasketMobile fn={addmeToCart} />
      <FavButton />
      <PDPDescription />
      <PushableMain />
      {/* <div id='test'>test</div> */}
    </section>
  );
};
//need to pass a {d} prop to PDPDescription

export default connect(null, { addItemToCart, added })(ProductCom);
