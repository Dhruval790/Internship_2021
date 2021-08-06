import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Alert, Form,
} from 'react-bootstrap';
import {
  CheckCircle, ExclamationCircle, XLg, GeoAltFill, Envelope, TelephoneFill, Youtube, Instagram, Facebook, Twitter, Linkedin,
} from 'react-bootstrap-icons';
import './style.css';

const Footer = () => {
  const [email, setEmail] = useState(''); // For email
  const [subscribed, setSubscribed] = useState(false); // For subscribed
  const [errorAlertOpen, setErrorAlertOpen] = useState(false); // For success alert box
  const [successAlertOpen, setSuccessAlertOpen] = useState(false); // For error alert box
  const handleEmail = (event) => setEmail(event.target.value); // To store and maintain email value
  const handleErrorAlertClose = () => setErrorAlertOpen(false); // To close error alert box
  const handleSuccessAlertClose = () => setSuccessAlertOpen(false); // To close success alert box

  // On email subscription (Click on subscribe)
  const handleSubscribe = (event) => {
    event.stopPropagation();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setErrorAlertOpen(true);
    } else {
      setSubscribed(true);
      setSuccessAlertOpen(true);
    }
  };

  // On email unsubscription
  const handleUnsubscribe = (event) => {
    event.stopPropagation();
    setSubscribed(false);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container-lg">
        {/* <h4 className="h4 fs-3 footer-title mt-4">Get in Touch with us!</h4> */}
        <div className="row gx-4 mt-3">
          <div className="col-sm-12 col-md-6 my-3">
            <h4 className="h4 fs-3 footer-title mb-4">Get in Touch with us!</h4>
            <div className="d-flex justify-content-start align-items-center footer-info">
              <div className="footer-info-icons">
                <GeoAltFill width="1.5rem" height="1.5rem" />
              </div>
              <p className="ms-4 mb-0">
                2<sup>nd</sup> Floor, Tridev Complex, above Rathi X Ray & Sonography Clinic,
                Udhana Darwaja, Surat, Gujarat 395002
              </p>
            </div>
            <div className="d-flex justify-content-start align-items-center mt-4 footer-info">
              <div className="footer-info-icons">
                <Envelope width="1.5rem" height="1.5rem" />
              </div>
              <p className="ms-4 mb-0 justify-self-center">
                info@msquaretec.com
              </p>
            </div>
            <div className="d-flex justify-content-start align-items-center mt-4 footer-info">
              <div className="footer-info-icons">
                <TelephoneFill width="1.5rem" height="1.5rem" style={{ transform: 'rotate(270deg)' }} />
              </div>
              <div className="ms-4 mb-0 justify-self-center">
                <p className="mb-0">
                  +91 7490044775 (India)
                </p>
                <p className="mb-0">
                  +33 76995 1365 (France)
                </p>
                <p className="mb-0">
                  +1 (703) 220-7958 (Canada)
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 my-3">
            <div className="footer-form-container mx-auto mx-md-0 ms-md-auto">
              <h4 className="h4 footer-form-title">
                {subscribed ? 'You have already subscribed to our Newsletter!' : 'Subscribe to our Newletter'}
              </h4>
              {
                subscribed
                  ? (
                    <Form className="mt-4">
                      <Form.Group controlId="footer-email">
                        <Form.Label className="footer-form-label">Do you want to unsubscribe?</Form.Label>
                      </Form.Group>
                      <div>
                        <Button size="lg" className="footer-subs-btn w-100 text-center" onClick={handleUnsubscribe}>Unsubscribe</Button>
                      </div>
                    </Form>
                  )
                  : (
                    <Form className="mt-4">
                      <Form.Group className="mb-3" controlId="footer-email">
                        <Form.Label className="footer-form-label">Enter your email address here!</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" className="footer-email" onChange={handleEmail} />
                      </Form.Group>
                      <div className="mt-4">
                        <Button size="lg" className="footer-subs-btn w-100 text-center" onClick={handleSubscribe}>Subscribe</Button>
                      </div>
                    </Form>
                  )
              }
              <Alert
                show={errorAlertOpen}
                variant="danger"
                className="position-fixed alert-top-position start-50 mt-2 translate-middle-x cursor-pointer"
                onClick={handleErrorAlertClose}
              >
                <ExclamationCircle className="alert-icons" />{' '}
                Please enter valid email id
                <XLg className="position-absolute top-0 end-0 alert-box-close" />
              </Alert>
              <Alert
                show={successAlertOpen}
                variant="success"
                className="position-fixed alert-top-position start-50 mt-2 translate-middle-x cursor-pointer"
                onClick={handleSuccessAlertClose}
              >
                <CheckCircle className="alert-icons" />{' '}
                Thank you for subscribing our newsletter
                <XLg className="position-absolute top-0 end-0 alert-box-close" />
              </Alert>
            </div>
          </div>
        </div>
        <div className="d-flex gx-4 mt-3 justify-content-center align-items-center">
          <div className="my-3 footer-social-link-container">
            <div className="d-flex justify-content-around mt-2">
              <a
                className="btn footer-social-link"
                href="http://www.facebook.com/profile.php?id="
              >
                <Facebook className="fa fa-lg" />
              </a>
              <a className="btn footer-social-link" href="https://www.instagram.com/">
                <Instagram className="fa fa-lg" />
              </a>
              <a className="btn footer-social-link" href="http://twitter.com/">
                <Twitter className="fa fa-lg" />
              </a>
              <a className="btn footer-social-link" href="http://www.linkedin.com/in/">
                <Linkedin className="fa fa-lg" />
              </a>
              <a className="btn footer-social-link" href="http://youtube.com/">
                <Youtube className="fa fa-lg" />
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex gx-4 mt-3 justify-content-center align-items-center">
          <div className="my-3 footer-link-container">
            <div className="d-flex justify-content-around mt-2">
              <span className="footer-link my-1">
                <Link to="/home" className="footer-link ">
                  Home
                </Link>
              </span>
              <span className="footer-link my-1">
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </span>
              <span className="footer-link my-1">
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </span>
              <span className="footer-link my-1">
                <Link to="/login" className="footer-link">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
