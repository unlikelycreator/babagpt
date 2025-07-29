# Babagpt: Cosmic Horoscope Generator
Project Overview
Babagpt is a React-based web application that generates personalized horoscopes using the Gemini API, wrapped in a cosmic-themed, responsive UI. Users can input their birth details (name, gender, date, place, time, and output language) to receive a detailed, witty horoscope covering love life, marriage prospects, personality traits, career choices, and financial success. The app features a four-tier pricing system (Free, Basic, Pro, Cosmic Elite) with a demo payment modal supporting UPI, card, and net banking options. The Free tier limits users to 5 horoscope readings, prompting an upgrade to premium plans for unlimited access.
The application emphasizes a sleek, user-friendly interface with Tailwind CSS styling and Framer Motion animations, ensuring a delightful experience across devices. It integrates with the Gemini API for horoscope generation and uses localStorage to track Free tier usage.
Technical Details
Tech Stack

Frontend: React (v18), React Router (v6), Tailwind CSS, Framer Motion
UI Components: shadcn/ui (Input, Button, Select), Lucide React (icons)
Markdown Parsing: marked (for rendering horoscope responses)
API: Google Gemini API (gemini-2.0-flash) for horoscope generation
Routing: React Router for navigation (/, /fortune, /pricing)
State Management: React Hooks (useState, useEffect, useRef)
Storage: localStorage for tracking Free tier reading count

## Key Features

### Horoscope Generation (Fortune.jsx):

Users input full name, gender, date of birth, place of birth, time of birth, and output language (English, Hindi, Marathi).
The Gemini API generates a detailed, witty horoscope in markdown format, covering:
Kundli summary
Personality traits
Love life
Marriage prospects
Success and financial breakthrough
Career choices
Final thoughts and disclaimer


Horoscope is rendered as HTML using marked with Tailwind's prose class.
Free tier users are limited to 5 readings, tracked via localStorage (fortuneReadingCount).


### Pricing System (Pricing.jsx):

Four tiers with unique features and witty descriptions:
Free: Sun sign horoscope, no AI access, community support.
Basic: Sun + moon sign, Grok (10 queries/day), email support.
Pro: Full horoscope (sun, moon, ascendant, planets), Grok + ChatGPT 4 (50 queries/day), priority support, zodiac alerts.
Cosmic Elite: Full natal chart, Grok + ChatGPT 4 + 4o (unlimited), in-person/on-call consultations, premium support.


Each tier has a Lucide icon (Star, Moon, Rocket, Sparkles) and animated cards (Framer Motion).
Prices are humorous (e.g., "Free as a shooting star", "$99.99/month or a galactic getaway").


### Demo Payment Modal (Pricing.jsx):

Triggered by clicking "Join the Cosmos" (or "Start Stargazing" for Free tier).
Supports three payment methods:
UPI: Placeholder QR code and UPI ID input.
Credit/Debit Card: Fields for card number, expiry, CVV, cardholder name.
Net Banking: Dropdown for popular Indian banks (SBI, HDFC, ICICI, Axis, Kotak).


Simulates payment with a 1.5-second delay and success message.
Free tier skips the modal, showing a success message directly.


### Free Tier Limit Modal (Fortune.jsx):

Appears when Free tier users exceed 5 readings, prompting them to upgrade.
Includes a witty message, a link to /pricing, and a close button.


## UI/UX:

Cosmic-themed gradient background (from-indigo-100 via-purple-100 to-pink-100).
Responsive design with Tailwind CSS (1-column mobile, 2/4-column desktop).
Framer Motion animations for form, cards, modals, and scroll-to-top button.
Dark mode support with Tailwind's dark: classes.



## Project Structure
babagpt/
├── public/
│   ├── index.html
│   └── qr-code-placeholder.png
├── src/
│   ├── assets/
│   │   └── babagpt-logo-bgremove.png
│   ├── components/
│   │   ├── pages/
│   │   │   ├── Fortune.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── .env
├── package.json
└── README.md

## Code Overview
1. App.jsx

Purpose: Main application component with routing and layout.
Features:
Uses react-router-dom for routes (/, /fortune).
Renders Header, Hero, About, Testimonials, Pricing, Contact, and Footer on the homepage.
Renders Fortune on the /fortune route.
Includes a scroll-to-top button (ArrowUpCircle) that appears after scrolling 200px.
Uses useRef for section references and smooth scrolling.



