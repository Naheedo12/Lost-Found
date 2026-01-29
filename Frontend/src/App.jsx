import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ItemProvider } from './context/ItemContext';
import Navbar from './components/Navbar';
import ItemsList from './pages/ItemsList';
import Login from './pages/Login';
import Register from './pages/Register';
import DeclareItem from './pages/DeclareItem';
import MyItems from './pages/MyItems';
import Admin from './pages/Admin';
import ItemDetail from './pages/ItemDetail';

function App() {
  return (
    <AuthProvider>
      <ItemProvider>
        <Router>
          <div className="min-h-screen bg-amber-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<ItemsList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/declare" element={<DeclareItem />} />
              <Route path="/my-items" element={<MyItems />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/item/:id" element={<ItemDetail />} />
            </Routes>
          </div>
        </Router>
      </ItemProvider>
    </AuthProvider>
  );
}

export default App;