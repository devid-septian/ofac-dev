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
import { noop } from 'lodash'
import { DOTS, getPagination } from '../hooks/pagination'

export default function Dashboard() {
    const MySwal = withReactContent(Swal)
    const [getDataMerchant, { isLoading }] = useGetDataMerchantMutation()
    const [activePage, setActivePage] = useState(1)
    const [paginationItem, setPaginationItem] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [dob, setDob] = useState('')
    const [tableData, setSdnData] = useState([])
    const [activeTab, setActiveTab] = useState('cdn')
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
        if (
            firstName !== '' ||
            lastName !== '' ||
            idNumber !== '' ||
            dob !== ''
        ) {
            getListDataMerchant()
        }
    }, [activeTab])

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
                offset: activePage,
                user_token: user.User.user_token,
            }
            const listDataMerchant = await getDataMerchant(requestBody)
            const merchantData =
                activeTab === 'cdn'
                    ? listDataMerchant.data.data.sdnData
                    : listDataMerchant.data.data.consalData
            setSdnData(merchantData)
            const totalPageCount =
                activeTab === 'cdn'
                    ? listDataMerchant.data.data.maxPageSdn
                    : listDataMerchant.data.data.maxPageConsal
            const paginateData = getPagination({
                totalPageCount,
                currentPage: activePage,
            })
            setPaginationItem(paginateData)
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
                user_token: user.User.user_token,
            }
            const listDataMerchant = await getDataMerchant(requestBody)
            const merchantData =
                activeTab === 'cdn'
                    ? listDataMerchant.data.data.sdnData
                    : listDataMerchant.data.data.consalData
            setSdnData(merchantData)
            const totalPageCount =
                activeTab === 'cdn'
                    ? listDataMerchant.data.data.maxPageSdn
                    : listDataMerchant.data.data.maxPageConsal
            const paginateData = getPagination({
                totalPageCount,
                currentPage: activePage,
            })
            setPaginationItem(paginateData)
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

    const pageHandler = (page) => {
        setActivePage(page)
        getListDataMerchant()
    }

    const tabChangeHandler = (data) => {
        if (data !== activeTab) {
            setActiveTab(data)
        }
    }

    const renderTableData = (
        <>
            <Table striped>
                <thead>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Date of Birth</td>
                        <td>ID Number</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
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
                    ) : tableData && tableData.length === 0 ? (
                        <tr>
                            <td colSpan={5}>No Data Found</td>
                        </tr>
                    ) : (
                        tableData &&
                        tableData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.header.first_name}</td>
                                <td>{data.header.last_name}</td>
                                <td>{data.header.dob}</td>
                                <td>{data.header.id_number}</td>
                                <td>
                                    <Button
                                        variant="primary2"
                                        onClick={() => viewHandler(data)}
                                    >
                                        <VisibilityOutlinedIcon />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center pt-3">
                {isLoading ? (
                    <Spinner animation="border" variant="light" />
                ) : (
                    <Pagination>
                        {paginationItem.map((page) => {
                            if (page === DOTS) {
                                return <Pagination.Ellipsis key={page} />
                            }
                            return (
                                <Pagination.Item
                                    key={page}
                                    active={activePage === page}
                                    onClick={
                                        activePage === page
                                            ? noop
                                            : () => pageHandler(page)
                                    }
                                >
                                    {page}
                                </Pagination.Item>
                            )
                        })}
                    </Pagination>
                )}
            </div>
        </>
    )

    return (
        <>
            <div className={`dashboard ${isActive ? 'show_menu' : null}`}>
                <Header toggleClass={toggleClass} privilege={user.Privilege} />
                <SideMenu privilege={user.Privilege} />
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
                        <Card.Header>Result Data</Card.Header>
                        <Card.Body className="data-result">
                            <Tabs
                                className="mb-3 "
                                activeKey={activeTab}
                                onSelect={tabChangeHandler}
                                unmountOnExit
                            >
                                <Tab
                                    eventKey="cdn"
                                    title="Sdn"
                                    disabled={isLoading}
                                >
                                    {renderTableData}
                                </Tab>
                                <Tab
                                    disabled={isLoading}
                                    eventKey="consolidated"
                                    title="Consolidated"
                                >
                                    {renderTableData}
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                merchantdetail={merchantDetail}
            />
        </>
    )
}
