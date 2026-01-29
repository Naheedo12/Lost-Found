import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, isAdmin } = useAuth();

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '',email: '',password: '',confirmPassword: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    const result = await register(name, email, password, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(isAdmin() ? '/admin' : '/');
  };

  return (
    <>
      {error && (
        <p className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Nom', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Mot de passe', name: 'password', type: 'password' },
          { label: 'Confirmer le mot de passe', name: 'confirmPassword', type: 'password' }
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-amber-900 font-medium mb-2">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-amber-900 text-white py-2 rounded-md hover:bg-amber-800 transition-colors"
        >
          S'inscrire
        </button>
      </form>
    </>
  );
};

export default RegisterForm;