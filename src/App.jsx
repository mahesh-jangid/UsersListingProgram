import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { RoutePath } from 'common/enums/enumConstant';
import GitHubUsersPage from 'pages/githubUsers/index';

// Lazy load pages
const Page404 = lazy(() => import('pages/page404/index'));

// Loading component
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route exact path="/" element={<Navigate to={RoutePath.GITHUB_USERS} replace />} />
            <Route path={RoutePath.GITHUB_USERS} element={<GitHubUsersPage />} />
            <Route path={RoutePath.PAGE_404} element={<Page404/>}/>

            {/* Navigate to '/404' page when user entered unknown/non-declare path */}
            <Route path="*" element={<Navigate to={RoutePath.PAGE_404} replace/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
