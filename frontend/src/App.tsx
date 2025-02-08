import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
