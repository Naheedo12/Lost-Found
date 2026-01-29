import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const ItemContext = createContext();

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error('useItems must be used within ItemProvider');
  return context;
};

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [filters, setFilters] = useState({ type: '', location: '' });

  const { user } = useAuth();

  const fetchItems = async () => {
      const response = await api.get('/items');
      setItems(response.data.items);
  };

  const fetchMyItems = async () => {
    if (!user) return;
      const response = await api.get('/my-items');
      setMyItems(response.data.items);
  };

  const convertBase64ToFile = (base64String) => {
    try {
      const base64Data = base64String.split(',')[1];
      const mimeType = base64String.split(',')[0].split(':')[1].split(';')[0];
            
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      
      const extension = mimeType.includes('jpeg') ? 'jpg' : mimeType.split('/')[1];
      const file = new File([byteArray], `image.${extension}`, { type: mimeType });
      
      return file;
    } catch (error) {
      return null;
    }
  };

  const createItem = async (itemData) => {
    try {      
      if (itemData.image && itemData.image.startsWith('data:')) {
        const formData = new FormData();
        
        const file = convertBase64ToFile(itemData.image);
        if (!file) {
          return { success: false, message: 'Error converting image' };
        }
        
        Object.keys(itemData).forEach(key => {
          if (key === 'image') {
            formData.append('image', file);
          } else if (itemData[key] !== null && itemData[key] !== undefined) {
            formData.append(key, itemData[key]);
          }
        });
        const response = await api.post('/items', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        await fetchItems();
        await fetchMyItems();
        return { success: true, item: response.data.item };
      } else {
        const response = await api.post('/items', itemData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await fetchItems();
        await fetchMyItems();
        return { success: true, item: response.data.item };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error during creation' };
    }
  };

  const updateItem = async (itemId, itemData) => {
    try {      
      if (itemData.image && itemData.image.startsWith('data:')) {
        const formData = new FormData();
        
        const file = convertBase64ToFile(itemData.image);
        if (!file) {
          return { success: false, message: 'Error converting image' };
        }
        
        Object.keys(itemData).forEach(key => {
          if (key === 'image') {
            formData.append('image', file);
          } else if (itemData[key] !== null && itemData[key] !== undefined) {
            formData.append(key, itemData[key]);
          }
        });
        const response = await api.post(`/items/${itemId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        await fetchItems();
        await fetchMyItems();
        return { success: true, item: response.data.item };
      } else {
        const response = await api.post(`/items/${itemId}`, itemData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await fetchItems();
        await fetchMyItems();
        return { success: true, item: response.data.item };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error during update' };
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await api.delete(`/items/${itemId}`);
      await fetchItems();
      await fetchMyItems();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error during deletion' };
    }
  };

  const adminUpdateItem = async (itemId, itemData) => {
    try {
      const response = await api.post(`/admin/items/${itemId}`, itemData);
      await fetchItems();
      return { success: true, item: response.data.item };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error during admin update' };
    }
  };

  const adminDeleteItem = async (itemId) => {
    try {
      await api.delete(`/admin/items/${itemId}`);
      await fetchItems();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error during admin deletion' };
    }
  };

  const updateFilters = (newFilters) => setFilters(newFilters);

  const applyFilters = async () => {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.location) params.append('location', filters.location);

      const response = await api.get(`/items/filter?${params}`);
      setItems(response.data.items);
  };

  const resetFilters = () => {
    setFilters({ type: '', location: '' });
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (user) fetchMyItems();
    else setMyItems([]);
  }, [user]);

  return (
    <ItemContext.Provider value={{
      items,
      myItems,
      filters,
      fetchItems,
      fetchMyItems,
      createItem,
      updateItem,
      deleteItem,
      adminUpdateItem,
      adminDeleteItem,
      updateFilters,
      applyFilters,
      resetFilters
    }}>
      {children}
    </ItemContext.Provider>
  );
};