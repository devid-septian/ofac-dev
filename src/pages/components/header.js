import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Header() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
  <Navbar bg="primary" expand="lg">
    <Container fluid>
      <div className='d-flex align-items-center'>
        <Button variant="primary" onClick={toggleClass}>
          <img src="/eva_menu-fill.svg" />
        </Button>
        <h1>Dashboard</h1>
      </div>
      <Form className="d-flex align-items-center">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <img src="/icon-user-profile.svg" />
      </Form>
    </Container>
  </Navbar>
  )
}
