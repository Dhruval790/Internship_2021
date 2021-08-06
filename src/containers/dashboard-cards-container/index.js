/* eslint-disable react/no-array-index-key */
import './style.css';
import { DashboardCard } from '../../components';

/**
 * Dashboard Card Container, contains the Dashboard-Card component, & is utilized by Dashboard page component
 * @returns JSX component
 */

export default function DashboardCardContainer() {
  /**
   * Data to be used by the cards of dashboard.[Replace this ,when Endpoint is up]
   * @typedef {object} cardData
   * @property {string} title - Card's title
   * @property {string} value - Number of Purchases/Sales/Profit
   * @property {Array<number>} data - Purchases/Sales/Profit at some span of time.
   */
  /**
   * Array of card's data
   *@type {Array<cardData>}
   */
  const cards_data = [
    { title: 'Purchases', value: '389', data: [12, 19, 3, 5, 2, 3, 15] },
    { title: 'Sales', value: '450', data: [1, 2, 3, 5, 2, 3, 10] },
    { title: 'Profit', value: '$1900', data: [6, 20, 13, 15, 10, 7, 2] },
  ];

  return (
    <div className="row Main__CardTop__container">
      {cards_data.map((value, index) => (
        <DashboardCard value={value} key={`card-${index}`} />
      ))}
    </div>
  );
}
