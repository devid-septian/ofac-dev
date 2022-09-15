import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import Table from 'react-bootstrap/Table'

export default function Dashboard() {
    const [isActive, setActive] = useState(true)

    const toggleClass = () => {
        setActive(!isActive)
    }
    const user = useSelector(getUserState)

    if (!user) {
        Router.push('/')
        return
    }

    return (
        <>
            <div className={`dashboard ${isActive ? 'show_menu' : null}`}>
                <Header toggleClass={toggleClass} privilege={user.Privilege} />
                <SideMenu privilege={user.Privilege} />
                <div className="content-wrapper filter-data">
                    <Card className="mt-5">
                        <Card.Header>Profile Data</Card.Header>
                        <Card.Body className="data-result">
                            <Table striped bordered>
                                <tbody>
                                    <tr>
                                        <td>User Name: </td>
                                        <td>{user.User.user_name}</td>
                                    </tr>
                                    <tr>
                                        <td>User Full Name: </td>
                                        <td>{user.User.user_full_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Status: </td>
                                        <td>{user.User.status}</td>
                                    </tr>
                                    <tr>
                                        <td>Role: </td>
                                        <td>{user.Role.role_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Organization: </td>
                                        <td>{user.User.user_organization}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
