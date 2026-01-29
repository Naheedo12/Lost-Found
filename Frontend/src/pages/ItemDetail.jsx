import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        setItem(res.data.item || res.data);
      } catch (err) {
        console.error('Error fetching item:', err);
      }
    };

    fetchItem();
  }, [id]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    const baseUrl = 'http://localhost:8000/storage/';
    return baseUrl + imagePath;
  };

  const getStatusColor = (status) => {
    return status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getTypeColor = (type) => {
    return type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {day: 'numeric',month: 'long',year: 'numeric'});
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-amber-900 text-lg">Chargement...</p>
      </div>
    );
  }

  const imageUrl = getImageUrl(item.image);

return (
    <div className="min-h-screen bg-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        <div className="bg-white rounded-lg shadow-md overflow-hidden">

          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <p className="text-amber-600 text-lg">Aucune photo disponible</p>
            )}
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h1 className="text-3xl font-bold text-amber-900">{item.title}</h1>
              <div className="flex gap-2 mt-2 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                  {item.type === 'lost' ? 'Perdu' : 'Trouvé'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                  {item.status === 'resolved' ? 'Résolu' : 'En cours'}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-amber-900 mb-2">Description</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{item.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p><strong>- Lieu :</strong> {item.location || 'Non spécifié'}</p>
                <p><strong>- Date :</strong> {item.date ? formatDate(item.date) : 'Non spécifiée'}</p>
                <p><strong>- Statut :</strong> {item.status === 'resolved' ? 'Résolu' : 'En cours de recherche'}</p>
              </div>
              <div className="space-y-1">
                <p><strong>- Déclaré par :</strong> {item.user?.name || 'Utilisateur'}</p>
                <p><strong>- Publié le :</strong> {item.created_at ? formatDate(item.created_at) : 'Non spécifiée'}</p>
              </div>
            </div>

            <Link
              to="/"
              className="block bg-amber-900 text-white py-3 px-6 rounded-md hover:bg-amber-800 text-center font-medium"
            >
              Retour à la liste
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ItemDetail;