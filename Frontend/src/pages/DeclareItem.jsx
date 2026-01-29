import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DeclareItemForm from '../components/items/DeclareItemForm';

const DeclareItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-amber-900 mb-6">
          Déclarer un objet
        </h1>
        <DeclareItemForm />
      </div>
    </div>
  );
};

export default DeclareItem;