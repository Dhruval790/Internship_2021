/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';

export default function ChevronRight({ className, style, onClick }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      onClick={onClick}
    >
      <path d="M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z" fill="black" />
    </svg>

  );
}
