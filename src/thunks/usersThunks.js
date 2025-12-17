import { fetchUsers as fetchUsersApi } from 'services/githubApi';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  loadMoreUsersRequest,
  loadMoreUsersSuccess,
  loadMoreUsersFailure,
  refreshUsersRequest,
  refreshUsersSuccess,
  refreshUsersFailure,
  bookmarkUser,
  unbookmarkUser,
  loadBookmarkedUsers,
} from 'actions/usersActions';
import {
  addBookmarkedUser,
  removeBookmarkedUser,
  getBookmarkedUsers as getStoredBookmarkedUsers,
} from 'utils/localStorage/usersStorage';

/**
 * Fetch initial list of users
 */
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const users = await fetchUsersApi(0);
      const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
      dispatch(fetchUsersSuccess(users, lastUserId));
      // Load bookmarked users from localStorage
      const bookmarkedUsers = getStoredBookmarkedUsers();
      dispatch(loadBookmarkedUsers(bookmarkedUsers));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

/**
 * Load more users (pagination)
 */
export const loadMoreUsers = (since) => {
  return async (dispatch) => {
    dispatch(loadMoreUsersRequest());
    try {
      const users = await fetchUsersApi(since);
      // If no users returned, we've reached the end
      const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
      dispatch(loadMoreUsersSuccess(users, lastUserId));
    } catch (error) {
      // Check if it's a network error
      const isNetworkError = !error.response && (error.message === 'Network Error' || error.code === 'ERR_NETWORK' || !navigator.onLine);
      const errorMessage = isNetworkError 
        ? 'Network error. Please check your internet connection.'
        : error.message || 'Failed to load more users';
      dispatch(loadMoreUsersFailure(errorMessage));
    }
  };
};

/**
 * Refresh users list
 */
export const refreshUsers = () => {
  return async (dispatch) => {
    dispatch(refreshUsersRequest());
    try {
      const users = await fetchUsersApi(0);
      const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
      dispatch(refreshUsersSuccess(users, lastUserId));
    } catch (error) {
      dispatch(refreshUsersFailure(error.message));
    }
  };
};

/**
 * Bookmark a user
 */
export const bookmarkUserThunk = (user) => {
  return (dispatch) => {
    const updatedBookmarks = addBookmarkedUser(user);
    dispatch(bookmarkUser(user));
    dispatch(loadBookmarkedUsers(updatedBookmarks));
  };
};

/**
 * Unbookmark a user
 */
export const unbookmarkUserThunk = (userId) => {
  return (dispatch) => {
    const updatedBookmarks = removeBookmarkedUser(userId);
    dispatch(unbookmarkUser(userId));
    dispatch(loadBookmarkedUsers(updatedBookmarks));
  };
};

