import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={< Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
