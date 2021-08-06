/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { Check2 } from 'react-bootstrap-icons';
import { Card, Button } from 'react-bootstrap';

export default function PricingCard({
  title, price, features, logo,
}) {
  return (
    <Card style={{ backgroundColor: '#f6f9f9', height: 'max-content', width: '20rem' }} className="pb-3 shadow">
      <Card.Img variant="top" src={logo} className="pricing-card-img" />
      <Card.Body>
        <Card.Title className="text-center fs-2"> { title } </Card.Title>
        <Card.Subtitle className="text-center fs-5">
          <h3 className="d-inline">Rs. {price}</h3>{' '}<h5 className="d-inline">/ month</h5>
        </Card.Subtitle>
        <ul className="list-unstyled">
          {features.map((feature, index) => (
            <li key={`feature-${index}`} className="p-2">
              <Check2 color="green" style={{ fontSize: '1.5rem' }} />{' '}
              <span className="px-2">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-center">
          <Button className="purchase-button">
            Purchase
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
