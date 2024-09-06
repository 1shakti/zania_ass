# Full Stack Application
Click [here](https://main--zingy-tanuki-dd5a78.netlify.app/) for the demo.

## Overview

This project implements a simple full-stack application using React for the frontend. It displays cards with drag-and-drop functionality, image overlays, and mock API responses.

## Features

- **Card Display**: Shows a grid of 5 cards with different thumbnails.
- **Image Loading**: Includes a spinner placeholder while images are loading.
- **Drag-and-Drop**: Allows reordering of cards using drag-and-drop.
- **Image Overlay**: Displays the image in an overlay when a card is clicked, with ESC to close.
- **Mock API**: Uses `msw` (Mock Service Worker) to simulate API responses and persist data in local storage.

## Tech Stack

- **Frontend**: React, `msw` (Mock Service Worker)
- **Styling**: Tailwind CSS 
- **Data Storage**: Local Storage (for persistence across reloads)

## Prerequisites
Ensure you have the following installed:

- Node.js
- npm or yarn: Dependency management tools

## Notes

- **Frontend Focus**: No backend implementation is included; the project uses a mock service for API interactions.
- **Data Persistence**: Local storage is used to maintain data across page reloads.



## Getting Started

To run the application, follow these steps:

1. **Clone the Repository**:
   - Clone the repository to your local machine.
     ```bash
     git clone https://github.com/1shakti/zania_ass.git
     cd zania_ass
     ```

2. **Install Dependencies**:
   - Install the necessary dependencies.
     ```bash
     npm install
     ```
     or
     ```bash
     yarn install
     ```

3. **Run the Application**:
   - Start the development server.
     ```bash
     npm run dev
     ```
     or
     ```bash
     yarn dev
     ```


## Building for Production

To create a production build of the application:

1. **Build the Project**:
   - Generate a production build.
     ```bash
     npm run build
     ```
     or
     ```bash
     yarn build
     ```
   - The build output will be in the `dist` directory.

