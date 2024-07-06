# E-Commerce Project

## Overview

This project is a full-fledged eCommerce application built using the MERN stack (MongoDB, Express.js, React, and Node.js). The application supports user authentication, product management, shopping cart functionality, order processing, and payment integration.

## Features

-   **User Authentication**: Sign up, log in, and log out functionalities using JWT for authentication.
-   **Product Management**: Add, update, and delete products with images and descriptions.
-   **Shopping Cart**: Add, remove, and update product quantities in the cart.
-   **Order Processing**: Create and view orders with order history.
-   **Payment Integration**: Process payments using Stripe.
-   **Admin Dashboard**: Manage products, orders, and users.

## Technologies Used

-   **Frontend**:
    -   React (Typescript + SWC)
    -   Redux for state management
    -   Axios for API calls
    -   React Router for navigation
    -   Sass for UI components
   
-   **Backend**:
    -   Node.js
    -   Express.js
    -   MongoDB with Mongoose for database management
    -   Firebase for authentication
    -   Multer for file uploads

## Installation

 - **Clone the repository**: 
For backend: `git clone https://github.com/Dhruv1420/Ecommerce24-Server.git`
For frontend: `git clone https://github.com/Dhruv1420/Ecommerce24-Client.git`

 - **Install Dependencies**: 
For backend dependencies: `cd server npm install`
For frontend dependencies: `cd client npm install`

 - **Set up Environment Variables**: Make sure to create a `.env` file in the `server` directory and add appropriate variabels in order to use the app:

    *For Backend*
   - PORT = `3000 or any`
   - MONGO_URL = `mongodb://localhost:27017 or cloud uri`
   - STRIPE_KEY = `stripe secret key` 
   - PRODUCT_PER_PAGE = `8 or any`

   *For frontend*
   - VITE_FIREBASE_KEY = `from firebase`
   - VITE_AUTH_DOMAIN = `from firebase`
   - VITE_PROJECT_ID = `from firebase`
   - VITE_STORAGE_BUCKET = `from firebase`
   - VITE_MESSAGING_SENDER_ID = `from firebase`
   - VITE_APP_ID = `from firebase`
   - VITE_MEASUREMENT_ID = `from firebase`
   - VITE_SERVER = `Your Backend Server URL`
   - VITE_STRIPE_KEY = `Stripe Publishable Key`

- **Run the development server**:
For backend: `cd server npm run dev`
For frontend: 	`cd client npm start`

- Open your browser and navigate to `http://localhost:3000` (Change Port if it is other than 3000).

## Social Handles
 
**Instagram** Click [Here](https://www.instagram.com/a_d_1420/) 
**Github** Click [Here](https://github.com/Dhruv1420)
**LinkedIn** Click [Here](https://www.linkedin.com/in/dhruv1420/)

## Contact
For any questions or feedback, please contact on kirangupta1218@gmail.com
