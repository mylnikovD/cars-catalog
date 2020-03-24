import React from 'react';

export default function Card(props) {
  const { card } = props;
  return (
    <div className={`card card-${card.country.toLowerCase()}`}>
      <p>
        <b>Country:</b> {card.country}
      </p>
      <p>
        <b>Brand:</b> {card.brand}
      </p>
      <p>
        <b>Model:</b> {card.model}
      </p>
      {card.year && <p>Year: {card.year}</p>}
      {card.vin && <p>VIN: {card.vin}</p>}
    </div>
  );
}
