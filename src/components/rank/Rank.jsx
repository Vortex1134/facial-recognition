import React from 'react'
import './rank.scss'

const Rank = ({ name, entries }) => {
	return (
		<div id='rank'>
			<div>{`${name}, your current entry count is...`}</div>
			<div>{entries}</div>
		</div>
	)
}

export default Rank
