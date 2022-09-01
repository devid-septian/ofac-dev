import React, { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Header from './components/header';
import SideMenu from './components/side-menu';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Dashboard() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <>
      <div className={`dashboard show_menu ${isActive ? 'show_menu': null}`}>
        <Header />
        <SideMenu />
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <div className='content-wrapper'>
        <Row>
          <Col xs={4}>
            <div className='user-info d-flex align-items-center'>
              <div className='box-icon'>
                <img src="/user.svg" />
              </div>
              <div className='user-desc'>
                <label>ofac_user</label>
                <p>USERNAME</p>
              </div>
            </div>
          </Col>
          <Col xs={4}>
            <div className='user-info d-flex align-items-center'>
              <div className='box-icon'>
                <img src="/star-outlined.svg" />
              </div>
              <div className='user-desc'>
                <label>ofac_role</label>
                <p>ROLE</p>
              </div>
            </div>
          </Col>
          <Col xs={4}>
            <div className='user-info d-flex align-items-center'>
              <div className='box-icon'>
                <img src="/groups-rounded.svg" />
              </div>
              <div className='user-desc'>
                <label>PT Bank Negara Indonesia Tbk</label>
                <p>Organization</p>
              </div>
            </div>
          </Col>
        </Row>
        </div>
      </div>
    </>
  )
}