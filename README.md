# NexaManga Frontend

A modern manga reader web application built with Next.js, offering a seamless reading experience with features like continuous scrolling, chapter navigation, and bookmarking.

## Features

- 📱 Responsive design for all devices
- 📖 Continuous scroll reading mode
- 🔖 Bookmark favorite manga
- 🎨 Custom theme support
- 🔍 Advanced search functionality
- 📱 PWA support for mobile installation
- 🚀 Fast image loading with optimization
- 📑 Chapter progress tracking

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [SWR](https://swr.vercel.app/) - Data fetching
- [Framer Motion](https://www.framer.com/motion/) - Animations

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Sila030446/nexamanga.git
cd nexamanga/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── components/         # Reusable UI components
├── pages/             # Next.js pages and API routes
├── public/            # Static assets
├── styles/            # Global styles and Tailwind config
├── lib/              # Utility functions and helpers
├── types/            # TypeScript type definitions
└── contexts/         # React context providers
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run type-check` - Run TypeScript compiler

## Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_SITE_URL=your_frontend_url
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

### Tailwind Configuration

Customize the `tailwind.config.js` file to modify the theme:

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // Your custom theme configurations
    }
  },
  plugins: []
}
```

## API Integration

The frontend communicates with the backend API using the following endpoints:

- `/api/manga` - Get manga list
- `/api/manga/[id]` - Get manga details
- `/api/chapter/[id]` - Get chapter content
- `/api/user/bookmarks` - Manage user bookmarks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped with the project
- Special thanks to the manga community for their support

## Contact

- GitHub: [@Sila030446](https://github.com/Sila030446)
- Project Link: [https://github.com/Sila030446/nexamanga](https://github.com/Sila030446/nexamanga)

## Support

If you find this project helpful, please consider giving it a ⭐️ on GitHub!