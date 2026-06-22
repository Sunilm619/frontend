# AI Travel Planner Frontend

## Project Overview

This is the frontend of my AI Travel Planner application.

The application allows users to create personalized travel itineraries using Gemini AI. Users can register, login, generate trips, manage activities, and view trip details through an interactive user interface.

The frontend is built using React, Redux Toolkit, React Router, Axios, Tailwind CSS, and DaisyUI.

---

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Create AI Generated Trips
- View My Trips
- View Trip Details
- Add Activities
- Delete Activities
- Regenerate Day Itinerary
- Responsive UI

---

## Tech Stack

- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- DaisyUI
- Vite

---

## Project Structure

src/

components/

store/

utils/

App.jsx

main.jsx

---

## Application Flow

1. User registers or logs in.
2. User creates a trip by entering:
   - Destination
   - Duration
   - Budget
   - Interests

3. Request is sent to backend.
4. Gemini AI generates itinerary.
5. Trip is saved in MongoDB.
6. User can view all trips.
7. User can view trip details.
8. User can add or delete activities.
9. User can regenerate a specific day using AI.

---

## Redux Usage

Redux Toolkit is used to manage authenticated user data globally across the application.

Store contains:

- User Information
- Authentication State

---

## Routing

React Router is used for navigation.

Routes:

/login

/

/createtrip

/profile

/trip/:trip_id

Protected routes ensure only authenticated users can access application features.

---

## Installation

Clone the repository

npm install

Start Development Server

npm start

---

## Future Enhancements

- Destination Images
- Weather Forecast Integration
- Hotel Recommendations
- Google Maps Integration
- PDF Export
- Trip Sharing

---

## Author

Sunil Manga

MERN Stack Developer

M.Tech, NIT Warangal
