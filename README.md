# CreatorBay - Peer-to-Peer Creative Workspace Marketplace

**[Live Client URL](https://creator-bay-frontend.vercel.app/)** 

CreatorBay is a modern, premium peer-to-peer marketplace connecting independent creators, photographers, filmmakers, podcasters, and musicians with unique, fully equipped creative studios and workspaces.

---

## Key Features (Featured Highlights)

- **Advanced Studio Discovery & Filtering:** Explore creative spaces with instant search, category filters (Photography, Film Stage, Podcast Lounge, Music Suite), location sorting, and price/rating bounds.
- **Immersive Studio Details:** Comprehensive studio showcase pages featuring high-resolution photo galleries, equipment specs, detailed host bios, and verified client reviews.
- **Interactive Booking Flow:** Seamless reservation system with live date/time selection, guest capacity limits, automatic subtotal/deposit calculations, and booking management via "My Bookings".
- **Host Publishing & Listing Management:** Dedicated host onboarding interface ("Add Studio") and listing management dashboard ("My Listings") to publish, update, and manage creative spaces.
- **Secure JWT Authentication & HTTPOnly Cookies:** Robust Better Auth integration supporting email/password authentication with strict password validation criteria, Google Social Login, and JWT security.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Primitives:** `@base-ui/react`, Lucide React, Radix/shadcn-inspired components
- **Animations & Interactivity:** Framer Motion, Swiper.js, Sonner (Toast notifications)
- **Authentication & Security:** Better Auth (`better-auth`, `@better-auth/mongo-adapter`), `jose` (JWT verification), HTTPOnly cookies

---

## Local Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/devnajmulislam/creator-bay-frontend.git
   cd creator-bay-frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:5000
   BETTER_AUTH_SECRET=your-better-auth-secret
   BETTER_AUTH_URL=http://localhost:3000
   MONGO_URI=your-mongodb-connection-string
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Test Credentials

For quick evaluation and testing, you can use the following demo credentials to log in:

- **Email:** `explore@gmail.com`
- **Password:** `12345678Aa`

*(Alternatively, you can register a new account using the Registration page with a password containing at least 6 characters, one uppercase letter, and one lowercase letter).*
