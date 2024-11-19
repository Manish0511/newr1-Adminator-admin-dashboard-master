import apiService from './apiService';

const fetchUserData = async () => {
  try {
    const response = await apiService('users', 'get'); // Modify 'users' if necessary
    if (response.success) {
      return response.data; // Return the data if successful
    } else {
      return { success: false, message: response.message || 'Failed to fetch users' };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { success: false, message: 'Error occurred while fetching user data' };
  }
};