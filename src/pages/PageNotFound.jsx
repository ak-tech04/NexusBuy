import { Link } from 'react-router'


function PageNotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center space-y-8">
        {/* Animated 404 Text */}
        <div className="animate-bounce">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
            404
          </h1>
        </div>

        {/* Page Not Found Message */}
        <div className="space-y-4">
          <h2 className="text-5xl font-bold text-white animate-pulse">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-300 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="text-6xl animate-spin" style={{ animationDuration: '3s' }}>
            🔍
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pt-8">
          <Link
            to="/"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 border-2 border-gray-400 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound