import axios from "axios"
import React, { useContext, useEffect, useState, useRef } from "react"
import Loading from "../components/Loading"
import PhotoBox from "../components/PhotoBox"
import { ThemeContext } from "../contexts/ThemeContext"

const HomeFeed = () => {
	const { theme } = useContext(ThemeContext)

	const [allPhotos, setAllPhotos] = useState([])
	const [scrollPage, setScrollPage] = useState(1)
	const [loadedPages, setLoadedPages] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const loadingTrigger = useRef()

	useEffect(() => {
		document.title = `MarsRover | ${allPhotos.length} recent photos`
	}, [allPhotos])

	useEffect(() => {
		if (loadedPages.includes(scrollPage)) {
			return
		}

		setIsLoading(true)

		let config = {
			method: "get",
			url: "http://localhost:3000/photos",
			headers: {},
			params: { page: scrollPage },
		}

		axios(config)
			.then((response) => {
				const { photos } = response.data
				setAllPhotos((current) => [...current, ...photos])
				setLoadedPages((current) => [...current, scrollPage])
				setTimeout(() => setIsLoading(false), 500)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [scrollPage, loadedPages])

	useEffect(() => {
		const observer = new IntersectionObserver((entry) => {
			if (entry[0].isIntersecting) {
				setScrollPage(loadedPages.at(-1) + 1)
			}
		})
		if (loadingTrigger.current) {
			observer.observe(loadingTrigger.current)
		}
	})

	return (
		<>
			{isLoading ? <Loading /> : null}
			<main className={`scrollable ${theme}`}>
				{allPhotos.map((photo, i) => {
					return (
						<div
							key={photo._id}
							ref={i === allPhotos.length - 1 ? loadingTrigger : null}>
							<PhotoBox
								date={new Date(photo.earth_date)}
								{...photo}
								// spreading saves us from needing to
								// repeat ourselves when the prop keys match our object keys
								// _id={photo._id}
								// camera={photo.camera}
								// rover={photo.rover}
								// url={photo.url}
							/>
						</div>
					)
				})}
			</main>
		</>
	)
}

export default HomeFeed
