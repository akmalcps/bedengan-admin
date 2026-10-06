import { initialWarung } from '../../data/mock/warungMock';
import { createActivity } from './activityService';

const STORAGE_KEY = 'bedengan_xplore_admin_warungs';

const getStorageData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialWarung));
    return initialWarung;
  }
  return JSON.parse(data);
};

const setStorageData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getWarungs = () => {
  return Promise.resolve(getStorageData());
};

export const getWarungById = (id) => {
  const data = getStorageData();
  const warung = data.find(item => item.id === id);
  return Promise.resolve(warung || null);
};

export const createWarung = (warungData) => {
  const data = getStorageData();
  const newWarung = {
    ...warungData,
    id: Date.now().toString(),
    updatedAt: new Date().toISOString()
  };
  setStorageData([...data, newWarung]);

  createActivity({
    type: 'CREATE',
    module: 'warung',
    title: 'Menambahkan warung',
    description: newWarung.name
  });

  return Promise.resolve(newWarung);
};

export const updateWarung = (id, warungData) => {
  const data = getStorageData();
  const index = data.findIndex(item => item.id === id);
  
  if (index !== -1) {
    data[index] = { ...data[index], ...warungData, updatedAt: new Date().toISOString() };
    setStorageData(data);

    createActivity({
      type: 'UPDATE',
      module: 'warung',
      title: 'Mengubah warung',
      description: data[index].name
    });

    return Promise.resolve(data[index]);
  }
  return Promise.reject(new Error('Warung not found'));
};

export const deleteWarung = (id) => {
  const data = getStorageData();
  const index = data.findIndex(item => item.id === id);
  
  if (index !== -1) {
    const deletedName = data[index].name;
    const filtered = data.filter(item => item.id !== id);
    setStorageData(filtered);

    createActivity({
      type: 'DELETE',
      module: 'warung',
      title: 'Menghapus warung',
      description: deletedName
    });

    return Promise.resolve(true);
  }
  return Promise.reject(new Error('Warung not found'));
};

export const toggleWarungStatus = (id) => {
  const data = getStorageData();
  const index = data.findIndex(item => item.id === id);
  
  if (index !== -1) {
    data[index].status = data[index].status === 'active' ? 'inactive' : 'active';
    data[index].updatedAt = new Date().toISOString();
    setStorageData(data);

    createActivity({
      type: 'UPDATE',
      module: 'warung',
      title: `Mengubah status warung menjadi ${data[index].status}`,
      description: data[index].name
    });

    return Promise.resolve(data[index]);
  }
  return Promise.reject(new Error('Warung not found'));
};
