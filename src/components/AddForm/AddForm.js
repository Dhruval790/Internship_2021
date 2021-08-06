import './style.css';
import {
  Row, Col, Container, Form, Button,
} from 'react-bootstrap';
import { Asterisk } from 'react-bootstrap-icons';
import { add_supplier_fields, add_inventory_fields, add_product_fields } from './layoutConfig';

export default function AddForm(property) {
  const { label } = property;
  let add_fields;
  switch (label.toLowerCase()) {
    case 'supplier':
      add_fields = add_supplier_fields;
      break;
    case 'inventory':
      add_fields = add_inventory_fields;
      break;
    default: add_fields = add_product_fields;
      break;
  }
  const handleSumbit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="AddForm">
      <Container>
        <Form>
          <Row>
            {add_fields.map((data) => (
              <Col sm={data.space} className="my-2" key={data.field}>
                <div className="form-group">
                  <label className="form-label login-form-label">
                    {data.field}{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </label>
                  <input
                    type={data.type}
                    className="form-control"
                    required
                    min={0}
                    placeholder={`Enter ${data.field} here`}
                  />
                </div>
              </Col>
            ))}
            <Col>
              <br /><Button type="submit" className="btn btn-block addform-add-btn" onClick={handleSumbit}> ADD {label.toUpperCase()}</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
