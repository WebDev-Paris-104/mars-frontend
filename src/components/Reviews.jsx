import "./Reviews.css"

// import axios from "axios"
import service from "../service/api"
import React, { useContext, useEffect, useState } from "react"
import AddReview from "./AddReview"
import Review from "./Review"
import { AuthContext } from "../contexts/AuthContext"

const getAverageRating = (reviews) => {
	const totalRating = reviews.reduce(
		(prevValue, review) => prevValue + review.rating,
		0
	)
	return totalRating / reviews.length
}

const Reviews = ({ photoId }) => {
	const [allReviews, setAllReviews] = useState([])
	const { isLoggedIn } = useContext(AuthContext)

	const averageRating = getAverageRating(allReviews)

	const updateReviewsList = () => {
		if (!photoId) {
			console.error("No photoId provided for Reviews")
			return
		}

		service
			.getReviewsOfPicture(photoId)
			.then((reviews) => {
				setAllReviews(reviews)
			})
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		updateReviewsList()
	}, [])

	return (
		<div className="reviews">
			{/* When averageRating is NaN, we don't show this paragraph */}
			{!!averageRating && (
				<p className="average">Average rating: {averageRating.toFixed(2)}</p>
			)}
			<ul>
				{allReviews.map((review) => {
					console.log(review)

					return (
						<li>
							<Review {...review} />
						</li>
					)
				})}
			</ul>
			{isLoggedIn && (
				<AddReview photoId={photoId} updateReviewsList={updateReviewsList} />
			)}
		</div>
	)
}

export default Reviews
