import React,{ useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { signInWithGooglePopup, createUserDocumentFromAuth, auth } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../component/sign-up-form/sign-up-form.component'
import SignInForm from '../../component/sign-in-form/sign-in-form.component'
import './authentication.styles.scss'

const Authentication = () => {
    useEffect(() => {
        const asyncFetch = async () => {
            const response = await getRedirectResult(auth)
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.auth)
            }
        }
        asyncFetch()
    }, [])
    const logGoogleUser = async () => {
        const response= await signInWithGooglePopup()
        // console.log(response)
        createUserDocumentFromAuth(response)
    }

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect()
    //     console.log({user})
    // }

    return (
        <div className='authentication-container' >
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication
