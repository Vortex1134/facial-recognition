import React from 'react'
import './facerecognition.scss'

const FaceRecognition = ({ imageUrl, faces }) => {
	return (
		<div id='face-recognition'>
			<div className='image-container'>
				<img
					id='input-image'
					src={`${imageUrl}`}
					alt='Please choose an image'
					width='500px'
					height='auto'
				/>
				<div
					className='bounding-box'
					style={{
						top: faces.topRow,
						right: faces.rightCol,
						bottom: faces.bottomRow,
						left: faces.leftCol,
					}}></div>
			</div>
		</div>
	)
}

export default FaceRecognition
