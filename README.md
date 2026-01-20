# Japanese Learning Daily Tracker

A simple Electron desktop application for tracking daily Japanese learning activities using the organic immersion method.

## About

This app helps track your daily immersion activities when learning Japanese with methods like [the Moe Way](https://learnjapanese.moe/routine/). Record your daily work with native Japanese content (reading articles, watching videos, doing Anki reviews) and visualize your progress over time.

## Features

- 📅 **Calendar View**: Visual overview of your learning days
- 📊 **Statistics**: Track your streak, articles read, and video time watched
- ✅ **Activity Tracking**: Log different types of activities (NHK articles, Asahi articles, dramas, anime, YouTube videos, Anki reviews)
- 💾 **Local Storage**: All data stored locally on your machine

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/japanese-learning_daily-tracker.git
cd japanese-learning_daily-tracker
```

2. Install dependencies:
```bash
npm install
```

## Running Locally

### Development Mode

To run the app in development mode with hot reload:

```bash
# Terminal 1: Start webpack watch mode
npm run watch

# Terminal 2: Start Electron
npm start
```

### Quick Start

To build and run the app in one command:

```bash
npm start
```

This will build the React app with Webpack and launch the Electron application.

## Building for Production

### Build the React App

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Package the Application

To create a distributable package for your platform:

1. Install electron-builder (if not already installed):
```bash
npm install --save-dev electron-builder
```

2. Add build scripts to your `package.json`:
```json
{
  "scripts": {
    "pack": "electron-builder --dir",
    "dist": "electron-builder",
    "dist:mac": "electron-builder --mac",
    "dist:mac-arm64": "electron-builder --mac --arm64",
    "dist:mac-universal": "electron-builder --mac --universal"
  },
  "build": {
    "appId": "com.yourname.japanese-learning-tracker",
    "productName": "Japanese Learning Tracker",
    "files": [
      "dist/**/*",
      "main.js",
      "package.json"
    ],
    "directories": {
      "buildResources": "assets",
      "output": "release"
    },
    "mac": {
      "target": [
        {
          "target": "dmg",
          "arch": ["arm64", "x64"]
        }
      ],
      "category": "public.app-category.education"
    }
  }
}
```

3. Create distributable packages:

```bash
# For macOS (auto-detects your architecture)
npm run dist -- --mac

# For macOS ARM64 (Apple Silicon M1/M2/M3)
npm run dist:mac-arm64

# For macOS x64 (Intel)
npm run dist -- --mac --x64

# For macOS Universal (both ARM64 and x64)
npm run dist:mac-universal

# For Windows
npm run dist -- --win

# For Linux
npm run dist -- --linux

# For all platforms
npm run dist -- --mac --win --linux
```

**Note for Mac ARM64 users**: If you're building on an Apple Silicon Mac (M1/M2/M3), the default `--mac` build will create an ARM64 version. To create a universal binary that works on both Intel and Apple Silicon Macs, use the `--universal` flag.

The packaged applications will be available in the `release/` directory.

## Release Process

1. Update the version in `package.json`:
```bash
npm version patch  # or minor, or major
```

2. Build the production version:
```bash
npm run build
```

3. Create distributable packages:
```bash
npm run dist
```

4. Create a GitHub release:
   - Push your changes and tags: `git push && git push --tags`
   - Go to your GitHub repository
   - Click "Releases" → "Draft a new release"
   - Choose your tag and upload the files from `release/`

## Project Structure

```
├── src/
│   ├── domain/          # Business entities and interfaces
│   ├── application/     # Use cases and business logic
│   ├── infrastructure/  # Data persistence and Electron IPC
│   └── presentation/    # React components and UI
├── main.js              # Electron main process
└── dist/                # Build output
```

## Tech Stack

- **Frontend**: React 19, Tailwind CSS v4
- **Desktop**: Electron 40
- **Build Tool**: Webpack 5
- **Architecture**: Clean Architecture with separation of concerns

## License

MIT 