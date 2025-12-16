import React, { useState, Suspense, lazy, useCallback, memo } from 'react';
import { Box, Tabs, Tab, CircularProgress } from '@mui/material';
import TabPanel from 'components/TabPanel';

// Lazy load heavy tab components
const UsersTab = lazy(() => import('components/UsersTab'));
const BookmarkedUsersTab = lazy(() => import('components/BookmarkedUsersTab'));

// Loading fallback for tab content
const TabLoadingFallback = memo(() => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
    <CircularProgress />
  </Box>
));

TabLoadingFallback.displayName = 'TabLoadingFallback';

const GitHubUsersPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 1200, 
      margin: '0 auto', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      padding: { xs: 1.5, sm: 2, md: 3 } 
    }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 0, flexShrink: 0 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="users tabs">
          <Tab label="Users" id="users-tab-0" aria-controls="users-tabpanel-0" />
          <Tab label="Bookmarked Users" id="users-tab-1" aria-controls="users-tabpanel-1" />
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TabPanel value={tabValue} index={0}>
          <Suspense fallback={<TabLoadingFallback />}>
            <UsersTab />
          </Suspense>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Suspense fallback={<TabLoadingFallback />}>
            <BookmarkedUsersTab />
          </Suspense>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default GitHubUsersPage;

