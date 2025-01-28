import React from 'react'
import { Login as LoginComponent, Container } from '../index';

function Login() {
    return (
        <div className='py-4'>
            <Container>
                <LoginComponent />
            </Container>
        </div>
    )
}

export default Login