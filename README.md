# Backend Pandemic Notifier 🚨

This is a Node.js and Express.js application that serves as the backend for an app that notifies the user if he or she was near a person with the coronavirus. This app was made by Omar Gamal for the ISEF competition. 🏆

## Features

- Uses geolocation and Bluetooth to track the user's location and proximity to other users.
- Stores the user's data in a MongoDB database and encrypts it with bcrypt.
- Sends push notifications to the user if they were exposed to a potential risk of infection.
- Provides an API for the frontend app to access the data and functionality.

## Installation

To run this application, you need to have Node.js and MongoDB installed on your machine. Then, follow these steps:

- Clone this repository to your local machine.
- Navigate to the project folder and run `npm install` to install the dependencies.
- Create a `.env` file in the root directory and add the following variables:
PORT=3000
MONGO_URI=mongodb://localhost:27017/pandemic-notifier
PUSH_KEY=your-push-notification-key
- Run `npm start` to start the server.
- You can test the API endpoints using Postman or any other tool.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
