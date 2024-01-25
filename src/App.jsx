import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layout"
import Landing from "./pages/landing"
import Preview from "./pages/preview"
import Details from "./pages/details"

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
