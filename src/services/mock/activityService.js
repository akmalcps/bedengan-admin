import { getUser } from '../../utils/auth';

const STORAGE_KEY = 'bedengan_xplore_admin_activities';

const getStorageData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return [];
  }
  return JSON.parse(data);
};

const setStorageData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getActivities = () => Promise.resolve(getStorageData());

export const getRecentActivities = (limit = 5) => {
  const data = getStorageData();
  // Sort by timestamp descending
  const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return Promise.resolve(sorted.slice(0, limit));
};

export const createActivity = ({ type, module, title, description }) => {
  const data = getStorageData();
  const currentUser = getUser();
  
  const newActivity = {
    id: Date.now().toString(),
    type,
    module,
    title,
    description,
    admin: currentUser ? currentUser.name : 'System Admin',
    timestamp: new Date().toISOString()
  };
  
  const updatedData = [newActivity, ...data];
  setStorageData(updatedData);
  
  return Promise.resolve(newActivity);
};
