import { Link } from "react-router-dom"



const NotFound = () => {
  return (
    <div>
        <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Go Back Home
      </Link>
    </div>
    </div>
  )
}

export default NotFound