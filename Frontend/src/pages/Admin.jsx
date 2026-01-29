import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const { items, adminUpdateItem, adminDeleteItem } = useItems();
  const navigate = useNavigate();

  if (!user || !isAdmin()) {
    navigate('/');
    return null;
  }

  const updateStatus = async (itemId, status) => {
    try {
      const res = await adminUpdateItem(itemId, { status });
      if (!res.success) alert(`Erreur: ${res.message}`);
    } catch {
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const deleteItem = async (itemId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet objet ?')) return;

    try {
      const res = await adminDeleteItem(itemId);
      if (!res.success) alert(`Erreur: ${res.message}`);
    } catch {
      alert('Erreur lors de la suppression de l’objet');
    }
  };

  const getStatusBadge = (status) =>
    status === 'resolved'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';

  const getTypeBadge = (type) =>
    type === 'lost'
      ? 'bg-red-100 text-red-800'
      : 'bg-blue-100 text-blue-800';

  return (
    <div className="min-h-screen bg-amber-50 px-6 py-8">

      <h1 className="text-3xl font-bold text-amber-900 mb-6">
        Administration – Gestion des objets
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-12 text-amber-700">
          Aucun objet trouvé
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-amber-900">
                <tr>
                  {[
                    'Objet',
                    'Type',
                    'Lieu',
                    'Date',
                    'Utilisateur',
                    'Statut',
                    'Actions'
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.description.slice(0, 50)}...
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadge(item.type)}`}>
                        {item.type === 'lost' ? 'Perdu' : 'Trouvé'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.location}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(item.date).toLocaleDateString('fr-FR')}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.user?.name}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                        {item.status === 'resolved' ? 'Résolu' : 'En cours'}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.id, e.target.value)}
                          className="text-xs border rounded px-2 py-1"
                        >
                          <option value="in_progress">En cours</option>
                          <option value="resolved">Résolu</option>
                        </select>

                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;