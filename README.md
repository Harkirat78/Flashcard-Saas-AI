# StudyFuze.ai - AI Study Flashcards App

Welcome to **StudyFuze.ai**, my AI-driven flashcards study application designed to make studying more efficient and personalized. The app is live at [StudyFuze.ai](https://flashcard-saas-k7diacmpd-harkirat78s-projects.vercel.app).

## Overview

I developed StudyFuze.ai to leverage advanced AI technologies that generate customized study flashcards based on user input. Whether you’re preparing for exams or need a quick review, StudyFuze.ai has got you covered.

## Key Features

- **AI-Powered Flashcards**: I use OpenAI's GPT model to generate high-quality, relevant study materials.
- **Stripe Integration**: Secure payment processing for premium features is managed through Stripe, allowing users to choose between Basic and Pro plans.
- **Authentication**: Clerk handles the authentication, ensuring secure sign-in and sign-up processes.
- **Backup with Google Gemini API**: In case OpenAI tokens run out, the app seamlessly switches to the Google Gemini API to continue generating flashcards.
- **Data Storage**: All flashcards are saved in Firebase, allowing easy retrieval and continuity of study sessions.

## How It Works

1. **Authentication**: Sign in or sign up using Clerk for secure and smooth access.
2. **Flashcard Creation**: Input your study material, and the AI, powered by OpenAI, will generate flashcards.
3. **Payment Processing**: For premium features, payments are securely processed via Stripe.
4. **Backup AI**: If OpenAI tokens are unavailable, the app will automatically switch to the Google Gemini API.
5. **Data Storage**: Your generated flashcards are saved in Firebase for future access.

## Future Plans

I plan to scale the app soon, allowing users to retrieve saved flashcards across multiple sessions, enhancing their study experience.

## Live Demo

You can experience the app directly at [StudyFuze.ai](https://flashcard-saas-k7diacmpd-harkirat78s-projects.vercel.app).
