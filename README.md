# Frontend for Recipe Generation App

This repository contains the frontend for a Recipe Generation application built with React.js. The app interacts with a Python Flask backend API to generate personalized recipes based on the ingredients provided by the user. Users can input their ingredients, receive suggested recipes, and explore cooking tips and techniques.

## Features

- **User Authentication**: Login and registration using JWT (JSON Web Tokens) for secure access to the app.
- **Ingredient Input**: A simple and intuitive interface to input available ingredients.
- **Recipe Generation**: Displays recipe suggestions based on the ingredients entered.
- **Responsive Design**: Optimized for both desktop and mobile devices, ensuring a seamless experience on any screen size.
- **Error Handling**: Graceful handling of errors and user-friendly messages in case of incorrect input or API failures.

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to the backend API.
- **JWT**: For managing authentication tokens.
- **CSS/SCSS**: For styling the application.
- **React Router**: For managing navigation between pages.
- **OpenAI API**: For recipe generation based on user inputs (through the backend).

## Usage

- Upon launching the application, users will be prompted to log in or register. Once authenticated, users can input their ingredients in the provided text field.
- The app will send the ingredients to the backend API, and it will return a list of recipe suggestions.
- Users can view the recipe details, including instructions and tips for cooking.

## Api Endpoints
This frontend communicates with the backend API, which is detailed in the <a href="https://github.com/rubpercas/proyecto-final-backend">BACKEND REPOSITORY</a>

## Deployment URLs
- **Frontend**: <a href="https://proyecto-final-frontend-app.vercel.app/"> Mamma mIA recipe generator </a>
- **Backend**: <a href="https://flask-rest-hello-2pl3.onrender.com/"> Backend </a>

## Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit pull requests. We welcome any improvements or suggestions!
