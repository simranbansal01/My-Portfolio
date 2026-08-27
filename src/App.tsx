import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CursorProvider } from './lib/cursor'
import { useLenis } from './lib/useLenis'
import { useIsTouch } from './lib/useIsTouch'
import CustomCursor from './components/CustomCursor'
import Grain from './components/Grain'
import Nav from './components/Nav'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Experiments from './pages/Experiments'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const isTouch = useIsTouch()
  useLenis(!isTouch)

  return (
    <CursorProvider>
      <div className={isTouch ? '' : 'has-custom-cursor'}>
        <Grain />
        {!isTouch && <CustomCursor />}
        <Nav />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/experiments" element={<Experiments />} />
        </Routes>
      </div>
    </CursorProvider>
  )
}
