# Vite + React + TypeScript Project

This is a basic Vite project setup with React and TypeScript. It is designed to get you up and running quickly with a modern front-end development stack.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.8 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (package manager)

## Getting Started

### 1. Clone the Repository
git clone https://github.com/HungLe210/infinite-scrolling

### 2. Install Dependencies
Run the following command to install the necessary dependencies:

npm install
# or if you're using Yarn
yarn install

### 3. Run the development server
npm run dev
# or if you're using Yarn
yarn dev
This will start the development server at http://localhost:5173 by default.


### Folder structure
src/
  ├── components/       # Reusable components
  ├── hooks/            # Custom React hooks
  ├── App.tsx           # Root component
  └── main.tsx          # Entry point for React

### Manual Testing
1. Open the project in your browser at http://localhost:5173.
2. Fill out the Search Input to verify the fetching are working as expected.
! Searching won't running if input is empty
Example: phone -> 5 test case: p, ph, pho, phon, phone.
