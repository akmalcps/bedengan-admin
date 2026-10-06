import { getWarungs } from './warungService';
import { getRentals } from './rentalService';
import { getApplications } from './applicationService';

// Fallback to fetch photografer from localStorage directly
const getPhotographers = () => {
  const data = localStorage.getItem('bedengan_xplore_admin_fotografers');
  if (!data) return [];
  return JSON.parse(data);
};

export const getDashboardStats = async () => {
  const warungs = await getWarungs();
  const rentals = await getRentals();
  const photographers = getPhotographers();
  const applications = await getApplications();
  
  const pendingApps = applications.filter(app => app.status === 'Pending');

  return {
    totalWarung: warungs.length,
    totalRental: rentals.length,
    totalFotografer: photographers.length || 3, // Mock fallback
    pendingPendaftaran: pendingApps.length
  };
};

export const getPendingApplications = async () => {
  const applications = await getApplications();
  return applications.filter(app => app.status === 'Pending').slice(0, 5); // get top 5
};

export const getRecentActivities = async () => {
  const { getRecentActivities: fetchActivities } = await import('./activityService.js');
  return fetchActivities(5);
};
