/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';

export default function FeatureCard({ logo, title, text }) {
  return (
    <div className="p-3">
      <div className="p-3">
        <img className="feature-card-img" src={logo} alt="..." />
      </div>
      <div>
        <Card.Title className="fs-1"> { title } </Card.Title>
        <Card.Text> { text } </Card.Text>
      </div>
    </div>
  );
}
