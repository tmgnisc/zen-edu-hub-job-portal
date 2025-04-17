import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
    <div className="p-8 bg-white rounded-2xl shadow-lg text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">🎉 Tailwind is Working!</h1>
      <p className="text-gray-600">You're ready to build Zen Edu Hub 🚀</p>
    </div>
  </div>
  )
}

export default App
