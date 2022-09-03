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

export default function Header({ toggleClass }) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(setUser(null))
        Router.push('/')
    }
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
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Ofac - Merchant
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logoutHandler}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <img src="/icon-user-profile.svg" />
                </Form>
            </Container>
        </Navbar>
    )
}
