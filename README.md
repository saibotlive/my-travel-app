# Holiwise Test App

- [Visit](https://my-travel-app-sigma.vercel.app)

## Overview

Holiwise is a web application designed to help users plan group travel. It allows users to save, vote, and manage favourite travel destinations, organise destinations into folders, and view details about each destination. This app uses Next.js for server-side rendering and client-side routing, Redux for state management, and Vercel Postgres for data storage.

## Features

- **Save and Vote**: Users can save destinations and vote on their favorites.
- **Folder Management**: Organise destinations into folders for better management.
- **Real-time Updates**: Data is fetched in real-time using server-side rendering and API calls.
- **Responsive Design**: The app is designed to be fully responsive across different devices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Database**: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- **UI Library**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: Tailwind CSS
- **Icons**: Radix Icons

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/saibotlive/my-travel-app.git
   cd my-travel-app
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Variables**
   Create a `.env.development.local` file in the root of your project and add your environment variables:

   ```env
   POSTGRES_DATABASE="verceldb"
   POSTGRES_HOST="your-postgres-host"
   POSTGRES_PASSWORD="your-password"
   POSTGRES_PRISMA_URL="your-prisma-url"
   POSTGRES_URL="your-postgres-url"
   POSTGRES_URL_NON_POOLING="your-non-pooling-url"
   POSTGRES_URL_NO_SSL="your-no-ssl-url"
   POSTGRES_USER="your-username"
   BASE_URL=http://localhost:3000
   ```

4. **Run the Development Server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Running Tests

To run the test suite, use the following command:

```bash
pnpm test
```

## Folder Structure

```
my-travel-app/
├── public/                 # Public assets
├── src/                    # Source files
│   ├── app/                # App components
│   │   ├── ui/             # UI components
│   │   ├── api/            # API routes
│   │   ├── page.tsx        # Main page
│   ├── lib/                # Library files (Redux slices, API handlers)
│   ├── types/              # TypeScript types
├── .env.development.local  # Environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Package configuration
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration
```

## Deployment

To deploy the application, follow these steps:

1. **Push to GitHub**: Ensure your changes are pushed to your GitHub repository.
2. **Vercel Deployment**: Connect your repository to [Vercel](https://vercel.com/) and follow their deployment steps.

## Usage

- **Navigating Folders and Destinations**: Users can navigate between folders and view destinations within those folders.
- **Voting**: Users can upvote destinations to indicate their preferences.
- **Creating Folders**: Users can create new folders to organise destinations.

## Author

Tobias Ighofose

- [GitHub](https://github.com/saibotlive)

## Contact

For any questions or issues, please open an issue on GitHub.

---

Thank you for using Holiwise! We hope it helps you plan your next adventure seamlessly.
