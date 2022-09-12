import React from 'react'
import { Modal, Container, Row, Col, Accordion } from 'react-bootstrap'

const MyVerticallyCenteredModal = (props) => {
    const { merchantDetail } = props
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
                        <Col xs={6}>
                            <div className="detail-box">
                                <label>ID Number:</label>
                                <p>{merchantDetail.header.id_number}</p>
                            </div>
                            <div className="detail-box">
                                <label>First Name:</label>
                                <p>{merchantDetail.header.first_name}</p>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="detail-box">
                                <label>Last Name:</label>
                                <p>{merchantDetail.header.last_name}</p>
                            </div>
                            <div className="detail-box">
                                <label>Date of Birth:</label>
                                <p>{merchantDetail.header.dob}</p>
                            </div>
                        </Col>
                    </Row>
                    <Accordion
                        className="accordion-detail mt-4"
                        defaultActiveKey={['0']}
                        alwaysOpen
                    >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Name Info</Accordion.Header>
                            <Accordion.Body>
                                {merchantDetail.aka &&
                                    merchantDetail.aka.map((data, index) => (
                                        <>
                                            <Row key={index}>
                                                <Col xs={6}>
                                                    <div className="detail-box">
                                                        <label>Type:</label>
                                                        <p>{data.type}</p>
                                                    </div>
                                                    <div className="detail-box">
                                                        <label>
                                                            First Name:
                                                        </label>
                                                        <p>{data.first_name}</p>
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className="detail-box">
                                                        <label>Category:</label>
                                                        <p>{data.category}</p>
                                                    </div>
                                                    <div className="detail-box">
                                                        <label>
                                                            Last Name:
                                                        </label>
                                                        <p>{data.last_name}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </>
                                    ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Address Info</Accordion.Header>
                            <Accordion.Body>
                                {merchantDetail.addrees &&
                                    merchantDetail.addrees.map(
                                        (data, index) => (
                                            <>
                                                <Row key={index}>
                                                    <Col xs={6}>
                                                        <div className="detail-box">
                                                            <label>
                                                                Address 1:
                                                            </label>
                                                            <p>
                                                                {data.address_1}
                                                            </p>
                                                        </div>
                                                        <div className="detail-box">
                                                            <label>
                                                                Address 3:
                                                            </label>
                                                            <p>
                                                                {data.address_3}
                                                            </p>
                                                        </div>
                                                        <div className="detail-box">
                                                            <label>
                                                                Province:
                                                            </label>
                                                            <p>
                                                                {
                                                                    data.state_province
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="detail-box">
                                                            <label>
                                                                Country:
                                                            </label>
                                                            <p>
                                                                {data.country}
                                                            </p>
                                                        </div>

                                                        <div className="detail-box">
                                                            <label>
                                                                Remarks:
                                                            </label>
                                                            <p>
                                                                {data.remarks}
                                                            </p>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="detail-box">
                                                            <label>
                                                                Address 2:
                                                            </label>
                                                            <p>
                                                                {data.address_2}
                                                            </p>
                                                        </div>
                                                        <div className="detail-box">
                                                            <label>
                                                                City Code:
                                                            </label>
                                                            <p>{data.city}</p>
                                                        </div>
                                                        <div className="detail-box">
                                                            <label>
                                                                Postal Code:
                                                            </label>
                                                            <p>
                                                                {
                                                                    data.postal_code
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="detail-box">
                                                            <label>
                                                                Status:
                                                            </label>
                                                            <p>{data.status}</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </>
                                        )
                                    )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                Citizenship Info
                            </Accordion.Header>
                            <Accordion.Body>
                                {merchantDetail.citizenship &&
                                    merchantDetail.citizenship.map(
                                        (data, index) => (
                                            <>
                                                <Row key={index}>
                                                    <Col xs={6}>
                                                        <div className="detail-box">
                                                            <label>
                                                                Country:
                                                            </label>
                                                            <p>
                                                                {data.country}
                                                            </p>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="detail-box">
                                                            <label>
                                                                Status:
                                                            </label>
                                                            <p>{data.status}</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </>
                                        )
                                    )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                Nationality Info
                            </Accordion.Header>
                            <Accordion.Body>
                                {merchantDetail.nationality &&
                                    merchantDetail.nationality.map(
                                        (data, index) => (
                                            <>
                                                <Row key={index}>
                                                    <Col xs={6}>
                                                        <div className="detail-box">
                                                            <label>
                                                                Country:
                                                            </label>
                                                            <p>
                                                                {data.country}
                                                            </p>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="detail-box">
                                                            <label>
                                                                Status:
                                                            </label>
                                                            <p>{data.status}</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </>
                                        )
                                    )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                Place of Birth Info
                            </Accordion.Header>
                            <Accordion.Body>
                                {merchantDetail.pob &&
                                    merchantDetail.pob.map((data, index) => (
                                        <>
                                            <Row key={index}>
                                                <Col xs={6}>
                                                    <div className="detail-box">
                                                        <label>Country:</label>
                                                        <p>{data.dob}</p>
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className="detail-box">
                                                        <label>Status:</label>
                                                        <p>{data.status}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </>
                                    ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>
                                Place of Birth Info
                            </Accordion.Header>
                            <Accordion.Body>
                                {merchantDetail.pob &&
                                    merchantDetail.pob.map((data, index) => (
                                        <>
                                            <Row key={index}>
                                                <Col xs={6}>
                                                    <div className="detail-box">
                                                        <label>Place:</label>
                                                        <p>{data.dob}</p>
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className="detail-box">
                                                        <label>Status:</label>
                                                        <p>{data.status}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </>
                                    ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>
                                Date of Birth Info
                            </Accordion.Header>
                            <Accordion.Body>
                                {merchantDetail.dob &&
                                    merchantDetail.dob.map((data, index) => (
                                        <>
                                            <Row key={index}>
                                                <Col xs={6}>
                                                    <div className="detail-box">
                                                        <label>Date:</label>
                                                        <p>{data.dob}</p>
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className="detail-box">
                                                        <label>Status:</label>
                                                        <p>{data.status}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </>
                                    ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                            <Accordion.Header>ID Number Info</Accordion.Header>
                            <Accordion.Body>
                                {merchantDetail.dob &&
                                    merchantDetail.dob.map((data, index) => (
                                        <>
                                            <Row key={index}>
                                                <Col xs={6}>
                                                    <div className="detail-box">
                                                        <label>Country:</label>
                                                        <p>{data.id_country}</p>
                                                    </div>
                                                    <div className="detail-box">
                                                        <label>Number:</label>
                                                        <p>{data.id_number}</p>
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className="detail-box">
                                                        <label>
                                                            Type Id Number:
                                                        </label>
                                                        <p>{data.id_type}</p>
                                                    </div>
                                                    <div className="detail-box">
                                                        <label>Status:</label>
                                                        <p>{data.status}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </>
                                    ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>Program Info</Accordion.Header>
                            <Accordion.Body>
                                {merchantDetail.program &&
                                    merchantDetail.program.map(
                                        (data, index) => (
                                            <>
                                                <Row key={index}>
                                                    <Col xs={6}>
                                                        <div className="detail-box">
                                                            <label>
                                                                Program:
                                                            </label>
                                                            <p>
                                                                {
                                                                    data.program_name
                                                                }
                                                            </p>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="detail-box">
                                                            <label>
                                                                Status:
                                                            </label>
                                                            <p>{data.status}</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </>
                                        )
                                    )}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default MyVerticallyCenteredModal
