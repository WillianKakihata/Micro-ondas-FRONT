
import { Route, Routes } from 'react-router'
import MicroOndasPage from './routes/MicroOndasPage'
import PageLayoutKeyBoard from './components/KeyBoardLayout/KeyBoardLayout'

function App() {

  return (
    <Routes>
      <Route path= "/" element={<MicroOndasPage/>}></Route>
      <Route path= "/key" element={<PageLayoutKeyBoard/>}></Route>
    </Routes>

  )
}

export default App
