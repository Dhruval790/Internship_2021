import React from 'react';
import { PricingCard } from '../../components';

// This icons are taken from flaticons (https://www.flaticon.com/packs/aviation-99?word=airplane)
const rocket = 'assets/icons/rocket.svg';
const propeller = 'assets/icons/propeller.svg';
const zeppelin = 'assets/icons/zeppelin.svg';
const balloon = 'assets/icons/hot-air-balloon.svg';

const features = {
  level1:
  ['Unlimited Sales Channel', '100 LB space for Stocks', '1 GB space for Inventory',
    '1 GB space for Historical Data', '1% Profit Comission', '10 Free Shippings'],
  level2: ['Unlimited Sales Channel', '150 LB space for Stocks', '1.5 GB space for Inventory',
    '1 GB space for Historical Data', '0.75% Profit Comission', '20 Free Shippings'],
  level3: ['Unlimited Sales Channel', '200 LB space for Stocks', '2 GB space for Inventory',
    '3 GB space for Historical Data', '0.50% Profit Comission', '50 Free Shippings'],
  level4: ['Unlimited Sales Channel', '300 LB space for Stocks', '3 GB space for Inventory',
    '5 GB space for Historical Data', '0.25% Profit Comission', '100 Free Shippings'],
};

export default function Pricing() {
  return (
    <section className="landing-page-sections">
      <div className="my-5">
        <center>
          <h4 className="text-center h4 section-title mb-5 pricing-underline-width">Pricing</h4>
        </center>
        <div className="row g-4 justify-content-center my-5">
          <div className="col-sm-6 col-md-6 col-lg-3">
            <PricingCard
              title="Level 1"
              logo={balloon}
              price={1000}
              features={features.level1}
            />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <PricingCard
              title="Level 2"
              logo={propeller}
              price={1500}
              features={features.level2}
            />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <PricingCard
              title="Level 3"
              logo={rocket}
              price={2000}
              features={features.level3}
            />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <PricingCard
              title="Level 4"
              logo={zeppelin}
              price={2500}
              features={features.level4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
