import Header from './Components/Header';
import Body from './Components/Body';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import ProfilePage from './Components/ProfilePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path='/profile' element={<ProfilePage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
