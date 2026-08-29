**Create all components in `components/` folder**

- **Include all the inline `dark` theme classes in all the components**
- **All the icons should have a `dark` theme alternative**
- use barrel imports
- Make the `cursor-pointer` for elements to hover on
- Make the app responsible for all screen sizes
- Redux-persist used to store state locally
- use redux & redux-toolkit from `apps/web/state`

1. **Navbar** -
   - elements-
     - a hamburger icon to hide the sidebar for smaller screens
     - search panel (search icon from `lucide-react`)
     - settings icon
       - should take to settings page
     - theme changing icon (cresent)
     - a circular profile button and a sign-out button

- contains `global state` - `isSideBarCollapsed` and `isDarkMode` by-
  - const dispatch = useDispatch () //from redux.tsx
  - const isSideBarCollapsed = useAppSelector((state) => {
    state.global.isSideBarCollapsed;
    })
  - const isDarkMode = useAppSelector((state) => {
    state.global.isDarkMode;
    })
  - use ternary operator for condition applying -
    - !isSideBarCollapsed ? null : <button onClick={() => dispatch(setIsSideBarCollapsed(!isSideBarCollapsed))}/>
  - toggle the darkMode in similar manner-
    - when in light mode - show the `crescent` icon and when in dark mode show the `sun` icon
    - add `dark` classnames for dark-theme
    - the dark mode should apply to the entire app

2. **Sidebar** -

- fixed to left, with high z-index, shadow, can be hidden under a `hamburger icon` for smaller icons
- Should be collapsible onClick a `cross` icon
  - the closed/opened state is stored in `Redux toolkit`
  - state is stored `Globally`

- create another component to show the `Sidebarlinks`
  - const SideBarLinks = ({href, icon:Icon, label, isCollapsed}: SideBarProps) => {
    const `pathname` = usePathName();
    const `isActive` = pathname === href || (pathname === "/" && href === "/dashboard") //if isActive - then highlight the link for better UX - this is a dynamic var to highlight the current page - by default this is home page

    const width = window.innerWidth
    const dispatch = useDispatch();
    const isSideBarCollapsed = useAppSelector((state) => {
    state.global.isSideBarCollapsed;
    })

    // each element is <Link> with `icons` and `labels` with appropriate `dark` theme inline classes
    }

- Elements (in the specified order)- should have appropriate icons beside the tags
  - `create an array of objects for containing the data about the sideBar links and map the array to display the links`
  - Home
  - Timeline
  - Search
  - Settings

  - Projects - panel showing projects ([project,setProject] = useState)
    - this is a button which is collapsible
    - has a state (`showProjects`) - if true - is expanded to show the projects else hides them with `ChevronUP/DOWN` icons
    - shows links to different projects

  - Priority - panel showing priority ([showPriority,setShowPriority] = useState)
    - same code as that of `Projects`
    - use these icons: label : redirect page triplets- (icons from lucide-react)
      - AlertCircle : Urgent : priority/urgent
      - ShieldAlert : High : priority/High
      - AlertTriangle : Medium : priority/Medium
      - AlertOctagon : Low : priority/Low
      - Layers3 : Backlog : priority/Backlog

- a cross button responsible for closing the sidebar using `onClick={dispatch( setIsSideBarCollapsed( isSideBarCollapsed ) )}

3. **DashboardWrapper** -

- create 2 components - `DashboardLayout` & `DashboardWrapper`
  - `DashboardWrapper` - wrap the component with the `StoreProvider` from `state/redux.tsx` with `DashboardLayout` as child
  - `DashboardLayout` contains all the `navbar` and `sidebar` components

    - has global state for `isSideBarCollapsed` & `isDarkMode` done by `useAppSelector` from `state/redux.tsx`

      - **const `isSideBarCollapsed` = useAppSelector((state) => state.global.`isSideBarCollapsed`)**
        - if isSideBarCollapsed, then remove the padding

      - similarly for `isDarkMode`
        - add the class "dark" to root element with a side-effect like
          - useEffect (() => {
            if (isDarkMode) {
            document.documentElement.classList.add("dark");
            }else {
            document.documentElement.classList.remove("dark");
            }
            })

  - this makes it access global access of state throughout the dashboard

- Wrap the children with (`DashboardWrapper`) in `apps/web/layout.tsx`

- Elements - **Sidebar** & **Navbar**
