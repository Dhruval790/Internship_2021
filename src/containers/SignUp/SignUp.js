/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button, Alert, Form, Container, Row, Col, Dropdown, DropdownButton, Spinner,
} from 'react-bootstrap';
import {
  ExclamationCircle, XLg, Asterisk,
} from 'react-bootstrap-icons';
import { GoogleIcon } from '../../components';
import './SignUp.css';

const stateValues = {
  firstname: '',
  lastname: '',
  company: '',
  address1: '',
  address2: '',
  country: 'Select your Country',
  state: 'Select your State',
  city: '',
  zip: '',
  email: '',
  contact: '',
  password: '',
  confirmPassword: '',
};

const wirehouse = 'assets/images/wirehouse.png';

export default function SignUp() {
  const [values, setValues] = useState(stateValues);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const history = useHistory();

  function validateForm() {
    const alphaSpaceRegex = /^[A-Za-z\s-_]+$/;
    const addressRegex = /^[A-Za-z\s-_0-9,;.]+$/;
    const cityRegex = /^[A-Za-z\s-_0-9,.]+$/;
    const zipRegex = /^[\w\d\s-]{2,}$/;
    const contactRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // eslint-disable-next-line no-restricted-syntax
    for (const field in stateValues) {
      if (Object.hasOwnProperty.call(stateValues, field)) {
        if ((field === 'address1' && !addressRegex.test(values.address1))
      || (field === 'address2' && values.address2.trim() !== '' && !addressRegex.test(values.address2))) {
        // Address can have only alphanumeric & space characters and (-_,;.) symbols
          setErrMsg('Please enter valid address');
          setErrorAlertOpen(true);
          return false;
        } if (field === 'city' && !cityRegex.test(values.city)) {
        // City can have only alphanumeric & space characters and (-_,.) symbols
          setErrMsg('Please enter valid city name');
          setErrorAlertOpen(true);
          return false;
        } if (field === 'zip' && !zipRegex.test(values.zip)) {
        // Zip can have only alphanumeric & space characters and (-) symbol
          setErrMsg('Please enter valid zip code');
          setErrorAlertOpen(true);
          return false;
        } if (field === 'contact' && !contactRegex.test(values.contact)) {
          setErrMsg('Please enter valid contact number');
          setErrorAlertOpen(true);
          return false;
        } if (field === 'country'
      && (values.country === '' || values.country === 'Select Country')) {
          setErrMsg('Please select your country');
          setErrorAlertOpen(true);
          return false;
        } if (field === 'state'
      && (values.state === '' || values.state === 'Select State')) {
          setErrMsg('Please select your state');
          setErrorAlertOpen(true);
          return false;
        } if (field === 'email' && !emailRegex.test(values.email)) {
          setErrMsg('Please enter valid email');
          setErrorAlertOpen(true);
          return false;
        } if (field === 'password' && !passwordRegex.test(values.password)) {
        // Min 8 chars, 1 upper, 1 lower, 1 number and 1 special character
          setErrMsg('For paasword min 8 chars, 1 upper, 1 lower, 1 number and 1 special character is required');
          setErrorAlertOpen(true);
          return false;
        } if (field === 'confirmPassword' && values.password !== values.confirmPassword) {
        // Min 8 chars, 1 upper, 1 lower, 1 number and 1 special character
          setErrMsg('Please confirm your password');
          setErrorAlertOpen(true);
          return false;
        } if ((field === 'firstname' || field === 'lastname' || field === 'company')
        && !alphaSpaceRegex.test(values[field])) {
          setErrMsg(`Please enter valid ${field}`);
          setErrorAlertOpen(true);
          return false;
        }
      }
    }
    return true;
  }

  async function signUp() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
        method: 'POST',
        body: new URLSearchParams(values),
      });
      setShowSpinner(true);
      const data = await response.text();
      console.log(data);
    } catch (err) {
      console.err(err);
    }
    history.push('./login');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      signUp();
      // DB actions
    }
  }

  function handleChange(event, key) {
    event.stopPropagation();
    setValues({ ...values, [key]: event.target.value.replaceAll('\n', ' ') });
  }

  function handleSelect(event, key, value) {
    event.stopPropagation();
    setValues({ ...values, [key]: value });
  }

  return (
    <main className="d-lg-flex d-block">
      <aside className="d-none d-lg-block signup-aside-bar">
        <div className="d-flex mt-5 signup-aside-bar-text">
          Manage your Inventory <br /> with Puy Infotech!
        </div>
        <div
          className="signup-aside-bar-img"
          style={{ backgroundImage: `url(${wirehouse})` }}
        />
      </aside>
      <div
        className="SignUp mt-5"
      >
        <Form onSubmit={handleSubmit} className="bg-form p-4">
          <p className="text-end mb-4">
            <br /> Already have an account? <Link to="/login">Sign in now!</Link>
          </p>
          <div className="boxboard">
            <ul className="p-0 mb-0">
              <li className="d-flex justify-content-center align-items-center h-100">
                <GoogleIcon className="me-2" />
                <a href="#">
                  Sign Up with Google
                </a>
              </li>
            </ul>
          </div>
          <div className="login-form-or">
            or
          </div>
          <Container>
            <Row>
              <Col sm={4} className="my-2 ">
                <div className="form-group">
                  <label className="form-label login-form-label">
                    First Name{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your First Name here"
                    value={values.firstname}
                    onChange={(event) => handleChange(event, 'firstname')}
                  />
                </div>
              </Col>
              <Col sm={4} className="my-2 ">
                <div className="form-group">
                  <label className="form-label login-form-label">
                    Last Name{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Last Name here"
                    value={values.lastname}
                    onChange={(event) => handleChange(event, 'lastname')}
                  />
                </div>
              </Col>
              <Col sm={4} className="my-2 ">
                <div className="form-group">
                  <label className="form-label login-form-label">
                    Company Name{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Company Name here"
                    value={values.company}
                    onChange={(event) => handleChange(event, 'company')}
                  />
                </div>
              </Col>
            </Row>
            {/* <br /> */}
            <Row>
              <Col xs={12} className="my-2 ">
                <div className="form-group">
                  <label htmlFor="address1" className="form-label login-form-label">
                    Address Line 1{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </label>
                  <input
                    className="form-control"
                    placeholder="Enter your Address here"
                    value={values.address1}
                    onChange={(event) => handleChange(event, 'address1')}
                  />
                </div>
              </Col>
              <Col xs={12} className="my-2 ">
                <div className="form-group">
                  <label htmlFor="address2" className="form-label login-form-label">
                    Address Line 2{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </label>
                  <input
                    className="form-control"
                    placeholder="Enter your Address here"
                    value={values.address2}
                    onChange={(event) => handleChange(event, 'address2')}
                  />
                </div>
              </Col>
            </Row>
            {/* <br /> */}
            <Row>
              <Col md={6} sm={6} className="my-2 ">
                <div className="form-group">
                  <label className="form-label login-form-label">
                    Country{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </label>
                  <br />
                  <DropdownButton
                    title={values.country}
                    className="signup-dropdown"
                    onSelect={(value, event) => handleSelect(event, 'country', value)}
                  >
                    <Dropdown.Item className="signup-dropdown-item" eventKey="India">India</Dropdown.Item>
                    <Dropdown.Item className="signup-dropdown-item" eventKey="Canada">Canada</Dropdown.Item>
                    <Dropdown.Item className="signup-dropdown-item" eventKey="France">France</Dropdown.Item>
                  </DropdownButton>
                </div>
              </Col>
              <Col md={6} sm={6} className="my-2 ">
                <div className="form-group">
                  <label className="form-label login-form-label">
                    State{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </label>
                  <br />
                  <DropdownButton
                    title={values.state}
                    className="signup-dropdown"
                    onSelect={(value, event) => handleSelect(event, 'state', value)}
                  >
                    <Dropdown.Item className="signup-dropdown-item" eventKey="Gujarat">Gujarat</Dropdown.Item>
                    <Dropdown.Item className="signup-dropdown-item" eventKey="Delhi">Delhi</Dropdown.Item>
                    <Dropdown.Item className="signup-dropdown-item" eventKey="Mumbai">Mumbai</Dropdown.Item>
                  </DropdownButton>
                </div>
              </Col>
              <Col md={6} sm={6} className="my-2 ">
                <div className="form-group">
                  <label className="form-label login-form-label">
                    City{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your City here"
                    value={values.city}
                    onChange={(event) => handleChange(event, 'city')}
                  />
                </div>
              </Col>
              <Col md={6} sm={6} className="my-2 ">
                <div className="form-group">
                  <label className="form-label login-form-label">
                    Pincode{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Pincode here"
                    value={values.zip}
                    onChange={(event) => handleChange(event, 'zip')}
                  />
                </div>
              </Col>
            </Row>
            {/* <br /> */}
            <Row>
              <Col sm={6} className="my-2 ">
                <Form.Group size="lg" controlId="email" className="t-color">
                  <Form.Label className="login-form-label">
                    Email{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    placeholder="Enter your E-mail Address here"
                    value={values.email}
                    onChange={(event) => handleChange(event, 'email')}
                  />
                </Form.Group>
              </Col>
              <Col sm={6} className="my-2 ">
                <div className="form-group">
                  <Form.Group size="lg" controlId="number">
                    <Form.Label className="login-form-label">
                      Contact Number{' '}
                      <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                    </Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Contact Number here"
                      value={values.contact}
                      onChange={(event) => handleChange(event, 'contact')}
                    />
                  </Form.Group>

                </div>
              </Col>
            </Row>
            {/* <br /> */}
            <Row>
              <Col sm={6} className="my-2 ">
                <Form.Group size="lg" controlId="password" className="t-color">
                  <Form.Label className="login-form-label">
                    Password{' '}
                    <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your Password here"
                    value={values.password}
                    onChange={(event) => handleChange(event, 'password')}
                  />
                </Form.Group>
              </Col>
              <Col sm={6} className="my-2 ">
                <div className="form-group">
                  <Form.Group size="lg" controlId="confirm-password" className="t-color">
                    <Form.Label className="login-form-label">
                      Confirm Password{' '}
                      <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
                    </Form.Label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm your Password here"
                      value={values.confirmPassword}
                      onChange={(event) => handleChange(event, 'confirmPassword')}
                    />
                  </Form.Group>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <br /><Button type="submit" className="btn btn-block sign-in-btn" onClick={handleSubmit}> Register</Button>
              </Col>
            </Row>
          </Container>
        </Form>
        <Alert
          show={errorAlertOpen}
          variant="danger"
          className="position-fixed alert-top-position start-50 mt-2 translate-middle-x cursor-pointer"
          onClick={() => setErrorAlertOpen(false)}
        >
          <ExclamationCircle className="alert-icons" />{' '}
          {errMsg}
          <XLg className="position-absolute top-0 end-0 alert-box-close" />
        </Alert>
        {showSpinner ? <div className="spinner-container"><Spinner animation="border" className="spinner" /></div> : <></>}
      </div>
    </main>
  );
}
