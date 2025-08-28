import React from 'react'
import './signin.scss'

const Signin = ({ onRouteChange }) => {
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
