import Button from '../../component/button/button.component'
import React, { useState } from 'react'
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'

const defaultFormFeilds = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFeilds, setFormFeilds] = useState(defaultFormFeilds)
    const { email, password } = formFeilds

    const resetFormFeilds = () => {
        console.log('resetFormFeilds done')
        setFormFeilds(defaultFormFeilds)
    }

    console.log(formFeilds)

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFeilds({ ...formFeilds, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user)
            console.log('handleSubmit try block')
            resetFormFeilds()
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert(`Incorrect password for ${email}`)
                    break
                case 'auth/user-not-found':
                    alert(`Incorrect username or email id`)
                    break
                default:
                    console.log(error)
            }
        }
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit} className='form' >
                <FormInput label='email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email} />

                <FormInput label='password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password} />

                <div className='buttons-container'>
                    <Button type='submit' Children='Sign In' ></Button>


                    <Button type='button' buttonType='google' onClick={signInWithGoogle} Children='Sign In with Google'></Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm