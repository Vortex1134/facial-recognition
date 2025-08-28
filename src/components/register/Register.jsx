import React from 'react'
import './register.scss'

const Register = ({ onRouteChange }) => {
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
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='text'
						name='email'
						id='email'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password:</label>
					<input
						type='text'
						name='password'
						id='password'
					/>
				</div>
				<div className='form-group'>
					<button
						className='btn-primary'
						onClick={() => onRouteChange('home')}>
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
