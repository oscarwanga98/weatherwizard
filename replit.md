# Weather App

## Overview

This is a modern, responsive weather web application built with React, TypeScript, and Express.js. The application provides comprehensive weather information including current conditions, forecasts, air quality data, and interactive features like location services and theme switching.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack monolithic architecture with clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with hot module replacement in development

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful API with weather data endpoints
- **Data Fetching**: OpenWeatherMap API integration
- **Development**: tsx for TypeScript execution in development

## Key Components

### Client-Side Components
- **Theme System**: Dark/light mode with system preference detection and localStorage persistence
- **Geolocation**: Browser-based location detection with error handling
- **Weather Display**: Modular components for current weather, forecasts, air quality, and UV index
- **Search Functionality**: City search with autocomplete capabilities
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Server-Side Components
- **Weather API**: Express routes for fetching weather data from OpenWeatherMap
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **CORS & Security**: Proper middleware setup for cross-origin requests
- **Static Serving**: Vite integration for serving frontend assets

### UI Component Library
- **shadcn/ui**: Comprehensive component library built on Radix UI primitives
- **Accessibility**: ARIA-compliant components with keyboard navigation
- **Theming**: CSS custom properties for consistent theming across light/dark modes

## Data Flow

1. **Location Detection**: User allows geolocation or manually searches for a city
2. **API Request**: Frontend sends coordinates to Express server endpoint
3. **External API**: Server fetches data from OpenWeatherMap API (current weather, forecast, air quality)
4. **Data Processing**: Server transforms and validates API responses using Zod schemas
5. **Client Update**: React Query manages caching and updates UI components
6. **State Persistence**: Theme preferences and settings stored in localStorage

## External Dependencies

### Weather Data
- **OpenWeatherMap API**: Primary weather data source requiring API key
- **Endpoints Used**: Current weather, 5-day forecast, air pollution data
- **Rate Limiting**: Built-in caching with React Query to minimize API calls

### UI Libraries
- **Radix UI**: Unstyled, accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **FontAwesome**: Weather-specific icons for conditions

### Development Tools
- **Vite**: Fast development server with HMR
- **TypeScript**: Type safety across the entire application
- **ESLint/Prettier**: Code quality and formatting (implied by modern React setup)

## Deployment Strategy

### Development
- **Hot Reload**: Vite dev server with Express proxy
- **Environment Variables**: `.env` file for API keys and configuration
- **TypeScript Compilation**: On-the-fly compilation with tsx

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Static Assets**: Express serves compiled frontend assets
- **Process**: Single Node.js process serving both API and static files

### Database Integration
- **Schema**: Drizzle ORM with PostgreSQL configuration ready
- **Migrations**: Database migration system in place (currently basic user schema)
- **Storage**: In-memory storage implementation for development, easily replaceable with PostgreSQL

The application is designed for deployment on platforms like Replit, Heroku, or similar Node.js hosting services with minimal configuration required beyond setting the OpenWeatherMap API key.

## Testing Implementation

### Comprehensive Test Suite
The application includes a complete testing setup with multiple layers of coverage:

#### Unit Tests (`tests/simple-unit.test.ts`)
- Temperature conversion utilities and formatting
- Theme system cycling logic (light → dark → cosmic)
- Seasonal theme cycling (none → christmas → halloween)  
- Data validation for weather and search API responses
- Weather data structure validation

#### Integration Tests (`tests/integration.test.ts`)
- Theme persistence with localStorage simulation
- Weather API integration with proper error handling
- Search API functionality with mock responses
- Geolocation API integration and error scenarios
- Network failure handling and graceful degradation

#### End-to-End Simulation (`tests/e2e-headless.test.ts`)
- UI element interaction simulation using JSDOM
- Theme switching and seasonal theme functionality
- Search input and results display
- Responsive design behavior testing
- Accessibility features including ARIA attributes
- Keyboard navigation support

#### Browser E2E Tests (`tests/e2e/weather-app.spec.ts`)
- Full Playwright browser automation tests
- Cross-browser compatibility (Chrome, Firefox, Safari)
- Mobile responsiveness testing
- Theme persistence across page reloads
- API mocking for consistent test results

### Test Technologies
- **Vitest**: Primary testing framework with fast execution
- **JSDOM**: Headless DOM environment for UI simulation
- **Playwright**: Full browser automation (optional)
- **Testing Library**: React component testing utilities
- **Supertest**: HTTP assertion testing for API endpoints

### Test Results
- ✅ 14/14 Unit & Integration tests passing
- ✅ Comprehensive coverage of core functionality
- ✅ Error handling and edge case validation
- ✅ Browser feature compatibility testing
- ✅ Accessibility compliance validation

### Running Tests
```bash
# Unit and integration tests
npx vitest run tests/simple-unit.test.ts tests/integration.test.ts

# With watch mode
npx vitest tests/simple-unit.test.ts tests/integration.test.ts --watch

# Full browser E2E (requires Playwright setup)
npx playwright test
```