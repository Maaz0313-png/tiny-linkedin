# TinyLinkedIn

A mini LinkedIn-like community platform built with Laravel, Inertia.js, React, Tailwind CSS, and SQLite.

## Features

-   User authentication (register, login, logout) with email verification
-   Profile page with name, email, and bio
-   Public post feed (create, read, display text-only posts)
-   Home feed with author’s name and timestamp
-   View any user’s profile and their posts
-   LinkedIn-inspired responsive UI (navbar, 3-column layout, cards)
-   Rate limiting and account lockout on failed login attempts
-   Email verification (emails sent to `laravel.log`)

## Tech Stack

-   **Frontend:** React (with Vite, Tailwind CSS)
-   **Backend:** Laravel
-   **Glue:** Inertia.js
-   **Database:** SQLite

## Setup Instructions

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Maaz0313-png/tiny-linkedin.git
    cd tiny-linkedin
    ```
2. **Install dependencies:**
    ```sh
    composer install
    npm install
    ```
3. **Copy and edit `.env`:**
    ```sh
    cp .env.example .env
    # Edit .env as needed (ensure MAIL_MAILER=log and DB_CONNECTION=sqlite)
    ```
4. **Generate app key:**
    ```sh
    php artisan key:generate
    ```
5. **Run migrations:**
    ```sh
    php artisan migrate
    ```
6. **Build frontend assets:**
    ```sh
    npm run build
    # or for development: npm run dev
    ```
7. **Start the server:**
    ```sh
    php artisan serve
    ```
8. **Access the app:**
   Visit [http://localhost:8000](http://localhost:8000)

## Demo User

-   Register a new user with your email (verification link will be in `storage/logs/laravel.log`).
-   Or use any test email address.

## Email Verification

-   After registration, check `storage/logs/laravel.log` for the verification link (emails are not sent to a real inbox, but logged to this file).
-   Click the link to verify your account and unlock all features.

## Rate Limiting & Account Lockout

-   3 failed login attempts within 5 minutes will lock the account for 5 minutes.
-   User receives clear error messages for lockout and failed attempts.

## Deployment

-   Frontend can be deployed to Vercel or Netlify (see Vite/React docs).
-   Backend (Laravel) can be deployed to Render, Railway, or similar free hosts.

## Extra Features

-   LinkedIn-style UI (navbar, cards, layout)
-   Responsive design

---

> Not affiliated with LinkedIn. For demo and educational purposes only.
