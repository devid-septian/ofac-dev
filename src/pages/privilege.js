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
    useGetPrivilegeMutation,
} from '../redux/services/apiSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Table from 'react-bootstrap/Table'

export default function Dashboard() {
    const [isActive, setActive] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [listRoles, setListRoles] = useState([])
    const [listPrivilege, setListPrivilege] = useState([])
    const [roleNameData, setRoleNameData] = useState('')
    const [roleIdData, setRoleIdData] = useState('')
    const [roleStatusData, setRoleStatusData] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [getRole] = useGetRoleMutation()
    const [getPrivilege, { isLoading }] = useGetPrivilegeMutation()
    const [addRole, { isLoadingAdd }] = useAddRoleMutation()
    const [updateRole, { isLoadingUpdate }] = useUpdateRoleMutation()
    const [deleteRole, { isLoadingDelete }] = useDeleteRoleMutation()
    const MySwal = withReactContent(Swal)
    const dataPrivilege = [
        'Dashboard',
        'Upload Data',
        'Searching',
        'Report',
        'Change Password',
        'Master User',
        'Master Role',
        'Master Privilege',
        'Master System Parameter',
    ]

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

    const getPrivilegeList = async () => {
        const listPrivilege = await getPrivilege({
            user_token: user.User.user_token,
        })
        setListPrivilege(listPrivilege.data.data)
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

    const deleteHandler = async () => {
        MySwal.fire({
            title: `Delete Privilege`,
            text: `Do you want to delete Privilege ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'OK',
            showLoaderOnConfirm: true,
            preConfirm: async () => {},
            allowOutsideClick: () => isLoadingDelete,
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Success Delete Privilege',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        })
    }

    useEffect(() => {
        getRoleList()
        getPrivilegeList()
    }, [])

    if (!user || !user.Privilege.includes('Master Privilege')) {
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
                            {isEdit ? 'Edit Privilege' : 'Add Privilege'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col>
                            <Form.Label>
                                Select Role <span>*</span>
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
                                    {listRoles.map(
                                        (role) =>
                                            role.status === 'active' && (
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
                        <Col>
                            <Form.Label>
                                Choose Privilege <span>*</span>
                            </Form.Label>
                            <Form.Group
                                className="mb-3 input-half"
                                controlId="dataForm.ControlInputAccount"
                            >
                                {dataPrivilege.map((type) => (
                                    <Form.Check
                                        key={type}
                                        type="checkbox"
                                        label={type}
                                    />
                                ))}
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
                        <Button variant="primary" disabled={isLoadingAdd}>
                            {isLoadingAdd || isLoadingUpdate ? (
                                <Spinner animation="border" variant="light" />
                            ) : isEdit ? (
                                'Edit Privilege'
                            ) : (
                                'Add Privilege'
                            )}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="content-wrapper filter-data">
                    <Card className="mt-5">
                        <Card.Header>Privilege Data</Card.Header>
                        <Card.Body className="data-result">
                            <Table striped>
                                <tbody>
                                    <tr>
                                        <td>Roles</td>
                                        <td>Privilege</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                onClick={() => modalHandler()}
                                            >
                                                Add Privilege
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
                                        listPrivilege.map(
                                            (data) =>
                                                data.Role.status ===
                                                    'active' && (
                                                    <tr key={data.Role.role_id}>
                                                        <td>
                                                            {
                                                                data.Role
                                                                    .role_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {data.Privilege.toString()}
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
