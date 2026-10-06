import { initialFotografer } from '../../data/mock/fotograferMock';
import { createActivity } from './activityService';

const STORAGE_KEY = 'bedengan_xplore_admin_fotografers';

const getStorageData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialFotografer));
    return initialFotografer;
  }
  return JSON.parse(data);
};

const setStorageData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getFotografers = () => Promise.resolve(getStorageData());

export const getFotograferById = (id) => {
  const data = getStorageData();
  const fotografer = data.find(item => item.id === id);
  return Promise.resolve(fotografer || null);
};

export const createFotografer = (fotograferData) => {
  const data = getStorageData();
  const newFotografer = {
    ...fotograferData,
    id: Date.now().toString(),
    updatedAt: new Date().toISOString()
  };
  setStorageData([...data, newFotografer]);
  
  createActivity({
    type: 'CREATE',
    module: 'fotografer',
    title: 'Menambahkan fotografer',
    description: newFotografer.name
  });

  return Promise.resolve(newFotografer);
};

export const updateFotografer = (id, fotograferData) => {
  const data = getStorageData();
  const index = data.findIndex(item => item.id === id);
  
  if (index !== -1) {
    data[index] = { ...data[index], ...fotograferData, updatedAt: new Date().toISOString() };
    setStorageData(data);

    createActivity({
      type: 'UPDATE',
      module: 'fotografer',
      title: 'Mengubah fotografer',
      description: data[index].name
    });

    return Promise.resolve(data[index]);
  }
  return Promise.reject(new Error('Fotografer not found'));
};

export const deleteFotografer = (id) => {
  const data = getStorageData();
  const index = data.findIndex(item => item.id === id);
  
  if (index !== -1) {
    const deletedName = data[index].name;
    const filtered = data.filter(item => item.id !== id);
    setStorageData(filtered);

    createActivity({
      type: 'DELETE',
      module: 'fotografer',
      title: 'Menghapus fotografer',
      description: deletedName
    });

    return Promise.resolve(true);
  }
  return Promise.reject(new Error('Fotografer not found'));
};

export const toggleFotograferStatus = (id) => {
  const data = getStorageData();
  const index = data.findIndex(item => item.id === id);
  
  if (index !== -1) {
    data[index].status = data[index].status === 'active' ? 'inactive' : 'active';
    data[index].updatedAt = new Date().toISOString();
    setStorageData(data);

    createActivity({
      type: 'UPDATE',
      module: 'fotografer',
      title: `Mengubah status fotografer menjadi ${data[index].status}`,
      description: data[index].name
    });

    return Promise.resolve(data[index]);
  }
  return Promise.reject(new Error('Fotografer not found'));
};
