import axios from "axios"

const service = axios.create({
	baseURL:
		import.meta.env.VITE_BACKEND_URL || "https://insta-mars-rover.onrender.com",
})

service.interceptors.request.use((interceptedRequest) => {
	interceptedRequest.headers.Authorization = `Bearer ${localStorage.getItem(
		"token"
	)}`
	return interceptedRequest
})

//http://localhost:3000/photos/${photoId}/reviews
service.getReviewsOfPicture = async (id) => {
	const response = await service.get(`/photos/${id}/reviews`)
	return response.data.reviews
}

export default service
