import React, { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Header from './components/header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Dashboard() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <>
      <div className={`dashboard ${isActive ? 'show_menu': null}`}>
        <Header />
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <div className='content-wrapper'>
        <Row>
          <Col xs={4}>
            <div className='user-info d-flex align-items-center'>

            </div>
          </Col>
        </Row>
        </div>
      </div>
    </>
  )
}