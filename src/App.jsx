import {Routes, Route, Navigate } from 'react-router-dom';
import EditSalesRoom from './pages/EditSalesRoom';
import HomePage from './pages/HomePage';
import Signup from "./components/Signup";
import Login from "./components/Login";
import ViewRoom from './pages/ViewRoom';
function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/editor' element={<EditSalesRoom />} />
      <Route path='/room' element={<ViewRoom />} />
      <Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>

  )
}

export default App
