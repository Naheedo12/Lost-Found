import { Link } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 to-amber-200 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md">

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">

          <div className="text-center">

            <h2 className="text-2xl font-bold text-amber-900">
              Connexion
            </h2>

            <p className="text-amber-700 mt-2">
              Pas encore de compte ?{' '}
              <Link
                to="/register"
                className="font-medium text-amber-900 underline hover:text-amber-700"
              >
                S'inscrire
              </Link>
            </p>
          </div>

          <LoginForm />

        </div>

      </div>
    </div>
  );
};

export default Login;