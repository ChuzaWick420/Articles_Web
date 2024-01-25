import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layout"
import Landing from "./pages/landing/landing.jsx"
import Preview from "./pages/preview/preview.jsx"
import Details from "./pages/details/details.jsx"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >

          <Route index element={<Landing />} />
          <Route path="preview" element={<Preview />} />
          <Route path="preview/:article_id" element={<Preview />} />
          <Route path="preview/:article_id/details" element={<Details />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
