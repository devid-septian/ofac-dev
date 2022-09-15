import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import { Modal, Button, Card, Col, Form, Spinner } from 'react-bootstrap'
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
} from '../redux/services/apiSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Table from 'react-bootstrap/Table'

export default function Dashboard() {
    const [isActive, setActive] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [listRoles, setListRoles] = useState([])
    const [roleNameData, setRoleNameData] = useState('')
    const [roleIdData, setRoleIdData] = useState('')
    const [roleStatusData, setRoleStatusData] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [getRole, { isLoading }] = useGetRoleMutation()
    const [addRole, { isLoadingAdd }] = useAddRoleMutation()
    const [updateRole, { isLoadingUpdate }] = useUpdateRoleMutation()
    const [deleteRole, { isLoadingDelete }] = useDeleteRoleMutation()
    const MySwal = withReactContent(Swal)

    const toggleClass = () => {
        setActive(!isActive)
    }
    const modalHandler = (user) => {
        if (user) {
            setIsEdit(true)
            setRoleNameData(user.role_name)
            setRoleStatusData(user.status)
            setRoleIdData(user.role_id)
        } else {
            setIsEdit(false)
            setRoleNameData('')
        }
        setShowModal(true)
    }
    const user = useSelector(getUserState)

    const getRoleList = async () => {
        const listRolesApi = await getRole({ user_token: user.User.user_token })
        setListRoles(listRolesApi.data.data)
    }

    const submitHandler = async () => {
        const dataRequest = isEdit
            ? {
                  role_name: roleNameData,
                  user_token: user.User.user_token,
                  status: roleStatusData,
                  role_id: roleIdData,
              }
            : {
                  role_name: roleNameData,
                  user_token: user.User.user_token,
              }
        const result = isEdit
            ? await updateRole(dataRequest)
            : await addRole(dataRequest)
        if (result.data.success) {
            getRoleList()
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

    const deleteHandler = async (role) => {
        MySwal.fire({
            title: `Delete Role`,
            text: `Do you want to delete role: ${role.role_name} ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'OK',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const requestBody = {
                    role_id: role.role_id,
                    user_token: user.User.user_token,
                }
                return deleteRole(requestBody)
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
                getRoleList()
            }
        })
    }

    useEffect(() => {
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
                >
                    <Modal.Header>
                        <Modal.Title>
                            {isEdit ? 'Edit Role' : 'Add Role'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col>
                            <Form.Label>
                                Role Name <span>*</span>
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Group
                                className="mb-3 input-half"
                                controlId="dataForm.ControlInputAccount"
                            >
                                <Form.Control
                                    type="text"
                                    value={roleNameData}
                                    onChange={(e) =>
                                        setRoleNameData(e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>
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
                                'Edit Role'
                            ) : (
                                'Add Role'
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
                                        <td>Roles</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                onClick={() => modalHandler()}
                                            >
                                                Add Role
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
                                        listRoles.map(
                                            (role) =>
                                                role.status === 'active' && (
                                                    <tr key={role.role_id}>
                                                        <td>
                                                            {role.role_name}
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="primary2"
                                                                onClick={() =>
                                                                    modalHandler(
                                                                        role
                                                                    )
                                                                }
                                                            >
                                                                <EditIcon />
                                                            </Button>
                                                            &nbsp;
                                                            <Button
                                                                variant="danger"
                                                                onClick={() =>
                                                                    deleteHandler(
                                                                        role
                                                                    )
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
