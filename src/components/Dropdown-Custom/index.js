/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown, Accordion, Card, Nav, ButtonGroup,
} from 'react-bootstrap';
import { ChevronRight, CaretDownFill, ChevronDown } from 'react-bootstrap-icons';

const CustomAccordion = ({
  title, menuItems, eventKey, onClick, path,
}) => (
  <Accordion className="d-block d-lg-none">
    <Card className="navbar-nav accordion-card">
      <Card.Header className="navbar-links nav-link accordion-card">
        <Accordion.Toggle
          as={Link}
          to={title.link}
          className={`border-0 accordion-link Navbar_active_${path === title.link}`}
          eventKey={eventKey}
          onClick={(event) => onClick(event, title.link)}
        >
          {title.text}{' '}<CaretDownFill fontSize="0.8rem" />
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body className="py-1">
          {
            menuItems.map((menuItem, menuItemindex) => {
              if (menuItem.innerMenuItem !== undefined) {
                return (
                  <div className="p-1" key={`menu-item-${menuItemindex}`}>
                    <Accordion className="d-block d-lg-none">
                      <Card className="navbar-nav accordion-card">
                        <Card.Header className="navbar-links nav-link accordion-card">
                          <Accordion.Toggle
                            as={Link}
                            to={menuItem.link}
                            className="border-0 accordion-link"
                            eventKey={menuItem.eventKey}
                            onClick={(event) => onClick(event, title.link)}
                          >
                            {menuItem.text}{' '}<CaretDownFill fontSize="0.8rem" />
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={menuItem.eventKey}>
                          <Card.Body className="py-1">
                            {
                                menuItem.innerMenuItem.map((item, itemIndex) => (
                                  <div className="p-1" key={`inner-menu-item-${itemIndex}`}>
                                    <Link
                                      to={item.link}
                                      className="accordion-link"
                                      onClick={(event) => onClick(event, title.link)}
                                    >{item.text}
                                    </Link>
                                  </div>
                                ))
                            }
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                );
              }
              return (
                <div className="p-1">
                  <Link
                    to={menuItem.link}
                    className="accordion-link"
                    onClick={(event) => onClick(event, title.link)}
                  >{menuItem.text}
                  </Link>
                </div>
              );
            })
        }
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
);

const CustomDropdown = ({
  title, menuItems, onClick, path,
}) => (
  <Dropdown as={ButtonGroup} navbar className="outer-dropdown d-lg-inline-flex d-none">
    <Nav.Link
      as={Link}
      to={title.link}
      className={`navbar-links Navbar_active_${path === title.link}`}
      onClick={(event) => onClick(event, title.link)}
    >
      {title.text}{' '}<ChevronDown fontSize="0.95rem" />
    </Nav.Link>
    <Dropdown.Menu renderOnMount className="outer-dropdown-menu ">
      {
        menuItems.map((menuItem, menuItemindex) => {
          if (menuItem.innerMenuItem !== undefined) {
            return (
              <Dropdown as={ButtonGroup} navbar className="inner-dropdown w-100" key={`menu-item-${menuItemindex}`}>
                <Dropdown.Item
                  as={Link}
                  to={title.link}
                  className="w-100 pe-0 dropdown-item-link"
                  onClick={(event) => onClick(event, title.link)}
                >
                  <div className="w-100 d-inline-flex align-items-center justify-content-between">
                    {menuItem.text}
                    <ChevronRight fontSize="1rem" className="me-2" />
                  </div>
                </Dropdown.Item>
                <Dropdown.Menu renderOnMount className="inner-dropdown-menu ">
                  {
                    menuItem.innerMenuItem.map((item, itemIndex) => (
                      <Dropdown.Item
                        as={Link}
                        to={item.link}
                        className="dropdown-item-link"
                        key={`inner-menu-item-${itemIndex}`}
                        onClick={(event) => onClick(event, title.link)}
                      >
                        {item.text}
                      </Dropdown.Item>
                    ))
                }
                </Dropdown.Menu>
              </Dropdown>
            );
          }
          return (
            <Dropdown.Item
              as={Link}
              to={menuItem.link}
              className="dropdown-item-link"
              onClick={(event) => onClick(event, title.link)}
            >
              {menuItem.text}
            </Dropdown.Item>
          );
        })
    }
    </Dropdown.Menu>
  </Dropdown>
);

export default function MenuDropdown({
  title, menuItems, eventKey, onClick, path,
}) {
  return (
    <>
      <CustomDropdown title={title} menuItems={menuItems} onClick={onClick} path={path} />
      <CustomAccordion title={title} menuItems={menuItems} eventKey={eventKey} onClick={onClick} path={path} />
    </>
  );
}
