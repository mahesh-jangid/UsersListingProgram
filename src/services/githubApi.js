import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

/**
 * Fetches users from GitHub API with pagination
 * @param {number} since - The integer ID of the last User that you've seen
 * @param {number} perPage - Number of users per page (default: 30)
 * @returns {Promise} Promise that resolves to the users data
 */
export const fetchUsers = async (since = 0, perPage = 30) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/users`, {
      params: {
        since,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

