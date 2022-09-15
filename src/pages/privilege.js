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
    useGetPrivilegeMutation,
    useUpdatePrivilegeMutation,
} from '../redux/services/apiSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Table from 'react-bootstrap/Table'
import { isEmpty } from 'lodash'

export default function Dashboard() {
    const [isActive, setActive] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [listRoles, setListRoles] = useState([])
    const [listPrivilege, setListPrivilege] = useState([])
    const [privilegeValue, setPrivilegeValue] = useState([])
    const [roleIdData, setRoleIdData] = useState(0)
    const [isEdit, setIsEdit] = useState(false)
    const [getRole] = useGetRoleMutation()
    const [getPrivilege, { isLoading }] = useGetPrivilegeMutation()
    const [updatePrivilege, { isLoadingPrivilege }] =
        useUpdatePrivilegeMutation()

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
            if (isEmpty(...user.Privilege)) {
                setPrivilegeValue([])
            } else {
                const validValue = user.Privilege.map((priv) =>
                    priv.substring(1, priv.length - 1)
                )
                console.log(validValue)
                setPrivilegeValue(validValue)
            }
            setRoleIdData(user.Role.role_id)
            setIsEdit(true)
        } else {
            setIsEdit(false)
            setRoleIdData(0)
            setPrivilegeValue([])
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
        if (roleIdData === 0) {
            MySwal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Please Select Role',
                showConfirmButton: false,
                timer: 1500,
            })
        } else if (privilegeValue.length === 0) {
            MySwal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Please Pick minimum 1 privilege',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            const dataRequest = {
                menu_name: privilegeValue,
                user_token: user.User.user_token,
                role_id: roleIdData,
            }
            const result = await updatePrivilege(dataRequest)
            if (result.data.success) {
                getPrivilegeList()
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
    }

    const deleteHandler = async (data) => {
        MySwal.fire({
            title: `Delete Privilege`,
            text: `Do you want to delete Privilege ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'OK',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const dataRequest = {
                    menu_name: [],
                    user_token: user.User.user_token,
                    role_id: data.Role.role_id,
                }
                return updatePrivilege(dataRequest)
                    .then((response) => {
                        return response
                    })
                    .catch((error) => {
                        MySwal.showValidationMessage(`Request failed: ${error}`)
                    })
            },
            allowOutsideClick: () => isLoadingPrivilege,
        }).then((result) => {
            getPrivilegeList()
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

    if (!user) {
        Router.push('/')
        return
    }
    const checkHandler = (e, type) => {
        if (e.target.checked) {
            const newValuePrivilege = privilegeValue.concat([type])
            setPrivilegeValue(newValuePrivilege)
        } else {
            const newValueFinal = privilegeValue.filter((item) => item !== type)
            setPrivilegeValue(newValueFinal)
        }
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
                                    value={roleIdData}
                                    onChange={(e) =>
                                        setRoleIdData(e.target.value)
                                    }
                                    aria-label="Select Role"
                                >
                                    <option value={0}>Select Role</option>
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
                                {dataPrivilege.map((type) => {
                                    return (
                                        <Form.Check
                                            key={type}
                                            type="checkbox"
                                            label={type}
                                            onChange={(e) =>
                                                checkHandler(e, type)
                                            }
                                            id={type}
                                            checked={privilegeValue.includes(
                                                type
                                            )}
                                        />
                                    )
                                })}
                            </Form.Group>
                        </Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                            disabled={isLoadingPrivilege}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            disabled={isLoadingPrivilege}
                            onClick={submitHandler}
                        >
                            {isLoadingPrivilege ? (
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
                                                                        data
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
                                                                        data
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
