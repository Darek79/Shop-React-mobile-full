import React, { Fragment, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import { calcVWport } from './helper/helperFN';
import BannerContent from './components/BannerContent/BannerContent';
import CheckoutCard from './components/CheckoutCard/CheckoutCard';
import CheckoutMain from './components/Checkout/CheckoutLoginMain';
import LoginOrSignUp from './components/LoginOrSignUp/LoginOrSignUp';
import CheckoutSummary from './components/Checkout/CheckoutSummary';
import PaymentComp from './components/Payment/PaymentMain';
import { ProceedToPayment } from './components/Checkout/ProceedToPayment';
import { Cart } from './components/Cart/Cart';
import { MoveToCheckout } from './components/Basket/GoToCheckout';
const HeaderMain = lazy(() => import('./components/HeaderMain/HeaderMain'));
const ImgBannerMain = lazy(() =>
  import('./components/ImgBanner/ImgBannerMain')
);

const TopProducts = lazy(() =>
  import('./components/ContentMainHomepage/swiperCom')
);
const WomenProducts = lazy(() =>
  import('./components/ContentMainHomepage/swiperCom')
);
const CategoryCom = lazy(() => import('./components/Category/CategoryPage'));
const ProductCom = lazy(() => import('./components/Product/productMain'));
import SwiperSkeleton from './components/ContentMainHomepage/swipeComSkeleton';
import ImgBannerSkeleton from './components/ImgBanner/ImgBannerSkeleton';
import HeaderSkeleton from './components/HeaderMain/HeaderSkeleton';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Suspense fallback={<HeaderSkeleton bi='#a8b3bd' bm='#c5ccd3' />}>
            <HeaderMain />
          </Suspense>
          <Suspense
            fallback={<ImgBannerSkeleton h={calcVWport(window.innerWidth)} />}>
            <ImgBannerMain />
          </Suspense>
          <Suspense fallback={<SwiperSkeleton />}>
            <TopProducts
              url='http://localhost:3000/api/prods?li=3&ca=men'
              title='Highlights'
            />
          </Suspense>
          <Suspense fallback={<SwiperSkeleton />}>
            <WomenProducts
              url='http://localhost:3000/api/prods?li=3&ca=women'
              title='Women'
            />
          </Suspense>
          <BannerContent
            title='Banner1'
            url='http://localhost:3000/api/prods?id=752614e0-f6cd-11ea-9bb3-51fb79043a02'
          />
          <div>test</div>
        </Route>
        <Route
          exact
          path='/c/:category'
          render={(p) => (
            <Fragment>
              <Suspense fallback={<HeaderSkeleton bi='#a8b3bd' bm='#c5ccd3' />}>
                <HeaderMain />
              </Suspense>
              <Suspense fallback={<div>CATEGORY LOADING</div>}>
                <CategoryCom {...p} />
              </Suspense>
            </Fragment>
          )}></Route>
        <Route
          exact
          path='/p/:title/:name/:id'
          render={(p) => (
            <Fragment>
              <Suspense fallback={<HeaderSkeleton bi='#a8b3bd' bm='#c5ccd3' />}>
                <HeaderMain />
              </Suspense>
              <Suspense fallback={<div>PRODUCT LOADING</div>}>
                <ProductCom {...p} />
              </Suspense>
              <CheckoutCard />
            </Fragment>
          )}
        />
        <Route
          exact
          path='/cart'
          render={(p) => (
            <Fragment>
              <Suspense fallback={<HeaderSkeleton bi='#a8b3bd' bm='#c5ccd3' />}>
                <HeaderMain />
              </Suspense>
              <Cart {...p} />
              <MoveToCheckout />
            </Fragment>
          )}
        />
        <Route
          exact
          path='/login'
          render={(p) => (
            <Fragment>
              <Suspense fallback={<HeaderSkeleton bi='#a8b3bd' bm='#c5ccd3' />}>
                <HeaderMain />
              </Suspense>
              <LoginOrSignUp />
            </Fragment>
          )}
        />
        <Route
          exact
          path='/member'
          render={(p) => (
            <Fragment>
              <Suspense fallback={<HeaderSkeleton bi='#a8b3bd' bm='#c5ccd3' />}>
                <HeaderMain />
              </Suspense>
              <h2>memeber</h2>
            </Fragment>
          )}
        />
        <Route
          exact
          path='/checkout'
          render={(p) => (
            <Fragment>
              <Suspense fallback={<HeaderSkeleton bi='#a8b3bd' bm='#c5ccd3' />}>
                <HeaderMain />
              </Suspense>
              <CheckoutMain />
            </Fragment>
          )}
        />
        <Route
          exact
          path='/checkout/summary'
          render={(p) => (
            <Fragment>
              <Suspense fallback={<HeaderSkeleton bi='#a8b3bd' bm='#c5ccd3' />}>
                <HeaderMain />
              </Suspense>
              <CheckoutSummary />
              <ProceedToPayment />
            </Fragment>
          )}
        />
        <Route
          exact
          path='/checkout/payment'
          render={(p) => (
            <Fragment>
              <Suspense fallback={<HeaderSkeleton bi='#a8b3bd' bm='#c5ccd3' />}>
                <HeaderMain />
              </Suspense>
              <PaymentComp />
            </Fragment>
          )}
        />
        <Route
          exact
          path='/checkout/purchase-completed'
          render={(p) => (
            <Fragment>
              <Suspense fallback={<HeaderSkeleton bi='#a8b3bd' bm='#c5ccd3' />}>
                <HeaderMain />
              </Suspense>
              <h2>Thank you for your purchase</h2>
            </Fragment>
          )}
        />
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Router>
  );
};

// imgArr={arr} int={4000} idArr={idArr} idDotArr={idDotArr} wrapperClass="wrapper"
//                        sliderWrapperClass="sliderWrapper" imgClass={`item itemEffect`} h={calcVWport(window.innerWidth)}
