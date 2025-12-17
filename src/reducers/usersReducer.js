import { USERS_ACTION_TYPES } from 'actions/usersActions';
import { getBookmarkedUsers } from 'utils/localStorage/usersStorage';

const initialState = {
  users: [],
  bookmarkedUsers: getBookmarkedUsers(),
  loading: false,
  loadingMore: false,
  refreshing: false,
  error: null,
  loadMoreError: null,
  lastUserId: 0,
  searchQuery: '',
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_ACTION_TYPES.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USERS_ACTION_TYPES.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        lastUserId: action.payload.lastUserId,
        error: null,
      };

    case USERS_ACTION_TYPES.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USERS_ACTION_TYPES.LOAD_MORE_USERS_REQUEST:
      return {
        ...state,
        loadingMore: true,
        loadMoreError: null,
      };

    case USERS_ACTION_TYPES.LOAD_MORE_USERS_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        users: [...state.users, ...action.payload.users],
        lastUserId: action.payload.lastUserId,
        loadMoreError: null,
      };

    case USERS_ACTION_TYPES.LOAD_MORE_USERS_FAILURE:
      return {
        ...state,
        loadingMore: false,
        loadMoreError: action.payload,
      };

    case USERS_ACTION_TYPES.REFRESH_USERS_REQUEST:
      return {
        ...state,
        refreshing: true,
        error: null,
      };

    case USERS_ACTION_TYPES.REFRESH_USERS_SUCCESS:
      return {
        ...state,
        refreshing: false,
        users: action.payload.users,
        lastUserId: action.payload.lastUserId,
        error: null,
      };

    case USERS_ACTION_TYPES.REFRESH_USERS_FAILURE:
      return {
        ...state,
        refreshing: false,
        error: action.payload,
      };

    case USERS_ACTION_TYPES.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case USERS_ACTION_TYPES.BOOKMARK_USER:
      return {
        ...state,
        bookmarkedUsers: [...state.bookmarkedUsers, action.payload],
      };

    case USERS_ACTION_TYPES.UNBOOKMARK_USER:
      return {
        ...state,
        bookmarkedUsers: state.bookmarkedUsers.filter(
          (user) => user.id !== action.payload
        ),
      };

    case USERS_ACTION_TYPES.LOAD_BOOKMARKED_USERS:
      return {
        ...state,
        bookmarkedUsers: action.payload,
      };

    default:
      return state;
  }
};

export default usersReducer;

