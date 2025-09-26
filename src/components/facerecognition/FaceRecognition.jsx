import React from 'react'
import './facerecognition.scss'

const FaceRecognition = ({ imageUrl, faces }) => {
	console.log(faces)
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
				{faces.map((box, i) => (
					<div
						key={i}
						className='bounding-box'
						style={{
							top: box.topRow,
							right: box.rightCol,
							bottom: box.bottomRow,
							left: box.leftCol,
						}}></div>
				))}
			</div>
		</div>
	)
}

export default FaceRecognition
