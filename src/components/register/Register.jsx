import React, { useState } from 'react'
import './register.scss'

const Register = ({ onRouteChange, loadUser }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const onEmailChange = (event) => {
		setEmail(event.target.value)
	}

	const onPasswordChange = (event) => {
		setPassword(event.target.value)
	}

	const onNameChange = (event) => {
		setName(event.target.value)
	}

	const onRegisterSubmit = () => {
		fetch('https://facial-recognition-api-1zl8.onrender.com/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password,
				name,
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
		<div id='register'>
			<div className='form'>
				<legend>Register</legend>
				<div className='form-group'>
					<label htmlFor='name'>Name:</label>
					<input
						type='text'
						name='name'
						id='name'
						onChange={onNameChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
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
						onClick={onRegisterSubmit}>
						Register
					</button>
				</div>
				<div className='form-group'>
					<p onClick={() => onRouteChange('signin')}>Sign In</p>
				</div>
			</div>
		</div>
	)
}

export default Register
