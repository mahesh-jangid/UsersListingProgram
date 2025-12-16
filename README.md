# GitHub Users Application

A modern React application for browsing and managing GitHub users with bookmarking capabilities. This application provides a seamless user experience for exploring GitHub users, bookmarking favorites, and managing your bookmarked collection with offline support.

## 🚀 Features

### Core Functionality
- **GitHub Users API Integration**: Fetches users from the official GitHub Users API
- **Two-Tab Interface**: 
  - **Users Tab**: Browse all GitHub users with pagination
  - **Bookmarked Users Tab**: Manage your bookmarked users collection

### User Management
- **User Listing**: Display users with circular avatar images and login names
- **Infinite Scroll**: Automatically loads more users as you scroll near the bottom of the list
- **Pull-to-Refresh**: Refresh the users list by pulling down (mobile-friendly)
- **Bookmark System**: Bookmark/unbookmark users with a single click
- **Bookmark Persistence**: All bookmarked users are saved to localStorage for offline access

### Search & Filter
- **Real-time Search**: Case-insensitive search functionality in both tabs
- **Throttled Search**: 300ms throttling to optimize performance while typing
- **Local Search**: Searches through already loaded data without additional API calls

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Offline Support**: Bookmarked users are accessible even when offline
- **Cross-instance Sync**: Bookmarked users persist across browser sessions
- **Loading States**: Visual feedback during data fetching operations
- **Error Handling**: Graceful error handling with user-friendly messages

## 🛠️ Tech Stack

### Core Technologies
- **React 18.2.0** - Modern React with hooks
- **Redux 4.2.1** - State management
- **Redux Thunk 2.4.2** - Async action handling
- **React Router 6.8.2** - Client-side routing
- **Axios 1.3.4** - HTTP client for API requests

### UI Framework
- **Material-UI (MUI) 5.14.7** - Component library
- **Emotion** - CSS-in-JS styling
- **Tailwind CSS 3.2.7** - Utility-first CSS framework

### Development Tools
- **Vite 4.1.0** - Fast build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **React Window 2.2.3** - Virtual scrolling (for performance optimization)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎯 Usage

### Browsing Users
1. Navigate to the application home page
2. The **Users** tab is displayed by default
3. Scroll through the list of GitHub users
4. More users will automatically load as you scroll near the bottom
5. Pull down on mobile devices to refresh the list

### Bookmarking Users
1. Click the bookmark icon (outline) next to any user
2. The icon will change to a filled bookmark indicating the user is bookmarked
3. Navigate to the **Bookmarked Users** tab to see all bookmarked users

### Managing Bookmarks
1. Switch to the **Bookmarked Users** tab
2. Click the filled bookmark icon to remove a user from bookmarks
3. The user will be immediately removed from the bookmarked list
4. Switch back to **Users** tab to see the bookmark status update

### Searching Users
1. Use the search box at the top of either tab
2. Type the username (case-insensitive)
3. Results filter in real-time with 300ms throttling
4. Search works only on already loaded data (no API calls)

## 📁 Project Structure

