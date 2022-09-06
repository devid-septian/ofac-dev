import React, { useState } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'

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
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content-wrapper">
                    <Row>
                        <Col xs={4}>
                            <div className="user-info d-flex align-items-center">
                                <div className="box-icon">
                                    <img src="/user.svg" />
                                </div>
                                <div className="user-desc">
                                    <label>
                                        {user && user.User.user_full_name}
                                    </label>
                                    <p>USERNAME</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={4}>
                            <div className="user-info d-flex align-items-center">
                                <div className="box-icon">
                                    <img src="/star-outlined.svg" />
                                </div>
                                <div className="user-desc">
                                    <label>{user && user.Role.role_name}</label>
                                    <p>ROLE</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={4}>
                            <div className="user-info d-flex align-items-center">
                                <div className="box-icon">
                                    <img src="/groups-rounded.svg" />
                                </div>
                                <div className="user-desc">
                                    <label>
                                        {user && user.User.user_organization}
                                    </label>
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
