import { BrowserRouter, Route, Routes } from "react-router-dom"
import Land from "./components/land/Land"
import Main from "./components/main/Main"
import { TranscribeContextProvider } from "./context/TranscribeContext"
import { useEffect } from "react"
import ShortUniqueId from "short-unique-id"

function App() {
    useEffect(() => {
      const uuid = localStorage.getItem('uuid')

      if (!uuid) {
        const uid = new ShortUniqueId({ length: 24 })
        localStorage.setItem('uuid', uid.rnd())
      } 
    }, [])

    return (
      <TranscribeContextProvider>
        <BrowserRouter>
          <div className="w-full min-h-screen font-inter bg-[#191919] text-white flex flex-col items-center justify-center">
            <Routes>
              <Route path="/" element={<Land />} />
              <Route path="/transcribe/:id/:url" element={<Main />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TranscribeContextProvider>
    )
}

export default App
