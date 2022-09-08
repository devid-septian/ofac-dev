import React, { useState } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import Pagination from '../components/pagination'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import CheckIcon from '@mui/icons-material/Check'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'

export default function Dashboard() {
    const [modalShow, setModalShow] = React.useState(false)
    const [isActive, setActive] = useState(true)

    const toggleClass = () => {
        setActive(!isActive)
    }
    const user = useSelector(getUserState)

    if (!user) {
        Router.push('/')
        return
    }
    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Show Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={5}>
                                <div className="detail-box">
                                    <label>Merchant Name:</label>
                                    <p>XXI.PIM</p>
                                </div>
                                <div className="detail-box">
                                    <label>ID Number:</label>
                                    <p>3490xxxxxxxxxxx</p>
                                </div>
                                <div className="detail-box">
                                    <label>First Name:</label>
                                    <p>Archie</p>
                                </div>
                                <div className="detail-box">
                                    <label>Place of Birth:</label>
                                    <p>Padang</p>
                                </div>
                            </Col>
                            <Col xs={7}>
                                <div className="detail-box">
                                    <label>Merchant Account Name:</label>
                                    <p>XXI Pd. Indah Mall</p>
                                </div>
                                <div className="detail-box">
                                    <label>Merchant ID Number:</label>
                                    <p>100-016156xxx</p>
                                </div>
                                <div className="detail-box">
                                    <label>Last Name:</label>
                                    <p>ASD</p>
                                </div>
                                <div className="detail-box">
                                    <label>Date of Birth:</label>
                                    <p>August 14, 1971</p>
                                </div>
                            </Col>
                        </Row>
                        <Accordion
                            className="accordion-detail mt-4"
                            defaultActiveKey={['0']}
                            alwaysOpen
                        >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    Address Info
                                </Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    Citizenship Info
                                </Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>
                                    Nationality Info
                                </Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Others Info</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
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
                                    <Form.Label>
                                        Merchant Account Name <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>
                                        ID Number (KTP) <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputId"
                                    >
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>Date of Birth</Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputBirth"
                                    >
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
                                                <td>
                                                    <Button
                                                        variant="primary2"
                                                        onClick={() =>
                                                            setModalShow(true)
                                                        }
                                                    >
                                                        <VisibilityOutlinedIcon />
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Merchant Acc. Name</td>
                                                <td>ID Number</td>
                                                <td>Date of Birth</td>
                                                <td>Merchant Name</td>
                                                <td>Merchant ID</td>
                                                <td>
                                                    <Button variant="primary2">
                                                        <VisibilityOutlinedIcon />
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Merchant Acc. Name</td>
                                                <td>ID Number</td>
                                                <td>Date of Birth</td>
                                                <td>Merchant Name</td>
                                                <td>Merchant ID</td>
                                                <td>
                                                    <Button variant="primary2">
                                                        <VisibilityOutlinedIcon />
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Merchant Acc. Name</td>
                                                <td>ID Number</td>
                                                <td>Date of Birth</td>
                                                <td>Merchant Name</td>
                                                <td>Merchant ID</td>
                                                <td>
                                                    <Button variant="primary2">
                                                        <VisibilityOutlinedIcon />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Pagination />
                                </Tab>
                                <Tab
                                    eventKey="consolidated"
                                    title="Consolidated"
                                ></Tab>
                                <Tab eventKey="amex" title="AMEX"></Tab>
                            </Tabs>
                            <Button
                                className="btn-download"
                                variant="success"
                                size="sm"
                            >
                                <FileDownloadIcon />
                                Download
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}
