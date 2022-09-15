import React, { useState } from 'react'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import { useUpdatePasswordMutation } from '../redux/services/apiSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Dashboard() {
    const user = useSelector(getUserState)
    const [isActive, setActive] = useState(true)
    const MySwal = withReactContent(Swal)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

    const toggleClass = () => {
        setActive(!isActive)
    }

    if (!user) {
        Router.push('/')
        return
    }

    const changePasswordHandler = () => {
        Swal.fire({
            title: 'Change Password',
            text: 'Do you want to change password ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const requestBody = {
                    user_name: user.User.user_name,
                    user_password: currentPassword,
                    new_user_password: newPassword,
                    user_token: user.User.user_token,
                }
                return updatePassword(requestBody)
                    .then((response) => {
                        console.log(response)
                        if (!response.data.success) {
                            throw new Error(response.statusText)
                        }
                        return response
                    })
                    .catch((error) => {
                        console.log(error)
                        Swal.showValidationMessage(`Request failed: ${error}`)
                    })
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Change Password success',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        })
    }

    return (
        <>
            <div className={`dashboard ${isActive ? 'show_menu' : null}`}>
                <Header toggleClass={toggleClass} privilege={user.Privilege} />
                <SideMenu privilege={user.Privilege} />
                <div className="content-wrapper filter-data">
                    <Card>
                        <Card.Header>Change Password</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={3}>
                                    <Form.Label>
                                        Current Password <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Label>
                                        New Password <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Button
                                        variant="success"
                                        onClick={changePasswordHandler}
                                    >
                                        Change Password
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
