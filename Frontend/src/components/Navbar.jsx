import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <nav className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Lost & Found
          </Link>

          <div className="flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/" className="text-white hover:text-amber-200">
                  Accueil
                </Link>
                <Link to="/declare" className="text-white hover:text-amber-200">
                  Déclarer
                </Link>
                <Link to="/my-items" className="text-white hover:text-amber-200">
                  Mes objets
                </Link>
                {isAdmin() && (
                  <Link 
                    to="/admin" 
                    className="text-white hover:text-amber-200"
                  >
                    Dashboard
                  </Link>
                )}
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {getInitials(user.name)}
                  </div>
                  <span className="text-white">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-amber-700 hover:bg-amber-600 px-3 py-2 rounded ml-4"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-amber-200">
                  Connexion
                </Link>
                <Link to="/register" className="bg-amber-700 hover:bg-amber-600 px-3 py-2 rounded">
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;