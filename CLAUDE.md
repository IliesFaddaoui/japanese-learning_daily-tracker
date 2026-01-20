# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Electron desktop application for tracking daily Japanese learning activities using the organic immersion method. Built with React and follows Clean Architecture principles with clear separation of concerns.

## Commands

```bash
npm run build    # Build React app with Webpack
npm run watch    # Watch mode for development
npm start        # Build and launch Electron app
```

## Architecture

### Clean Architecture Layers

The codebase follows Clean Architecture with strict dependency rules (inner layers don't depend on outer layers):

**Domain Layer** (`src/domain/`)
- **Entities**: Core business objects (`Activity`, `DailyLog`)
  - `Activity`: Immutable value object representing a single activity type with count
  - `DailyLog`: Aggregate root managing activities for a specific date
- **Repositories**: Interfaces defining data access contracts (`ActivityRepository`)

**Application Layer** (`src/application/`)
- **Use Cases**: Business logic orchestration
  - `LoadActivitiesUseCase`: Retrieves all activity logs
  - `AddActivityUseCase`: Adds activity occurrence to a date
  - `RemoveActivityUseCase`: Removes activity occurrence from a date

**Infrastructure Layer** (`src/infrastructure/`)
- **Repositories**: Concrete implementations (`ElectronActivityRepository`)
- **Electron**: IPC communication (`preload.js`)

**Presentation Layer** (`src/presentation/`)
- **Components**: React UI components
  - `Calendar/`: Monthly calendar with activity status visualization
  - `ActivityTracker/`: Activity buttons and badges
  - `Statistics/`: Statistics display (streak, articles, video hours)
  - `Dashboard/`: Main container component with 2x2 grid layout
- **Hooks**: Custom React hooks (`useActivities`)
- **Utils**: Helper functions for dates, formatting, and statistics calculation

### Technology Stack

- **Frontend**: React 19 with functional components and hooks
- **Styling**: Tailwind CSS v4 with PostCSS
- **Build Tool**: Webpack 5 with Babel transpilation
- **Runtime**: Electron 40 (Node.js + Chromium)
- **Language**: JavaScript (ES6+ with ES modules)

### Electron Process Model

- **Main Process** (`main.js`): Node.js process managing windows and IPC handlers
- **Renderer Process** (`dist/index.html` + `dist/bundle.js`): React app running in BrowserWindow
- **Preload Script** (`src/infrastructure/electron/preload.js`): Secure IPC bridge via `contextBridge`

### Security

- `contextIsolation: true` - Renderer isolated from Node.js
- `nodeIntegration: false` - No direct Node.js access in renderer
- IPC communication only through exposed `window.electronAPI`

### Data Flow

1. UI triggers action (e.g., add activity button click)
2. Component calls use case through hook
3. Use case loads data via repository
4. Use case applies business logic (immutable updates)
5. Use case saves data via repository
6. Repository communicates with Electron main process via IPC
7. Main process persists to JSON file
8. Updated state flows back to UI via React state

### Data Storage

JSON file at `app.getPath('userData')/activities.json`:

```json
{
  "2026-01-19": {
    "nhk": 2,
    "anki": 1
  }
}
```

Keys: ISO date strings. Values: activity type → count mapping.

### Build Configuration

- **Webpack** (`webpack.config.js`): Bundles React app for Electron renderer
  - Uses `postcss-loader` for Tailwind CSS processing
- **Babel** (`.babelrc`): Transpiles JSX and ES6+ to CommonJS
  - Plugin `@babel/plugin-transform-modules-commonjs` required for proper module transformation
- **PostCSS** (`postcss.config.js`): Processes Tailwind CSS v4 with `@tailwindcss/postcss`
- **Tailwind**: Global styles in `src/presentation/styles/globals.css`

### Key Design Patterns

- **Repository Pattern**: Abstracts data access behind interfaces
- **Use Case Pattern**: Encapsulates business logic in single-responsibility classes
- **Immutability**: Domain entities create new instances on modification
- **Dependency Injection**: Use cases receive repository via constructor
- **Custom Hooks**: Encapsulate stateful logic (`useActivities`)

### Activity Types

Defined in `src/domain/entities/Activity.js`:
- `nhk`, `asahi`, `drama`, `anime`, `youtube`, `anki`

### Component Structure & Layout

The dashboard uses a 2-row grid layout:
- **Top row** (50% height): Calendar (left) + Statistics (right)
- **Bottom row** (50% height): Activity Tracker (full width)

Components are small, focused, and follow single responsibility:
- **Calendar**: Pure presentation of month grid with color-coded days
  - Days WITH activities: Green text (#22c55e)
  - Days WITHOUT activities: Black text (#333)
  - Current day: White text on gradient background
- **CalendarDay**: Single day cell with styling based on props
- **Statistics**: Displays aggregated metrics
  - Max streak: Longest consecutive days with activities
  - Total articles read: Sum of NHK + Asahi articles
  - Video time watched: (20min × anime + 40min × drama + 15min × youtube), displayed as "Xh Ymin"
- **ActivityTracker**: Container for buttons and badges (scrollable)
- **ActivityButton**: Single activity button with hover effects
- **ActivityBadge**: Badge showing activity with count
- **Dashboard**: Top-level composition with responsive grid

### State Management

State managed through React hooks:
- `useActivities`: Main hook managing activity data and operations
- `useState`: Local component state
- `useEffect`: Side effects (data loading)
- `useCallback`: Memoized callbacks for performance
- `useMemo`: Memoized values (use case instances, current date)

### Important Notes

- All domain entities are immutable (return new instances on modification)
- Use cases are stateless and can be instantiated per operation or reused
- Repository interface lives in domain, implementation in infrastructure
- React components never directly access Electron APIs
- All dates use ISO format (YYYY-MM-DD)
