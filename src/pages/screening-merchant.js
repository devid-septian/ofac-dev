import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import {
    Button,
    Card,
    Row,
    Col,
    Form,
    Tab,
    Tabs,
    Table,
    Spinner,
    Pagination,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import CheckIcon from '@mui/icons-material/Check'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { useGetDataMerchantMutation } from '../redux/services/apiSlice'
import MyVerticallyCenteredModal from '../components/modal-merchant'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Dashboard() {
    const MySwal = withReactContent(Swal)
    const [getDataMerchant, { isLoading }] = useGetDataMerchantMutation()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [dob, setDob] = useState('')
    const [sdnData, setSdnData] = useState([])
    const [consolidateData, setConsolidateData] = useState([])
    const [merchantDetail, setMerchantDetail] = useState({
        pob: [],
        nationality: [],
        addrees: [],
        aka: [],
        dob: [],
        citizenship: [],
        header: {
            id_number: '-',
            dob: '-',
            last_name: '',
            first_name: '',
        },
        id: [],
        program: [],
    })
    const [modalShow, setModalShow] = useState(false)
    const [isActive, setActive] = useState(true)

    const toggleClass = () => {
        setActive(!isActive)
    }
    const user = useSelector(getUserState)

    if (!user) {
        Router.push('/')
        return
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getListDataMerchant()
    }, [])

    const getListDataMerchant = async () => {
        let dataDob = ''
        if (dob.length !== 0) {
            const monthNames = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ]
            const parsingDate = new Date(dob)
            const date = parsingDate.getDate()
            const month = monthNames[parsingDate.getMonth()]
            const year = parsingDate.getFullYear()
            dataDob = `${date} ${month} ${year}`
        }
        try {
            const requestBody = {
                first_name: firstName,
                last_name: lastName,
                id_number: idNumber,
                dob: dataDob,
                limit: 10,
                offset: 1,
                user_token: 'c2FyZXF1ZXN0ZXIxODJmYTM1OTA2M3lWc2wwM1MzOWg=',
            }
            const listDataMerchant = await getDataMerchant(requestBody)
            setSdnData(listDataMerchant.data.data.sdnData)
            setConsolidateData(listDataMerchant.data.data.consalData)
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to Get List Data Merchant',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }

    const applyHandler = async () => {
        await getListDataMerchant()
    }

    const cancelHandler = async () => {
        try {
            setFirstName('')
            setLastName('')
            setIdNumber('')
            setDob('')
            const requestBody = {
                first_name: '',
                last_name: '',
                id_number: '',
                dob: '',
                limit: 10,
                offset: 1,
                user_token: 'c2FyZXF1ZXN0ZXIxODJmYTM1OTA2M3lWc2wwM1MzOWg=',
            }
            const listDataMerchant = await getDataMerchant(requestBody)
            setSdnData(listDataMerchant.data.data.sdnData)
            setConsolidateData(listDataMerchant.data.data.consalData)
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to Get List Data Merchant',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }

    const viewHandler = (data) => {
        setModalShow(true)
        setMerchantDetail(data)
    }

    return (
        <>
            <div className={`dashboard ${isActive ? 'show_menu' : null}`}>
                <Header toggleClass={toggleClass} />
                <SideMenu />
                <div className="content-wrapper filter-data">
                    <Card>
                        <Card.Header>Data Filter</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <Form.Label>
                                        First Name <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control
                                            type="text"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>
                                        Last Name <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control
                                            type="text"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>
                                        ID Number (KTP) <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputId"
                                    >
                                        <Form.Control
                                            type="text"
                                            value={idNumber}
                                            onChange={(e) =>
                                                setIdNumber(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>Date of Birth</Form.Label>
                                </Col>
                                <Col sm={8}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputBirth"
                                    >
                                        <DatePicker
                                            selected={dob}
                                            onChange={(date) => {
                                                setDob(date)
                                            }}
                                            className="form-control"
                                            customInput={
                                                <input
                                                    type="text"
                                                    id="validationCustom01"
                                                />
                                            }
                                            dateFormat="dd-MM-yyyy"
                                            showYearDropdown
                                            yearDropdownItemNumber={70}
                                            scrollableYearDropdown
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button
                                variant="primary2 me-2"
                                size="sm"
                                onClick={applyHandler}
                            >
                                <CheckIcon />
                                Apply
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={cancelHandler}
                            >
                                <CloseOutlinedIcon />
                                Clear
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card className="mt-5">
                        <Card.Header>
                            Result Data &nbsp;{' '}
                            {isLoading && (
                                <Spinner animation="border" variant="light" />
                            )}
                        </Card.Header>
                        <Card.Body className="data-result">
                            <Tabs
                                defaultActiveKey="cdn"
                                id="uncontrolled-tab-example"
                                className="mb-3 "
                            >
                                <Tab eventKey="cdn" title="Cdn">
                                    <Table striped>
                                        <tbody>
                                            <tr>
                                                <td>First Name</td>
                                                <td>Last Name</td>
                                                <td>Date of Birth</td>
                                                <td>ID Number</td>
                                                <td>Action</td>
                                            </tr>
                                            {sdnData.map((dataSdn, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {
                                                            dataSdn.header
                                                                .first_name
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            dataSdn.header
                                                                .last_name
                                                        }
                                                    </td>
                                                    <td>
                                                        {dataSdn.header.dob}
                                                    </td>
                                                    <td>
                                                        {
                                                            dataSdn.header
                                                                .id_number
                                                        }
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="primary2"
                                                            onClick={() =>
                                                                viewHandler(
                                                                    dataSdn
                                                                )
                                                            }
                                                        >
                                                            <VisibilityOutlinedIcon />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="d-flex justify-content-center pt-3">
                                        <Pagination>
                                            <Pagination.First />
                                            <Pagination.Prev />
                                            <Pagination.Item>
                                                {1}
                                            </Pagination.Item>
                                            <Pagination.Ellipsis />

                                            <Pagination.Item>
                                                {10}
                                            </Pagination.Item>
                                            <Pagination.Item>
                                                {11}
                                            </Pagination.Item>
                                            <Pagination.Item active>
                                                {12}
                                            </Pagination.Item>
                                            <Pagination.Item>
                                                {13}
                                            </Pagination.Item>
                                            <Pagination.Item disabled>
                                                {14}
                                            </Pagination.Item>

                                            <Pagination.Ellipsis />
                                            <Pagination.Item>
                                                {20}
                                            </Pagination.Item>
                                            <Pagination.Next />
                                            <Pagination.Last />
                                        </Pagination>
                                    </div>
                                </Tab>
                                <Tab
                                    eventKey="consolidated"
                                    title="Consolidated"
                                >
                                    <Table striped>
                                        <tbody>
                                            <tr>
                                                <td>First Name</td>
                                                <td>Last Name</td>
                                                <td>Date of Birth</td>
                                                <td>ID Number</td>
                                                <td>Action</td>
                                            </tr>
                                            {consolidateData.map(
                                                (dataConsol, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                dataConsol
                                                                    .header
                                                                    .first_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                dataConsol
                                                                    .header
                                                                    .last_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                dataConsol
                                                                    .header.dob
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                dataConsol
                                                                    .header
                                                                    .id_number
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="primary2"
                                                                onClick={() =>
                                                                    viewHandler(
                                                                        dataConsol
                                                                    )
                                                                }
                                                            >
                                                                <VisibilityOutlinedIcon />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </Table>
                                    <div className="d-flex justify-content-center pt-3">
                                        <Pagination>
                                            <Pagination.First />
                                            <Pagination.Prev />
                                            <Pagination.Item>
                                                {1}
                                            </Pagination.Item>
                                            <Pagination.Ellipsis />

                                            <Pagination.Item>
                                                {10}
                                            </Pagination.Item>
                                            <Pagination.Item>
                                                {11}
                                            </Pagination.Item>
                                            <Pagination.Item active>
                                                {12}
                                            </Pagination.Item>
                                            <Pagination.Item>
                                                {13}
                                            </Pagination.Item>
                                            <Pagination.Item disabled>
                                                {14}
                                            </Pagination.Item>

                                            <Pagination.Ellipsis />
                                            <Pagination.Item>
                                                {20}
                                            </Pagination.Item>
                                            <Pagination.Next />
                                            <Pagination.Last />
                                        </Pagination>
                                    </div>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                merchantDetail={merchantDetail}
            />
        </>
    )
}
