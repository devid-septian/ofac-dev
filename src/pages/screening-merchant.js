import React, { useState } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

export default function Dashboard() {
    const [isActive, setActive] = useState(true)

    const toggleClass = () => {
        setActive(!isActive)
    }
    const user = useSelector(getUserState)
    // if (!user) {
    //     Router.push('/')
    //     return
    // }
    return (
      <>
        <div className={`dashboard ${isActive ? 'show_menu' : null}`}>
            <Header toggleClass={toggleClass} />
            <SideMenu />
            <div className="content-wrapper filter-data">
              <Card>
                <Card.Header>Data Filter</Card.Header>
                <Card.Body>
                <Row>
                  <Col sm={4}>
                  <Form.Label>Merchant Account Name <span>*</span></Form.Label>
                  </Col>
                  <Col sm={8}>
                  <Form.Group className="mb-3 input-half" controlId="dataForm.ControlInputAccount">
                    <Form.Control type="text" />
                  </Form.Group>
                  </Col>
                  <Col sm={4}>
                  <Form.Label>ID Number (KTP) <span>*</span></Form.Label>
                  </Col>
                  <Col sm={8}>
                  <Form.Group className="mb-3 input-half" controlId="dataForm.ControlInputId">
                    <Form.Control type="text" />
                  </Form.Group>
                  </Col>
                  <Col sm={4}>
                  <Form.Label>Date of Birth</Form.Label>
                  </Col>
                  <Col sm={8}>
                  <Form.Group className="mb-3 input-half" controlId="dataForm.ControlInputBirth">
                    <Form.Control type="text" />
                  </Form.Group>
                  </Col>
                </Row>
                  <Button variant="primary2 me-2" size="sm">
                    <CheckIcon />
                    Apply
                  </Button>
                  <Button variant="secondary" size="sm">
                    <CloseOutlinedIcon />
                    Clear
                  </Button>
                </Card.Body>
              </Card>
              <Card className="mt-5">
                <Card.Header>Result Data</Card.Header>
                <Card.Body className="data-result">
                  <Tabs
                    defaultActiveKey="cdn"
                    id="uncontrolled-tab-example"
                    className="mb-3 "
                  >
                    <Tab eventKey="cdn" title="Cdn">
                    <Table striped>
                      <tbody>
                        <tr>
                          <td>Merchant Acc. Name</td>
                          <td>ID Number</td>
                          <td>Date of Birth</td>
                          <td>Merchant Name</td>
                          <td>Merchant ID</td>
                          <td>Action</td>
                        </tr>
                        <tr>
                        <td>Merchant Acc. Name</td>
                          <td>ID Number</td>
                          <td>Date of Birth</td>
                          <td>Merchant Name</td>
                          <td>Merchant ID</td>
                          <td><Button variant="primary2"><VisibilityOutlinedIcon /></Button></td>
                        </tr>
                        <tr>
                        <td>Merchant Acc. Name</td>
                          <td>ID Number</td>
                          <td>Date of Birth</td>
                          <td>Merchant Name</td>
                          <td>Merchant ID</td>
                          <td><Button variant="primary2"><VisibilityOutlinedIcon /></Button></td>
                        </tr>
                        <tr>
                        <td>Merchant Acc. Name</td>
                          <td>ID Number</td>
                          <td>Date of Birth</td>
                          <td>Merchant Name</td>
                          <td>Merchant ID</td>
                          <td><Button variant="primary2"><VisibilityOutlinedIcon /></Button></td>
                        </tr>
                        <tr>
                        <td>Merchant Acc. Name</td>
                          <td>ID Number</td>
                          <td>Date of Birth</td>
                          <td>Merchant Name</td>
                          <td>Merchant ID</td>
                          <td><Button variant="primary2"><VisibilityOutlinedIcon /></Button></td>
                        </tr>
                      </tbody>
                    </Table>
                    </Tab>
                    <Tab eventKey="consolidated" title="Consolidated">
                      
                    </Tab>
                    <Tab eventKey="amex" title="AMEX">
                      
                    </Tab>
                  </Tabs>
                  <Button className="btn-download" variant="success" size="sm">
                    <FileDownloadIcon />
                    Download
                  </Button>
                </Card.Body>
              </Card>
            </div>
        </div>
      </>
    )
}
