import {
  Navbar, Nav, Button,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CustomDropdown } from '../../components';
import {
  salesMenu, inventoryMenu, purchaseMenu,
} from './dropdown_data';
import './style.css';
import { UserContext } from '../../contexts/user';

export default function index() {
  // set the user from UserContext which is basically assigned by the Login Component
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const [path, setPath] = useState(history.location.pathname);

  const handleLinkClick = (event, link) => {
    event.stopPropagation();
    // It stops calling event handler of parent element
    setPath(link);
  };

  return (
    <div>
      <Navbar className="pb-0 pt-0" fixed="top" expand="lg">
        <Navbar.Brand
          as={Link}
          to={user ? '/dashboard' : '/'}
          className="pb-0 pt-0"
          onClick={(event) => handleLinkClick(event, user ? '/dashboard' : '/')}
        >
          <img
            style={{ height: '100%', width: '175px' }}
            src="https://puyinfotech.com/wp-content/uploads/2020/08/white_logo_transparent_background.png"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav d-md-flex d-lg-flex " />

        <Navbar.Collapse id="basic-navbar-nav">
          {user ? (
            <div>
              <Nav className="mr-auto">
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  className={`navbar-links Navbar_active_${path === '/dashboard'}`}
                  onClick={(event) => handleLinkClick(event, '/dashboard')}
                >
                  Dashboard
                </Nav.Link>
                <CustomDropdown
                  title={inventoryMenu.title}
                  menuItems={inventoryMenu.menuItems}
                  eventKey={inventoryMenu.eventKey}
                  path={path}
                  onClick={handleLinkClick}
                />
                <CustomDropdown
                  title={purchaseMenu.title}
                  menuItems={purchaseMenu.menuItems}
                  eventKey={purchaseMenu.eventKey}
                  path={path}
                  onClick={handleLinkClick}
                />
                <CustomDropdown
                  title={salesMenu.title}
                  menuItems={salesMenu.menuItems}
                  eventKey={salesMenu.eventKey}
                  path={path}
                  onClick={handleLinkClick}
                />
                <Nav.Link
                  as={Link}
                  to="/expenses"
                  className={`navbar-links Navbar_active_${path === '/expenses'}`}
                  onClick={(event) => handleLinkClick(event, '/expenses')}
                >
                  Expenses
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/tracking"
                  className={`navbar-links Navbar_active_${path === '/tracking'}`}
                  onClick={(event) => handleLinkClick(event, '/tracking')}
                >
                  Tracking
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/products"
                  className={`navbar-links Navbar_active_${path === '/products'}`}
                  onClick={(event) => handleLinkClick(event, '/products')}
                >
                  Products
                </Nav.Link>
              </Nav>
            </div>
          ) : (
            <div>
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" className="navbar-links">Home</Nav.Link>
                <Nav.Link as={Link} to="/" className="navbar-links">About</Nav.Link>
                <Nav.Link as={Link} to="/" className="navbar-links">Contact </Nav.Link>
              </Nav>
            </div>
          )}
          <div className="Navbar__ButtonContainer">
            { user ? (
              <Button variant="outline-dark" onClick={() => { sessionStorage.setItem('user', null); setUser(null); }}>
                LOG OUT
              </Button>
            ) : (
              <Button variant="outline-dark" onClick={() => history.push('/login')}>
                LOG IN
              </Button>
            ) }
          </div>
        </Navbar.Collapse>

      </Navbar>
    </div>
  );
}
