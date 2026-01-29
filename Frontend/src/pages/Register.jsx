import { Link } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 to-amber-200 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md">
        
        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-amber-900 text-center mb-2">
            Inscription
          </h2>

          <p className="text-amber-700 text-center mb-6">
            Déjà un compte ?{' '}
            <Link
              to="/login"
              className="font-medium text-amber-900 underline hover:text-amber-700"
            >
              Se connecter
            </Link>
          </p>

          <RegisterForm />

        </div>

      </div>
    </div>
  );
};

export default Register;