import { useAddNewPostMutation } from '../redux/services/apiSlice'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Router from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/services/userSlice'

export default function Home() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const MySwal = withReactContent(Swal)
    const [addNewPost, { isLoading }] = useAddNewPostMutation()
    const dispatch = useDispatch()
    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            const requestBody = {
                user_name: userName,
                user_password: password,
            }
            const data = await addNewPost(requestBody)

            if (data.data.success) {
                dispatch(setUser(data.data.data))
                MySwal.fire({
                    icon: 'success',
                    title: 'Success Login',
                    showConfirmButton: false,
                    timer: 1500,
                })
                Router.push('/dashboard')
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed Login',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Failed Login',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }
    return (
        <div className="auth-page">
            <div className="auth-content">
                <div className="login-box">
                    <Form onSubmit={submitHandler}>
                        <h1 className="text-primary">OFAC App - Merchant</h1>
                        <h2 className="text-warning">
                            Sign in to your account
                        </h2>
                        <Form.Group
                            className="form-group mb-3"
                            controlId="formBasicEmail"
                        >
                            <img src="/icons_person.svg" />
                            <Form.Control
                                type="text"
                                placeholder="Enter email"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            className="form-group mb-3"
                            controlId="formBasicPassword"
                        >
                            <img src="/icon_lock.svg" />
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check type="checkbox" label="Remember Me" />
                        </Form.Group>
                        <Button variant="primary2" type="submit">
                            {isLoading ? (
                                <Spinner animation="border" variant="light" />
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