2. Fortune.jsx

Purpose: Generates personalized horoscopes using the Gemini API.
Key Logic:
Form inputs: Full Name, Gender, Date of Birth, Place of Birth, Time of Birth, Output Language (English, Hindi, Marathi).
Gemini API call to https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent.
Markdown response parsed with marked and styled with prose.
Tracks reading count in localStorage (fortuneReadingCount).
Shows a modal when Free tier limit (5 readings) is reached, with a link to /pricing.


UI:
Cosmic gradient background, translucent form, and Babagpt logo.
Framer Motion animations for form, button, and result.
Responsive form with shadcn/ui components (Input, Button, Select).



3. Pricing.jsx

Purpose: Displays pricing tiers with a demo payment modal.
Key Logic:
Four tiers defined as an array with name, price, description, features, icon, and styling.
Clicking a tier button opens a payment modal (except Free tier, which shows a success message).
Payment modal supports UPI (QR code + ID input), card, and net banking, with simulated submission.
Uses useState for modal state, payment method, and submission status.


UI:
Animated cards with Lucide icons (Star, Moon, Rocket, Sparkles).
Cosmic gradient background and responsive grid (1/2/4 columns).
Modal with Framer Motion animations and Tailwind styling.



4. Other Components

Header.jsx: Navigation bar with links to sections and routes.
Hero.jsx: Homepage hero section with a call-to-action.
About.jsx, Testimonial.jsx, Contact.jsx, Footer.jsx: Static content sections on the homepage.

### Setup Instructions Prerequisites

Node.js (v16 or higher)
npm (v8 or higher)

Installation

Clone the repository:
git clone <repository-url>
cd babagpt


Install dependencies:
npm install


Create a .env file in the root directory and add the Gemini API key:
REACT_APP_GEMINI_API_KEY=your-gemini-api-key


Place the babagpt-logo-bgremove.png in src/assets/ and qr-code-placeholder.png in public/.


Running Locally

Start the development server:
npm start

The app will run at http://localhost:3000.

Test the /fortune route to generate horoscopes and the /pricing route for the pricing modal.


Testing the Free Tier Limit

Navigate to /fortune and submit the form 5 times with valid inputs.
Check localStorage in the browser DevTools (fortuneReadingCount should reach 5).
On the 6th submission, verify the limit modal appears with a link to /pricing.
To reset the count for testing:localStorage.setItem('fortuneReadingCount', '0');



## Production Deployment Security

API Key: Replace the hardcoded Gemini API key in Fortune.jsx with process.env.REACT_APP_GEMINI_API_KEY.

Backend Proxy: Use a Node.js/Express server to secure API calls:
// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.post('/api/horoscope', async (req, res) => {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3001);

Update Fortune.jsx to call http://localhost:3001/api/horoscope.

Payment Gateway: For real payments, integrate Razorpay or Stripe in Pricing.jsx:

Install Razorpay script in public/index.html:<script src="https://checkout.razorpay.com/v1/checkout.js"></script>


Update handlePaymentSubmit to open Razorpay checkout (requires backend for order ID).



## Deployment

Build the app:npm run build


Deploy the build/ folder to a hosting service (e.g., Netlify, Vercel).
Set up environment variables on the hosting platform for REACT_APP_GEMINI_API_KEY.

## Future Enhancements

Dynamic QR Code: Use qrcode.react for UPI payments in Pricing.jsx.
Subscription Backend: Integrate a backend (e.g., Firebase) to manage user subscriptions and bypass Free tier limits for premium users.
Language Quality: Refine Gemini API prompts for consistent Hindi/Marathi output.
Analytics: Add tracking for user interactions (e.g., form submissions, payment modal clicks) using Google Analytics or Mixpanel.

## Known Limitations

The payment system is a demo (no real transactions). Integrate a payment gateway for production.
Free tier limit is client-side (localStorage), which can be bypassed. Use a backend for secure tracking.
Gemini API responses may vary in quality for non-English languages. Test thoroughly for Hindi/Marathi.

## Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/new-feature).
Commit changes (git commit -m "Add new feature").
Push to the branch (git push origin feature/new-feature).
Open a pull request.

## License
MIT License. See LICENSE for details.
