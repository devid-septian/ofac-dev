import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import Pagination from '../components/pagination'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import Table from 'react-bootstrap/Table'
import { useGetUserMutation } from '../redux/services/apiSlice'

export default function Dashboard() {
    const [isActive, setActive] = useState(true)
    const [listUser, setListUser] = useState([])
    const [getUser, { isLoading }] = useGetUserMutation()
    const getListUser = async () => {
        const listUserApi = await getUser({
            user_name: '',
            user_full_name: '',
            role_id: 1,
            status: '',
            user_organization: '',
            user_token: user.User.user_token,
        })
        setListUser(listUserApi.data.data)
    }
    useEffect(() => {
        getListUser()
    }, [])

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
                                    {listUser.map((user) => (
                                        <>
                                            <tr>
                                                <td>{user.User.user_name}</td>
                                                <td>{user.User.status}</td>
                                                <td>{user.Role.role_name}</td>
                                                <td>
                                                    {
                                                        user.User
                                                            .user_organization
                                                    }
                                                </td>
                                                <td>
                                                    <Button variant="primary2">
                                                        <VisibilityOutlinedIcon />
                                                    </Button>
                                                    &nbsp;
                                                    <Button variant="danger">
                                                        <DeleteIcon
                                                            style={{
                                                                color: 'white',
                                                            }}
                                                        />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
