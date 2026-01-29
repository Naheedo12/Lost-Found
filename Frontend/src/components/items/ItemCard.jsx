import { Link } from 'react-router-dom';

const ItemCard = ({ item, isOwn = false }) => {
  if (!item) return null;

  const getStatusColor = (status) =>
    status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

  const getTypeColor = (type) =>
    type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('fr-FR', {day: 'numeric',month: 'long',year: 'numeric'});

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    const baseUrl = 'http://localhost:8000/storage/';
    return baseUrl + imagePath;
  };

  const imageUrl = getImageUrl(item.image);
  const hasImage = imageUrl && imageUrl.trim() !== '';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="h-48 bg-gray-200 overflow-hidden">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-amber-50 text-amber-600">
            <p className="text-sm">Aucune photo</p>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-amber-900 line-clamp-2">
            {item.title}
          </h3>
          <div className="flex flex-col gap-1 ml-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
              {item.type === 'lost' ? 'Perdu' : 'Trouvé'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
              {item.status === 'resolved' ? 'Résolu' : 'Ean cours'}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-base mb-4 leading-relaxed line-clamp-3">
          {item.description}
        </p>

        <div className="space-y-1 text-sm text-gray-700">
          <p>- <span className="font-semibold">Lieu :</span> {item.location || 'Non spécifié'}</p>
          <p>- <span className="font-semibold">Date :</span> {item.date ? formatDate(item.date) : 'Non spécifiée'}</p>
          {!isOwn && item.user?.name && (
            <p>- <span className="font-semibold">Déclaré par :</span> {item.user.name}</p>
          )}
          {item.created_at && (
            <p>- <span className="font-semibold">Publié le :</span> {formatDate(item.created_at)}</p>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 mt-4">
          <Link
            to={`/item/${item.id}`}
            className="w-full bg-amber-900 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors text-center block font-medium"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;