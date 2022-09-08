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
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
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
                <Header toggleClass={toggleClass} />
                <SideMenu />
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Ofac</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content-wrapper report-data">
                    <Card>
                        <Card.Header>Search</Card.Header>
                        <Card.Body>
                            <div className="search-form">
                                <div className="form-date">
                                    <Form.Label>
                                        Start <span>*</span>
                                    </Form.Label>
                                    <Form.Group
                                        className=""
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="form-date">
                                    <Form.Label>
                                        End <span>*</span>
                                    </Form.Label>
                                    <Form.Group
                                        className=""
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div>
                                    <Button variant="info" size="sm">
                                        <SearchOutlinedIcon />
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="mt-5">
                        <Card.Header>
                            Rerport Table
                            <Button variant="success" size="sm">
                                <ReplayOutlinedIcon />
                                Process
                            </Button>
                        </Card.Header>
                        <Card.Body className="data-result">
                            <Table striped>
                                <tbody>
                                    <tr>
                                        <td>Extract Date</td>
                                        <td>Ofac List</td>
                                        <td>Start Date</td>
                                        <td>End Date</td>
                                        <td>Potential Match</td>
                                        <td>Positive Match</td>
                                        <td>Data Detail</td>
                                        <td>Action</td>
                                    </tr>
                                    <tr>
                                        <td>Extract Date</td>
                                        <td>Ofac List</td>
                                        <td>Start Date</td>
                                        <td>End Date</td>
                                        <td>Potential Match</td>
                                        <td>Positive Match</td>
                                        <td>Data Detail</td>
                                        <td>
                                            <Button variant="success">
                                                <FileDownloadIcon />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Extract Date</td>
                                        <td>Ofac List</td>
                                        <td>Start Date</td>
                                        <td>End Date</td>
                                        <td>Potential Match</td>
                                        <td>Positive Match</td>
                                        <td>Data Detail</td>
                                        <td>
                                            <Button variant="success">
                                                <FileDownloadIcon />
                                            </Button>
                                        </td>
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
