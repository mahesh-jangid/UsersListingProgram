import React, { useMemo, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import UserCard from 'components/UserCard';
import SearchInput from 'components/SearchInput';
import { useThrottle } from 'hooks/useThrottle';
import { unbookmarkUserThunk } from 'thunks/usersThunks';

const BookmarkedUsersTab = () => {
  const dispatch = useDispatch();
  const { bookmarkedUsers } = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef(null);

  // Throttled search handler
  const [throttledSearchQuery, setThrottledSearchQuery] = useState('');
  const throttledSetSearchQuery = useThrottle((query) => {
    setThrottledSearchQuery(query);
  }, 300);

  // Filter bookmarked users based on search query (case-insensitive)
  const filteredBookmarkedUsers = useMemo(() => {
    if (!throttledSearchQuery.trim()) {
      return bookmarkedUsers;
    }
    const query = throttledSearchQuery.toLowerCase();
    return bookmarkedUsers.filter((user) => user.login.toLowerCase().includes(query));
  }, [bookmarkedUsers, throttledSearchQuery]);

  const handleUnbookmark = useCallback((userId) => {
    dispatch(unbookmarkUserThunk(userId));
  }, [dispatch]);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    throttledSetSearchQuery(value);
  }, [throttledSetSearchQuery]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexShrink: 0, marginBottom: { xs: 1, sm: 1.5, md: 2 } }}>
        <SearchInput value={searchQuery} onChange={handleSearchChange} placeholder="Search bookmarked users..." />
      </Box>

      <Box 
        ref={scrollContainerRef}
        sx={{ flex: 1, overflow: 'auto', paddingRight: { xs: '4px', sm: '8px' } }}
      >
        {bookmarkedUsers.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ padding: 4 }}>
            No bookmarked users yet. Bookmark users from the Users tab to see them here.
          </Typography>
        ) : filteredBookmarkedUsers.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ padding: 4 }}>
            No bookmarked users found matching your search.
          </Typography>
        ) : (
          filteredBookmarkedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isBookmarked={true}
              onBookmark={() => {}} // Not used in this tab
              onUnbookmark={handleUnbookmark}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default BookmarkedUsersTab;

