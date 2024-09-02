/* This code helps manage the initialization of Stripe in your application, ensuring that it only initializes once and 
reuses the same instance (or promise) for future Stripe-related tasks.*/

import { loadStripe } from "@stripe/stripe-js"; // Importing the loadStripe function from the Stripe.js library

// Declaring a variable to hold the Stripe promise. This will be used to initialize Stripe.
let stripePromise;

/**
 * This function initializes Stripe if it hasn't been initialized yet and returns the Stripe promise.
 * 
 * Stripe is initialized using the publishable key (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) 
 * stored in the environment variables. The publishable key is safe to use on the client side.
 * 
 * @returns {Promise} - The initialized Stripe object or the existing Stripe promise.
 */
const getStripe = () => {
    // Check if stripePromise has already been initialized
    if (!stripePromise) {
        // If not, initialize it using the publishable key and store the promise in stripePromise
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }
    // Return the Stripe promise (either the newly initialized one or the previously stored one)
    return stripePromise;
}

// Export the getStripe function so it can be used in other parts of the application
export default getStripe;
