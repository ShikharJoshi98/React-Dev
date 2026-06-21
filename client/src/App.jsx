import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ProjectPlayground from "./pages/ProjectPlayground"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/project/:projectId" element={<ProjectPlayground />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
