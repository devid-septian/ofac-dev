import React, { useState } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import Pagination from '../components/pagination'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
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
                <div className="content-wrapper filter-data">
                    <Card className="mt-5">
                        <Card.Header>Users Data</Card.Header>
                        <Card.Body className="data-result">
                            <Table striped>
                                <tbody>
                                    <tr>
                                        <td>Username</td>
                                        <td>Status</td>
                                        <td>Role</td>
                                        <td>Organization</td>
                                        <td>
                                            <Button variant="success">
                                                Add Users
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Riyan</td>
                                        <td>Active</td>
                                        <td>Admin</td>
                                        <td>Appfuxion</td>
                                        <td>
                                            <Button variant="primary2">
                                                <VisibilityOutlinedIcon />
                                            </Button>
                                            &nbsp;
                                            <Button variant="danger">
                                                <DeleteIcon
                                                    style={{ color: 'white' }}
                                                />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Pagination />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
