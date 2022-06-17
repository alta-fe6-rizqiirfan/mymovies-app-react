import React from 'react'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Container from '../components/Container'

const ErrorNoRoute = () => {
    return (
        <Page>
            <Container>
                <div className='flex flex-col justify-center text-center h-[95vh] self-center font-bold text-7xl'>
                    <p>Ooops!</p>
                    Page Not Found
                    <Link className='text-lg underline mt-8' to={'/'}>Back to Home</Link>
                </div>
            </Container>
        </Page  >
    )
}

export default ErrorNoRoute