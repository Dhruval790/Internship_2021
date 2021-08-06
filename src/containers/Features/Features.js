/* eslint-disable max-len */
import React from 'react';
import { FeatureCard } from '../../components';

const baseFeatureAssetsBaseUrl = 'assets/images/features/';

const easy_to_use_PNG = `${baseFeatureAssetsBaseUrl}easy_to_use.png`;
const flexible_tools_PNG = `${baseFeatureAssetsBaseUrl}flexible_tools.png`;
const manage_inventory_PNG = `${baseFeatureAssetsBaseUrl}manage_inventory.png`;
const track_sales_PNG = `${baseFeatureAssetsBaseUrl}track_sales.png`;
/**
 * @typedef {object} FeatureData
 * @property {string} title -Feature card's title
 * @property {string} logo -Feature's card logo.
 * @property {string} text - card's body.
 */
/**
 * used to store the details/features of the product.
 *@type {Array<FeatureData>}
 */
const data = [
  {
    title: 'Flexible Tools',
    logo: track_sales_PNG,
    text:
    'Get the flexibility required to make decisions based on data trends,customer patterns and more whenever changes arise. Maximizing your sales is easier than ever when you don\'t have to rotate between platforms.Find everything that you need at one place.',
  },
  {
    title: 'Easy To Use',
    logo: easy_to_use_PNG,
    text:
    'Maximizing your sales is easier than ever when you don\'t have to rotate between platforms.Find everything that you need at one place. Get the flexibility required to make decisions based on data trends, customer patterns and more whenever changes arise.',
  },
  {
    title: 'Track Sales',
    logo: flexible_tools_PNG,
    text:
    'Accurate reports allow sellers to make actionable decisions that grow their businesses. Track your inventory and sales, to make decisions.Prioritize the details you need with product-level notifications that allow you to focus on the matices of the matter.',
  },
  {
    title: 'Manage Inventory',
    logo: manage_inventory_PNG,
    text:
    'Prioritize the details you need with product-level notifications that allow you to focus on the matices of the matter. Accurate reports allow sellers to make actionable decisions that grow their businesses. Track your inventory and sales, to make decisions.',
  },
];
/**
 * The Feature section of the Landing Page.
 * @returns JSX element
 */
export default function Features() {
  return (
    <section>
      <div className="my-5">
        <center>
          <h4 className="text-center h4 section-title mb-5">Features</h4>
        </center>
        <div className="row my-5">
          {data.map((d) => (
            <div className="col-sm-6 col-md-6 section-cols">
              <FeatureCard
                title={d.title}
                logo={d.logo}
                text={d.text}
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
