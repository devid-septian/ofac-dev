import React, { useState, useEffect } from 'react'
import { Breadcrumb, Button, Card, Form, Table, Spinner } from 'react-bootstrap'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import { useSelector } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
    useGetDataReportMutation,
    useGetDownloadReportMutation,
} from '../redux/services/apiSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { parsingDate } from '../utils/date'
import { URL_API } from '../config'

export default function Dashboard() {
    const MySwal = withReactContent(Swal)
    const [isActive, setActive] = useState(true)
    const [canDownloadReport, setCanDownloadReport] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [listReport, setListReport] = useState([])
    const [getDataReport, { isLoading }] = useGetDataReportMutation()
    const [getDownloadReport] = useGetDownloadReportMutation()

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
        getListReport()
        checkDownloadReport()
    }, [])

    const getListReport = async () => {
        try {
            const parsingStartDate = parsingDate(startDate)
            const parsingEndDate = parsingDate(endDate)
            const requestBody = {
                start_date: parsingStartDate,
                end_date: parsingEndDate,
                user_token: user.User.user_token,
            }
            const listDataReport = await getDataReport(requestBody)
            setListReport(listDataReport.data.data)
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to Get List Data Report',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }

    const checkDownloadReport = async () => {
        try {
            const listDataReport = await getDownloadReport()
            if (listDataReport?.data?.success) {
                setCanDownloadReport(true)
            } else {
                setCanDownloadReport(false)
            }
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to Get Available Downloaded Data Report',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }
    const downloadHandler = (data) => {
        const url = `${URL_API}/data/getReportFile/${data.report_id}/${user.User.user_token}`
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const getDetailReport = () => {
        const url = `${URL_API}/data/getDetailReportFile/${user.User.user_token}`
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    return (
        <>
            <div className={`dashboard ${isActive ? 'show_menu' : null}`}>
                <Header toggleClass={toggleClass} privilege={user.Privilege} />
                <SideMenu privilege={user.Privilege} />
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
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => {
                                                setStartDate(date)
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
                                </div>
                                <div className="form-date">
                                    <Form.Label>
                                        End <span>*</span>
                                    </Form.Label>
                                    <Form.Group
                                        className=""
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => {
                                                setEndDate(date)
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
                                </div>
                                <div>
                                    <Button
                                        variant="info"
                                        size="sm"
                                        onClick={getListReport}
                                    >
                                        <SearchOutlinedIcon />
                                        Search
                                    </Button>
                                </div>
                            </div>

                            <Button
                                className="float-end"
                                variant="success"
                                size="sm"
                                onClick={getDetailReport}
                                disabled={!canDownloadReport}
                            >
                                {canDownloadReport && <FileDownloadIcon />}
                                {canDownloadReport
                                    ? 'Download Detailed'
                                    : 'Detail data not available right now'}
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card className="mt-5">
                        <Card.Header>
                            Report Table
                            <Button
                                variant="success"
                                size="sm"
                                onClick={getListReport}
                            >
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
                                        <td>Total Screened</td>
                                        <td>Total Data</td>
                                        <td>Action</td>
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
                                    ) : listReport &&
                                      listReport.length === 0 ? (
                                        <tr>
                                            <td colSpan={5}>No Data Found</td>
                                        </tr>
                                    ) : (
                                        listReport &&
                                        listReport.map((data, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {
                                                        data.extract_date.split(
                                                            ' '
                                                        )[0]
                                                    }
                                                </td>
                                                <td>
                                                    {data.ofac_list_screened}
                                                </td>
                                                <td>
                                                    {
                                                        data.start_date.split(
                                                            ' '
                                                        )[0]
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        data.end_date.split(
                                                            ' '
                                                        )[0]
                                                    }
                                                </td>
                                                <td>{data.potential}</td>
                                                <td>{data.positive}</td>
                                                <td>{data.total_screened}</td>
                                                <td>{data.total_data}</td>
                                                <td>
                                                    <Button
                                                        variant="primary2"
                                                        onClick={() =>
                                                            downloadHandler(
                                                                data
                                                            )
                                                        }
                                                    >
                                                        <FileDownloadIcon />
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
