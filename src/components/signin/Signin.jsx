import React, { useState } from 'react'
import './signin.scss'

const Signin = ({ onRouteChange, loadUser }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onEmailChange = (event) => {
		setEmail(event.target.value)
	}

	const onPasswordChange = (event) => {
		setPassword(event.target.value)
	}

	const onSubmitSignIn = () => {
		fetch('https://facial-recognition-api-1zl8.onrender.com/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					loadUser(user)
					onRouteChange('home')
				}
			})
	}

	return (
		<div id='signin'>
			<div className='form'>
				<legend>Sign In</legend>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='text'
						name='email'
						id='email'
						onChange={onEmailChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						id='password'
						onChange={onPasswordChange}
					/>
				</div>
				<div className='form-group'>
					<button
						className='btn-primary'
						onClick={onSubmitSignIn}>
						Sign In
					</button>
				</div>
				<div className='form-group'>
					<p onClick={() => onRouteChange('register')}>Register</p>
				</div>
			</div>
		</div>
	)
}

export default Signin
