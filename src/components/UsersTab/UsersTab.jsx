import React, { useEffect, useMemo, useState, useCallback, memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Button, Typography } from '@mui/material';
import UserCard from 'components/UserCard';
import SearchInput from 'components/SearchInput';
import { useThrottle } from 'hooks/useThrottle';
import { usePullToRefresh } from 'hooks/usePullToRefresh';
import { fetchUsers, loadMoreUsers as loadMoreUsersThunk, refreshUsers as refreshUsersThunk } from 'thunks/usersThunks';
import { bookmarkUserThunk, unbookmarkUserThunk } from 'thunks/usersThunks';

const UsersTab = () => {
  const dispatch = useDispatch();
  const { users, bookmarkedUsers, loading, loadingMore, refreshing, lastUserId } = useSelector(
    (state) => state.users
  );
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef(null);

  const bookmarkedUserIds = useMemo(
    () => new Set(bookmarkedUsers.map((user) => user.id)),
    [bookmarkedUsers]
  );

  // Throttled search handler
  const [throttledSearchQuery, setThrottledSearchQuery] = useState('');
  const throttledSetSearchQuery = useThrottle((query) => {
    setThrottledSearchQuery(query);
  }, 300);

  // Filter users based on search query (case-insensitive)
  const filteredUsers = useMemo(() => {
    if (!throttledSearchQuery.trim()) {
      return users;
    }
    const query = throttledSearchQuery.toLowerCase();
    return users.filter((user) => user.login.toLowerCase().includes(query));
  }, [users, throttledSearchQuery]);

  // Pull to refresh
  const handleRefresh = useCallback(async () => {
    await dispatch(refreshUsersThunk());
  }, [dispatch]);

  const { containerRef: pullToRefreshRef, isRefreshing } = usePullToRefresh(handleRefresh);
  
  // Merge refs for pull-to-refresh and scroll container
  const setScrollRef = useCallback((node) => {
    scrollContainerRef.current = node;
    if (pullToRefreshRef) {
      pullToRefreshRef.current = node;
    }
  }, [pullToRefreshRef]);

  useEffect(() => {
    if (users.length === 0 && !loading) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length, loading]);

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && lastUserId > 0) {
      dispatch(loadMoreUsersThunk(lastUserId));
    }
  }, [loadingMore, lastUserId, dispatch]);

  const handleBookmark = useCallback((user) => {
    dispatch(bookmarkUserThunk(user));
  }, [dispatch]);

  const handleUnbookmark = useCallback((userId) => {
    dispatch(unbookmarkUserThunk(userId));
  }, [dispatch]);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    throttledSetSearchQuery(value);
  }, [throttledSetSearchQuery]);

  // Infinite scroll handler
  const handleScroll = useCallback((e) => {
    const element = e.target;
    const isNearBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 500;
    
    if (
      isNearBottom &&
      !loadingMore &&
      !loading &&
      lastUserId > 0 &&
      !throttledSearchQuery.trim()
    ) {
      dispatch(loadMoreUsersThunk(lastUserId));
    }
  }, [loadingMore, loading, lastUserId, throttledSearchQuery, dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexShrink: 0, marginBottom: { xs: 1, sm: 1.5, md: 2 } }}>
        <SearchInput value={searchQuery} onChange={handleSearchChange} />
      </Box>
      
      <Box 
        ref={setScrollRef}
        sx={{ flex: 1, overflow: 'auto', paddingRight: { xs: '4px', sm: '8px' } }}
        onScroll={handleScroll}
      >
        {loading && users.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress />
          </Box>
        )}

        {refreshing && (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!loading && filteredUsers.length === 0 && users.length > 0 && (
          <Typography variant="body1" color="text.secondary" align="center">
            No users found matching your search.
          </Typography>
        )}

        {!loading && filteredUsers.length > 0 && (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isBookmarked={bookmarkedUserIds.has(user.id)}
              onBookmark={handleBookmark}
              onUnbookmark={handleUnbookmark}
            />
          ))
        )}

        {loadingMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UsersTab;

