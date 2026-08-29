# App Shell Feature Specification (Navbar, Sidebar & DashboardWrapper)

## Current State
- `Navbar`: Displays logo/search input, theme toggle (`Moon`/`Sun`), settings navigation, hamburger sidebar toggle, and circular user profile menu with sign-out action.
- `Sidebar`: Fixed collapsible side navigation featuring main app links (Home, Timeline, Search, Settings), collapsible Projects section, and collapsible Priority section (Urgent, High, Medium, Low, Backlog).
- `DashboardWrapper`: Root state wrapper combining `StoreProvider` (Redux Toolkit + Redux Persist) and `DashboardLayout` for light/dark theme class synchronization on `document.documentElement` and responsive sidebar margin adjustments.

## Data Flow
```
User Action (Click Toggle / Theme Switch)
  │
  ▼
Redux Dispatch (setIsSideBarCollapsed / setIsDarkMode)
  │
  ▼
Redux Store (globalSlice in state/index.ts) ──► Redux Persist (localStorage)
  │
  ▼
useAppSelector Hook (DashboardLayout, Navbar, Sidebar)
  ├──► DashboardLayout: useEffect toggles 'dark' class on document.documentElement
  ├──► Sidebar: controls CSS width (w-64 vs w-0 hidden)
  └──► Navbar: toggles Sun / Moon icon & hamburger icon visibility
```

## Future Improvements
- **RTK Query Integration**: Replace sample project link in Sidebar with dynamic `useGetProjectsQuery` hook.
- **User Authentication**: Connect Navbar profile avatar and Sign Out button with NextAuth / JWT session handlers.
- **Global Search**: Connect Navbar search input to global search route (`/search?q=`).
