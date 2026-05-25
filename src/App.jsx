import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { IME_APLIKACIJE, RouteNames } from './constants'
import Home from './pages/Home'
import AlbumiPregled from './pages/albumi/AlbumiPregled'
import AlbumNovi from './pages/albumi/AlbumNovi'
import AlbumPromjena from './pages/albumi/AlbumPromjena'

function App() {
  return (
    <Container>
      <Izbornik />
      <Container className='app'>
        <Routes>
          <Route path={RouteNames.HOME}           element={<Home />} />
          <Route path={RouteNames.ALBUMI}         element={<AlbumiPregled />} />
          <Route path={RouteNames.ALBUMI_NOVI}    element={<AlbumNovi />} />
          <Route path={RouteNames.ALBUMI_PROMJENA} element={<AlbumPromjena />} />
        </Routes>
      </Container>
      <hr />
      &copy; {IME_APLIKACIJE} | Antonio Horvat
    </Container>
  )
}

export default App
