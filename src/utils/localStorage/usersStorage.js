const BOOKMARKED_USERS_KEY = 'github_bookmarked_users';

/**
 * Get bookmarked users from localStorage
 * @returns {Array} Array of bookmarked user objects
 */
export const getBookmarkedUsers = () => {
  try {
    const stored = localStorage.getItem(BOOKMARKED_USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading bookmarked users from localStorage:', error);
    return [];
  }
};

/**
 * Save bookmarked users to localStorage
 * @param {Array} users - Array of user objects to save
 */
export const saveBookmarkedUsers = (users) => {
  try {
    localStorage.setItem(BOOKMARKED_USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving bookmarked users to localStorage:', error);
  }
};

/**
 * Add a user to bookmarked users
 * @param {Object} user - User object to bookmark
 * @returns {Array} Updated array of bookmarked users
 */
export const addBookmarkedUser = (user) => {
  const bookmarkedUsers = getBookmarkedUsers();
  const exists = bookmarkedUsers.some((u) => u.id === user.id);
  if (!exists) {
    const updated = [...bookmarkedUsers, user];
    saveBookmarkedUsers(updated);
    return updated;
  }
  return bookmarkedUsers;
};

/**
 * Remove a user from bookmarked users
 * @param {number} userId - ID of the user to remove
 * @returns {Array} Updated array of bookmarked users
 */
export const removeBookmarkedUser = (userId) => {
  const bookmarkedUsers = getBookmarkedUsers();
  const updated = bookmarkedUsers.filter((u) => u.id !== userId);
  saveBookmarkedUsers(updated);
  return updated;
};

/**
 * Check if a user is bookmarked
 * @param {number} userId - ID of the user to check
 * @returns {boolean} True if user is bookmarked
 */
export const isUserBookmarked = (userId) => {
  const bookmarkedUsers = getBookmarkedUsers();
  return bookmarkedUsers.some((u) => u.id === userId);
};

