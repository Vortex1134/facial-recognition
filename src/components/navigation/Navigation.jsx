import React from 'react'
import './navigation.scss'

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<div id='navigation'>
				<p
					onClick={() => onRouteChange('signout')}
					className='link'>
					Sign Out
				</p>
			</div>
		)
	} else {
		return (
			<div id='navigation'>
				<p
					onClick={() => onRouteChange('signin')}
					className='link'>
					Sign In
				</p>
				<p
					onClick={() => onRouteChange('register')}
					className='link'>
					Register
				</p>
			</div>
		)
	}
}

export default Navigation
