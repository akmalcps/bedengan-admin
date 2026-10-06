import { initialRental } from '../../data/mock/rentalMock';
import { createActivity } from './activityService';

const STORAGE_KEY = 'bedengan_xplore_admin_rentals';

const getStorageData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRental));
    return initialRental;
  }
  return JSON.parse(data);
};

const setStorageData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getRentals = () => Promise.resolve(getStorageData());

export const getRentalById = (id) => {
  const data = getStorageData();
  const rental = data.find(item => item.id === id);
  return Promise.resolve(rental || null);
};

export const createRental = (rentalData) => {
  const data = getStorageData();
  const newRental = {
    ...rentalData,
    id: Date.now().toString(),
    updatedAt: new Date().toISOString()
  };
  setStorageData([...data, newRental]);
  
  createActivity({
    type: 'CREATE',
    module: 'rental',
    title: 'Menambahkan rental',
    description: newRental.name
  });

  return Promise.resolve(newRental);
};

export const updateRental = (id, rentalData) => {
  const data = getStorageData();
  const index = data.findIndex(item => item.id === id);
  
  if (index !== -1) {
    data[index] = { ...data[index], ...rentalData, updatedAt: new Date().toISOString() };
    setStorageData(data);

    createActivity({
      type: 'UPDATE',
      module: 'rental',
      title: 'Mengubah rental',
      description: data[index].name
    });

    return Promise.resolve(data[index]);
  }
  return Promise.reject(new Error('Rental not found'));
};

export const deleteRental = (id) => {
  const data = getStorageData();
  const index = data.findIndex(item => item.id === id);
  
  if (index !== -1) {
    const deletedName = data[index].name;
    const filtered = data.filter(item => item.id !== id);
    setStorageData(filtered);

    createActivity({
      type: 'DELETE',
      module: 'rental',
      title: 'Menghapus rental',
      description: deletedName
    });

    return Promise.resolve(true);
  }
  return Promise.reject(new Error('Rental not found'));
};

export const toggleRentalStatus = (id) => {
  const data = getStorageData();
  const index = data.findIndex(item => item.id === id);
  
  if (index !== -1) {
    data[index].status = data[index].status === 'active' ? 'inactive' : 'active';
    data[index].updatedAt = new Date().toISOString();
    setStorageData(data);

    createActivity({
      type: 'UPDATE',
      module: 'rental',
      title: `Mengubah status rental menjadi ${data[index].status}`,
      description: data[index].name
    });

    return Promise.resolve(data[index]);
  }
  return Promise.reject(new Error('Rental not found'));
};
