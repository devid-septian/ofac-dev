import React, { useState, useRef, useEffect } from 'react'
import Placeholder from 'react-bootstrap/Placeholder'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Header from '../components/header'
import SideMenu from '../components/side-menu'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useSelector, useDispatch } from 'react-redux'
import { getUserState } from '../redux/services/userSlice'
import Router from 'next/router'
import CheckIcon from '@mui/icons-material/Check'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Table from 'react-bootstrap/Table'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Spinner from 'react-bootstrap/Spinner'
import {
    useUploadFileMutation,
    useCheckUploadProcessMutation,
    useGetFilesMutation,
} from '../redux/services/apiSlice'
import { setFiles, getFilesState } from '../redux/services/fileSlice'

export default function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector(getUserState)
    const listFiles = useSelector(getFilesState)
    const sdnRef = useRef(null)
    const consolidateRef = useRef(null)
    const MySwal = withReactContent(Swal)
    const [isActive, setActive] = useState(true)
    const [sdnFileName, setSdnFileName] = useState('No file chosen')
    const [sdnFile, setSdnFile] = useState(null)
    const [consolidateFile, setConsolidateFile] = useState(null)
    const [consolidateFileName, setConsolidateFileName] =
        useState('No file chosen')

    const [postUpload, { isLoading }] = useUploadFileMutation()
    const [getFiles, { isLoadingFiles }] = useGetFilesMutation()
    const [checkUploadProcess] = useCheckUploadProcessMutation()
    useEffect(() => {
        getListTable()
    }, [])
    const getListTable = async () => {
        const listTable = await getFiles({ user_token: user.User.user_token })
        dispatch(setFiles(listTable.data.data))
    }
    const toggleClass = () => {
        setActive(!isActive)
    }
    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let baseURL = ''
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                baseURL = reader.result
                resolve(baseURL)
            }
        })
    }
    if (!user) {
        Router.push('/')
        return
    }
    const sdnFileHandler = async (e) => {
        const file = e.target.files[0]
        setSdnFileName(file.name)
        const result = await getBase64(file)
        setSdnFile(result.split(',')[1])
    }
    const consolidateFileHandler = async (e) => {
        const file = e.target.files[0]
        setConsolidateFileName(file.name)
        const result = await getBase64(file)
        setConsolidateFile(result.split(',')[1])
    }
    const uploadFileHandler = (file_type) => {
        MySwal.fire({
            title: `Upload File ${file_type === 'sdn' ? 'Sdn' : 'Consolidate'}`,
            text: 'Do you want to upload file ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'OK',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                if (file_type === 'sdn' && sdnFile === null) {
                    MySwal.showValidationMessage(sdnFileName)
                    return
                }
                if (file_type === 'consal' && consolidateFile === null) {
                    MySwal.showValidationMessage(consolidateFileName)
                    return
                }
                const dataCheck = await checkUploadProcess({ file_type })
                if (dataCheck.data.success) {
                    const requestBody = {
                        file_name:
                            file_type === 'sdn'
                                ? sdnFileName
                                : consolidateFileName,
                        file_data:
                            file_type === 'sdn' ? sdnFile : consolidateFile,
                        user_token: user.User.user_token,
                        file_type,
                    }
                    return postUpload(requestBody)
                        .then((response) => {
                            return response
                        })
                        .catch((error) => {
                            MySwal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        })
                } else {
                    MySwal.showValidationMessage(
                        'Already have processing upload, please try again'
                    )
                }
            },
            allowOutsideClick: () => isLoading,
        }).then((result) => {
            getListTable()
            if (result.isConfirmed) {
                if (file_type === 'sdn') {
                    sdnRef.current.value = null
                    setSdnFileName('No file chosen')
                    setSdnFile(null)
                    MySwal.fire({
                        icon: 'success',
                        title: 'Upload Success',
                        text: 'Upload file success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
                if (file_type === 'consal') {
                    consolidateRef.current.value = null
                    setConsolidateFile(null)
                    setConsolidateFileName('No file chosen')
                    MySwal.fire({
                        icon: 'success',
                        title: 'Upload Success',
                        text: 'Upload file success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            }
        })
    }
    return (
        <>
            <div className={`dashboard ${isActive ? 'show_menu' : null}`}>
                <Header toggleClass={toggleClass} />
                <SideMenu />
                <div className="content-wrapper filter-data">
                    <Card>
                        <Card.Header>Upload File Form</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={3}>
                                    <Form.Label>
                                        File Sdn <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control
                                            type="file"
                                            ref={sdnRef}
                                            onChange={sdnFileHandler}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Button
                                        variant="success"
                                        onClick={() => uploadFileHandler('sdn')}
                                    >
                                        Upload
                                    </Button>
                                </Col>
                                <Col sm={3}>
                                    <Form.Label>
                                        File Consolidate <span>*</span>
                                    </Form.Label>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group
                                        className="mb-3 input-half"
                                        controlId="dataForm.ControlInputAccount"
                                    >
                                        <Form.Control
                                            type="file"
                                            ref={consolidateRef}
                                            onChange={consolidateFileHandler}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Button
                                        variant="success"
                                        onClick={() =>
                                            uploadFileHandler('consal')
                                        }
                                    >
                                        Upload
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="mt-5">
                        <Card.Header>
                            Result Data &nbsp;
                            {isLoadingFiles && (
                                <Spinner animation="border" variant="light" />
                            )}
                        </Card.Header>
                        <Card.Body className="data-result">
                            <Table striped>
                                <tbody>
                                    <tr>
                                        <td>File Name</td>
                                        <td>File Type</td>
                                        <td>Status</td>
                                        <td>Uploaded by</td>
                                        <td>Uploaded Date</td>
                                    </tr>

                                    {listFiles.map((file) => (
                                        <tr key={file.sdnfile_id}>
                                            <td>{file.file_name_ori}</td>
                                            <td>{file.file_type}</td>
                                            <td>{file.status}</td>
                                            <td>{file.updated_by}</td>
                                            <td>{file.updated_date}</td>
                                        </tr>
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
