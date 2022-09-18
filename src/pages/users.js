import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import {
    Modal,
    Button,
    Card,
    Col,
    Form,
    Spinner,
    Row,
    Container,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
    useGetRoleMutation,
    useAddRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
    useGetUserMutation,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} from '../redux/services/apiSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Table from 'react-bootstrap/Table'

export default function Dashboard() {
    const [isActive, setActive] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const [listRoles, setListRoles] = useState([])
    const [userNameData, setUserNameData] = useState('')
    const [userFullNameData, setUserFullNameData] = useState('')
    const [passwordData, setPasswordData] = useState('')
    const [roleNameData, setRoleNameData] = useState(0)
    const [organizationData, seOrganizationData] = useState('')
    const [userIdData, setUserIdData] = useState('')
    const [roleStatusData, setRoleStatusData] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [getRole] = useGetRoleMutation()
    const [getUser, { isLoading }] = useGetUserMutation()
    const [addUser, { isLoadingAdd }] = useAddUserMutation()
    const [updateUser, { isLoadingUpdate }] = useUpdateUserMutation()
    const [deleteUser, { isLoadingDelete }] = useDeleteUserMutation()
    const MySwal = withReactContent(Swal)

    const toggleClass = () => {
        setActive(!isActive)
    }
    const modalHandler = (user) => {
        if (user) {
            setIsEdit(true)
            setUserNameData(user.User.user_name)
            setUserFullNameData(user.User.user_full_name)
            setPasswordData(user.User.user_password)
            setRoleNameData(user.User.role_id)
            setUserIdData(user.User.user_id)
            seOrganizationData(user.User.user_organization)
        } else {
            setIsEdit(false)
            setUserNameData('')
            setUserFullNameData('')
            setPasswordData('')
            setRoleNameData(0)
            seOrganizationData('')
        }
        setShowModal(true)
    }
    const user = useSelector(getUserState)

    const getUserList = async () => {
        const requestBody = {
            user_name: '',
            user_full_name: '',
            role_id: 0,
            status: 'active',
            user_organization: '',
            user_token: user.User.user_token,
        }
        const listUsersApi = await getUser(requestBody)
        setListUsers(listUsersApi.data.data)
    }

    const getRoleList = async () => {
        const listRolesApi = await getRole({ user_token: user.User.user_token })
        setListRoles(listRolesApi.data.data)
    }

    const submitHandler = async () => {
        const dataRequest = isEdit
            ? {
                  user_name: userNameData,
                  user_full_name: userFullNameData,
                  user_password: passwordData,
                  status: 'active',
                  role_id: roleNameData,
                  user_organization: organizationData,
                  user_token: user.User.user_token,
                  user_id: userIdData,
              }
            : {
                  user_name: userNameData,
                  user_full_name: userFullNameData,
                  user_password: passwordData,
                  status: 'active',
                  role_id: roleNameData,
                  user_organization: organizationData,
                  user_token: user.User.user_token,
              }
        const result = isEdit
            ? await updateUser(dataRequest)
            : await addUser(dataRequest)
        if (result.data.success) {
            getUserList()
            setShowModal(false)
            MySwal.fire({
                icon: 'success',
                title: 'Success',
                text: isEdit ? 'Success Edit Role' : 'Success Add Role',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Failed',
                text: isEdit ? 'Failed Edit Role' : 'Failed Add Role',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }

    const deleteHandler = async (user) => {
        MySwal.fire({
            title: `Delete User`,
            text: `Do you want to delete User: ${user.User.user_name} ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'OK',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const requestBody = {
                    user_token: user.User.user_token,
                    user_id: user.User.user_id,
                }
                return deleteUser(requestBody)
                    .then((response) => {
                        return response
                    })
                    .catch((error) => {
                        MySwal.showValidationMessage(`Request failed: ${error}`)
                    })
            },
            allowOutsideClick: () => isLoadingDelete,
        }).then((result) => {
            if (result.value.data.success) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Success Delete Role',
                    showConfirmButton: false,
                    timer: 1500,
                })
                getUserList()
            }
        })
    }

    useEffect(() => {
        getUserList()
        getRoleList()
    }, [])

    if (!user) {
        Router.push('/')
        return
    }

    return (
        <>
            <div className={`dashboard ${isActive ? 'show_menu' : null}`}>
                <Header toggleClass={toggleClass} privilege={user.Privilege} />
                <SideMenu privilege={user.Privilege} />
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    backdrop="static"
                    keyboard={false}
                    size="xl"
                >
                    <Modal.Header>
                        <Modal.Title>
                            {isEdit ? 'Edit User' : 'Add User'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            {!isEdit && (
                                <Row>
                                    <Col>
                                        <Form.Label>
                                            User Name <span>*</span>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Group
                                            className="mb-3 input-half"
                                            controlId="dataForm.ControlInputAccount"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="User Name"
                                                value={userNameData}
                                                onChange={(e) =>
                                                    setUserNameData(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            )}
                            <Row>
                                <Col>
                                    <Form.Label>
                                        User Full Name <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="User Full Name"
                                            value={userFullNameData}
                                            onChange={(e) =>
                                                setUserFullNameData(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {!isEdit && (
                                <Row>
                                    <Col>
                                        <Form.Label>
                                            Password <span>*</span>
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Group
                                            className="mb-3 input-half"
                                            controlId="dataForm.ControlInputAccount"
                                        >
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={passwordData}
                                                onChange={(e) =>
                                                    setPasswordData(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            )}

                            <Row>
                                <Col>
                                    <Form.Label>
                                        Role <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Select
                                            value={roleNameData}
                                            onChange={(e) =>
                                                setRoleNameData(e.target.value)
                                            }
                                            aria-label="Select Role"
                                        >
                                            <option key={0} value={0}>
                                                Select Role
                                            </option>
                                            {listRoles.map(
                                                (role) =>
                                                    role.status ===
                                                        'active' && (
                                                        <option
                                                            value={role.role_id}
                                                            key={role.role_id}
                                                        >
                                                            {role.role_name}
                                                        </option>
                                                    )
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label>
                                        Organization <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="Organization"
                                            value={organizationData}
                                            onChange={(e) =>
                                                seOrganizationData(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                            disabled={isLoadingAdd}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            disabled={isLoadingAdd}
                            onClick={submitHandler}
                        >
                            {isLoadingAdd || isLoadingUpdate ? (
                                <Spinner animation="border" variant="light" />
                            ) : isEdit ? (
                                'Edit User'
                            ) : (
                                'Add User'
                            )}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="content-wrapper filter-data">
                    <Card className="mt-5">
                        <Card.Header>Users Data</Card.Header>
                        <Card.Body className="data-result">
                            <Table striped>
                                <tbody>
                                    <tr>
                                        <td>Users</td>
                                        <td>Status</td>
                                        <td>Role</td>
                                        <td>Organization</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                onClick={() => modalHandler()}
                                            >
                                                Add Users
                                            </Button>
                                        </td>
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
                                        listUsers.map((user) => (
                                            <tr key={user.User.user_id}>
                                                <td>
                                                    {user.User.user_full_name}
                                                </td>
                                                <td>{user.User.status}</td>
                                                <td>{user.Role.role_name}</td>
                                                <td>
                                                    {
                                                        user.User
                                                            .user_organization
                                                    }
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="primary2"
                                                        onClick={() =>
                                                            modalHandler(user)
                                                        }
                                                    >
                                                        <EditIcon />
                                                    </Button>
                                                    &nbsp;
                                                    <Button
                                                        variant="danger"
                                                        onClick={() =>
                                                            deleteHandler(user)
                                                        }
                                                    >
                                                        <DeleteIcon
                                                            style={{
                                                                color: 'white',
                                                            }}
                                                        />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
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
