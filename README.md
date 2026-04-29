# Smart-Fuel Exchange

Smart-Fuel Exchange is an innovative web application designed to optimize waste management through AI-driven waste classification, a dynamic marketplace, and a city-wide dashboard for monitoring. Built for modern sustainability needs, this application streamlines the process of recycling and waste exchange.

## Features
- **AI Waste Classification**: Utilizes a vision-capable AI model (Hugging Face) to accurately classify waste.
- **Marketplace**: A dynamic platform where users can trade or sell processed waste/materials.
- **City Dashboard**: Provides city officials and administrators with real-time data on waste management metrics.
- **Modern UI**: Designed with a sleek, user-friendly interface using Tailwind CSS and Radix UI components.

## Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS, Lucide React, Recharts
- **Backend**: Next.js API Routes, Supabase (PostgreSQL)
- **AI/ML**: Hugging Face Inference API, Google Generative AI
- **Utilities**: pdf-lib, html2canvas, jspdf

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables
To run this project locally, you will need to add environment variables. See `.env.example` for the required keys.

## Deployment
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