```
final/
├── public/                 # Static assets
├── src/
│   ├── actions/           # Redux actions
│   │   └── usersActions.js
│   ├── components/        # React components
│   │   ├── BookmarkedUsersTab/  # Bookmarked users tab component
│   │   ├── SearchInput/          # Reusable search input component
│   │   ├── TabPanel/             # Tab panel wrapper component
│   │   ├── UserCard/             # User card display component
│   │   └── UsersTab/             # Users list tab component
│   ├── common/            # Common utilities and constants
│   │   └── enums/
│   │       └── enumConstant.js   # Route paths and constants
│   ├── contexts/          # React contexts
│   │   └── errorBoundary/        # Error boundary context
│   ├── hooks/             # Custom React hooks
│   │   ├── usePullToRefresh.js   # Pull-to-refresh hook
│   │   └── useThrottle.js        # Throttle hook for search
│   ├── pages/             # Page components
│   │   ├── githubUsers/          # Main GitHub users page
│   │   └── page404/              # 404 error page
│   ├── reducers/          # Redux reducers
│   │   ├── index.js              # Root reducer
│   │   └── usersReducer.js       # Users state reducer
│   ├── services/          # API services
│   │   └── githubApi.js          # GitHub API integration
│   ├── thunks/            # Redux thunks
│   │   └── usersThunks.js        # Async user operations
│   ├── utils/             # Utility functions
│   │   ├── cookies/              # Cookie utilities
│   │   ├── localStorage/         # LocalStorage utilities
│   │   │   └── usersStorage.js   # Bookmark storage management
│   │   └── store/                # Redux store configuration
│   ├── App.jsx            # Root application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🔧 Key Components

### UsersTab
Main component for displaying and managing GitHub users list.
- Fetches users from GitHub API
- Implements infinite scroll for automatic pagination
- Handles pull-to-refresh functionality
- Provides search with throttling
- Manages bookmark/unbookmark actions

### BookmarkedUsersTab
Component for managing bookmarked users.
- Displays all bookmarked users from localStorage
- Allows removing bookmarks
- Provides search functionality for bookmarked users
- No API calls required (works offline)

### UserCard
Reusable component for displaying user information.
- Shows user avatar (circular image)
- Displays user login name
- Bookmark/unbookmark button
- Consistent styling and hover effects

### SearchInput
Reusable search input component.
- Material-UI TextField with search icon
- Consistent styling across tabs
- Configurable placeholder text

## 🗄️ State Management

### Redux Store Structure

```javascript
{
  users: {
    users: [],              // Array of fetched users
    bookmarkedUsers: [],    // Array of bookmarked users
    loading: false,         // Initial loading state
    loadingMore: false,     // Infinite scroll loading state
    refreshing: false,      // Pull-to-refresh loading state
    error: null,            // Error message if any
    lastUserId: 0,          // Last user ID for pagination
  }
}
```

### Redux Actions
- `FETCH_USERS_REQUEST/SUCCESS/FAILURE` - Initial users fetch
- `LOAD_MORE_USERS_REQUEST/SUCCESS/FAILURE` - Infinite scroll pagination
- `REFRESH_USERS_REQUEST/SUCCESS/FAILURE` - Pull-to-refresh
- `BOOKMARK_USER` - Add user to bookmarks
- `UNBOOKMARK_USER` - Remove user from bookmarks
- `LOAD_BOOKMARKED_USERS` - Load bookmarks from localStorage

### LocalStorage
Bookmarked users are persisted in browser localStorage under the key `github_bookmarked_users`. This ensures:
- Bookmarks persist across browser sessions
- Bookmarks are available offline
- Bookmarks sync across tabs in the same browser

## 🌐 API Integration

### GitHub Users API
- **Endpoint**: `https://api.github.com/users`
- **Method**: GET
- **Parameters**:
  - `since`: Integer ID of the last user seen (for infinite scroll pagination)
  - `per_page`: Number of users per page (default: 30)

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint and fix issues
npm run lint:check   # Check for linting errors only
npm run format       # Format code with Prettier
```

## 🎨 Custom Hooks

### useThrottle
Custom hook for throttling function calls to optimize performance.

```javascript
const throttledFunction = useThrottle(callback, delay);
```

### usePullToRefresh
Custom hook for implementing pull-to-refresh functionality on mobile devices.

```javascript
const { containerRef, isRefreshing } = usePullToRefresh(onRefresh, threshold);
```

## 🔒 Best Practices Implemented

1. **Functional Components**: All components use functional components with hooks
2. **Reusable Components**: Components are designed for reusability
3. **Separation of Concerns**: Clear separation between UI, logic, and data
4. **Error Handling**: Comprehensive error handling with user feedback
5. **Performance Optimization**: 
   - Throttled search to reduce processing
   - Infinite scroll for efficient pagination
   - Lazy loading for heavy components
   - Memoization where appropriate
6. **Code Quality**: ESLint and Prettier configuration for consistent code style
7. **Accessibility**: ARIA labels and semantic HTML
8. **Responsive Design**: Mobile-first approach with responsive breakpoints

## 🐛 Known Limitations

- Search only works on already loaded data (no API search integration)
- Pull-to-refresh works best on touch devices
- Bookmarked users are stored locally (not synced across devices)

## 🔮 Future Enhancements

- [ ] Implement API-based search functionality
- [ ] Add user detail view/modal
- [ ] Implement user profile caching
- [ ] Add filtering options (by location, followers, etc.)
- [ ] Add export bookmarks feature
- [ ] Implement user authentication for cloud bookmark sync
- [ ] Add unit and integration tests
- [ ] Implement virtual scrolling for better performance with large lists

 