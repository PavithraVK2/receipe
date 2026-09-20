# FLAVORIA - Fine Dining & Artisanal Recipe Experience

A full-stack web application for an artisanal fine dining restaurant with recipe exploration, table booking, and online ordering.

## Features
- **Artisanal Menu**: Browse curated recipes and dishes with filtering by category (Starters, Main Course, Desserts, Beverages, Pizza, Chef Specials).
- **Interactive Recipe Modals**: Ingredients, nutritional highlights, step-by-step instructions, and wine pairings.
- **Table Reservation System**: Book tables with real-time feedback and offline resilience.
- **Cart & Bag Checkout**: Add items, apply promo codes (e.g., `FLAVORIA20`), and checkout.
- **Full-Stack Backend**: Express.js REST API with MongoDB/Mongoose database integration and in-memory fallback.

## Tech Stack
- **Frontend**: HTML5, Vanilla CSS3 (Custom Luxury Design System), Vanilla JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running on `mongodb://127.0.0.1:27017`)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/PavithraVK2/receipe.git
   cd receipe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. Run the application:
   ```bash
   npm start
   ```

5. Open your browser:
   Visit [http://localhost:5001](http://localhost:5001)
