/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import './style.css';

export default function CustomToggleButton({ handleActivity, label }) {
  const [value, setValue] = useState('active');
  const handleChange = (event) => setValue(event.target.value);
  useEffect(() => {
    handleActivity(value === 'active');
    // console.log('Called');
  }, [value]);

  return (
    <ButtonGroup className="inventory-toggle-button">
      <ToggleButton
        checked={value === 'active'}
        onChange={handleChange}
        type="radio"
        value="active"
        className={`toggle_active_button_${value}`}
      >
        {label || 'ACTIVE'}
      </ToggleButton>
      <ToggleButton
        checked={value === 'inactive'}
        onChange={handleChange}
        type="radio"
        value="inactive"
        className={`toggle_inactive_button_${value}`}
      >
        {label ? `NOT ${label}` : 'INACTIVE' }
      </ToggleButton>
    </ButtonGroup>
  );
}
