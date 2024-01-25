import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layout"
import Landing from "./pages/landing"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
