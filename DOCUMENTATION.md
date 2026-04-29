# Smart-Fuel Exchange: Technical Documentation

## 1. Overview
Smart-Fuel Exchange is an innovative, AI-powered web application that integrates waste management with a marketplace and city-wide monitoring dashboard. It enables efficient waste tracking, classification using machine learning, and incentivizes recycling by allowing users to trade processed waste.

## 2. Architecture & Tech Stack
The platform uses a modern web stack designed for performance, scalability, and seamless user experience.

### Frontend
- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v4, Radix UI components (shadcn/ui)
- **Icons & Charts**: Lucide React, Recharts
- **PDF Generation**: pdf-lib, jspdf, html2canvas

### Backend
- **API**: Next.js Serverless API Routes
- **Database**: Supabase (PostgreSQL) for user data, inventory, and marketplace transactions
- **Authentication**: Custom mock or Supabase Auth integration

### AI Integration
- **Waste Classification**: Hugging Face Inference API (Vision Models)
- **Analytics & Processing**: Google Generative AI integration for deeper insights

## 3. Core Modules

### 3.1 AI Waste Classification
Users can upload images of waste for automated classification. The Hugging Face vision model determines the type of waste, its recyclability, and recommended processing methods. Failsafe mechanisms are implemented using specific filenames (e.g., "demo-pass.jpg", "demo-fail.jpg") for reliable demonstrations.

### 3.2 Marketplace
A digital exchange where processed materials (e.g., charcoal, sorted plastics) can be listed, bought, and sold. The marketplace interacts with the Supabase backend to track inventory levels, process transactions, and maintain user balances.

### 3.3 City Dashboard
A centralized view for city administrators to monitor waste processing metrics. Features include:
- Real-time charts showing waste collected vs. processed
- Geographical data representation (if applicable)
- System alerts and overall efficiency scores

## 4. Database Schema (Supabase)
The primary tables include:
- `users`: Stores user profiles, roles (citizen, admin, corporate), and wallet balances.
- `inventory`: Tracks waste and processed materials available in the system.
- `transactions`: Logs all marketplace purchases and waste submissions.

## 5. Development & Deployment

### Local Development
1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure environment variables in `.env.local` (e.g., `NEXT_PUBLIC_SUPABASE_URL`, `HUGGINGFACE_API_KEY`).
4. Start the server: `npm run dev`

### Deployment
The application is optimized for deployment on **Vercel**.
- Connect the GitHub repository to Vercel.
- Configure the environment variables in the Vercel dashboard.
- Deploy using the standard Next.js build command: `npm run build`

## 6. Future Enhancements
- Integration with IoT sensors for smart bins.
- Expansion of the AI models to support more granular waste categories.
- Blockchain-based verification for recycling certificates.
