import {useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProtectedLink = (path) => {
    if (!user) {navigate('/login');} 
    else {navigate(path);}
  };

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-amber-900 text-amber-100 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Lost & Found</h3>
            <p className="text-amber-200 mb-4">
              La plateforme qui vous aide à retrouver vos objets perdus et à rendre ceux que vous avez trouvés.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Liens utiles</h4>
            <ul className="space-y-2 text-amber-200">
              <li>
                <button 
                  onClick={handleHomeClick}
                  className="hover:text-white transition-colors text-left"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleProtectedLink('/declare')}
                  className="hover:text-white transition-colors text-left"
                >
                  Déclarer un objet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleProtectedLink('/my-items')}
                  className="hover:text-white transition-colors text-left"
                >
                  Mes objets
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="text-amber-200 space-y-2">
              <p>salma@admin.com</p>
              <p>06 11 22 33 44</p>
              <p>Casablanca, Maroc</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-amber-700 pt-8 mt-8 text-center">
          <p className="text-amber-300 text-sm">
            © 2026 Lost & Found. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;