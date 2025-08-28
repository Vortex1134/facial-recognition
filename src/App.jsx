import { useState } from 'react'
import ParticlesBg from 'particles-bg'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import Signin from './components/signin/Signin'
import Register from './components/register/Register'
import './styles/global/main.scss'

const App = () => {
	// State
	const [input, setInput] = useState('')
	const [imageUrl, setImageUrl] = useState('filler')
	const [faces, setFaces] = useState({})
	const [route, setRoute] = useState('signin')
	const [isSignedIn, setIsSignedIn] = useState(false)

	// Clarifai
	const PAT = '191318de14fd470db5f9454d7648d5bc'
	const USER_ID = 'clarifai'
	const APP_ID = 'main'
	const MODEL_ID = 'face-detection'
	const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105'

	// Events
	const onInputChange = (event) => {
		setInput(event.target.value)
	}

	const onButtonSubmit = () => {
		setImageUrl(input)
		const IMAGE_URL = input

		const raw = JSON.stringify({
			user_app_id: {
				user_id: USER_ID,
				app_id: APP_ID,
			},
			inputs: [
				{
					data: {
						image: {
							url: IMAGE_URL,
						},
					},
				},
			],
		})

		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: 'Key ' + PAT,
				'Content-Type': 'application/json',
			},
			body: raw,
		}

		fetch(
			'https://corsproxy.io?' +
				encodeURIComponent(
					'https://api.clarifai.com/v2/models/' +
						MODEL_ID +
						'/versions/' +
						MODEL_VERSION_ID +
						'/outputs',
				),
			requestOptions,
		)
			.then((response) => response.json())
			.then((result) => {
				const regions = result.outputs?.[0]?.data?.regions || []
				displayFaceBox(calculateFaceLocation(regions))
			})
			.catch((error) => {
				console.log('Error: ', error)
			})
	}

	const calculateFaceLocation = (data) => {
		const clarifaiFace = data[0].region_info.bounding_box
		const image = document.getElementById('input-image')
		const width = Number(image.width)
		const height = Number(image.height)

		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		}
	}

	const displayFaceBox = (box) => {
		console.log(box)
		setFaces(box)
	}

	const onRouteChange = (route) => {
		if (route === 'signout') {
			setIsSignedIn(false)
		} else if (route === 'home') {
			setIsSignedIn(true)
		}
		console.log(route)

		setRoute(route)
	}

	return (
		<div className='app'>
			<ParticlesBg
				type='cobweb'
				bg={true}
			/>
			<Navigation
				onRouteChange={onRouteChange}
				isSignedIn={isSignedIn}
			/>
			{route === 'home' ? (
				<div>
					<Logo />
					<Rank />
					<ImageLinkForm
						onInputChange={onInputChange}
						onButtonSubmit={onButtonSubmit}
					/>
					<FaceRecognition
						imageUrl={imageUrl}
						faces={faces}
					/>
				</div>
			) : route === 'signin' ? (
				<Signin onRouteChange={onRouteChange} />
			) : (
				<Register onRouteChange={onRouteChange} />
			)}
		</div>
	)
}

export default App
