/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';

export default function Details({ match, location }) {
  console.log(match.params.productId);
  console.log(location.data);
  return (
    <h1>Details</h1>
  );
}
