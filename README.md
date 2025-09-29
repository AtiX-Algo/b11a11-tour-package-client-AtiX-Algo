# The Vagabond Tour (Client)

This is the front-end client for "The Vagabond Tour," a full-stack tour package booking platform. It is built with React (using Vite) and communicates with a separate back-end server.

### Live Site URL
**https://the-vagabond-tour.web.app**

---

### Features

* **User Interface:** A clean, responsive, and modern UI built with Tailwind CSS and DaisyUI.
* **User Authentication:** Secure login/registration with Firebase (Email/Password & Google).
* **Dynamic Pages:** Browse tour packages, view details, and manage bookings.
* **Role-Based Views:** A special dashboard for "Tour Guides" to add and manage their packages.
* **Interactive Elements:** Smooth animations, a persistent light/dark theme toggle, and robust form validation.

### Technology Stack

* React (Vite)
* React Router
* Tailwind CSS & DaisyUI
* Axios
* Firebase Authentication SDK
* React Hook Form
* Framer Motion
* SweetAlert2

### Local Setup

1.  Clone the repository.
2.  Run `npm install`.
3.  Create a `.env.local` file and add `VITE_API_URL=http://localhost:5000`.
4.  Run `npm run dev`.