import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Home() {
  return (
    <div className='auth-page'>
      <div className="auth-content">
        <div className='login-box'>
          <Form>
            <h1 className='text-primary'>OFAC App - Merchant</h1>
            <h2 className='text-warning'>Sign in to your account</h2>
            <Form.Group className="form-group mb-3" controlId="formBasicEmail">
              <img src='/icons_person.svg' />
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="form-group mb-3" controlId="formBasicPassword">
            <img src='/icon_lock.svg' />
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button variant="primary2" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}