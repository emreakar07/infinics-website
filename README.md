# Infinics AI Agent Dev Studio

Transform your business with custom AI agents. From concept to production in 14 days.

## 🚀 Features

- **Live Demos**: Interactive demonstrations of AI agents for pricing and maintenance support
- **Comprehensive AI Agent Suite**: Solutions for Operations, HR, Procurement, and Sales & Marketing
- **Custom Development**: Tailored AI solutions for unique business needs
- **Fast Implementation**: 14-day deployment guarantee
- **ROI Calculator**: Calculate potential savings and efficiency gains

## 🛠️ Technologies

This project is built with:

- **Vite** - Next generation frontend tooling
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn/ui** - Modern component library
- **Tailwind CSS** - Utility-first CSS framework
- **OpenAI API** - For AI agent demonstrations

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd infinics-ai-agent-studio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Deployment

The project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

Copy `.env.example` to `.env` and configure the following:

#### EmailJS Configuration (Required for Contact Form)

For detailed setup instructions, see [docs/EMAILJS_SETUP.md](docs/EMAILJS_SETUP.md).

Quick setup:
1. Sign up for a free account at [EmailJS](https://www.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template (see [docs/emailjs-template.html](docs/emailjs-template.html))
4. Add these to your `.env` file:

```
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_CONTACT_EMAIL=your-email@example.com
```

#### OpenAI Configuration (Optional for Demos)

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### Vercel Deployment

Add the same environment variables in your Vercel project settings under Settings → Environment Variables.

## 🎨 Project Structure

```
src/
├── components/     # React components
│   ├── ui/        # shadcn/ui components
│   └── ...        # Feature components
├── pages/         # Page components
├── lib/           # Utilities and helpers
└── main.tsx       # Application entry point
```

## 📝 License

© 2024 Infinics. All rights reserved.
