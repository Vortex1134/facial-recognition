import { useState, useEffect } from 'react'
import ParticlesBg from 'particles-bg'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import Signin from './components/signin/Signin'
import Register from './components/register/Register'
import './styles/global/main.scss'

const initialInput = ''
const initialImageUrl = 'filler'
const initialFaces = []
const initialRoute = 'signin'
const initialIsSignedIn = false
const initialUser = {
	id: '',
	name: '',
	email: '',
	entries: 0,
	joined: '',
}

const App = () => {
	// State
	const [input, setInput] = useState(initialInput)
	const [imageUrl, setImageUrl] = useState(initialImageUrl)
	const [faces, setFaces] = useState(initialFaces)
	const [route, setRoute] = useState(initialRoute)
	const [isSignedIn, setIsSignedIn] = useState(initialIsSignedIn)
	const [user, setUser] = useState(initialUser)

	useEffect(() => {
		console.log(user)
	}, [user])

	// Events
	const onInputChange = (event) => {
		setInput(event.target.value)
	}

	const onButtonSubmit = () => {
		setImageUrl(input)

		fetch('https://facial-recognition-api-1zl8.onrender.com/imageurl', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				input,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				if (result) {
					fetch(
						'https://facial-recognition-api-1zl8.onrender.com/image',
						{
							method: 'put',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								id: user.id,
							}),
						},
					)
						.then((response) => response.json())
						.then((count) => {
							setUser({ ...user, entries: count })
						})
						.catch(console.log)
				}
				const regions = result.outputs?.[0]?.data?.regions || []
				console.log('regions', regions)
				displayFaceBox(calculateFaceLocation(regions))
			})
			.catch((error) => {
				console.log('Error: ', error)
			})
	}

	const calculateFaceLocation = (regions) => {
		const image = document.getElementById('input-image')
		const width = Number(image.width)
		const height = Number(image.height)

		return regions.map((region) => {
			const clarifaiFace = region.region_info.bounding_box
			return {
				leftCol: clarifaiFace.left_col * width,
				topRow: clarifaiFace.top_row * height,
				rightCol: width - clarifaiFace.right_col * width,
				bottomRow: height - clarifaiFace.bottom_row * height,
			}
		})
	}

	const displayFaceBox = (boxes) => {
		setFaces(boxes)
	}

	const onRouteChange = (route) => {
		if (route === 'signout') {
			setFaces(initialFaces)
			setImageUrl(initialImageUrl)
			setInput(initialInput)
			setUser(initialUser)
			setRoute(initialRoute)
			setIsSignedIn(initialIsSignedIn)
		} else if (route === 'home') {
			setIsSignedIn(true)
		}
		console.log(route)

		setRoute(route)
	}

	const loadUser = (data) => {
		setUser({
			...data,
		})
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
					<Rank
						name={user.name}
						entries={user.entries}
					/>
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
				<Signin
					onRouteChange={onRouteChange}
					loadUser={loadUser}
				/>
			) : (
				<Register
					onRouteChange={onRouteChange}
					loadUser={loadUser}
				/>
			)}
		</div>
	)
}

export default App
