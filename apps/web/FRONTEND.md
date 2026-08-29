- **Include all the inline `dark` theme classes in all the components**
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

2. **Sidebar** -

- fixed to left, with high z-index, shadow, can be hidden under a `hamburger icon` for smaller icons
- Should be collapsible onClick a `cross` icon
  - the closed/opened state is stored in `Redux toolkit`
  - state is stored `Globally`
- Elements (in the specified order)- should have appropriate icons beside the tags
  - Home
  - Timeline
  - Search
  - Settings
  - Projects - panel showing projects ([project,setProject] = useState)
  - Priority - panel showing priority ([showPriority,setShowPriority] = useState)

3. **DashboardWrapper** -

- Wrap it in `apps/web/layout.tsx`
- Elements - **Sidebar** & **Navbar**
