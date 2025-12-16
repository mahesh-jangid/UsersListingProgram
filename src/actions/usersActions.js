export const USERS_ACTION_TYPES = {
  FETCH_USERS_REQUEST: 'FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE',
  LOAD_MORE_USERS_REQUEST: 'LOAD_MORE_USERS_REQUEST',
  LOAD_MORE_USERS_SUCCESS: 'LOAD_MORE_USERS_SUCCESS',
  LOAD_MORE_USERS_FAILURE: 'LOAD_MORE_USERS_FAILURE',
  REFRESH_USERS_REQUEST: 'REFRESH_USERS_REQUEST',
  REFRESH_USERS_SUCCESS: 'REFRESH_USERS_SUCCESS',
  REFRESH_USERS_FAILURE: 'REFRESH_USERS_FAILURE',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  BOOKMARK_USER: 'BOOKMARK_USER',
  UNBOOKMARK_USER: 'UNBOOKMARK_USER',
  LOAD_BOOKMARKED_USERS: 'LOAD_BOOKMARKED_USERS',
};

export const fetchUsersRequest = () => ({
  type: USERS_ACTION_TYPES.FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users, lastUserId) => ({
  type: USERS_ACTION_TYPES.FETCH_USERS_SUCCESS,
  payload: { users, lastUserId },
});

export const fetchUsersFailure = (error) => ({
  type: USERS_ACTION_TYPES.FETCH_USERS_FAILURE,
  payload: error,
});

export const loadMoreUsersRequest = () => ({
  type: USERS_ACTION_TYPES.LOAD_MORE_USERS_REQUEST,
});

export const loadMoreUsersSuccess = (users, lastUserId) => ({
  type: USERS_ACTION_TYPES.LOAD_MORE_USERS_SUCCESS,
  payload: { users, lastUserId },
});

export const loadMoreUsersFailure = (error) => ({
  type: USERS_ACTION_TYPES.LOAD_MORE_USERS_FAILURE,
  payload: error,
});

export const refreshUsersRequest = () => ({
  type: USERS_ACTION_TYPES.REFRESH_USERS_REQUEST,
});

export const refreshUsersSuccess = (users, lastUserId) => ({
  type: USERS_ACTION_TYPES.REFRESH_USERS_SUCCESS,
  payload: { users, lastUserId },
});

export const refreshUsersFailure = (error) => ({
  type: USERS_ACTION_TYPES.REFRESH_USERS_FAILURE,
  payload: error,
});

export const setSearchQuery = (query) => ({
  type: USERS_ACTION_TYPES.SET_SEARCH_QUERY,
  payload: query,
});

export const bookmarkUser = (user) => ({
  type: USERS_ACTION_TYPES.BOOKMARK_USER,
  payload: user,
});

export const unbookmarkUser = (userId) => ({
  type: USERS_ACTION_TYPES.UNBOOKMARK_USER,
  payload: userId,
});

export const loadBookmarkedUsers = (users) => ({
  type: USERS_ACTION_TYPES.LOAD_BOOKMARKED_USERS,
  payload: users,
});

