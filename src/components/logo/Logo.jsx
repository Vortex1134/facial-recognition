import React from 'react'
import Tilt from 'react-parallax-tilt'
import face from '../../assets/face.png'
import './logo.scss'

const Logo = () => {
	return (
		<div id='logo'>
			<Tilt id='logo'>
				<div>
					<img src={face} alt='logo'/>
				</div>
			</Tilt>
		</div>
	)
}

export default Logo
