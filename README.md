# Product Explorer

A production-ready React Native app built with Expo (bare workflow) that allows users to browse products, view details, and manage a persistent favorites list.

[![CI](https://github.com/blagojBojcevski/product_explorer/actions/workflows/ci.yml/badge.svg)](https://github.com/blagojBojcevski/product_explorer/actions)

---

## Screenshots

| Product List | Category Filter | Product Detail |
|---|---|---|
| Fetches from dummyjson API | Horizontal scroll chips | Full gallery + favorite |

---

## Tech Stack

| Concern | Solution |
|---|---|
| Framework | React Native + Expo (bare workflow) |
| Language | TypeScript (strict mode) |
| Navigation | React Navigation v7 (native stack) |
| Persistence | AsyncStorage |
| Testing | Jest + React Native Testing Library + Detox (E2E) |
| Linting | ESLint + Prettier |
| CI | GitHub Actions |

---

## Setup Instructions

### Prerequisites

- Node.js **20+**
- npm **9+**
- Expo CLI is bundled in the project — use `npx expo` (no global install needed)
- For iOS: Xcode 16+ (macOS only)
- For Android: Android Studio + SDK 33+

### Installation
```bash
# Clone the repository
git clone https://github.com/blagojBojcevski/product_explorer.git
cd product_explorer

# Install dependencies
npm install --legacy-peer-deps

# Generate native folders
npx expo prebuild
```

### Running the App
```bash
# Start the Expo dev server
npm start

# Run on iOS device/simulator
npm run ios

# Run on Android emulator
npm run android
```

### Running Tests
```bash
# Run all unit tests
npm test

# Run with coverage report
npm run test:coverage

# Watch mode
npm run test:watch
```

### E2E tests (Detox)

**One-time setup:**
1. Generate native code: `npx expo prebuild`
2. **iOS:** `cd ios && pod install && cd ..`
3. **Android:** Ensure an AVD exists (`emulator -list-avds`)

**Run E2E:**
```bash
npm run e2e:ios
npm run e2e:android
npm run e2e
```

### Linting & Formatting
```bash
npm run lint
npm run lint:fix
npm run format
npm run type-check
```

---

## Architecture
```
product-explorer/
├── src/
│   ├── api/
│   ├── components/
│   │   ├── common/
│   │   └── product/
│   ├── constants/
│   ├── hooks/
│   ├── navigation/
│   ├── screens/
│   ├── types/
│   └── utils/
├── e2e/
├── __tests__/
├── .github/workflows/ci.yml
├── App.tsx
└── index.js
```

### Architecture Decisions

**Custom hooks over Redux/Context**
The app's state surface is small: a product list, a selected category, and a set of favorite IDs. Using custom hooks (`useProducts`, `useFavorites`) provides clean encapsulation without the boilerplate of a global store. For a larger app with shared cross-screen state (cart, auth), React Context or Zustand would be the next step.

**Separation of API layer**
All network calls live in `src/api/productApi.ts`. Screens and hooks never call `fetch` directly. This makes mocking trivial in tests and makes it easy to swap the API client.

**AsyncStorage abstraction**
`favoritesStorage.ts` wraps `AsyncStorage` with typed, domain-specific methods. The implementation can be swapped (e.g., MMKV for performance) without touching hook code.

**Performance Optimization: `React.memo` & `useCallback`**
`ProductCard` is wrapped in `React.memo` to prevent re-renders when an unrelated favorite is toggled in a different card. `renderItem` and `keyExtractor` in `FlatList` are wrapped in `useCallback` to maintain referential stability across re-renders, preventing FlatList from re-rendering unchanged rows.

---

## Testing Strategy

| Test file | Type | What it covers |
|---|---|---|
| `__tests__/utils/formatters.test.ts` | Unit | `formatPrice`, `titleCase`, `truncateText` |
| `__tests__/hooks/useFavorites.test.ts` | Hook | Toggle add/remove, initial load |
| `__tests__/components/ProductCard.test.tsx` | Component | Render, press handlers, badges |

---

## API

Uses [dummyjson.com](https://dummyjson.com/products):

| Endpoint | Used for |
|---|---|
| `GET /products?limit=100` | Product list screen |
| `GET /products/:id` | Product detail screen |
| `GET /products/categories` | Category filter chips |

---

## Bonus Features

- ✅ CI configuration — GitHub Actions
- ✅ E2E tests (Detox)
- ✅ Performance optimization — `React.memo`, `useCallback`
- ✅ Discount badges
- ✅ Image gallery with dot indicators
- ✅ Accessibility support
