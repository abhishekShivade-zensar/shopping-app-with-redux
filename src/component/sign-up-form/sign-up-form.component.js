import Button from '../../component/button/button.component'
import React, { useState} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'

const defaultFormFeilds = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFeilds, setFormFeilds] = useState(defaultFormFeilds)
    const { displayName, email, password, confirmPassword } = formFeilds

    const resetFormFeilds = () => {
        setFormFeilds(defaultFormFeilds)
    }

    console.log(formFeilds)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFeilds({ ...formFeilds, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match')
            return
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFeilds()

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Can not create user, email already in use')
            } else {
                console.log(`user creation error occured ${error}`)
            }
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} className='form' >
                <FormInput label='Dispaly Name'
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName} />

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

                <FormInput label='confirmPassword'
                    type='confirmPassword'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword} />

                <Button buttonType='inverted' type='submit' onChange={handleSubmit} Children='Sign Up'></Button>
            </form>
        </div>
    )
}

export default SignUpForm