import React, { useState } from 'react'
import { registerAPICall } from '../services/AuthService'
import { Link, useNavigate } from 'react-router-dom'

const RegisterComponent = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    function handleRegistrationForm(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        const register = { name, username, email, password }

        console.log(register)

        registerAPICall(register).then((response) => {
            console.log(response.data)
            setSuccess(true)
            setLoading(false)
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }).catch(error => {
            console.error(error)
            setError('Registration failed. Please try again.')
            setLoading(false)
        })
    }

    return (
        <div className='page-container'>
            <div className='auth-container'>
                <div className='auth-card'>
                    <div className='auth-header'>
                        <h2>Create Account</h2>
                        <p>Join TaskFlow to manage your tasks</p>
                    </div>

                    <div className='auth-body'>
                        {success ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                color: 'var(--success)'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                    Registration Successful!
                                </h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Redirecting to login...
                                </p>
                            </div>
                        ) : (
                            <form className='auth-form' onSubmit={handleRegistrationForm}>
                                {error && (
                                    <div className='form-group' style={{
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(244, 63, 94, 0.1)',
                                        border: '1px solid rgba(244, 63, 94, 0.3)',
                                        borderRadius: '8px',
                                        color: '#f43f5e',
                                        fontSize: '0.9rem'
                                    }}>
                                        {error}
                                    </div>
                                )}

                                <div className='form-group'>
                                    <label className='form-label'>Full Name</label>
                                    <input
                                        type='text'
                                        name='name'
                                        className='form-control'
                                        placeholder='Enter your full name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Username</label>
                                    <input
                                        type='text'
                                        name='username'
                                        className='form-control'
                                        placeholder='Choose a username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Email</label>
                                    <input
                                        type='email'
                                        name='email'
                                        className='form-control'
                                        placeholder='Enter your email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Password</label>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control'
                                        placeholder='Create a password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    className='btn btn-primary'
                                    type='submit'
                                    disabled={loading}
                                >
                                    {loading ? 'Creating account...' : 'Create Account'}
                                </button>
                            </form>
                        )}
                    </div>

                    {!success && (
                        <div className='auth-footer'>
                            Already have an account? <Link to='/login'>Sign in</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent