import {Routes, Route } from 'react-router-dom';
import EditSalesRoom from './pages/EditSalesRoom';
import HomePage from './pages/HomePage';
function App() {


  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/editor' element={<EditSalesRoom />} />
    </Routes>

  )
}

export default App
