# AgriGuide - Farmer's Digital Companion

AgriGuide is a comprehensive React-based web application designed to empower Indian farmers with digital tools and information. The application provides a user-friendly interface with features like profile management, government scheme discovery, real-time market prices, weather updates, and crop planning assistance.

## Features

### 1. Multi-Language Support
- Support for multiple Indian languages
- Language switcher component
- Localized content and UI elements
- Seamless language switching without page reload

### 2. Farmer Profile Management
- Create and manage detailed farmer profiles
- Store profile data with Redux Toolkit
- Persistent storage using localStorage
- Profile-based scheme recommendations

### 3. Government Scheme Finder
- Comprehensive database of government schemes
- Smart filtering based on farmer profile
- Detailed eligibility criteria and benefits
- Step-by-step application guidance
- Document checklist generator

### 4. Market Price Information
- Real-time market prices from multiple sources
- Interactive price history charts
- Regional price comparisons
- Crop profitability analysis

### 5. Weather Widget
- Location-based current weather
- 7-day weather forecast
- Agricultural weather alerts
- Soil moisture recommendations

### 6. Crop Calendar
- Personalized planting schedules
- Crop rotation recommendations
- Pest and disease alerts
- Fertilizer application reminders

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite 4
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **API Client:** Axios
- **Form Handling:** React Hook Form
- **Testing:** Vitest

## Project Structure

```
src/
├── components/      # Reusable UI components and widgets
├── pages/           # Application pages and layouts
├── store/           # Redux Toolkit store slices
├── hooks/           # Custom React hooks
├── utils/           # Utility functions and helpers
├── services/        # API service layers
├── data/            # Static data and constants
├── types/           # TypeScript type definitions
├── tests/           # Unit and integration tests
└── App.tsx          # Root application component
```

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Main Components

### Pages
- **Home:** Landing page with application introduction
- **Profile:** Farmer profile creation and editing
- **Schemes:** Government scheme listing and filtering
- **Market Prices:** Crop price information and trends
- **Crop Calendar:** Seasonal farming guidance

### Core Components
- **Navbar:** Main navigation component
- **WeatherWidget:** Location-based weather information

## State Management

The application uses Redux Toolkit for state management with the following main slices:
- **farmerSlice:** Manages farmer profile data and persistence

## Type Definitions

Key TypeScript interfaces include:
- **Farmer:** Defines farmer profile structure
- **Scheme:** Defines government scheme data structure

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.