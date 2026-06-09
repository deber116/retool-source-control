import { Routes, Route } from 'react-router-dom'
import DogGallery from './pages/DogGallery'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DogGallery />} />
    </Routes>
  )
}
