
import { Route, Routes } from 'react-router'
import MicroOndasPage from './routes/MicroOndasPage'

function App() {

  return (
    <Routes>
      <Route path= "/" element={<MicroOndasPage/>}></Route>
    </Routes>

  )
}

export default App
