/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useRef } from 'react';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';

// match.params.productId;
// location.data;

const isNumeric = (value) => {
  if (typeof value !== 'string') return false; // we only process strings!
  return !Number.isNaN(value) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         && !Number.isNaN(parseFloat(value)); // ...and ensure strings of whitespace fail
};

export default function EditForm({ location }) {
  const { data, columns } = location;
  const refers = {};

  const handleClick = (event) => {
    event.stopPropagation();
    Object.keys(refers).forEach((key) => {
      const value = refers[key].current.value.trim();
      if (value !== '') {
        if (isNumeric(value)) {
          console.log(`Number ${key}: ${value}`);
        } else {
          console.log(`String ${key}: ${value}`);
        }
      }
    });
  };

  return (
    <div style={{ height: '85vh', marginTop: '100px' }}>
      <div className="container center-block">
        <div>
          <Form>
            {columns.map((column) => {
              refers[column.key] = useRef();
              return (
                <Form.Group as={Row} className="mb-3" controlId={column.key} key={column.key}>
                  <Form.Label column sm={4}>
                    {column.name}
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder={data[column.key]} ref={refers[column.key]} />
                  </Col>
                </Form.Group>
              );
            })}
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 8, offset: 4 }}>
                <Button onClick={handleClick}>Submit</Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}
