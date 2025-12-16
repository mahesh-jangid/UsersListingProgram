import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Avatar, Typography, IconButton, Tooltip, Skeleton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const UserCard = memo(({ user, isBookmarked, onBookmark, onUnbookmark }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback((e) => {
    setImageLoading(false);
    e.target.src = `https://ui-avatars.com/api/?name=${user.login}&background=random`;
  }, [user.login]);

  const handleBookmarkClick = useCallback((e) => {
    e.stopPropagation();
    if (isBookmarked) {
      onUnbookmark(user.id);
    } else {
      onBookmark(user);
    }
  }, [isBookmarked, user.id, onBookmark, onUnbookmark]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: { xs: 1.5, md: 2 },
        marginBottom: { xs: 1.5, md: 2 },
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s',
        gap: { xs: 1, md: 0 },
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Avatar
        src={user.avatar_url}
        alt={user.login}
        onLoad={handleImageLoad}
        onError={handleImageError}
        sx={{
          width: { xs: 48, md: 64 },
          height: { xs: 48, md: 64 },
          marginRight: 2,
          flexShrink: 0,
        }}
        loading="lazy"
        decoding="async"
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div">
          {user.login}
        </Typography>
      </Box>
      <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}>
        <IconButton
          onClick={handleBookmarkClick}
          color={isBookmarked ? 'primary' : 'default'}
          aria-label={isBookmarked ? 'remove bookmark' : 'add bookmark'}
        >
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
});

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }).isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onUnbookmark: PropTypes.func.isRequired,
};

UserCard.displayName = 'UserCard';

export default UserCard;

