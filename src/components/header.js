import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/services/userSlice'
import Router from 'next/router'
import NotificationsIcon from '@mui/icons-material/Notifications'

export default function Header({ toggleClass, privilege }) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(setUser(null))
        Router.push('/')
    }
    const validPrivilege = privilege.map((priv) =>
        priv.substring(1, priv.length - 1)
    )
    return (
        <Navbar bg="primary" expand="lg">
            <Container fluid>
                <div className="d-flex align-items-center">
                    <Button variant="primary" onClick={toggleClass}>
                        <img src="/eva_menu-fill.svg" />
                    </Button>
                    <h1>Dashboard</h1>
                </div>
                <Form className="d-flex align-items-center">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <NotificationsIcon />
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            <Dropdown.Item>
                                1 minute ago User Uploaded new File
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                1 minute ago User Uploaded new File
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <img src="/icon-user-profile.svg" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            {validPrivilege.includes('Change Password') && (
                                <Dropdown.Item
                                    onClick={() =>
                                        Router.push('/change-password')
                                    }
                                >
                                    Change Password
                                </Dropdown.Item>
                            )}
                            {validPrivilege.includes('Master User') && (
                                <Dropdown.Item
                                    onClick={() => Router.push('/users')}
                                >
                                    Users
                                </Dropdown.Item>
                            )}

                            <Dropdown.Item
                                onClick={() => Router.push('/profile')}
                            >
                                Profile
                            </Dropdown.Item>
                            {validPrivilege.includes('Master Role') && (
                                <Dropdown.Item
                                    onClick={() => Router.push('/roles')}
                                >
                                    Roles
                                </Dropdown.Item>
                            )}
                            {validPrivilege.includes('Master Privilege') && (
                                <Dropdown.Item
                                    onClick={() => Router.push('/privilege')}
                                >
                                    Privilege
                                </Dropdown.Item>
                            )}
                            {validPrivilege.includes(
                                'Master System Parameter'
                            ) && (
                                <Dropdown.Item
                                    onClick={() =>
                                        Router.push('/system-parameter')
                                    }
                                >
                                    System Parameter
                                </Dropdown.Item>
                            )}

                            <Dropdown.Item onClick={logoutHandler}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Container>
        </Navbar>
    )
}
