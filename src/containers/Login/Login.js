/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button, Alert, Form,
} from 'react-bootstrap';
import {
  ExclamationCircle, XLg, Asterisk,
} from 'react-bootstrap-icons';
import { GoogleIcon } from '../../components';
import { UserContext } from '../../contexts/user';
import './Login.css';

const bgImage = 'assets/images/login-bg-image.png';
const logo = 'assets/images/company-logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  function PostUserLogin() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('email', email);
    urlencoded.append('password', password);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, requestOptions)
      .then((response) => {
        if (response.status === 401 || response.status === 404) {
          setErrMsg('Inavlid Credentials'); setErrorAlertOpen(true);
        } else if (response.status === 200) { response.text().then((result) => { setUser(result); history.push('./dashboard'); }); }
      })
      .catch((error) => console.log('error', error));
  }

  function validateForm() {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Min 8 chars, 1 upper, 1 lower, 1 number and 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      // Send this data to server and get result (true/false)
      PostUserLogin();
    } else if (!emailRegex.test(email) && passwordRegex.test(password)) {
      // Please enter valid email id
      setErrMsg('Please enter valid email id');
      setErrorAlertOpen(true);
    } else if (emailRegex.test(email) && !passwordRegex.test(email)) {
      // Password should have atleast one uppercase letter, lowercase letter, number and special symbols
      // Please enter valid password
      setErrMsg('Please enter valid password');
      setErrorAlertOpen(true);
    } else {
      // Please enter valid email and password
      setErrMsg('Please enter valid email and password');
      setErrorAlertOpen(true);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    validateForm();
  }

  return (
    <div
      className="Login mt-5"
      style={{ backgroundImage: `linear-gradient(rgba(72, 72, 72, 0.5), rgba(72, 72, 72, 0.5)),url(${bgImage})` }}
    >
      <div className="company-logo-container d-flex align-items-center justify-content-center">
        <img src={logo} alt="logo" />
      </div>
      <Form onSubmit={handleSubmit} className="login-bg-form p-4">
        <div className="boxboard">
          <ul className="p-0 mb-0">
            <li className="d-flex justify-content-center align-items-center h-100">
              <GoogleIcon className="me-2" />
              <a href="#">
                Sign in with Google
              </a>
            </li>
          </ul>
        </div>
        <div className="login-form-or">
          or
        </div>
        <Form.Group size="lg" controlId="email">
          <Form.Label className="login-form-label">
            Email{' '}
            <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
          </Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>
        <br />
        <Form.Group size="lg" controlId="password">
          <div className="d-flex justify-content-between">
            <Form.Label className="login-form-label">
              Password{' '}
              <sup><Asterisk style={{ fontSize: '0.5rem', color: 'red' }} /></sup>
            </Form.Label>
            <Link to="/forgetpassword" className="forgot-password">Forgot Password?</Link>
          </div>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <br />
        <Button block type="submit" onClick={handleSubmit} className="sign-in-btn">
          Sign in
        </Button>
        <div className="redirect-to-signup-container d-flex justify-content-center align-items-center mt-3">
          <p className="mb-0 pe-2">Not a member yet?</p>
          <Link to="/signup">Register now!</Link>
        </div>
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
    </div>
  );
}
