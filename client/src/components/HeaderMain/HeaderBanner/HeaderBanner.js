import React, { memo } from 'react';
import './HeaderBanner.scss';
import { ClosingX } from '../../ClosingX/ClosingX';
import { HeaderBannerList } from '../HeaderBannerList/HeaderBannerList';

import { bannerListArr } from '../../../ItemsBannerArray/ItemsBannerArray';

export const HeaderBanner = memo(({ bannerOpen }) => {
  return (
    <div
      className={`mobileBanner ${!bannerOpen ? 'bannerClosed' : 'bannerOpen'}`}>
      <ClosingX
        bannerOpen={bannerOpen}
        action='BANNER_OPEN'
        actionProps={bannerOpen}
      />
      <HeaderBannerList list={bannerListArr} />
    </div>
  );
});
