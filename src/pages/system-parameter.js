import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import { Modal, Button, Card, Col, Form, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import EditIcon from '@mui/icons-material/Edit'
import {
    useGetSystemParameterMutation,
    useUpdateSystemParameterMutation,
} from '../redux/services/apiSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Table from 'react-bootstrap/Table'

export default function Dashboard() {
    const [isActive, setActive] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [listSystemParameter, setListSystemParameter] = useState([])
    const [systemIdData, setSystemIdData] = useState('')
    const [systemStatusData, setSystemStatusData] = useState('')
    const [systemNameData, setSystemNameData] = useState('')
    const [systemValueData, setSystemValueData] = useState('')
    const [getSystemParameter, { isLoading }] = useGetSystemParameterMutation()
    const [updateSystemParameter, { isLoadingUpdate }] =
        useUpdateSystemParameterMutation()
    const MySwal = withReactContent(Swal)

    const toggleClass = () => {
        setActive(!isActive)
    }
    const user = useSelector(getUserState)

    const getSystemParameterList = async () => {
        const listSystemParameterApi = await getSystemParameter({
            user_token: user.User.user_token,
        })
        setListSystemParameter(listSystemParameterApi.data.data)
    }

    useEffect(() => {
        getSystemParameterList()
    }, [])

    if (!user) {
        Router.push('/')
        return
    }

    const modalHandler = (system) => {
        setSystemIdData(system.systemparameter_id)
        setSystemStatusData(system.status)
        setSystemNameData(system.parameter_name)
        setSystemValueData(system.parameter_value)
        setShowModal(true)
    }

    const submitHandler = async () => {
        const dataRequest = {
            parameter_name: systemNameData,
            parameter_value: systemValueData,
            status: systemStatusData,
            systemparameter_id: systemIdData,
            user_token: user.User.user_token,
        }
        const result = await updateSystemParameter(dataRequest)
        if (result.data.success) {
            setShowModal(false)
            MySwal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Success Edit System Parameter',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed Edit System Parameter',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }

    return (
        <>
            <div className={`dashboard ${isActive ? 'show_menu' : null}`}>
                <Header toggleClass={toggleClass} />
                <SideMenu />
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Edit System Parameter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col>
                            <Form.Label>
                                System Parameter Name <span>*</span>
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Group
                                className="mb-3 input-half"
                                controlId="dataForm.ControlInputAccount"
                            >
                                <Form.Control
                                    type="text"
                                    value={systemNameData}
                                    onChange={(e) =>
                                        setSystemNameData(e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Label>
                                System Parameter Value <span>*</span>
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Group
                                className="mb-3 input-half"
                                controlId="dataForm.ControlInputAccount"
                            >
                                <Form.Control
                                    type="text"
                                    value={systemValueData}
                                    onChange={(e) =>
                                        setSystemValueData(e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                            disabled={isLoadingUpdate}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            disabled={isLoadingUpdate}
                            onClick={submitHandler}
                        >
                            {isLoadingUpdate ? (
                                <Spinner animation="border" variant="light" />
                            ) : (
                                'Edit System Parameter'
                            )}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="content-wrapper filter-data">
                    <Card className="mt-5">
                        <Card.Header>Roles Data</Card.Header>
                        <Card.Body className="data-result">
                            <Table striped>
                                <tbody>
                                    <tr>
                                        <td>System Parameter Name</td>
                                        <td>System Parameter Value</td>
                                        <td>Action</td>
                                    </tr>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={5}>
                                                <div className="d-flex justify-content-center pt-3">
                                                    <Spinner
                                                        animation="border"
                                                        variant="light"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        listSystemParameter.map(
                                            (system) =>
                                                system.status === 'active' && (
                                                    <tr
                                                        key={
                                                            system.systemparameter_id
                                                        }
                                                    >
                                                        <td>
                                                            {
                                                                system.parameter_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                system.parameter_value
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="primary2"
                                                                onClick={() =>
                                                                    modalHandler(
                                                                        system
                                                                    )
                                                                }
                                                            >
                                                                <EditIcon />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                        )
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
