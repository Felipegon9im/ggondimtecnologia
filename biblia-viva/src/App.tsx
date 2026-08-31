import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MobileLayout } from './components/layout/MobileLayout';
import Home from './pages/Home';
import Bible from './pages/Bible';
import Videos from './pages/Videos';
import Devotional from './pages/Devotional';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        
        <Route path="/" element={<MobileLayout />}>
          <Route index element={<Home />} />
          <Route path="biblia" element={<Bible />} />
          <Route path="videos" element={<Videos />} />
          <Route path="devocional" element={<Devotional />} />
          <Route path="perfil" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
