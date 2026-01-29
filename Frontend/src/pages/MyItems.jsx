import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';

const MyItems = () => {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const { user } = useAuth();
  const { myItems, updateItem, deleteItem } = useItems();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {navigate('/login');}
  }, [user, navigate]);

  if (!user) {return null;}

  const handleEdit = (item) => {
    setEditingItem(item.id);
    const formattedDate = item.date ? item.date.split('T')[0] : '';
    setFormData({ 
      title: item.title, 
      description: item.description, 
      type: item.type, 
      location: item.location, 
      date: formattedDate,
      image: item.image 
    });
    setImagePreview(getImageUrl(item.image) || '');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({ ...formData, image: base64String });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (id) => {    
    const dataToSend = { ...formData };
    
    if (!formData.image || !formData.image.startsWith('data:')) {
      delete dataToSend.image;
    }
    const result = await updateItem(id, dataToSend);
    if (result.success) {
      setEditingItem(null);
      setImagePreview('');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      await deleteItem(id);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
    return `http://localhost:8000/storage/${imagePath}`;
  };

  const getStatusColor = (status) => status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  const getTypeColor = (type) => type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {day: 'numeric',month: 'long',year: 'numeric'});
  };

  return (
    <div className="min-h-screen bg-amber-50">

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-amber-900 mb-8">My Declarations</h1>
        
        {myItems.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-amber-900 mb-2">No declarations</h3>
            <p className="text-amber-700 mb-6">You haven't declared any lost or found items yet.</p>
            <button onClick={() => navigate('/declare')} className="bg-amber-900 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors">
              Declare an item
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  {editingItem === item.id && imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : getImageUrl(item.image) ? (
                    <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-amber-50">
                      <div className="text-center text-amber-600">
                        <div className="text-4xl mb-2">📦</div>
                        <p className="text-sm">No photo</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {editingItem === item.id ? (
                    <div className="space-y-4">
                      <input 
                        name="title" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})} 
                        placeholder="Title"
                        className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
                      />
                      
                      <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        placeholder="Description"
                        rows="3" 
                        className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
                      />
                      
                      <select 
                        name="type" 
                        value={formData.type} 
                        onChange={(e) => setFormData({...formData, type: e.target.value})} 
                        className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="lost">Lost</option>
                        <option value="found">Found</option>
                      </select>
                      
                      <input 
                        name="location" 
                        value={formData.location} 
                        onChange={(e) => setFormData({...formData, location: e.target.value})} 
                        placeholder="Location"
                        className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
                      />
                      
                      <input 
                        name="date" 
                        type="date" 
                        value={formData.date} 
                        onChange={(e) => setFormData({...formData, date: e.target.value})} 
                        className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" 
                      />

                      <div>
                        <label className="block text-amber-900 font-medium mb-2">
                          Modify image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleUpdate(item.id)} 
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => {
                            setEditingItem(null);
                            setImagePreview('');
                          }} 
                          className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-amber-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex flex-col gap-1 ml-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            {item.type === 'lost' ? 'Lost' : 'Found'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status === 'resolved' ? 'Resolved' : 'In Progress'}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-700">
                          <span className="font-medium">- Location:</span>
                          <span className="ml-1">{item.location || 'Not specified'}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-700">
                          <span className="font-medium">- Date:</span>
                          <span className="ml-1">{item.date ? formatDate(item.date) : 'Not specified'}</span>
                        </div>

                        {item.created_at && (
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">- Published on:</span>
                            <span className="ml-1">{formatDate(item.created_at)}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <button onClick={() => navigate(`/item/${item.id}`)} 
                                className="w-full bg-amber-900 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors text-center block font-medium mb-2">
                          View details
                        </button>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(item)} 
                                  className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors font-medium">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(item.id)} 
                                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium">
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyItems;