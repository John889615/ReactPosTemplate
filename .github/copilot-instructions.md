# Copilot Instructions for ReactPosTemplate

## Project Overview
- This is a React-based POS (Point of Sale) template with modular features for menu management, inventory, HRM, sales, and reporting.
- The codebase is organized by feature modules under `src/feature-module/`, with shared logic in `src/core/`, context in `src/context/`, and API services in `src/services/`.
- Routing is managed via React Router (`src/Router/`), with routes defined in `router.link.jsx` and layouts in `router.jsx`.
- Redux is used for global state management (`src/core/redux/`).
- Authentication is handled via JWT, with context provided by `src/context/AuthContext.jsx`.
- API calls use Axios, with a custom instance in `src/services/api.js` that injects the JWT token from localStorage.

## Key Patterns & Conventions
- **Feature Modules:** Each business domain (e.g., menu, inventory, HRM) has its own folder under `src/feature-module/`. UI and logic are colocated.
- **Menu Management:** Menu tree and product assignment use drag-and-drop (migrating from `@hello-pangea/dnd` to `dnd-kit`). See `menuTreeBuilder.jsx` for the main logic.
- **Service Layer:** API calls are abstracted in `src/services/`, grouped by domain. Always use these service functions for backend communication.
- **Redux State:** Initial values and reducers are in `src/core/redux/initial.value.jsx` and `reducer.jsx`. Use actions defined here for state updates.
- **Authentication:** Use the `AuthProvider` and `useAuth` hook for login/logout and user info. Token is stored in localStorage and injected into API requests.
- **Environment:** Paths and config are set in `src/environment.jsx`.

## Developer Workflows
- **Start App:** Run `npm run start` from the project root.
- **API Integration:** All API endpoints are called via the service layer. Do not call Axios directly in components.
- **Drag-and-Drop:** For menu/product assignment, use dnd-kit patterns. See `menuTreeBuilder.jsx` for examples of draggable/droppable setup.
- **Routing:** Add new pages by updating `src/Router/router.link.jsx` and `src/Router/router.jsx`.
- **State Management:** Use Redux for cross-feature state. For local state, use React hooks.
- **Authentication:** Use the context API (`AuthProvider`) for user state and access control.

## External Dependencies
- Major UI libraries: Bootstrap, Ant Design, FontAwesome, CKEditor, ApexCharts, FullCalendar.
- Drag-and-drop: Migrating to `@dnd-kit/core` and related packages.
- API: Axios, with JWT token injection.

## Examples
- **Menu Tree Drag-and-Drop:** See `src/feature-module/menu/menuTreeBuilder.jsx` for dnd-kit usage and product assignment logic.
- **API Service Usage:** See `src/services/menu/menuService.js` and `src/services/product/product.js` for typical API call patterns.
- **Redux Setup:** See `src/core/redux/store.jsx` and `src/core/redux/reducer.jsx` for store configuration and state updates.
- **Authentication:** See `src/context/AuthContext.jsx` for login/logout and user context.

## Integration Points
- All backend communication goes through the service layer in `src/services/`.
- UI components are feature-scoped but may use shared core utilities.
- Routing and layout are managed centrally in `src/Router/`.

---

If you are unsure about a pattern, check the corresponding feature module or service for examples. For new features, follow the structure and conventions of existing modules.
